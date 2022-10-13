import React, { useState } from "react";
import { addTodo, Button_loadding } from "../redux/actions/todoaction";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Loader";

const Form = () => {
  const btn_loading = useSelector((state) => state.todoReducers.button_loading);

  const [inputData, setInputData] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(Button_loadding(true));
    dispatch(addTodo(inputData));
    setTimeout(() => {
      dispatch(Button_loadding(false));
    }, 200);
    setInputData({ id: "", title: "", description: "" });
  };

  return (
    <div className="main">
      <h1 className="text-center m-5">
        <h3 className="head">Todo List With Redux + Firebase</h3>
      </h1>
      <div className="wrapper ">
        <div className="form-div">
          <form className="" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  id="validationCustom01"
                  value={inputData.title}
                  onChange={(e) => {
                    setInputData({ ...inputData, title: e.target.value });
                  }}
                  required
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  id="validationCustom02"
                  value={inputData.description}
                  onChange={(e) => {
                    setInputData({ ...inputData, description: e.target.value });
                  }}
                  required
                />
              </div>
            </div>

            <div className="col-md-3 mt-3">
              <button
                className="btn btn-secondary  btn-md text-bg-success "
                type="submit"
              >
                {btn_loading ? <Spinner /> : "ADD Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
