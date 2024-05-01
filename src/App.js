import "./styles.css";

import { useReducer, useState } from "react";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

const intialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "delete":
      return state.filter((item, i) => i !== action.payload);
    default:
      return state;
  }
};

export default function App() {
  const [val, setVal] = useState("");
  const [state, dispach] = useReducer(reducer, intialState);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!val) {
      toast("Input Feild Is Requred !");
      return;
    }
    dispach({ type: "add", payload: val });
    setVal("");
  };

  const deletHandler = (index) => {
    dispach({ type: "delete", payload: index });
  };

  return (
    <div className="App">
      <h1>Welcome To Todo App !!</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={val}
          placeholder="Enter here..."
          onChange={(e) => setVal(e.target.value)}
        />
        <button type="sumbit" className="btn">
          ADD
        </button>
      </form>
      <ul>
        {state.map((item, i) => (
          <li key={i}>
            {item}
            <MdDelete onClick={() => deletHandler(i)} className="val" />
          </li>
        ))}
      </ul>
      <Toaster />
    </div>
  );
}
