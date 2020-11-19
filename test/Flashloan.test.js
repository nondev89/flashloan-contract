const { assert } = require('chai');

import { BN } from 'bn.js';
import { Web3 } from 'web3'
import { truffleAssert } from 'truffle-assertions'

const Flashloan = artifacts.require('./Flashloan.sol')

require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bn')(BN))
    .should();


    contract('Flashloan', (accounts) => {
        let contract
    
        before(async() => {
            console.log("TEST")
            contract = await Flashloan.deployed()
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
            it('can get flashloan', async () => {
                const loan = await contract.flashloan("0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108")
                assert.isNotNull(loan)
                assert.notEqual(loan, undefined)
            })
            it('can get flashloan', async () => {
                const loan = await contract.flashloan("0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108")
                truffleAssert.eventEmitted(result, 'Loan', (ev) => {
                    return ev != undefined;
                });
            })
        })
    });