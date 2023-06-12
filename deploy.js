const HDWalletProvider = require("truffle-hdwallet-provider")
const Web3 = require('web3')
const { interface, bytecode } = require("./compile")

const provider = new HDWalletProvider(
    "boss tumble network vacant siren battle ladder urge sure style claw police",
    "https://goerli.infura.io/v3/84b2dcc58d894550827534824d3e4d93"
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Trying to deploy from", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode})
        .send({ gas: '1000000', from: accounts[0] })

    console.log(interface);
    console.log("contract deployed to", result.options.address)
    provider.engine.stop();
};
deploy()