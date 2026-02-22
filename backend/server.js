const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const axios = require('axios');
const QRCode = require('qrcode');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Supabase Connection
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// 2. Blockchain Connection (V3)
const ABI = require('./abi.json'); // Ensure this is the V3 ABI!
const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ABI, wallet);

console.log("✅ V3 Backend Ready");
console.log("✅ Connected to Supabase:", process.env.SUPABASE_URL);

// ── ROUTE 1: Hospital lists an organ (V3 RBAC: onlyHospital) ──
app.post('/api/organ/list', async (req, res) => {
  try {
    const { organId, donorId, organType, bloodGroup, hospital } = req.body;
    const dataHash = ethers.keccak256(ethers.toUtf8Bytes(`${donorId}|${organType}|${bloodGroup}|${hospital}`));

    const tx = await contract.listOrgan(organId, dataHash);
    await tx.wait();

    const qrUrl = `http://localhost:3000/track?organId=${organId}`;
    const qrImage = await QRCode.toDataURL(qrUrl);

    res.json({ success: true, txHash: tx.hash, qrImage, organId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── ROUTE 2: NOTTO allocates organ (V3 RBAC: onlyRegulator) ──
app.post('/api/organ/allocate', async (req, res) => {
  try {
    const data = req.body;
    const aiRes = await axios.post('http://localhost:5001/score', {
        recipient_rank: data.recipientRank,
        distance_km: data.distanceKm,
        urgency_score: data.urgencyScore,
        time_to_allocate_secs: data.timeToAllocateSecs || 600,
        closer_recipient_skipped: data.closerSkipped || false,
        blood_group_match: data.bloodGroupMatch,
        wait_time_days: data.waitTimeDays,
    });

    const { score, risk_level, reasons } = aiRes.data;
    const recipientHash = ethers.keccak256(ethers.toUtf8Bytes(data.recipientId));
    const criteriaHash = ethers.keccak256(ethers.toUtf8Bytes(JSON.stringify(data)));

    const tx = await contract.recordAllocation(data.organId, recipientHash, criteriaHash, score);
    await tx.wait();

    res.json({ success: true, txHash: tx.hash, trustScore: score, riskLevel: risk_level, reasons, flagged: score < 60 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── ROUTE 3: Record transport dispatch (V3 RBAC: onlyHospital) ──
app.post('/api/organ/dispatch', async (req, res) => {
    try {
      const { organId, fromHospital, toHospital } = req.body;
      const locationHash = ethers.keccak256(
        ethers.toUtf8Bytes(`${fromHospital} → ${toHospital}`)
      );
      const tx = await contract.recordDispatch(organId, locationHash);
      await tx.wait();
      res.json({ success: true, txHash: tx.hash });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // ── ROUTE 4: Record transplant completion (V3 RBAC: onlyHospital) ──
  app.post('/api/organ/transplant', async (req, res) => {
    try {
      const { organId, surgeon, outcome } = req.body;
      const outcomeHash = ethers.keccak256(
        ethers.toUtf8Bytes(`${surgeon}|${outcome}`)
      );
      const tx = await contract.recordTransplant(organId, outcomeHash);
      await tx.wait();
      res.json({ success: true, txHash: tx.hash });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
// ── ROUTE 5: Get History (V3 handles packed structs) ──
app.get('/api/organ/:organId/history', async (req, res) => {
  try {
    const history = await contract.getOrganHistory(req.params.organId);
    const statusMap = ['Listed', 'Matched', 'In Transit', 'Transplanted', 'Flagged'];
    
    const formatted = history.map(e => ({
      organId: Number(e.organId),
      status: statusMap[Number(e.status)],
      trustScore: Number(e.trustScore),
      timestamp: Number(e.timestamp), // Now uint64 in V3
      recordedBy: e.recordedBy,
      anomalyFlagged: e.anomalyFlagged,
    }));
    res.json({ success: true, history: formatted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── ROUTE 7: Get Patients from Supabase ──
app.get('/api/patients', async (req, res) => {
  try {
    const { data: patients, error } = await supabase.from('patients').select('*').order('rank', { ascending: true });
    if (error) throw error;
    res.json({ patients });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── ROUTE 8: Get Donors from Supabase ──
app.get('/api/donors', async (req, res) => {
  try {
    const { data: donors, error } = await supabase.from('donors').select('*');
    if (error) throw error;
    res.json({ donors });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`🚀 Server on port ${process.env.PORT || 3001}`);
});