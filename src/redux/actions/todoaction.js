import { db } from "../../../src/firebase_config";

import {
  addDoc,
  collection,
  query,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "@firebase/firestore";
import {
  ADD_TODO,
  BUTTON_LOADING,
  DELETE_TODO,
  EDIT_TODO,
  GET_TODOS,
  LOADING,
} from "./actionTypes";

export const getTodos = () => async (dispatch) => {
  try {
    // const data = await getDocs(collection(db, "firebase-todo"));
    // const todo = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    onSnapshot(collection(db, "firebase-todo"), (snapshot) => {
      const todo = [];
      snapshot.docs.map((doc) => {
        todo.push({ id: doc.id, ...doc.data() });
      });

      dispatch({
        type: GET_TODOS,
        payload: todo,
      });
    });
  } catch (err) {
    console.log(err);
  }
};
export const addTodo = (newData) => async (dispatch) => {
  try {
    await addDoc(collection(db, "firebase-todo"), {
      title: newData.title,
      description: newData.description,
    });

    // dispatch({
    //   type: ADD_TODO,
    //   payload: newData,
    // });
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    const getData = doc(db, "firebase-todo", id);
    await deleteDoc(getData);

    dispatch({
      type: DELETE_TODO,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const editTodo = (updatedDoc) => async (dispatch) => {
  try {
    const userDoc = doc(db, "firebase-todo", updatedDoc.id);
    const newFields = {
      title: updatedDoc.title,
      description: updatedDoc.description,
    };
    await updateDoc(userDoc, newFields);

    // dispatch({
    //   type: EDIT_TODO,
    //   updatedDoc,
    // });
  } catch (err) {
    console.log(err);
  }
};

export function Loading(status) {
  return {
    type: LOADING,
    payload: status,
  };
}

export function Button_loadding(status) {
  return {
    type: BUTTON_LOADING,
    payload: status,
  };
}
