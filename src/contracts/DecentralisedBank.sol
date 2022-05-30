// SPDX-License-Identifier:MIT

pragma solidity >=0.4.0 <0.9.0;

import "./RWD.sol";
import "./Tether.sol";

contract DecentralisedBank {
    string public name = "Decentralised Bank";
    address public owner;
    Tether public tether;
    RWD public rwd;

    constructor(RWD _rwd, Tether _tether) {
        tether = _tether;
        rwd = _rwd;
    }
}
