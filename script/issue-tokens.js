const { callbackify } = require("util")

const decentralisedBank =  artifacts.require("decentralisedBank")

module.exports = async function issueReward(callback) {
    let decentralisedBank = await DecentralisedBank.deployed();
    await decentralisedBank.issueReward();
    console.log("Token has been issue successfully");
    callback();
}