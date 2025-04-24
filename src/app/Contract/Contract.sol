// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

contract CrowdFund {
    struct Campaign {
        address payable creator;
        string title;
        string description;
        uint goal;
        uint deadline;
        uint raisedAmount;
        bool withdrawn;
    }

    uint public campaignCount;
    mapping(uint => Campaign) public campaigns;
    mapping(uint => mapping(address => uint)) public donations;

    event CampaignCreated(uint id, address creator, string title, uint goal, uint deadline);
    event DonationReceived(uint id, address donor, uint amount);
    event FundsWithdrawn(uint id, address creator, uint amount);

    modifier onlyCreator(uint _id) {
        require(campaigns[_id].creator == msg.sender, "Not campaign owner");
        _;
    }

    modifier campaignExists(uint _id) {
        require(_id <= campaignCount && _id > 0, "Campaign does not exist");
        _;
    }

    function createCampaign(
        string memory _title,
        string memory _description,
        uint _goal,
        uint _durationInDays
    ) external {
        require(_goal > 0, "Goal must be greater than 0");
        require(_durationInDays > 0, "Duration must be positive");

        campaignCount++;
        campaigns[campaignCount] = Campaign({
            creator: payable(msg.sender),
            title: _title,
            description: _description,
            goal: _goal,
            deadline: block.timestamp + (_durationInDays * 1 days),
            raisedAmount: 0,
            withdrawn: false
        });

        emit CampaignCreated(campaignCount, msg.sender, _title, _goal, campaigns[campaignCount].deadline);
    }

    function donateToCampaign(uint _id, uint _amount) external payable campaignExists(_id) {
        require(msg.value > 0, "Must send some ETH");
        Campaign storage campaign = campaigns[_id];
        require(block.timestamp < campaign.deadline, "Campaign expired");
        require(msg.value > _amount, "invalid amount");
        campaign.raisedAmount += _amount;
        donations[_id][msg.sender] += _amount;
        if (msg.value > _amount) { payable(msg.sender).transfer(msg.value - _amount); }
        emit DonationReceived(_id, msg.sender, _amount);
    }

    function withdrawFunds(uint _id) external campaignExists(_id) onlyCreator(_id) {
        Campaign storage campaign = campaigns[_id];
        require(block.timestamp >= campaign.deadline || campaign.raisedAmount >= campaign.goal, "Cannot withdraw yet");
        require(!campaign.withdrawn, "Already withdrawn");

        campaign.withdrawn = true;
        campaign.creator.transfer(campaign.raisedAmount);

        emit FundsWithdrawn(_id, msg.sender, campaign.raisedAmount);
    }

}