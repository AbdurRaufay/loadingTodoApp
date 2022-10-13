import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { editTodo, Button_loadding } from "../redux/actions/todoaction";
import ButtonLoader from "./ButtonLoader";
const ModalComp = ({ task }) => {
  const btn_loading = useSelector((state) => state.todoReducers.button_loading);

  const [editNewTodo, seteditNewTodo] = useState({
    id: "",
    title: "",
    description: "",
  });
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    seteditNewTodo(task);
    setShow(true);
  };
  const handleSubmit = (editNewTodo) => {
    return new Promise((resolve) => {
      setLoad(true);
      dispatch(Button_loadding(true));
      setTimeout(() => {
        dispatch(Button_loadding(false));
        setLoad(false);
        setShow(false);
      }, 1000);
      dispatch(editTodo(editNewTodo));
      resolve();
    });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              return e.preventDefault(), handleSubmit(editNewTodo);
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editNewTodo.title}
                required="true"
                onChange={(e) => {
                  seteditNewTodo({
                    ...editNewTodo,
                    title: e.target.value,
                  });
                }}
                placeholder="Enter Title"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                required="true"
                value={editNewTodo.description}
                onChange={(e) => {
                  seteditNewTodo({
                    ...editNewTodo,
                    description: e.target.value,
                  });
                }}
                placeholder="Description"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {load ? <ButtonLoader /> : "save"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalComp;
