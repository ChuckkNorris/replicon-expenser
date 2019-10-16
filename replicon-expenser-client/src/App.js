import React, { Component } from "react";
import "./App.css";
import EditTable from "./EditTable";

const createExpenseReport = () => { };
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
        <form onSubmit={createExpenseReport}> </form>
        <form
        // onSubmit={createExpenseReport =>
        //   this.setState({
        //     data: [...this.state.data, createExpenseReport]
        //   })
        // }
        ></form>

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
            },
            {
              name: "Actions",
              prop: "action"
            }
          ]}
        />
      </div>
    );
  }
}

export default App;
