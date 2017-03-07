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
        })
    }

    render() {
        //console.log(this.props);
        // let optionsList = this.props.displayedSounds.map((sound, i) => {
        //     //console.log(sound);
        //     return <Options
        //         answerSelected={this.answerSelected}
        //         visualProp={this.props.visualProp[sound]}
        //         sound={sound}
        //         key={i}
        //         accessibilityLabel="Symbol select"
        //     />
        let optionsList = this.props.displayedSounds.map((sound, i) => {
             return <Button
                onPress={() => this.answerSelected(sound)}
                title={this.props.visualProp[sound]}
                soundIndex={i}
                key={sound}
                color="#841584"
                accessibilityLabel="Symbol select"
            />
        }
        );
        return (
            <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', paddingTop: 200 }}>
                <Text>{this.props.text}</Text>
                <TouchableHighlight onPress={this._navigateStudents}>
                    <Text>To students!</Text>
                </TouchableHighlight>
                <Text>
                    Correct answer: {this.props.correctSoundIndex}
                </Text>
                <View style={styles.buttonsContainer}>
                    {optionsList}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 3,
    flexDirection : 'column',
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
});

const mapStateToProps = (store) => {
    return {
        text: store.text,
        sounds: store.sounds,
        visualProp: store.visualProp,
        correctSoundIndex: store.correctSoundIndex,
        displayedSounds: store.displayedSounds,
        minIndex: store.minIndex,
        maxIndex: store.maxIndex,
    }
}

module.exports = connect(mapStateToProps)(Home);