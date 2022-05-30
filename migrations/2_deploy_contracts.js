const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralisedBank = artifacts.require('DentralisedBank');

module.exports = async  function(deployer, accounts, network){
    await deployer.deploy(Tether);
    const tether = await Tether.deployed();

    await deployer.deploy(RWD);
    const rwd = await Tether.deployed();

    await deployer.deploy(DecentralisedBank, rwd.address, tether.address );
    const decentralisedBank = await DecentralisedBank.deployed();

    await rwd.transfer(decentralisedBank, 10000000000000000000000000);

    await tether.transfer(accounts[1], '10000000000000000000')
}