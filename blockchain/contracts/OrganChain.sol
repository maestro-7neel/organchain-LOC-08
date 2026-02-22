// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract OrganChain {
    address public admin;
    mapping(address => bool) public hospitals;
    mapping(address => bool) public regulators;

    modifier onlyAdmin() {
        require(msg.sender == admin, "OrganChain: Only admin allowed");
        _;
    }

    modifier onlyHospital() {
        require(hospitals[msg.sender], "OrganChain: Only authorized hospitals allowed");
        _;
    }

    modifier onlyRegulator() {
        require(regulators[msg.sender], "OrganChain: Only authorized regulators allowed");
        _;
    }

    constructor() {
        admin = msg.sender;
        hospitals[msg.sender] = true;   
        regulators[msg.sender] = true;  
    }

    function addHospital(address _hospital) public onlyAdmin {
        hospitals[_hospital] = true;
    }

    function addRegulator(address _regulator) public onlyAdmin {
        regulators[_regulator] = true;
    }

    enum OrganStatus { 
        Listed,       // 0
        Matched,      // 1
        InTransit,    // 2
        Transplanted, // 3
        Flagged       // 4
    }

    // AMENDMENT 1: Tightly packed struct. 
    // uint64 + address + enum + uint8 + bool = 8 + 20 + 1 + 1 + 1 = 31 bytes. 
    // This perfectly fits inside a single 32-byte EVM storage slot.
    struct OrganEvent {
        uint256 organId;     
        bytes32 dataHash;    
        uint64 timestamp;    
        address recordedBy;  
        OrganStatus status;  
        uint8 trustScore;    
        bool anomalyFlagged; 
    }

    // Tightly packed AllocationRecord
    struct AllocationRecord {
        uint256 organId;
        bytes32 recipientHash;  
        bytes32 criteriaHash;   
        uint64 timestamp;
        uint8 trustScore;
        bool anomalyFlagged;
    }

    mapping(uint256 => OrganEvent[]) public organHistory;
    mapping(uint256 => AllocationRecord) public allocations;
    
    // AMENDMENT 2: O(1) State Tracking to prevent expensive array lookups
    mapping(uint256 => OrganStatus) public currentStatus;
    mapping(uint256 => bool) public organExists;

    uint256[] public allOrganIds;
    uint256 public totalOrgans; // Allows for future pagination

    uint8 public flagThreshold = 60;

    function setThreshold(uint8 _newThreshold) public onlyAdmin {
        flagThreshold = _newThreshold;
    }

    event OrganListed(uint256 organId, uint256 timestamp);
    event OrganAllocated(uint256 organId, uint8 trustScore, bool flagged);
    event AnomalyDetected(uint256 organId, uint8 trustScore, uint256 timestamp);
    event TransplantComplete(uint256 organId, uint256 timestamp);

    function listOrgan(uint256 organId, bytes32 dataHash) public onlyHospital {
        require(!organExists[organId], "OrganChain: Organ ID already exists");

        organExists[organId] = true;
        currentStatus[organId] = OrganStatus.Listed;
        
        allOrganIds.push(organId);
        totalOrgans++;

        organHistory[organId].push(OrganEvent({
            organId: organId,
            dataHash: dataHash,
            timestamp: uint64(block.timestamp),
            recordedBy: msg.sender,
            status: OrganStatus.Listed,
            trustScore: 100,
            anomalyFlagged: false
        }));
        
        emit OrganListed(organId, block.timestamp);
    }

    function recordAllocation(
        uint256 organId,
        bytes32 recipientHash,
        bytes32 criteriaHash,
        uint8 trustScore
    ) public onlyRegulator {
        require(organExists[organId], "OrganChain: Organ does not exist");
        require(currentStatus[organId] == OrganStatus.Listed, "OrganChain: Organ must be Listed first");

        bool flagged = trustScore < flagThreshold;
        OrganStatus newStatus = flagged ? OrganStatus.Flagged : OrganStatus.Matched;
        
        // Update fast-lookup state
        currentStatus[organId] = newStatus;
        
        allocations[organId] = AllocationRecord({
            organId: organId,
            recipientHash: recipientHash,
            criteriaHash: criteriaHash,
            timestamp: uint64(block.timestamp),
            trustScore: trustScore,
            anomalyFlagged: flagged
        });
        
        organHistory[organId].push(OrganEvent({
            organId: organId,
            dataHash: criteriaHash,
            timestamp: uint64(block.timestamp),
            recordedBy: msg.sender,
            status: newStatus,
            trustScore: trustScore,
            anomalyFlagged: flagged
        }));
        
        emit OrganAllocated(organId, trustScore, flagged);
        if (flagged) emit AnomalyDetected(organId, trustScore, block.timestamp);
    }

    function recordDispatch(uint256 organId, bytes32 locationHash) public onlyHospital {
        require(organExists[organId], "OrganChain: Organ does not exist");
        require(currentStatus[organId] == OrganStatus.Matched || currentStatus[organId] == OrganStatus.Flagged, "OrganChain: Organ not matched yet");

        currentStatus[organId] = OrganStatus.InTransit;

        organHistory[organId].push(OrganEvent({
            organId: organId,
            dataHash: locationHash,
            timestamp: uint64(block.timestamp),
            recordedBy: msg.sender,
            status: OrganStatus.InTransit,
            trustScore: 100,
            anomalyFlagged: false
        }));
    }

    function recordTransplant(uint256 organId, bytes32 outcomeHash) public onlyHospital {
        require(organExists[organId], "OrganChain: Organ does not exist");
        require(currentStatus[organId] == OrganStatus.InTransit, "OrganChain: Organ is not in transit");

        currentStatus[organId] = OrganStatus.Transplanted;

        organHistory[organId].push(OrganEvent({
            organId: organId,
            dataHash: outcomeHash,
            timestamp: uint64(block.timestamp),
            recordedBy: msg.sender,
            status: OrganStatus.Transplanted,
            trustScore: 100,
            anomalyFlagged: false
        }));
        
        emit TransplantComplete(organId, block.timestamp);
    }

    function getOrganHistory(uint256 organId) public view returns (OrganEvent[] memory) {
        return organHistory[organId];
    }

    function getAllocation(uint256 organId) public view returns (AllocationRecord memory) {
        return allocations[organId];
    }

    function getAllOrganIds() public view returns (uint256[] memory) {
        return allOrganIds;
    }
}