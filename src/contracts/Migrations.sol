// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract Migrations {
    address public owner;
    uint256 public last_completed_migration;

    constructor() {
        owner = msg.sender;
    }

    modifier restricted() {
        if (msg.sender == owner) {
            _;
        }
    }

    function setCompleted(uint256 complete) public restricted {
        last_completed_migration = complete;
    }

    function update(address new_address) public restricted {
        Migrations updaated = Migrations(new_address);
        updaated.setCompleted(last_completed_migration);
    }
}
