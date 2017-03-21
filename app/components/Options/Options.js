import React, {Component} from 'react';
import {
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    View,
    Animated
} from 'react-native';

import * as Animatable from 'react-native-animatable';

class Options extends Component {
    constructor(props) {
        super(props);
        this.springValue = new Animated.Value(1);
        this.spring = this
            .spring
            .bind(this);
        this.handleClick = this
            .handleClick
            .bind(this);
    }

    spring() {
        Animated
            .spring(this.springValue, {
            toValue: 1.5,
            friction: 1,
            tension: 1
        })
            .start()
    }

    getImageSrc(visualProp) {
        switch (visualProp) {
            case "baby":
                return require('../../../assets/cryingBaby.png');
            case "mouse":
                return require('../../../assets/mouse.png');
            case "train":
                return require('../../../assets/train.png');
            case "pizza":
                return require('../../../assets/pizza.png');
            case "airplane":
                return require('../../../assets/airplane.png');
            case "snake":
                return require('../../../assets/snake.png');
        }
    }

    handleClick(visualProp) {
    this.refs[visualProp]
        .bounce(800)
        .then((endState) => console.log(endState.finished? 'bounce finished': 'bounce cancelled'));
    }

    render() {
        let src = this.getImageSrc(this.props.visualProp);
        return (
            <Animatable.View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.handleClick(this.props.visualProp)}
                    soundIndex={this.props.sound}
                    key={this.props.sound}
                    color="#841584"
                    accessibilityLabel="Symbol select"
                    style={styles.button}>
                    <Animatable.Image
                        ref={this.props.visualProp}
                        source={src}
                        style={{
                        width: 180,
                        height: 140,
                        flex: 1,
                        flexWrap: 'wrap',
                    }}
                        resizeMode={"contain"}/>
                </TouchableOpacity>
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    //work harder to fix wrapping. Be responsive homie
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: 'wrap'
    },
    imageButton: {
        width: 180,
        height: 140,
        flex: 1,
        flexWrap: 'wrap',
        transform: [
            {
                scale: this.springValue
            }
        ]
    },
    button: {
        paddingLeft: 50,
        paddingRight: 50
    }
})

export default Options;