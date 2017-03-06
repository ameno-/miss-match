import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import Students from './Students';

class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this._navigateStudents = this._navigateStudents.bind(this);
    }
    _navigateStudents() {
        this.props.navigator.push({
            component: Students,
            title: "Students",
        })
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                <Text> Welcome from Home</Text>
                <TouchableHighlight onPress={this._navigateStudents}>
                    <Text>To students!</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default Home;