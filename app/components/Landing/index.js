import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    Button,
    StyleSheet,
    Image
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import Home from '../Home/Home';

const babyImage = require('../../../assets/cryingBaby.png');
const mouse = require('../../../assets/mouse.png');
const train = require('../../../assets/train.png');
const pizza = require('../../../assets/pizza.png');
const airplane = require('../../../assets/airplane.png');
const snake = require('../../../assets/snake.png');
const backgroundImage = require('../../../assets/background.png');
const logo = require('../../../assets/logo.png');

class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageIndex: 0,
            images: [babyImage, mouse, train, pizza, airplane, snake],
        };
  }

    tick() {
        if (this.state.imageIndex >= 5) {
            this.setState(() => ({
                imageIndex: 0
            }));
        }
        else{
            this.setState((prevState) => ({
                imageIndex: prevState.imageIndex + 1
            }));
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

     _navigateHome() {
        this
            .props
            .navigator
            .push({component: Home, title: "Home", navigationBarHidden: true})
    }

    render() {
        return (
            <Image source={backgroundImage} style={styles.container}>
                <Image source={logo} style={styles.logoStyle} resizeMode={"contain"}/>
                <Animatable.Image source={this.state.images[this.state.imageIndex]} style={styles.imageStyle} resizeMode={"contain"}/>
                <TouchableOpacity onPress={()=> this._navigateHome()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Demo</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Work with Student</Text>
                    </View>
                </TouchableOpacity>
            </Image>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: 'white'
    },
    button: {
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0,
        borderRadius: 80,
        marginBottom: 20,
        alignSelf: 'center',
        paddingLeft: 50,
        paddingRight: 50,
        justifyContent: 'center',
        backgroundColor: '#5CC8FF'
    },
    buttonText: {
        color: 'white',
        fontSize: 24
    },
    imageStyle: {
        width: 220,
        height: 120,
        alignSelf: 'center',
        flexWrap: 'wrap',
        marginBottom: 100,
        justifyContent: 'flex-start',
    },
    logoStyle: {
        alignSelf: 'center',
        marginBottom: 80
    }
})


export default LandingPage;