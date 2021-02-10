import {
  ActionCreatorWithoutPayload, createSlice
} from "@reduxjs/toolkit";
import { axiosInstance } from './../config';

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
    updateTodo: {
      isLoading: false,
      success: false,
      error: false
    },
    deleteTodo: {
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
        meta: action.payload.meta,
        data: action.payload.items
      };
    },
    todosMoreSuccess: (state, action) => {
      state.todos = {
        ...state.todos,
        isLoading: false,
        success: true,
        error: false,
        meta: action.payload.meta,
        data: [...state.todos.data, ...action.payload.items]
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
    updateTodoSuccess: (state) => {
      state.updateTodo = {
        ...state.updateTodo,
        isLoading: false,
        success: true,
        error: false
      };
    },
    updateTodoRequest: (state) => {
      state.updateTodo = {
        ...state.updateTodo,
        isLoading: true,
        success: false,
        error: false
      };
    },
    updateTodoError: (state) => {
      state.updateTodo = {
        ...state.updateTodo,
        isLoading: false,
        success: false,
        error: true
      };
    },
    clearUpdateTodo: (state) => {
      state.updateTodo = {
        ...state.updateTodo,
        isLoading: false,
        success: false,
        error: false
      };
    },
    deleteTodoSuccess: (state) => {
      state.deleteTodo = {
        ...state.deleteTodo,
        isLoading: false,
        success: true,
        error: false
      };
    },
    deleteTodoRequest: (state) => {
      state.deleteTodo = {
        ...state.deleteTodo,
        isLoading: true,
        success: false,
        error: false
      };
    },
    deleteTodoError: (state) => {
      state.deleteTodo = {
        ...state.deleteTodo,
        isLoading: false,
        success: false,
        error: true
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
  todosSuccess, todosRequest, todosError, todosMoreSuccess,
  todoRequest, todoSuccess, todoError,
  createTodoRequest, createTodoSuccess, createTodoError, clearCreateTodo,
  updateTodoError, updateTodoRequest, updateTodoSuccess, clearUpdateTodo,
  deleteTodoError, deleteTodoRequest, deleteTodoSuccess,
  showError
} = TodoSlice.actions;

export const fetchTodos = (page: number) => (
  dispatch: (arg0: ActionCreatorWithoutPayload<string>) => void
) => {
  dispatch(todosRequest);
  axiosInstance.get(`/tasks?page=${page}&limit=5`)
    .then((res) => {
      dispatch(todosSuccess(res.data));
      dispatch(showError(""));
    })
    .catch((e) => {
      dispatch(todosError());
      dispatch(showError(e.response.status));
    });
};
export const fetchMoreTodos = (page: number) => (
  dispatch: (arg0: ActionCreatorWithoutPayload<string>) => void
) => {
  dispatch(todosRequest);
  axiosInstance.get(`/tasks?page=${page}&limit=5`)
    .then((res) => {
      dispatch(todosMoreSuccess(res.data));
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
      dispatch(fetchTodos(1));
    }).catch((e) => {
      dispatch(createTodoError());
      dispatch(showError(e.response.status));
    });
};
interface updateTodoData {
  title: string,
  description: string,
  deadline: string | null,
  completed: boolean
}
export const updateTodo = (id: number, postData: updateTodoData) => (
  dispatch: (arg0: ActionCreatorWithoutPayload<string>) => void
) => {
  dispatch(updateTodoRequest);
  axiosInstance.put(`/tasks/${id}`, postData)
    .then((res) => {
      dispatch(showError(''));
      dispatch(updateTodoSuccess());
      dispatch(fetchTodos(1));
    }).catch((e) => {
      dispatch(updateTodoError());
      dispatch(showError(e.response.status));
    });
};

export const deleteTodo = (id: number) => (
  dispatch: (arg0: ActionCreatorWithoutPayload<string>) => void
) => {
  dispatch(deleteTodoRequest);
  axiosInstance.delete(`/tasks/${id}`)
    .then((res) => {
      dispatch(showError(''));
      dispatch(deleteTodoSuccess());
      dispatch(fetchTodos(1));
    }).catch((e) => {
      dispatch(deleteTodoError());
      dispatch(showError(e.response.status));
    });
};

export default TodoSlice.reducer;
