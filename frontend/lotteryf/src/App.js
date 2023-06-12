import logo from './logo.svg';
import './App.css';
import lottery from './Lottery.js';
import {useState, useEffect} from 'react';

function App() {
  const [manager, setManager] = useState('');

  useEffect(() => {
    lottery.methods.getManager().call().then((res)=>{
      setManager(res);
    })
  });


  return (
    <div>
      <h1>Lottery Contract</h1>
      <p>Manager : {manager}</p>
    </div>
  );
}

export default App;
