import React, {Component} from 'react';
import {
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    View,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

class Options extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    // componentWillReceiveProps(nextProps){
    //     if (nextProps.shouldAnimate) {
    //         this.refs.mainContainer.bounceInDown(700);
    //     }
    // }

    getImageSrc(visualProp) {
        switch (visualProp) {
            case "baby":
                return require('../../../assets/baby.png');
            case "mouse":
                return require('../../../assets/mouse.png');
            case "train":
                return require('../../../assets/train.png');
            case "pizza":
                return require('../../../assets/pizza.png');
            case "airplane":
                return require('../../../assets/airplane.png');
            case "snake":
                return require('../../../assets/snake2.png');
        }
    }

    handleClick(visualProp, sound) {
        if (visualProp === this.props.correctSound) {
            this.refs[visualProp]
                .bounce(800)
                .then((endState) => {
                    endState.finished ? this.props.onSelected(sound) : 'correct answer animation cancelled';
                });
        } else {
            this.refs[visualProp]
                .shake(300)
                .then((endState) => {
                    endState.finished ? this.props.onSelected(sound) : 'wrong answer animation cancelled';
                });
        }
    }

    render() {
        let src = this.getImageSrc(this.props.visualProp);
        return (
            <Animatable.View ref="mainContainer" style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.handleClick(this.props.visualProp, this.props.sound)}
                    soundIndex={this.props.sound}
                    key={this.props.sound}
                    color="#841584"
                    accessibilityLabel="Symbol select"
                    style={styles.button}>
                    <Animatable.Image
                        ref={this.props.visualProp}
                        source={src}
                        style={styles.imageButton}
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
        flexWrap: 'wrap',
    },
    imageButton: {
        width: 180,
        height: 140,
        flex: 1,
        flexWrap: 'wrap',
    },
    button: {
        paddingLeft: 50,
        paddingRight: 50
    }
})

export default Options;