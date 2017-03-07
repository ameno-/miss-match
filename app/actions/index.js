exports.selection = (selection) => {
    return {
        type: 'SELECTION',
        selection
    }
}

exports.restart = (obj) => {
    return {
        type: 'RESTART',
        answerIndex: obj.answerIndex,
        newSounds: obj.shuffledArray
    }
}