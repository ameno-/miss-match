exports.selection = (selection) => {
    return {
        type: 'SELECTION',
        selection
    }
}

exports.restart = (randomizedData) => {
    return {
        type: 'RESTART',
        answerIndex: randomizedData.answerIndex,
        newSounds: randomizedData.shuffledArray
    }
}

exports.addStudent = (student) => {
    return {
        type: "NEW_STUDENT",
        student: student,
    }
}