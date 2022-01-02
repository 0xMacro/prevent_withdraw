// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WithdrawContract {

    address public owner;
    uint timeLastWithdrawn;
    mapping(address => uint) withdrawPartnerBalances; // keep track of partners balances

    constructor (address _owner) {
        require(_owner != address(0));
        owner = _owner;
    }

    function withdraw(address partner) public {
        require(partner != address(0));
        uint amountToSend = address(this).balance / 100;
        // perform a call without checking return
        // The recipient can revert, the owner will still get their share
        payable(partner).call{value:amountToSend}("");
        payable(owner).transfer(amountToSend);
        withdrawPartnerBalances[partner] = withdrawPartnerBalances[partner] + amountToSend;
    }

    // allow deposit of funds
    receive() external payable {}

}
