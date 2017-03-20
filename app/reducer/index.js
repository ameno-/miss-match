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
                        id: action.student.id
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
        case 'SET_LING_SOUND_COUNT':
            return {
                ...state,
                lingSoundCount: action.count
            }
        case 'SET_TEST_INDEX':
            return {
                ...state,
                manualTestIndex: action.testIndex
            }
        case 'RESET_STORE':
            return {
                ...state,
                displayedSounds: [0, 1, 2],
                lingSoundCount: 3
            }
        case 'INCREMENT_SEQUENCE_INDEX':
        console.log(action)
            return {
                ...state,
                sequenceIndex: action.sequenceIndex++
            }
        default:
            return state;
    }
}