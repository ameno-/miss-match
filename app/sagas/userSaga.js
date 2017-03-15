import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {getRandomCollection} from '../../utils/helper';
import {saveStudentAsync} from '../db';
const uuidV4 = require('uuid/v4');

function * saveStudent(action) {
  console.log(action);
  try {
    let student = {studentName: action.studentName, teacherName: action.teacherName, id: uuidV4()};
    yield put({type: "SAVING_NEW_STUDENT"});
    yield saveStudentAsync(student);
    yield put({type: "SAVED_STUDENT"});
    yield put({type: "NEW_STUDENT", student});

  } catch (e) {

    yield console.log("U dun fucked up");
    yield console.log(e);
  }
}

function * changeActiveStudent(action) {
  try {
    yield put({type: "CHANGING_STUDENT"});


  } catch (error) {

    yield console.log("U dun fucked up");
    yield console.log(error);
  }
}

function * watchSaveNewStudent() {
  yield takeEvery("ADD_STUDENT", saveStudent);
}

function * watchChangeActiveStudent() {
  yield takeEvery("CHANGE_STUDENT", changeActiveStudent);
}

export default[watchSaveNewStudent, watchChangeActiveStudent];