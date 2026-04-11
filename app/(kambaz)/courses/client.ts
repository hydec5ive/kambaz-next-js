import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

// Courses
export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};
export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/users/current/courses`);
  return data;
};
export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(`${REMOTE_SERVER}/api/users/current/courses`, course);
  return data;
};
export const deleteCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}`);
  return data;
};
export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

// Modules
export const findModulesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
  return data;
};
export const createModule = async (courseId: string, module: any) => {
  const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/modules`, module);
  return data;
};
export const deleteModule = async (courseId: string, moduleId: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}/modules/${moduleId}`);
  return data;
};
export const updateModule = async (courseId: string, module: any) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${courseId}/modules/${module._id}`, module);
  return data;
};

// Assignments
export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/assignments`);
  return data;
};
export const findAssignmentById = async (courseId: string, assignmentId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/assignments/${assignmentId}`);
  return data;
};
export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
  const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/assignments`, assignment);
  return data;
};
export const deleteAssignment = async (courseId: string, assignmentId: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}/assignments/${assignmentId}`);
  return data;
};
export const updateAssignment = async (courseId: string, assignment: any) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${courseId}/assignments/${assignment._id}`, assignment);
  return data;
};

// Enrollments
export const findAllEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/enrollments`);
  return data;
};
export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.post(`${REMOTE_SERVER}/api/users/${userId}/courses/${courseId}/enrollments`);
  return data;
};
export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.delete(`${REMOTE_SERVER}/api/users/${userId}/courses/${courseId}/enrollments`);
  return data;
};

// Find users enrolled in a course
export const findUsersForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/users`);
  return data;
};