import React from 'react';
import './App.css';
import RepliconTable from './RepliconTable';



const createExpenseReport = () => {

}

function App() {
  return (
    <div className="App">
      <form onSubmit={createExpenseReport}></form>
      <RepliconTable/>
    </div>
  );
}

export default App;
