// SPDX-License-Identifier:MIT

pragma solidity >=0.4.0 <0.9.0;

import "./RWD.sol";
import "./Tether.sol";

contract DecentralisedBank {
    string public name = "Decentralised Bank";
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStake;
    mapping(address => bool) public isStake;

    constructor(RWD _rwd, Tether _tether) {
        tether = _tether;
        rwd = _rwd;
        owner = msg.sender;
    }

    // To deposit tokens
    function depositToken(uint256 _amount) public {
        // Require staking amount gratter than zero
        require(_amount > 0, "should be greater than 0");

        //traner tether to this acccount for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        // Update staking address
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if (!hasStake[msg.sender]) {
            stakers.push(msg.sender);
        }

        //Update staking balance
        isStake[msg.sender] = true;
        hasStake[msg.sender] = true;
    }

    // Issuing rewards
    function issueRewards() public {
        // Requirethe owner only to issue reward
        require(msg.sender == owner, "Caller must be owner");

        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient] / 9;
            if (balance > 0) {
                rwd.transfer(recipient, balance);
            }
        }
    }

    function unstake() public {
        uint256 balance = stakingBalance[msg.sender];
        // required balance should not be less than zero
        require(balance > 0, "staking balance cannoot be less than zero");

        // transfer balance to caller
        tether.tranfer(msg.sender, balance);

        //reset staking balance
        isStake[msg.sender] = false;
    }
}
