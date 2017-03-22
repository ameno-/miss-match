import React, { Component } from 'react';
import {
    Text,
    View, 
    TouchableHighlight, 
    StyleSheet, 
    StatusBar, 
    TextInput, 
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import StudentItem from './StudentItem';
import Home from '../Home/Home';
import HistoryList from './History/';

import { setStudent } from '../../actions';

class Students extends Component {
    constructor(props, context) {
        super(props, context);
        this._navigateHome = this._navigateHome.bind(this);
        this._navigateHistory = this._navigateHistory.bind(this);
        this.addNewStudent = this.addNewStudent.bind(this);
        this.selectStudent = this.selectStudent.bind(this);
        this.state = {
            studentName: "",
            teacherName: ""
        };
    }
  
    _navigateHome() {
        this.props.navigator.pop();
        //this.props.navigator.resetTo({component: Home, title: "home", navigationBarHidden: true})
        console.log(Home);
    }

    _navigateHistory() {
        this.props.navigator.push({component: HistoryList, title: this.props.currentStudent.studentName, navigationBarHidden: false, passProps: {student: this.props.currentStudent, visualProps: this.props.visualProps}})
    }

    addNewStudent() {
        if(this.state.studentName && this.state.studentName != "") {

            this.props.dispatch({type: "ADD_STUDENT",
                studentName: this.state.studentName,
                teacherName: "Yomna"
            });

            this.setState({
                studentName: ""
            });
        }
    }

selectStudent(selected) {   
    this.props.dispatch(setStudent({
        studentName: selected.studentName, 
        teacherName: selected.teacherName, 
        id: selected.id
    }));

    this._navigateHome();
}
    render() {
        const renderStudens = () => {
            return this.props.students.map(student => {
                return (
                    <StudentItem studentName={student.studentName} teacherName={student.teacherName} key={student.id} id={student.id} select={this.selectStudent}/>
                )
            })
        }

        const chartIcon = (<Icon name="chart" size={20} color="white" />)
        const homeIcon = (<Icon name="home" size={20} color="white" />)

        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <View style={styles.topBarLeft}>
                        <TouchableOpacity onPress={this._navigateHome}>
                            <Text>{homeIcon}</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.title}>Students</Text>

                    <View style={styles.topBarRight}>
                        <TouchableOpacity onPress={this._navigateHistory}>
                            <Text>{chartIcon}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        onSubmitEditing={this.addNewStudent}
                        onChange={(event) => {
                            this.setState({
                                studentName: event.nativeEvent.text
                            });
                        }}
                        value={this.state.studentName}
                        placeholder="Enter student name"
                        returnKeyType="done"
                        style={styles.input} />
                </View>
                <ScrollView automaticallyAdjustContentInsets={false}>
                    {renderStudens()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
     container: {
        flex: 1,
        justifyContent:'flex-start', 
        alignItems:'stretch',
    },
    topBar: {
        padding: 16,
        paddingTop: 50,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#7CC6FE',
    },
    topBarRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    topBarLeft: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 30
    },
    topBarText: {
        color: 'white',
        fontSize: 16
    },
    inputContainer: {
        padding: 8,
        paddingTop: 10,
        backgroundColor: '#5DFDCB'
    },
    input: {
        height: 30,
        padding: 4,
        paddingLeft: 8,
        borderRadius: 8,
        backgroundColor: 'white'
    }
})

const mapStateToProps = (store) => {
   return { 
       students: store.students,
       currentStudent: store.currentStudent
   }
}

module.exports = connect(mapStateToProps)(Students);