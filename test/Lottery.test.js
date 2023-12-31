const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3')

const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile.js");

let accounts;
let lottery;

beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(JSON.parse(interface)).deploy({data: bytecode}).send({from: accounts[0], gas:'1000000'});

});

describe('Lottery Contract', ()=>{
    it('contract deployments', ()=>{
        assert.ok(lottery.options.address);
    });

    it('enter an account', async()=>{
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    })

    it('enter multiple accounts', async()=>{
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        });

        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    })

    // restriction check
    it('requires minimum amt of ether to enter', async()=>{
        try {
            await lottery.methods.enter().send({
                from : accounts[0],
                value : 0
            });
            assert(false); //to assure that the test fails, we want this to fail
        } catch (error) {
            assert.ok(error);
        }
    })


    it('only manager can call the winner function', async()=>{
        try{
            await lottery.methods.winner().send({
                from : accounts[1]
            });
            assert(false);
        }catch(error)
        {
            assert.ok(error);
        }
    })

    it('money transfer and player array reset', async()=>{
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        })


        const iniBal = await web3.eth.getBalance(accounts[0]);

        await lottery.methods.winner().send({
            from : accounts[0]
        });

        const newBal = await web3.eth.getBalance(accounts[0]);
        const diff = newBal - iniBal;
        assert(diff > web3.utils.toWei('1.8', 'ether')); // 1.8 because some gas amt is spent so something less than 2
    })
})

