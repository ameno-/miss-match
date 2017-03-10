import React, { Component } from 'react';
import {
    Text,
    View, 
    TouchableHighlight, 
    StyleSheet, 
    StatusBar, 
    TextInput, 
    ScrollView,
    TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

import StudentItem from './StudentItem';

import { addStudent, setStudent } from '../actions';

class Students extends Component {
    constructor(props, context) {
        super(props, context);
        this._navigateHome = this._navigateHome.bind(this);
        this.addNewStudent = this.addNewStudent.bind(this);
        this.selectStudent = this.selectStudent.bind(this);
        this.state = {
            studentName: "",
            teacherName: ""
        };
    }
  
    _navigateHome() {
        this.props.navigator.pop();
    }

    addNewStudent() {
        if(this.state.studentName && this.state.studentName != "") {

            this.props.dispatch(addStudent({
                studentName: this.state.studentName,
                teacherName: "Yomna"
            }))

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

        this.props.navigator.pop();
    }
    render() {
        const renderStudens = () => {
            return this.props.students.map(student => {
                return (
                    <StudentItem studentName={student.studentName} teacherName={student.teacherName} key={student.id} id={student.id} select={this.selectStudent}/>
                )
            })
        }
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={this._navigateHome}>
                        <Text>Back Home</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Students</Text>
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
        flex:1, 
        justifyContent:'flex-start', 
        alignItems:'stretch',
    },
    topBar: {
        padding: 16,
        paddingTop: 28,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8DDCA4'
    },
    title: {
        color: 'white',
        fontSize: 30
    },
    inputContainer: {
        padding: 8,
        paddingTop: 10,
        backgroundColor: '#2ecc71'
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