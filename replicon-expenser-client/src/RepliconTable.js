import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import ReceiptModal from "./ReceiptModal";

const headers = [
  { id: "date", label: "Date Incurred", minWidth: 100 },
  { id: "expenseType", label: "Expense Type", minWidth: 100 },
  {
    id: "purpose",
    label: "Purpose",
    minWidth: 100
  },
  {
    id: "place",
    label: "Place",
    minWidth: 100
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 100,
    format: value => value.toFixed(2)
  },
  {
    id: "receipt",
    label: "Receipt Files",
    minWidth: 100
  }
];

function createData(date, expenseType, purpose, place, amount, receipt) {
  return { date, expenseType, purpose, place, amount, receipt };
}

const rows = [
  createData(
    "2019-09-03",
    "Travel",
    "Training",
    "Southwest Airlines",
    89.75,
    "2019-09-03_Travel_Training_Southwest Airlines_89.75.png"
  ),
  createData(
    "2019-09-03",
    "Meal",
    "Training",
    "Chipotle",
    11.54,
    "2019-09-03_Meal_Training_Chipotle_11.54.png"
  )
];

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  tableWrapper: {
    maxHeight: 407,
    overflow: "auto"
  }
});

export default function RepliconTable() {
  const [fileNames, setFileNames] = useState([]);

  const callBackFromTable = files => {
    const names = files.map(files => files.name.split("_"));
    setFileNames(names);
    //var data = names.split("_")
  };

  //const data = fileNames.split("_");
  //console.log(data)

  console.log("File Names: ", fileNames);
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  function handleRemove(x) {
    alert(`Remove, ${x}`);
  }

  function handleEdit(x) {
    alert(`Edit, ${x}`);
  }

  return (
    <Paper className={classes.root}>
      <Table classname={classes.table}>
        <TableHead>
          <TableRow>
            {headers.map(column => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {headers.map(column => {
                    const value = row[column.id];
                    // alert(row.id);
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                  <button
                    className="button muted-button"
                    onClick={() => handleEdit(row.code)}
                  >
                    Edit
                  </button>
                  <button
                    className="button muted-button"
                    onClick={() => handleRemove(row.code)}
                  >
                    Delete
                  </button>
                </TableRow>
              );
            })}
        </TableBody>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "previous page"
          }}
          nextIconButtonProps={{
            "aria-label": "next page"
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Table>
      <ReceiptModal callBackFromTable={callBackFromTable} />
    </Paper>
  );
}
