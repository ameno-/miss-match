/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
//import getRandomIndex from './utils/helper';

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

    const getRandomCollection = (exclude, totalNumbers) => {
      //dynamically generate based on numRepo size
      let numbersRepository = [0,1,2,3,4,5],
        randomNumbersCollection,
        counter = totalNumbers,
        generatedNumber = 0;

      if (exclude != null) {
        randomNumbersCollection = [exclude];
        numbersRepository.splice(exclude, 1);
        counter--;
      }
      else {
        randomNumbersCollection = [];
      }

      while (counter--) {
        generatedNumber = Math.floor(Math.random() * (numbersRepository.length));
        randomNumbersCollection.push(numbersRepository[generatedNumber]);
        numbersRepository.splice(generatedNumber, 1);
      }

      console.log(randomNumbersCollection);
      return shuffle(randomNumbersCollection);
    }

    const shuffle = (array) => {
      let currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    const buildSoundsIndex = (selectedIndex = null) =>  getRandomCollection(selectedIndex, 3);

    setInterval(() => {
      this.setState({ displayedSounds: buildSoundsIndex(1) });
    }, 1000);
  }
  
  render() {
    const onButtonPress = (index) => {
      Alert.alert(`Button has been pressed!${this} aaaaaand ${index}`);
    };

    let test = this.state.displayedSounds.map(sound => {
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
         {this.state.correctSoundIndex}
        </Text>
        <View style={styles.buttonsContainer}>
        {test}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection : 'row',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('msMatch', () => msMatch);
