import {AsyncStorage} from 'react-native';

/**
 * save a student
 * @param {object} current student - currently active student. Contains student id, name, and teacher name
 * @param {array} visual prop - the visual props being used.
 * @param {array} displayed sounds - sounds being displayed when selection was made
 */
export async function updateStudentDataAsync(currentStudent, visualProp, displayedSounds) {
    try {
        let previousValue = await AsyncStorage.getItem(props.currentStudent.id);
        console.log(previousValue);
        let visualProps = props.visualProp;

        let displayedSounds = props
            .displayedSounds
            .map(item => {
                return visualProps[item];
            });

        let data = [
            ...JSON.parse(previousValue), {
                displayedSounds: displayedSounds,
                selectedAnswer: visualProps[sound],
                correctAnswer: visualProps[props.correctSoundIndex]
            }
        ];

        await AsyncStorage.setItem(this.props.currentStudent.id, JSON.stringify(data));

        let newVal = await AsyncStorage.getItem(this.props.currentStudent.id)
        console.log(JSON.parse(newVal));

        console.log('Saved answer to disk for student:' + this.props.currentStudent.id);
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

export function saveRecord(data) {
    //await AsyncStorage.setItem()
}

export function deleteRecord() {}

export function getManyRecords() {}