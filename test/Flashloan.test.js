const { assert } = require('chai');

const Web3 = require('web3')
const truffleAssert = require('truffle-assertions')
const BN = require('bn.js');
const Flashloan = artifacts.require('./Flashloan.sol')

require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bn')(BN))
    .should();


    contract('Flashloan', (accounts) => {
        let contract
        const erc20ABI = require('../build/contracts/ERC20.json').abi;
        let asset = "0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108" // import later *IMPORTANT* have more than 1 in your wallet!
        let erc20Contract
    
        before(async() => {
            contract = await Flashloan.deployed()
            if (process.env.NETWORK !== 'development') {
                erc20Contract = await new web3.eth.Contract(
                    erc20ABI,
                    asset
                );
                await erc20Contract.methods.transfer(contract.address, web3.utils.toHex(1*(1e18))).send({from: accounts[0]}); //send 1 of that asset to contract to pay for loan fee
            }
        })
    
        describe('Deployment', async () => {
            it('deployed succesfully', async () => {
                const address = contract.address
                assert.notEqual(address, 0x0)
                assert.notEqual(address, '')
                assert.notEqual(address, null)
                assert.notEqual(address, undefined)
            })
        })

        describe('Flashloan', async () => {
            it('can get a correct asset flashloan', async () => {
                if (process.env.NETWORK !== 'development') {
                    const loan = await contract.flashloan(asset)
                    assert.isNotNull(loan)
                    assert.notEqual(loan, undefined)
                    let args = loan.logs[0].args;
                    assert.equal(args._from, accounts[0])
                    assert.equal(args._reserve, asset)
                }
            })
        })
    });