import {AsyncStorage} from 'react-native';

/**
 * update student in DB
 * @param {object} current student - currently active student. Contains student id, name, and teacher name
 * @param {array} visual prop - the visual props being used.
 * @param {array} displayed sounds - sounds being displayed when selection was made
 */
export async function updateStudentDataAsync(currentStudent, visualProp, displayedSounds, selectedSoundIndex, correctSoundIndex) {
    try {
        let previousValue = await AsyncStorage.getItem(currentStudent.id);
        //console.log(previousValue);

        let displayedSoundsNames = displayedSounds.map(item => visualProp[item]);

        let data = [
            ...JSON.parse(previousValue), {
                displayedSounds: displayedSoundsNames,
                selectedAnswer: visualProp[selectedSoundIndex],
                correctAnswer: visualProp[correctSoundIndex]
            }
        ];

        await AsyncStorage.setItem(currentStudent.id, JSON.stringify(data));

        let newVal = await AsyncStorage.getItem(currentStudent.id)
        //console.log(JSON.parse(newVal));

        console.log('Saved answer to disk for student:' + currentStudent.id);

    } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
    }
}

/** Save new student to DB
 * @param  {object} studentId
 */
export async function saveStudentAsync(currentStudent) {
    try {
        if (currentStudent && currentStudent.id && currentStudent.studentName && currentStudent.teacherName) {

            await AsyncStorage.setItem(currentStudent.id, JSON.stringify(currentStudent));

        } else {
            throw "Invalid student object";
        }
    } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
    }
}

export function resetDB() {
    //await AsyncStorage.setItem()
}