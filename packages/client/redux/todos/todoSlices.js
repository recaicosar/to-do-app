import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  items: [],
  loading: true,
  filter: {},
  priorities: [],
};
export const initTodos = createAsyncThunk(
  "tasks/todos/items",
  async () =>
    await fetch("http://localhost:5000/todosList").then((data) => data.json())
);

export const initPriorities = createAsyncThunk(
  "tasks/todos/priorities",
  async () =>
    await fetch("http://localhost:5000/prioritiesList").then((data) =>
      data.json()
    )
);

export const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload);
      toast.success("Successfully Added");
    },
    updateTodo: (state, action) => {
      const { id } = action.payload;

      const i = state.items.findIndex((e) => e.id === id);
      state.items[i] = action.payload;

      toast.success("Successfully Updated");
    },
    delTodo: (state, action) => {
      const { id } = action.payload;

      const item = state.items.filter((e) => {
        return e.id !== id;
      });
      state.items = item;
      toast.success("Successfully Removed");
    },
    multiDelTodo: (state, action) => {
      const { ids } = action.payload;

      const item = state.items.filter((e) => {
        return !ids.includes(e.id);
      });
      state.items = item;
      toast.success("Selected items successfully Removed");
    },

    filterTodo: (state, action) => {
      state.filters = action.payload;

      toast.success("Search Completed");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initTodos.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(initTodos.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(initPriorities.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(initPriorities.fulfilled, (state, action) => {
        state.priorities = action.payload;
        state.loading = false;
      });
  },
});

export const { addTodo, delTodo, updateTodo, filterTodo, multiDelTodo } =
  todo.actions;
export default todo.reducer;
