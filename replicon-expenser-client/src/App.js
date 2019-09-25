import React, { Component } from "react";
import "./App.css";
import RepliconTable from "./RepliconTable";
import RepliconForm from "./RepliconForm";
import EditTable from "./EditTable";

// const createExpenseReport = () => {};    MUIZZ

// const createExpenseReport = () =>
//   this.setState({
//     data: [...this.state.data, createExpenseReport]
//   });

class App extends Component {
  state = {
    data: []
  };

  render() {
    // function App() {   MUIZZ
    return (
      <div className="App">
                {/* <form onSubmit={createExpenseReport}> </form> */}
        <form
          onSubmit={createExpenseReport =>
            this.setState({
              data: [...this.state.data, createExpenseReport]
            })
          }
        ></form>
        <RepliconForm />
                 
        {/* <RepliconTable /> */}
         
        <EditTable
          data={this.state.data}
          header={[
            {
              name: "Date Incurred",
              prop: "date"
            },
            {
              name: "Expense Type",
              prop: "expenseType"
            },
            {
              name: "Purpose",
              prop: "purpose"
            },
            {
              name: "Place",
              prop: "place"
            },
            {
              name: "Amount",
              prop: "amount"
            },
            {
              name: "Receipt Files",
              prop: "receipt"
            }
          ]}
        />
      </div>
    );
  }
}

export default App;
