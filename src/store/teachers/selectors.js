export function selectTeachers(state) {
  return state.teachers.allTeachers;
}

export function selectTeacher(state) {
  return state.teachers.selectedTeacher;
}

export function selectFreeTeachers(state) {
  return state.teachers.freeTeachers;
}