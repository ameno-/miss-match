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

import { setStudent } from '../../actions';

import Home from '../Home/Home';
import Students from '../Students/Students';

const babyImage = require('../../../assets/baby.png');
const mouse = require('../../../assets/mouse.png');
const train = require('../../../assets/train.png');
const pizza = require('../../../assets/pizza.png');
const airplane = require('../../../assets/airplane.png');
const snake = require('../../../assets/snake2.png');
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

     _navigateDemoMode() {

        let demoStudent = this.props.students.filter(function ( student ) {
            return student.studentName === 'demo';
        })[0];

        if (!demoStudent) {
            this.props.dispatch({type: "ADD_STUDENT",
                    studentName: "demo",
                    teacherName: "demo",
                    id: '0'
            });
        }

        this.props.dispatch(setStudent({
            studentName: "demo", 
            teacherName: "demo", 
            id: '0'
        }));
    
        this
            .props
            .navigator
            .push({component: Home, title: "Home", navigationBarHidden: true})
    }

    _navigateStudents() {
        this.props.navigator.replace({component: Home, title: "Home", navigationBarHidden: true})
        this.props.navigator.push({component: Students, title: "Students", navigationBarHidden: true})
    }

    render() {
        return (
            <Image source={backgroundImage} style={styles.container}>
                <Image source={logo} style={styles.logoStyle} resizeMode={"contain"}/>
                <Animatable.Image source={this.state.images[this.state.imageIndex]} style={styles.imageStyle} resizeMode={"contain"}/>
                <TouchableOpacity onPress={()=> this._navigateDemoMode()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Demo</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> this._navigateStudents()}>
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
        borderWidth: 0.5,
        borderRadius: 80,
        marginBottom: 20,
        alignSelf: 'center',
        paddingLeft: 50,
        paddingRight: 50,
        justifyContent: 'center',
        backgroundColor: '#7CC6FE',
        borderColor: '#5DFDCB'
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
        marginBottom: 160,
        justifyContent: 'flex-start',
    },
    logoStyle: {
        alignSelf: 'center',
        marginBottom: 80
    }
})

const mapStateToProps = (store) => {
   return { 
       students: store.students,
       currentStudent: store.currentStudent
   }
}

module.exports = connect(mapStateToProps)(LandingPage);