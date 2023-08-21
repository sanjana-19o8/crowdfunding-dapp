// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.17;

contract Campaign {
    // Event State
    enum State{
        Fundraising,
        Expired,
        Succesful
    }

    // variables
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