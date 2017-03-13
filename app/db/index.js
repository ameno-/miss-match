
// export function getRecord(props) {
//     try {
        
//     } catch (error) {
        
//     }
// }

// export function saveRecord() {

// }

// export function deleteRecord() {

// }

// export function getManyRecords(){

// }

// try {
//             const props = this.props;

//             let previousValue = await AsyncStorage.getItem(prop.currentStudent.id);
//             let visualProps = props.visualProp;

//             let displayedSounds = prop.displayedSounds.map(item => {
//                 return visualProps[item];
//             });

//             let data = [
//                 ...JSON.parse(previousValue),
//                 {
//                     displayedSounds: displayedSounds,
//                     selectedAnswer: visualProps[sound],
//                     correctAnswer: visualProps[props.correctSoundIndex]
//                 }
//             ];

//             await AsyncStorage.setItem(this.props.currentStudent.id, JSON.stringify(data));

//             let newVal = await AsyncStorage.getItem(this.props.currentStudent.id)
//             console.log(JSON.parse(newVal));

//             console.log('Saved answer to disk for student:' + this.props.currentStudent.id);
//         } catch (error) {
//             console.log('AsyncStorage error: ' + error.message);
//         }