export function selectGradebooks(state) {
  return state.gradebooks.page;
}

export function selectGradebook(state) {
  return state.gradebooks.selectedGradebook;
}

export function selectErrorGradebook(state) {
  return state.gradebooks.error;
}