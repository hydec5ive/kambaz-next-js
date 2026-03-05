import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../database";
const initialState = {
  enrollments: enrollments,
};
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload }) => {
      const newEnrollment = {
        _id: new Date().getTime().toString(),
        user: payload.userId,
        course: payload.courseId,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    unenroll: (state, { payload }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment: any) => !(enrollment.user === payload.userId && enrollment.course === payload.courseId)
      );
    },
  },
});
export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;