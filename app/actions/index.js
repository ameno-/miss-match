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

exports.redo = () => {
    return {
        type: "REDO",
    }
}