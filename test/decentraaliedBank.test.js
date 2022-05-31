const { assert } = require('console')
const { cpuUsage } = require('process')

const Tether = artifacts.require('Tether')
const RWD =artifacts.require('RWD')
const DecentralisedBank = artifacts.require('DecentralisedBank')

require('chai')
.use.require('chai-as-promised')
.should()

constract ('DecentraliesdBank', ([owner, customer]) => {
    let tether, rwd, decentralisedBank

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

    describe('Decentralised Bank Development', async () => {
        it('Match name successfully', async () => {
            const name = decentralisedBank.name()
            assert.equal(name, 'DecentralisedBank')
        })

        it('It has a Token', async () => {
            let balance = await rwd.balanceOf(decentralisedBank.address)
            assert.equal(balance, token('1000000'))
        })
    })

    describe("Yield Farming", async () => {
        it("Rewart for staking", async() => {
            let result
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), token("100"))

            // Checking the balance of 100 token
            await tether.approve(decentralisedBank.address, token("100"), {from: customer})
            await decentralisedBank.depositToken(token("100"), {from: customer})

            // Check Updated balance of the customer
            result = await  tether.balanceOf(customer)
            assert.equal(result.toString(), token("0"), "Customer Mock tether balance")
            
            // Update the balance of decentralised bank
            result = await tether.balanceOf(decentralisedBank.address)
            assert.equal(result.toString(), token("100"), "decentalised mock tether after staking")
            
            // Is staking Balance
            result = await decentralisedBank.isStaking(customer)
            assert.equal(result.toString(), "true", "Customer is staking status to be true")

            //Issue token
            await decentralisedBank.issueTokens({from: owner})

            //Ensure only owner can call this
            await decentralisedBank.issueTokens({from: customer}).should.be.rejected;

            // Ustake Token
            await decentralisedBank.unStakeToken({from: customer})

            //Check Unstaking balance
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), token("0"),"Check ustaking balance")

            //check updated balance of the decentralised bank
            result = await tether.balanceOf(decentralisedBank.address)
            assert.equal(result.toString(), token("100"), "decentralised mock tether balance after untaking")

            // Isstaking update
            result = await decentralisedBank.isStaking(customer)
            assert.equal(result.toString(), "false", "Customer is no longer Staking after staking status set to be false" )
        })
    })

})