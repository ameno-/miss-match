import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    Text, 
    View, 
    TouchableHighlight, 
    StyleSheet,
    Button,
    Alert
} from 'react-native';

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

    answerSelected(sound) {
        this.props.dispatch(selection(sound));
        this.buildSoundsIndex();
    }

    buildSoundsIndex (selectedIndex = null){
        this.props.dispatch(restart(getRandomCollection(selectedIndex, 3)));
    }

    _navigateStudents() {
        this.props.navigator.push({
            component: Students,
            title: "Students",
            barTintColor: '#996699',
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
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this._navigateStudents}>
                    <Text>To students!</Text>
                </TouchableHighlight>
                <View style={styles.buttonsContainer}>
                    {optionsList}
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerContent}>
                       {this.props.correctSoundIndex}, current student: {this.props.currentStudent.studentName}, current teacher: {this.props.currentStudent.teacherName}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 200
    },
    buttonsContainer: {
        flex: 2,
        flexDirection: 'column',
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
        padding: 10,
        backgroundColor: 'red',
    },
    footerContent: {
        alignSelf: 'flex-end'
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
        students: store.students
    }
}

module.exports = connect(mapStateToProps)(Home);