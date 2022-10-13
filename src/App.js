import React, { useState, useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Button_loadding,
  getTodos,
  Loading,
  deleteTodo,
  editTodo,
} from "../src/redux/actions/todoaction";
import Form from "./Components/Form";
import Loader from "./Components/Loader";
import ButtonLoader from "./Components/ButtonLoader";
import ModalComp from "./Components/ModalComp";

const App = () => {
  const [editNewTodo, seteditNewTodo] = useState({
    id: "",
    title: "",
    description: "",
  });

  const list = useSelector((state) => state.todoReducers.todos);

  const loading = useSelector((state) => state.todoReducers.loading);

  const btn_loading = useSelector((state) => state.todoReducers.button_loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
    if (list.length === 0) {
      dispatch(Loading(true));
    } else {
      dispatch(Loading(false));
    }
  }, [dispatch]);

  return (
    <div className="main-wrapper">
      <div className="container  mt-5">
        <Form />
        {loading ? (
          <div
            class="spinner-border"
            role="status"
            style={{
              marginLeft: 300,
              marginTop: 30,
              marginBottom: 30,
              padding: 40,
            }}
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          // <Loader />
          <div className="table-div">
            <table className="table text-center m-5 tab">
              <thead>
                <tr>
                  <th scope="col">title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              {list.map((task) => {
                return (
                  <tbody key={task.id}>
                    <tr>
                      <td>{task.title}</td>
                      <td>{task.description}</td>

                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={(e) => {
                            return (
                              e.preventDefault(), dispatch(deleteTodo(task.id))
                            );
                          }}
                        >
                          Delete
                        </button>
                        {/* <button
                        type="button"
                        className="btn btn-sm btn-primary mx-1"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => {
                          seteditNewTodo(task);
                        }}
                        >
                          Edit
                        </button> */}
                        {/* <button> */}
                        <ModalComp task={task} />
                        {/* </button> */}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

//////////////
{
  /* <div
  className="modal fade "
  id="exampleModal"
  tabIndex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog ">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">
          Update Todo
        </h1>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(Button_loadding(true));
          dispatch(editTodo(editNewTodo));
          dispatch(Button_loadding(false));
        }}
      >
        <div className="modal-body">
          <label>Title</label>
          <input
            type="text "
            className="form-control inp"
            value={editNewTodo.title}
            onChange={(e) => {
              seteditNewTodo({
                ...editNewTodo,
                title: e.target.value,
              });
            }}
            required
          />
          <br />
          <label>Description</label>
          <input
            type="text "
            className="form-control inp"
            value={editNewTodo.description}
            onChange={(e) => {
              seteditNewTodo({
                ...editNewTodo,
                description: e.target.value,
              });
            }}
            required
          />
          <br />
          <br />
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="submit"
            className="btn btn-sm btn-success"
            data-bs-dismiss="modal"
          >
            {btn_loading ? <ButtonLoader /> : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>; */
}
