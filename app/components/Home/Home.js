import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet,
    Button,
    Alert,
    Animated,
    AsyncStorage
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Students from '../Students/Students';
import {selection} from '../../actions';
import Options from '../Options/Options';
import SettingsList from '../Settings/Settings';

class Home extends Component {
    constructor(props, context) {
        super(props, context);

        this._navigateStudents = this._navigateStudents.bind(this);
        this._navigateSettings = this._navigateSettings.bind(this);
        this.answerSelected = this.answerSelected.bind(this);
        this.answerSelected = this.answerSelected.bind(this);
    }

    answerSelected(sound) {
        let props = this.props;

        props.dispatch(selection(sound));
        props.dispatch({
            type: "SUBMIT",
            correctSoundIndex: props.correctSoundIndex,
            selectedSoundIndex: sound,
            manualTestIndex: props.manualTestIndex,
            currentStudent: props.currentStudent,
            visualProp: props.visualProp,
            displayedSounds: props.displayedSounds,
            lingSoundCount: props.lingSoundCount,
            date: props.date,
            sequence: props.testSequence,
            sequenceIndex: props.sequenceIndex
        });
    }

    _navigateStudents() {
        this
            .props
            .navigator
            .push({component: Students, navigationBarHidden: true})
    }

    _navigateSettings() {
        this
            .props
            .navigator
            .push({component: SettingsList, title: "Settings", navigationBarHidden: false})
    }

    render() {
        let optionsList = this
            .props
            .displayedSounds
            .map((sound, i) => {
                return <Options
                    onSelected={this.answerSelected}
                    visualProp={this.props.visualProp[sound]}
                    sound={sound}
                    correctSound={this.props.visualProp[this.props.correctSoundIndex]}
                    shouldAnimate={this.props.shouldAnimate}
                    key={i}
                    accessibilityLabel="Symbol select"/>
            });

        const peopleIcon = (<Icon name="ios-people-outline" size={30} color="white"/>)
        const settingsIcon = (<Icon name="ios-settings-outline" size={30} color="white"/>)

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
                        <TouchableOpacity onPress={this._navigateSettings}>
                            <Text>{settingsIcon}</Text>
                        </TouchableOpacity>
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
                        {this.props.correctSoundIndex + 1}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch'
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
        alignItems: 'center'
    },
    topBarLeft: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
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
        flex: 1
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    footer: {
        flex: 0,
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#3DC64F'
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
        manualTestIndex: store.manualTestIndex,
        lingSoundCount: store.lingSoundCount,
        date: store.date,
        testSequence: store.testSequence,
        sequenceIndex: store.sequenceIndex,
        shouldAnimate: store.shouldAnimate,
        state: store
    }
}

module.exports = connect(mapStateToProps)(Home);