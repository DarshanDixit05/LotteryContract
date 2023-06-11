const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3')

const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile")

// class Car {
//     park() {
//         return "stopped";
//     }
//     drive() {
//         return "vroom";
//     }
// }

let accounts;
let inbox;

beforeEach(async () => {
    //Get a list of all acounts and 
    accounts = await web3.eth.getAccounts()
    // web3.eth.getAccounts()
    //     .then(fetchedAccounts => {
    //         console.log(fetchedAccounts)
    //     })


    // use one of them to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hii Darshan'] })
        .send({ from: accounts[0], gas: '1000000' })

});

describe('Inbox', () => {
    it("It deploys a contract", () => [
        assert.ok(inbox.options.address)
    ])
    it("has a default message", async () => {
        const message = await inbox.methods.message().call();
        console.log(message);
    })
    it("Change the message", async () => {
        await inbox.methods.setMessage("wave").send({ from: accounts[0], gas: '1000000' })
        const message = await inbox.methods.message().call();
        console.log(message);
    })
})


// let car;
// beforeEach(() => {
//     car = new Car();
// })

// describe('Car', () => {
//     it('can park?', () => {
//         assert.equal(car.park(), 'stopped');
//     })

//     it('can drive?', () => {
//         assert.equal(car.drive(), 'vroom');
//     })


// })
// describe('Car', () => {
//     it('can park?', () => {
//         const car = new Car();
//         assert.equal(car.park(), 'stopped');
//     })

//     it('can drive?', () => {
//         const car = new Car();
//         assert.equal(car.drive(), 'vroom');
//     })


// })