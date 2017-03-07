import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
class Options extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.onSelected(this.props.sound)}
                soundIndex={this.props.sound}
                key={this.props.sound}
                color="#841584"
                accessibilityLabel="Symbol select">
                    <Text> {this.props.visualProp} </Text>
                </TouchableOpacity>
        );
    }
}

export default Options;