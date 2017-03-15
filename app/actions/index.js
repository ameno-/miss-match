exports.selection = (selection) => {
    return {
        type: ' ',
        selection
    }
}

exports.setStudent = (student) => {
    return {
        type: "SET_STUDENT",
        student,
    }
}

exports.setLingSoundCount = (count) => {
    return {
        type: "LING_SOUND_COUNT",
        count
    }
}