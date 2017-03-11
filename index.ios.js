/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  NavigatorIOS,
  TabBarIOS
} from 'react-native';

import Home from './app/components/Home';
import { configureStore } from './app/store';

export default class msMatch extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Provider store={configureStore()}>
        <View style={styles.container}>
          <NavigatorIOS
          initialRoute= {{
            component: Home,
            title: 'Home',
            navigationBarHidden: true
          }}
          style={{flex: 1}}
          />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('msMatch', () => msMatch);
