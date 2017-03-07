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
        default:
            return state;
    }
}