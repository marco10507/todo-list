import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import moment from "moment";

export default function TasksTable({ data, handleUpdateTask }) {
  const columns = [
    {
      dataField: "_id",
      text: "Tasks Id",
      hidden: true,
      editable: false
    },
    {
      dataField: "subject",
      text: "Subject"
    },
    {
      dataField: "dueDate",
      text: "dueDate",
      editor: {
        type: Type.DATE
      },
      formatter: (cell) => {
        return createDate(cell);
      }
    },
    {
      dataField: "actions",
      text: "Actions",
      editable: false
    }
  ];

  function createDate(date) {
    return moment(date).calendar({
      sameDay: "[Today]",
      nextDay: "[Tomorrow]",
      nextWeek: "DD/MM/YYYY",
      lastDay: "[Yesterday]",
      lastWeek: "DD/MM/YYYY",
      sameElse: "DD/MM/YYYY"
    });
  }

  return (
    <BootstrapTable
      keyField="_id"
      data={data}
      columns={columns}
      cellEdit={cellEditFactory({
        mode: "click",
        afterSaveCell: (oldValue, newValue, row, column) => {
          const { _id } = row;
          const task = { _id: _id, [column.dataField]: newValue };
          handleUpdateTask(task, _id);
          console.log(task);
        }
      })}
    />
  );
}
