// SPDX-License-Identifier:MIT

pragma solidity >=0.4.0 <0.9.0;

contract Tether {
    string public name = "Tether";
    string public symbol = "USDT";
    uint256 public supply = 1000000000000000000000000;
    uint8 public decimal = 18;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceof;

    mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        balanceof[msg.sender] = supply;
    }

    function tranfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        // Check if balanceOf is equal or greater than _value
        require(balanceof[msg.sender] >= _value);
        // transfer the amount and subtract the balance
        balanceof[msg.sender] -= _value;
        // add the balance
        balanceof[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(_value <= balanceof[_from]);
        require(_value <= allowance[_from][msg.sender]);
        // add balance for transfrFrom
        balanceof[_to] += _value;
        // subract balance from transferFrom
        balanceof[_from] -= _value;
        allowance[msg.sender][_from] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
}
