import React, { Component } from 'react';
import {Text, View, TouchableHighlight } from 'react-native';

class Students extends Component {
    constructor(props, context) {
    super(props, context);
    this._navigateHome = this._navigateHome.bind(this);
  }
    _navigateHome(){
        this.props.navigator.pop();
    }
    render() {
        return (
            <View style={{flex:1, justifyContent:'space-around', alignItems:'center'}}>
                <Text> Welcome from Students</Text>
                <TouchableHighlight onPress={this._navigateHome}>
                    <Text>Back Home</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default Students;