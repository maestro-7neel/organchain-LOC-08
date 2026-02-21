// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract OrganChain {

    enum OrganStatus { 
        Listed,       // 0 - organ available
        Matched,      // 1 - recipient found
        InTransit,    // 2 - being transported
        Transplanted, // 3 - surgery complete
        Flagged       // 4 - suspicious, under review
    }

    struct OrganEvent {
        uint256 organId;
        bytes32 dataHash;       // hashed patient/organ data
        OrganStatus status;
        uint8 trustScore;       // 0-100
        uint256 timestamp;
        address recordedBy;     // who submitted this event
        bool anomalyFlagged;
    }

    struct AllocationRecord {
        uint256 organId;
        bytes32 recipientHash;  // hashed recipient ID
        bytes32 criteriaHash;   // hashed matching criteria
        uint8 trustScore;
        bool anomalyFlagged;
        uint256 timestamp;
    }

    // organ ID → list of all events for that organ
    mapping(uint256 => OrganEvent[]) public organHistory;
    
    // organ ID → allocation details
    mapping(uint256 => AllocationRecord) public allocations;
    
    // list of all organ IDs ever registered
    uint256[] public allOrganIds;

    // events — frontend listens to these in real time
    event OrganListed(uint256 organId, uint256 timestamp);
    event OrganAllocated(uint256 organId, uint8 trustScore, bool flagged);
    event AnomalyDetected(uint256 organId, uint8 trustScore, uint256 timestamp);
    event TransplantComplete(uint256 organId, uint256 timestamp);

    function listOrgan(uint256 organId, bytes32 dataHash) public {
        allOrganIds.push(organId);
        organHistory[organId].push(OrganEvent({
            organId: organId,
            dataHash: dataHash,
            status: OrganStatus.Listed,
            trustScore: 100,
            timestamp: block.timestamp,
            recordedBy: msg.sender,
            anomalyFlagged: false
        }));
        emit OrganListed(organId, block.timestamp);
    }

    function recordAllocation(
        uint256 organId,
        bytes32 recipientHash,
        bytes32 criteriaHash,
        uint8 trustScore
    ) public {
        bool flagged = trustScore < 60;
        allocations[organId] = AllocationRecord({
            organId: organId,
            recipientHash: recipientHash,
            criteriaHash: criteriaHash,
            trustScore: trustScore,
            anomalyFlagged: flagged,
            timestamp: block.timestamp
        });
        organHistory[organId].push(OrganEvent({
            organId: organId,
            dataHash: criteriaHash,
            status: flagged ? OrganStatus.Flagged : OrganStatus.Matched,
            trustScore: trustScore,
            timestamp: block.timestamp,
            recordedBy: msg.sender,
            anomalyFlagged: flagged
        }));
        emit OrganAllocated(organId, trustScore, flagged);
        if (flagged) emit AnomalyDetected(organId, trustScore, block.timestamp);
    }

    function recordDispatch(uint256 organId, bytes32 locationHash) public {
        organHistory[organId].push(OrganEvent({
            organId: organId,
            dataHash: locationHash,
            status: OrganStatus.InTransit,
            trustScore: 100,
            timestamp: block.timestamp,
            recordedBy: msg.sender,
            anomalyFlagged: false
        }));
    }

    function recordTransplant(uint256 organId, bytes32 outcomeHash) public {
        organHistory[organId].push(OrganEvent({
            organId: organId,
            dataHash: outcomeHash,
            status: OrganStatus.Transplanted,
            trustScore: 100,
            timestamp: block.timestamp,
            recordedBy: msg.sender,
            anomalyFlagged: false
        }));
        emit TransplantComplete(organId, block.timestamp);
    }

    function getOrganHistory(uint256 organId)
        public view returns (OrganEvent[] memory) {
        return organHistory[organId];
    }

    function getAllocation(uint256 organId)
        public view returns (AllocationRecord memory) {
        return allocations[organId];
    }

    function getAllOrganIds() 
        public view returns (uint256[] memory) {
        return allOrganIds;
    }
}