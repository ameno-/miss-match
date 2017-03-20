import {put, takeEvery} from 'redux-saga/effects';
import {getRandomCollection} from '../../utils/helper';
import {updateStudentDataAsync} from '../db';

function * selectionChanged(action) {
  console.log(action.sequenceIndex);
  try {
    if (action.selectedSoundIndex === action.correctSoundIndex) {
      yield put({
        type: "INCREMENT_SEQUENCE_INDEX",
        payload: action.sequenceIndex
      });
      yield put({
        type: "QUESTIONS_NEW",
        payload: getRandomCollection(action.sequence[action.sequenceIndex++], action.lingSoundCount)
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