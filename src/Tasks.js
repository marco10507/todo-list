import uuid from "react-uuid";
import moment from "moment";

export default function Tasks() {
  return [
    {
      subject: "Clean the kitchen",
      id: uuid(),
      completed: false,
      dueDate: moment().add(-1, "days")
    },
    {
      subject: "Walk the rat",
      id: uuid(),
      completed: false,
      dueDate: moment()
    },
    {
      subject: "Call the rat",
      id: uuid(),
      completed: false,
      dueDate: moment()
    },
    {
      subject: "Do laundry",
      id: uuid(),
      completed: false,
      dueDate: moment().add(1, "days")
    },
    {
      subject: "Water plants",
      id: uuid(),
      completed: false,
      dueDate: moment().add(1, "weeks")
    }
  ];
}
