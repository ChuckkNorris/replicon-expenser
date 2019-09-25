import React from "react";
import "./App.css";
import RepliconTable from "./RepliconTable";
import RepliconForm from "./RepliconForm";



const App = () => {

  const createExpenseReport = () => {};

  return (
    <div className="App">
      <form onSubmit={createExpenseReport}> </form>
      <RepliconForm />
      <RepliconTable />
    </div>
  );
}

export default App;
