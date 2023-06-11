const HDWalletProvider = require("truffle-hdwallet-provider")
const Web3 = require('web3')
const { interface, bytecode } = require("./compile")

const provider = new HDWalletProvider(
    "adjust mass upon possible empower program category reject tag lake divert wife",
    "https://goerli.infura.io/v3/e2b861bb8cb944ba83297b18fa1e9153"
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Trying to deploy from", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ["Darshan"] })
        .send({ gas: '1000000', from: accounts[0] })

    console.log("contract deployed to", result.options.address)
    provider.engine.stop();
};
deploy()