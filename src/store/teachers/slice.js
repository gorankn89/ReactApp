import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  getTeachers() {},
  getTeacher() {},
  getFreeTeachers() {},
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    allTeachers: [],
  selectedTeacher: null,
  freeTeachers:[],
  },
  reducers: {
    setTeachers(state, action) {
      state.allTeachers = action.payload;
    },
    setTeacher(state, action) {
      state.selectedTeacher = action.payload;
    },
    setFreeTeachers(state, action) {
      state.freeTeachers = action.payload;
    },
    ...middlewareActions,
  },
});

export default teachersSlice.reducer;

export const { getTeachers,setTeachers,getTeacher, setTeacher, getFreeTeachers,setFreeTeachers } = teachersSlice.actions;