import { fork } from 'redux-saga/effects';
import SelectionSaga from './selectionSaga';
import UserSaga from './userSaga';

const sagas = [
  ...SelectionSaga,
  ...UserSaga
];

export default function* root() {
  yield sagas.map(saga => fork(saga)); 
}