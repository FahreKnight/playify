import './App.css';
import React from 'react';
import 'antd/dist/antd.css';
import Navi from './components/Dashboard/Navi';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <h1 className="App-header">
        <Navi/>
      </h1>

      <div>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
