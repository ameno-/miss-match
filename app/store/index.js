import { createStore, compose, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';
import {getRandomCollection, shuffle} from '../../utils/helper';
import createSagaMiddleware from 'redux-saga'
import reducer from '../reducer'
import Sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const defaultState = {
    sounds: ["ah", "ee", "oo", "m", "s", "sh"],
    visualProp: ["airplane", "mouse", "train", "pizza", "snake", "baby"],
    correctSoundIndex: 0,
    selectedSoundIndex: null,
    displayedSounds: [0, 1, 2],
    minIndex: 0,
    maxIndex: 5,
    students: [],
    currentStudent: {},
    manualTestIndex: null,
    lingSoundCount: 3,
    sequence: shuffle([0, 1, 2, 3, 4, 5]),
    date: Date.now(),
    sequenceIndex: 0,
    shouldAnimate: false
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = (initialState = defaultState) => {
    let store = createStore(reducer, initialState, composeEnhancers(
        autoRehydrate(),
        applyMiddleware(sagaMiddleware)
    ));
    sagaMiddleware.run(Sagas)

    persistStore(store, {storage: AsyncStorage});
    return store;
}