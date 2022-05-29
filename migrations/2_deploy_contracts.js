const RWD = artifacts.require('RWD')
const Tether = artifacts.require('Tether')
const DecentralizedApp = artifacts.require('DecentraliedApp')

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(Tether);
    const tether = await Tether.deployed()

    await deployer.deploy(RWD)
    const rwd = await RWD.deployed()

    await deployer.deploy(DecentralizedApp, rwd.address, tether.address)
    const decentarlizedApp = await DecentralizedApp.deployed()

    await rwd.transfer(decentarlizedApp.address, '1000000000000000000000000')

    await tether.transfer(accounts[1], '100000000000000000000')
} 