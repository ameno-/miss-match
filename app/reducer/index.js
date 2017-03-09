//find a way to import the es6 way
const uuidV4 = require('uuid/v4');

module.exports = (state={}, action) => {
    switch (action.type) {
        case 'SELECTION':
            return {
                ...state,
                text: action.selection
            }
        case 'RESTART':
            return {
                ...state,
                correctSoundIndex: action.answerIndex,
                displayedSounds: action.newSounds
            }
        case 'NEW_STUDENT':
            return {
                ...state,
                students: [
                    ...state.students, 
                    {
                        studentName: action.student.studentName,
                        teacherName: action.student.teacherName,
                        id: uuidV4()
                    }
                ]
            }
        default:
            return state;
    }
}