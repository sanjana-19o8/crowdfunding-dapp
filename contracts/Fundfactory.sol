// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.17;

contract Fundfactory {
    struct Campaign {
        address creator;
        string title;
        string organisation;
        string story;
        uint256 target;
        uint256 deadline;
        uint256 collectedAmt;
        string image;
        address[] donators;
        uint256[] donations;
        bool isVerified;
        bool isActive;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public counter;

    constructor() {
        counter = 0;
    }

    function create_campaign(
        string memory name,
        string memory _organisation,
        string memory _story,
        string memory _image,
        uint256 _target,
        uint256 _deadline
    ) public returns (uint256) {
        Campaign storage new_campaign = campaigns[counter];

        require(
            _deadline < block.timestamp,
            "Event deadline should be a time in the future"
        );

        new_campaign.creator = msg.sender;
        new_campaign.title = name;
        new_campaign.organisation = _organisation;
        new_campaign.story = _story;
        new_campaign.target = _target;
        new_campaign.deadline = _deadline;
        new_campaign.collectedAmt = 0;
        new_campaign.image = _image;

        counter++;

        return counter - 1;
    }

    function donate(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage donate_to = campaigns[_id];

        donate_to.donators.push(msg.sender);
        donate_to.donations.push(amount);

        (bool sent, ) = payable(donate_to.creator).call{value: amount}("");

        if (sent) {
            donate_to.collectedAmt = donate_to.collectedAmt + amount;
        }
    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](counter);

        for(uint i = 0; i < counter; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}