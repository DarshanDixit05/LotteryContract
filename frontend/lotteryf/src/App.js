import logo from './logo.svg';
import './App.css';
import lottery from './Lottery.js';
import {useState, useEffect} from 'react';
import web3 from './web3.js';

function App() {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('');
  const [ether, setEther] = useState();
  const [message, setMessage]=useState('');
  const [winner, setWinner] = useState('');

  useEffect(() => {
    lottery.methods.getManager().call().then((res)=>{
      setManager(res);
    })

    lottery.methods.getPlayers().call().then((res)=>{
      setPlayers(res);
    })

    web3.eth.getBalance(lottery.options.address).then((res)=>{
      setBalance(res);
    })
  });

  const handleSubmit = async(e) =>{
    e.preventDefault();

    const accounts = await web3.eth.requestAccounts();
    setMessage("Working on transaction success...");
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(ether, 'ether')
    });

    setMessage("Transaction completed successfully!");
  }

  const handleWinner = async(e) =>{
    e.preventDefault();

    const accounts = await web3.eth.requestAccounts();
    setWinner("Picking a winner...");
    await lottery.methods.winner().send({
      from: accounts[0]
    });
    setWinner("A is the winner!");
  }


  return (
    <div>
      <h1>Lottery Contract</h1>
      <p>Manager : {manager}</p>
      <p>Total players : {players.length}</p>
      <p>Total balance : {balance} ether</p>

      <from>
        <h2>Enter ether to enter into the lottery!</h2>
        <input type='number' value={ether} onChange={(e)=>{
          setEther(e.target.value);
        }} />
      </from>
      <button onClick={handleSubmit}>Enter</button>
      <h1>{message}</h1>

      <hr/>

      <h2>Pick a winner?</h2>
      <button onClick={handleWinner}>Pick</button>
      <h1>{winner}</h1>
    </div>
  );
}

export default App;
