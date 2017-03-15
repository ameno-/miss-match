import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import { getRandomCollection } from '../../utils/helper'

function * selectionChanged(action) {
  try {
    if (action.selectedIndex === action.correctIndex) {
      yield put({
        type: "QUESTIONS_NEW",
        payload: getRandomCollection(action.testIndex, 3)
      });
    } else {
      yield put({type: "QUESTIONS_REDO"})
    }
  } catch (e) {
    yield console.log("done fucked up")
    yield console.log(e)
    //error action.
  }
}

function * selectionSaga() {
  yield takeEvery("SUBMIT", selectionChanged);
}

export default [selectionSaga];