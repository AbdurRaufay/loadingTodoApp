import {
  ADD_TODO,
  BUTTON_LOADING,
  DELETE_TODO,
  EDIT_TODO,
  GET_TODOS,
  LOADING,
} from "../actions/actionTypes";

export const initialState = {
  loading: true,
  todos: [],
  button_loading: false,
};

const todoReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        button_loading: true,
        ...state,
        todos: [...state.todos, action.payload],
        button_loading: false,
      };

    case DELETE_TODO:
      const newTodo = state.todos.filter((task) => task.id !== action.payload);
      return {
        ...state,
        todos: newTodo,
      };
    case EDIT_TODO:
      const updatedTodos = state.todos.map((task) => {
        if (task.id === action.updatedDoc.id) {
          return {
            button_loading: true,
            ...task,
            title: action.updatedDoc.title,
            description: action.updatedDoc.description,
            button_loading: false,
          };
        }
        return task;
      });
      return {
        button_loading: true,
        ...state,
        todos: updatedTodos,
        button_loading: false,
      };

    case GET_TODOS:
      return {
        loading: true,
        ...state,
        todos: action.payload,
        loading: false,
      };

    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case BUTTON_LOADING: {
      return {
        ...state,
        button_loading: action.payload,
      };
    }

    default:
      return state;
  }
};

export default todoReducers;
