//find a way to import the es6 way
const uuidV4 = require('uuid/v4');

module.exports = (state={}, action) => {
    switch (action.type) {
        case 'SELECTION':
            return {
                ...state,
                selectedSoundIndex: action.selection
            }
        case 'QUESTIONS_NEW':
            return {
                ...state,
                correctSoundIndex: action.payload.answerIndex,
                displayedSounds: action.payload.shuffledArray
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
        case 'SET_STUDENT':      
            return {
                ...state,
                currentStudent: {
                    studentName : action.student.studentName,
                    teacherName : action.student.teacherName,
                    id : action.student.id,
                }
            }
        case 'QUESTIONS_REDO':      
            return {
                ...state
            }
        default:
            return state;
    }
}