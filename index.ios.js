/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { getRandomCollection } from './utils/helper';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableHighlight
} from 'react-native';

export default class msMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sounds: ["ah", "ee", "oo", "m", "s", "sh"],
      objects: ["airplane", "mouse", "train", "pizza", "snake", "baby"],
      correctSoundIndex: 0,
      displayedSounds: [0, 1, 2],
      minIndex: 0,
      maxIndex: 5,
      text: "my nigga, my nigga, my nigga"
    };

    const buildSoundsIndex = (selectedIndex = null) =>  getRandomCollection(selectedIndex, 3);

    // this.setState({ displayedSounds: buildSoundsIndex(1) });
  }
  
  render() {
    const onButtonPress = (index) => {
      Alert.alert(`Button has been pressed!${this.state.objects[index]} aaaaaand ${index}`);
    };

    let options = this.state.displayedSounds.map((sound) => {
          console.log(sound);
          return <Button
                  onPress={() => onButtonPress(sound)}
                  title={this.state.objects[sound]}
                  soundIndex={sound}
                  key={sound}
                  color="#841584"
                  accessibilityLabel="Symbol select"
                />
              }
           );

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
         What sound am I making?
        </Text>
        <View style={styles.buttonsContainer}>
        {options}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  buttonsContainer: {
    flex: 3,
    flexDirection : 'column',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 80,
    flex: 1,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('msMatch', () => msMatch);
