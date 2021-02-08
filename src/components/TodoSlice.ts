import { ActionCreatorWithoutPayload, createSlice } from "@reduxjs/toolkit";

export const TodoSlice = createSlice({
  name: 'TodoSlice',
  initialState: {
    todos: {
      isLoading: false,
      success: false,
      error: false,
      data: []
    },
    todo: {
      isLoading: false,
      success: false,
      error: false,
      data: {}
    }
  },
  reducers: {
    todosSuccess: (state, action) => {
      state.todos = {
        ...state,
        isLoading: false,
        success: true,
        error: false,
        data: action.payload
      };
    },
    todosRequest: (state) => {
      state.todos = {
        ...state,
        isLoading: true,
        success: false,
        error: false
      };
    },
    todosError: (state) => {
      state.todos = {
        ...state,
        isLoading: false,
        success: false,
        error: true
      };
    }
  }
});
export const {
  todosSuccess, todosRequest, todosError
} = TodoSlice.actions;

export const fetchTodos = () => (dispatch: (arg0: ActionCreatorWithoutPayload<string>) => void) => {
  dispatch(todosRequest);
};

export default TodoSlice.reducer;
