import {put, takeEvery} from 'redux-saga/effects';
import {getRandomCollection} from '../../utils/helper';
import {updateStudentDataAsync} from '../db';

function * selectionChanged(action) {
  try {
    if (action.selectedSoundIndex === action.correctSoundIndex) {
      let nextIndex = action.sequenceIndex + 1;
      yield put({
        type: "INCREMENT_SEQUENCE_INDEX",
        payload: nextIndex,
      });
      yield put({
        type: "QUESTIONS_NEW",
        payload: getRandomCollection(action.sequence[nextIndex], action.lingSoundCount)
      });
    console.log("end of saga: ", nextIndex)
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