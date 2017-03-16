exports.selection = (selection) => {
    return {type: ' ', selection}
}

exports.setStudent = (student) => {
    return {type: "SET_STUDENT", student}
}

exports.setLingSoundCount = (count) => {
    return {type: "SET_LING_SOUND_COUNT", count}
}

exports.resetStore = () => {
    return {
        type: "RESET_STORE",
        payload: {
            sounds: ["ah", "ee", "oo", "m", "s", "sh"],
            visualProp: ["airplane", "mouse", "train", "pizza", "snake", "baby"],
            correctSoundIndex: 0,
            selectedSoundIndex: 0,
            displayedSounds: [0, 1, 2],
            minIndex: 0,
            maxIndex: 5,
            students: [],
            currentStudent: {},
            manualTestIndex: null,
            lingSoundCount: 3
        }
    }
}