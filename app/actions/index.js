exports.selection = (selection) => {
    return {
        type: ' ',
        selection
    }
}

// exports.addStudent = (student) => {
//     return {
//         type: "NEW_STUDENT",
//         student,
//     }
// }

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