import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    Text, 
    View, 
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet,
    Button,
    Alert,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


import Students from './Students';
import { getRandomCollection } from '../../utils/helper';
import { selection, restart } from '../actions';
import Options from './Options';

class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this._navigateStudents = this._navigateStudents.bind(this);
        this.buildSoundsIndex = this.buildSoundsIndex.bind(this);
        this.answerSelected = this.answerSelected.bind(this);
    }

    async answerSelected(sound) {
        this.props.dispatch(selection(sound));
        
        try {
            const props = this.props;

            let previousValue = await AsyncStorage.getItem(prop.currentStudent.id);
            let visualProps = props.visualProp;

            let displayedSounds = prop.displayedSounds.map(item => {
                return visualProps[item];
            });

            let data = [
                ...JSON.parse(previousValue),
                {
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
        
        this.props.dispatch({type:"SUBMIT", correctIndex: this.props.correctSoundIndex, selectedIndex: sound, testIndex: null});
    }

    buildSoundsIndex (testIndex = null){
        console.log(this.props)
        this.props.dispatch({type:"SUBMIT", correctIndex: this.props.correctSoundIndex, selectedIndex: this.props.selectedSoundIndex, testIndex});
    }

    _navigateStudents() {
        this.props.navigator.push({
            component: Students,
            navigationBarHidden: true
        })
    }

    render() {
        let optionsList = this.props.displayedSounds.map((sound, i) => {
            return <Options
                onSelected={this.answerSelected}
                visualProp={this.props.visualProp[sound]}
                sound={sound}
                key={i}
                accessibilityLabel="Symbol select"
            />
        });
        const peopleIcon = (<Icon name="ios-people-outline" size={30} color="white" />)
        const settingsIcon = (<Icon name="ios-settings-outline" size={30} color="white" />)
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <View style={styles.topBarLeft}>
                        <TouchableOpacity onPress={this._navigateStudents}>
                            <Text>{peopleIcon}</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.title}>Miss Match</Text>

                    <View style={styles.topBarRight}>
                        <Text>{settingsIcon}</Text>
                    </View>
                </View>
                
                <View style={styles.buttonsContainer}>
                    {optionsList}
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerContentLeft}>
                       Current student: {this.props.currentStudent.studentName}, Current teacher: {this.props.currentStudent.teacherName}
                    </Text>
                    <Text style={styles.footerContentRight}>
                        {this.props.correctSoundIndex}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'flex-start', 
        alignItems:'stretch',
    },
    topBar: {
        padding: 16,
        paddingTop: 28,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#3DC64F'
    },
    topBarRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    topBarLeft: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 30
    },
    topBarText: {
        color: 'white',
        fontSize: 16
    },
    buttonsContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        flex: 1,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    footer: {
        flex: 0,
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#3DC64F',
    },
    footerContentLeft: {
        color: 'white'
    },
    footerContentRight: {
        color: '#FFE74C'
    }
});

//use destructuring
const mapStateToProps = (store) => {
    return {
        text: store.text,
        sounds: store.sounds,
        visualProp: store.visualProp,
        correctSoundIndex: store.correctSoundIndex,
        displayedSounds: store.displayedSounds,
        minIndex: store.minIndex,
        maxIndex: store.maxIndex,
        currentStudent: store.currentStudent,
        students: store.students,
        state: store
    }
}

module.exports = connect(mapStateToProps)(Home);