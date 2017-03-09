import { createStore } from 'redux';
import reducer from '../reducer'

const defaultState = {
    sounds: ["ah", "ee", "oo", "m", "s", "sh"],
    visualProp: ["airplane", "mouse", "train", "pizza", "snake", "baby"],
    correctSoundIndex: 0,
    displayedSounds: [0, 1, 2],
    minIndex: 0,
    maxIndex: 5,
    text: "my nigga, my nigga, my nigga",
    students: [],
    currentStudent: {}
}

export const configureStore = (initialState = defaultState) => {
    return createStore(reducer, initialState);
}