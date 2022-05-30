const { assert } = require('console')
const { Item } = require('react-bootstrap/lib/Breadcrumb')
const { default: Web3 } = require('web3')

const Tether = artifacts.require('Tether')
const RWD =artifacts.require('RWD')
const DecentralisedBank = artifacts.require('DecentralisedBank')

require('chai')
.use.require('chai-as-promised')
.should()

constract ('DecentraliesdBank', ([owner, customer]) => {
    let tether, rwd

    function token(number){
        return Web3.utils.toWei(number, 'ether')
    }

    before(async () => {
        tether = await Tether.new()
        rwd = await RWD.new()
        decentralisedBank = await DecentralisedBank.new()

        //Tranefer all token to Decentralied Bank (1 million)
        await rwd.transfer(decentralisedBank.addess, token('100000'))

        //Transfer 100 mock Tether Token 
        await tether.transfer(customer, token('100'), {from: owner})
    })
    describe('Mock Tether Development', async () => {
        it('match name successfully', async () => {
        // let tether = await Tether.new()
            const name = await tether.name()
            assert.equal(name, 'Mock Tether Token')
        })
    })

    describe('Reward Token Development', async () => {
        it('Match name successfully', async () => {
         // let rwd = await RWD.new()
            const name = await rwd.name()
            assert.equal(name, 'Reward Tokken')
        })
    })

})