import { takeLatest, call, put } from "redux-saga/effects";
import { getGradebooks, setGradebooks,addGradebooks, getGradebook, setGradebook,createGradebook,createStudent ,createComment,addComment,deleteComment,deleteGradebook,deleteStudent,getMyGradebook,setErrorGradebook} from "./slice";
import gradebooksService from "../../services/GradebooksService";

function* handleGetGradebooks(action) {
  try {
    const gradebooks = yield call(gradebooksService.getGradebooks, action.payload.name, action.payload.page);
if(action.payload?.page>1){
  yield put(addGradebooks(gradebooks));
}else{
  yield put(setGradebooks(gradebooks));
}
  } catch (error) {
    console.error(error);
  }
}

function* handleGetGradebook(action) {
  try {
    const gradebook = yield call(gradebooksService.getGradebook, action.payload);
    // console.log('gradebook',gradebook);
    yield put(setGradebook(gradebook));
  } catch (error) {
    console.log(error);
  }
}

function* handleCreateGradebook(action) {
  try {
     yield put(setErrorGradebook(null));
    const gradebook = yield call(gradebooksService.createGradebook, action.payload.gradebook);
    if (action.payload.onSuccess) {

      yield call(action.payload.onSuccess);
    }
  } catch (error) {
     yield put(setErrorGradebook(error.response.data.errors));
    console.error(error);
  }
}

function* handleCreateStudent(action) {
  try {
    yield put(setErrorGradebook(null));
    const student = yield call(gradebooksService.createStudent, action.payload.gradebook_id,action.payload.student);

    if (action.payload.onSuccess) {
      yield call(action.payload.onSuccess);
    }
  } catch (error) {
     yield put(setErrorGradebook(error.response.data.errors));
    console.error(error);
  }
}

function* handleCreateComment(action) {
  try {
     yield put(setErrorGradebook(null));
    const comment = yield call(gradebooksService.createComment, action.payload.gradebook_id,action.payload.comment);
    yield put(addComment(comment));  
  } catch (error) {
     yield put(setErrorGradebook(error.response.data.errors));
    console.error(error);
  }
}

function* handleDeleteComment(action) {
  try {
    const comment = yield call(gradebooksService.deleteComment, action.payload);
  } catch (error) {
    console.log(error);
  }
}

function* handleDeleteGradebook(action) {
  try {
    const gradebook = yield call(gradebooksService.deleteGradebook, action.payload.id);
    if (action.payload.onSuccess) {
      yield call(action.payload.onSuccess);
    }
  } catch (error) {
    console.log(error);
  }
}

function* handleDeleteStudent(action) {
  try {
    const student = yield call(gradebooksService.deleteStudent, action.payload.id);
    if (action.payload.onSuccess) {
      yield call(action.payload.onSuccess);
    }
  } catch (error) {
    console.log(error);
  }
}

function* handleGetMyGradebook() {
  try {
    const gradebook = yield call(gradebooksService.getMyGradebook);
    yield put(setGradebook(gradebook));
  } catch (error) {
    yield put(setGradebook(null));
    console.log(error);
  }
}


export function* watchGetGradebooks() {
  yield takeLatest(getGradebooks.type, handleGetGradebooks);
}

export function* watchGetGradebook() {
  yield takeLatest(getGradebook.type, handleGetGradebook);
}

export function* watchCreateGradebook() {
  yield takeLatest(createGradebook.type, handleCreateGradebook);
}

export function* watchCreateStudent() {
  yield takeLatest(createStudent.type, handleCreateStudent);
}

export function* watchCreateComment() {
  yield takeLatest(createComment.type, handleCreateComment);
}

export function* watchDeleteComment() {
  yield takeLatest(deleteComment.type, handleDeleteComment);
}

export function* watchDeleteGradebook() {
  yield takeLatest(deleteGradebook.type, handleDeleteGradebook);
}
export function* watchDeleteStudent() {
  yield takeLatest(deleteStudent.type, handleDeleteStudent);
}

export function* watchGetMyGradebook() {
  yield takeLatest(getMyGradebook.type, handleGetMyGradebook);
}