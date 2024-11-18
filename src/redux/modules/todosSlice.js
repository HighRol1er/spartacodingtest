import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/**
 * 2초 지연을 시키는 함수입니다 (비동기 작업).
 */
import { waitTwoSeconds } from '../../utils';

export const __addToDo = createAsyncThunk(
  '__addToDo',
  async (payload, thunkAPI) => {
    await waitTwoSeconds();
    console.log(thunkAPI);
    return payload;
  }
);

export const __deleteTodo = createAsyncThunk(
  '__deleteToDo',
  async (payload, thunkAPI) => {
    await waitTwoSeconds();
    return payload;
  }
);

const initialState = {
  list: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  
  reducers: {
    /*
      시험삼아 해봤는데 에러남 ㄷㄷ 
      NOTE:Error:  Cannot perform 'get' on a proxy that has been revoked
              TypeError: Cannot perform 'get' on a proxy that has been revoked
    */
    // addTodo: (state, action) => {
    //   setTimeout(() => {
    //     state.list.push(action.payload)
    //   }, 2000);
    // },
    // deleteTodo: (state, action) => {
    //   state.list = state.list.filter((todo) => todo.id !== action.payload)
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__addToDo.fulfilled, (state, action) => {
        state.list.push(action.payload); // 비동기 작업 후 추가
      })
      .addCase(__deleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter((todo) => todo.id !== action.payload)
      })
      
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
