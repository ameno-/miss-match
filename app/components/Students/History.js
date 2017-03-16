import React, { Component } from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import { getStudentHistoryAsync } from '../../db';

class HistoryList extends Component {
    constructor() {
        super();

        this.state = {
            historyData: 'Nothing found'
        }
    }
    componentDidMount() {
        getStudentHistoryAsync(this.props.student.id).then(result => this.setState({
            historyData: JSON.parse(result)
        }))
    }

    render() {
        const {student} = this.state;
        console.log(this.state.historyData)
        const renderHistory = () => {
            if (this.state.historyData != 'Nothing found') {
                return this.state.historyData.map((item, i) => {
                    return (
                        <Text key={i}>
                            Student name: {this.props.student.studentName}~{"\n"}
                            Displayed sounds: {item.displayedSounds} {"\n"}
                            Selected answer: {item.selectedAnswer} {"\n"}
                            Correct answer: {item.correctAnswer}{"\n"}{"\n"}{"\n"}
                        </Text>
                    );
                });
            }
        }
        return (
             <ScrollView automaticallyAdjustContentInsets={false}>
               <Text>{renderHistory()}</Text>
            </ScrollView>
        );
    }
}

export default HistoryList;