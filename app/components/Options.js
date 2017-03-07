import React, { Component } from 'react';
import { TouchableOpacity, Button } from 'react-native';
class Options extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Button
                onPress={() => this.props.answerSelected(this.props.sound)}
                title={this.props.visualProp[this.props.sound]}
                soundIndex={this.props.sound}
                key={this.props.sound}
                color="#841584"
                accessibilityLabel="Symbol select"
            />
        );
    }
}

export default Options;