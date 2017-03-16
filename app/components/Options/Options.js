import React, { Component } from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';
class Options extends Component {
    constructor(props){
        super(props);
    }

    getImageSrc(visualProp){
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
                return require('../../../assets/snake.png');
        }
    }
    render() {
        let src = this.getImageSrc(this.props.visualProp);
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.props.onSelected(this.props.sound)}
                    soundIndex={this.props.sound}
                    key={this.props.sound}
                    color="#841584"
                    accessibilityLabel="Symbol select"
                    style={styles.button}>
                    <Image
                        source={src}
                        style={styles.imageButton}
                        resizeMode={"contain"}
                    />
                </TouchableOpacity>
            </View>
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
        flexWrap: 'wrap'
    },
    button: {
        paddingLeft: 50,
        paddingRight: 50,
    }
})

export default Options;