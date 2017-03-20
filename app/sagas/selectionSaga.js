import {call, put, takeEvery} from 'redux-saga/effects';
import {getRandomCollection} from '../../utils/helper';
import {updateStudentDataAsync} from '../db';

function * selectionChanged(action) {
  try {
    if (action.selectedSoundIndex === action.correctSoundIndex) {

      yield put({
        type: "QUESTIONS_NEW",
        payload: getRandomCollection(action.testIndex, action.lingSoundCount)
      });
    } else {
      yield put({type: "QUESTIONS_REDO"})
    }

    yield updateStudentDataAsync(action.currentStudent, action.visualProp, action.displayedSounds, action.selectedSoundIndex, action.correctSoundIndex);
  } catch (e) {
    yield console.log("done fucked up");
    yield console.log(e);
    //error action.
  }
}

function * selectionSaga() {
  yield takeEvery("SUBMIT", selectionChanged);
}

export default[selectionSaga];