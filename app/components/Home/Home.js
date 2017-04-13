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
import * as Animatable from 'react-native-animatable';

import Students from '../Students/Students';
import {selection} from '../../actions';
import Options from '../Options/Options';
import SettingsList from '../Settings/Settings';

const stars = require('../../../assets/stars.png');

class Home extends Component {
    constructor(props, context) {
        super(props, context);

        this._navigateStudents = this._navigateStudents.bind(this);
        this._navigateSettings = this._navigateSettings.bind(this);
        this.answerSelected = this.answerSelected.bind(this);
        this.answerSelected = this.answerSelected.bind(this);
        this.dispatchAnswer = this.dispatchAnswer.bind(this);
    }

    answerSelected(sound) {
        let {topStarsLeft, topStarsRight, bottomStarsLeft, bottomStarsRight} = this.refs;

        if (sound === this.props.correctSoundIndex) {
            
            Promise.all([topStarsLeft.zoomIn(1000), topStarsRight.zoomIn(1000), bottomStarsLeft.zoomIn(1000), bottomStarsRight.zoomIn(1000)]).then(() => {
                
                    Promise.all([topStarsLeft.zoomOut(), topStarsRight.zoomOut(), bottomStarsLeft.zoomOut(), bottomStarsRight.zoomOut()]).then(() => {
                        this.dispatchAnswer(sound);
                    })
            })
        }
    }

    dispatchAnswer(sound) {
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
            sequence: props.sequence,
            sequenceIndex: props.sequenceIndex
        });
    }

    _navigateStudents() {
        this.props.navigator.push({component: Students, navigationBarHidden: true})
    }

    _navigateSettings() {
        this.props.navigator.push({component: SettingsList, title: "Settings", navigationBarHidden: false})
    }

    humanifyArrayNumbers(geekArray) {
        return geekArray.map(item => item + 1)
    }

    render() {
        console.log(this.props.displayedSounds)
        console.log(this.props.correctSoundIndex)
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

        const peopleIcon = (<Icon name="ios-people-outline" size={35} color="white"/>)
        const settingsIcon = (<Icon name="ios-settings-outline" size={35} color="white"/>)

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
                <View style={styles.starsContainer}>
                    <Animatable.Image source={stars} ref="topStarsLeft" style={styles.starImageStyle} resizeMode={"contain"} />
                    <Animatable.Image source={stars} ref="topStarsRight" style={styles.starImageStyle} resizeMode={"contain"} />
                </View>
                <View style={styles.buttonsContainer}>
                    {optionsList}
                </View>
                <View style={styles.starsContainer}>
                    <Animatable.Image source={stars} ref="bottomStarsLeft" style={styles.starImageStyle} resizeMode={"contain"} />
                    <Animatable.Image source={stars} ref="bottomStarsRight" style={styles.starImageStyle} resizeMode={"contain"} />
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerContentLeft}>
                        Current student: {this.props.currentStudent.studentName}, Current teacher: {this.props.currentStudent.teacherName}
                    </Text>
                    <Text style={styles.footerContentRight}>
                        Sound: {this.props.correctSoundIndex + 1}
                    </Text>
                    <Text style={styles.footerContentRight}>
                        Sequence: {this.humanifyArrayNumbers(this.props.sequence)}
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
        paddingTop: 50,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#7CC6FE',
        borderBottomWidth: 6,
        borderBottomColor: '#5DFDCB'
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
    sequenceTitleContainer: {
        justifyContent: 'flex-start',
    },
    sequenceText: {
        fontSize: 16,
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
        paddingTop: 20,
        backgroundColor: '#7CC6FE',
        borderTopWidth: 3,
        borderTopColor: '#5DFDCB' 
    },
    footerContentLeft: {
        color: 'white',
        fontSize: 16
    },
    footerContentRight: {
        color: 'white',
        fontSize: 16
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    starImageStyle: {
        width: 320,
        height: 240,
        marginTop: 120,
        opacity: 0
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
        sequence: store.sequence,
        sequenceIndex: store.sequenceIndex,
        shouldAnimate: store.shouldAnimate,
        state: store
    }
}

module.exports = connect(mapStateToProps)(Home);