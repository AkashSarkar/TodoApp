import { axiosInstance } from './../config';
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
    },
    createTodo: {
      isLoading: false,
      success: false,
      error: false
    },
    errorMsg: {
      code: ''
    }
  },
  reducers: {
    todosSuccess: (state, action) => {
      state.todos = {
        ...state.todos,
        isLoading: false,
        success: true,
        error: false,
        data: action.payload
      };
    },
    todosRequest: (state) => {
      state.todos = {
        ...state.todos,
        isLoading: true,
        success: false,
        error: false
      };
    },
    todosError: (state) => {
      state.todos = {
        ...state.todos,
        isLoading: false,
        success: false,
        error: true
      };
    },
    todoSuccess: (state, action) => {
      state.todo = {
        ...state.todo,
        isLoading: false,
        success: true,
        error: false,
        data: action.payload
      };
    },
    todoRequest: (state) => {
      state.todo = {
        ...state.todo,
        isLoading: true,
        success: false,
        error: false
      };
    },
    todoError: (state) => {
      state.todo = {
        ...state.todo,
        isLoading: false,
        success: false,
        error: true
      };
    },
    createTodoSuccess: (state) => {
      state.createTodo = {
        ...state.createTodo,
        isLoading: false,
        success: true,
        error: false
      };
    },
    createTodoRequest: (state) => {
      state.createTodo = {
        ...state.createTodo,
        isLoading: true,
        success: false,
        error: false
      };
    },
    createTodoError: (state) => {
      state.createTodo = {
        ...state.createTodo,
        isLoading: false,
        success: false,
        error: true
      };
    },
    clearCreateTodo: (state) => {
      state.createTodo = {
        ...state.createTodo,
        isLoading: false,
        success: false,
        error: false
      };
    },
    showError: (state, action) => {
      state.errorMsg = {
        ...state.errorMsg,
        code: action.payload
      };
    }
  }
});
export const {
  todosSuccess, todosRequest, todosError,
  todoRequest, todoSuccess, todoError,
  createTodoRequest, createTodoSuccess, createTodoError, clearCreateTodo,
  showError
} = TodoSlice.actions;

export const fetchTodos = () => (
  dispatch: (arg0: ActionCreatorWithoutPayload<string>) => void
) => {
  dispatch(todosRequest);
  axiosInstance.get('/tasks?page=1&limit=5')
    .then((res) => {
      dispatch(todosSuccess(res.data));
      dispatch(showError(""));
    })
    .catch((e) => {
      dispatch(todosError());
      dispatch(showError(e.response.status));
    });
};
export const fetchTodo = (id: number) => (
  dispatch: (arg0: ActionCreatorWithoutPayload<string>) => void
) => {
  dispatch(todoRequest);
  axiosInstance.get(`/tasks/${id}`)
    .then((res) => {
      dispatch(todoSuccess(res.data));
      dispatch(showError(''));
    })
    .catch((e) => {
      dispatch(todoError());
      dispatch(showError(e.response.status));
    });
};
interface createTodoData {
  title: string,
  description: string,
  deadline: string | null,
  // completed: boolean
}
export const createTodo = (postData: createTodoData) => (
  dispatch: (arg0: ActionCreatorWithoutPayload<string>) => void
) => {
  dispatch(createTodoRequest);
  axiosInstance.post('/tasks', postData)
    .then((res) => {
      dispatch(showError(''));
      dispatch(createTodoSuccess());
      dispatch(fetchTodos());
    }).catch((e) => {
      dispatch(createTodoError());
      dispatch(showError(e.response.status));
    });
};

export const updateTodo = (id: number, postData: createTodoData) => (
  dispatch: (arg0: ActionCreatorWithoutPayload<string>) => void
) => {
  dispatch(createTodoRequest);
  axiosInstance.put(`/tasks/${id}`, postData)
    .then((res) => {
      dispatch(showError(''));
      dispatch(createTodoSuccess());
      dispatch(fetchTodos());
    }).catch((e) => {
      dispatch(createTodoError());
      dispatch(showError(e.response.status));
    });
};

export default TodoSlice.reducer;
