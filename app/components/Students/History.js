import React, { Component } from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";

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
        const renderHistory = () => {
            if (this.state.historyData != 'Nothing found') {
                return this.state.historyData.map((item, i) => {
                    return (
                            <Grid key={i}>
                                <Row style={styles.topRow}>
                                    <Col></Col>
                                    <Col><Text>ling 1</Text></Col>
                                    <Col><Text>ling 2</Text></Col>
                                    <Col><Text>ling 3</Text></Col>
                                    <Col><Text>ling 4</Text></Col>
                                    <Col><Text>ling 5</Text></Col>
                                    <Col><Text>ling 6</Text></Col>
                                </Row>
                                <Col style={styles.leftCol}>
                                    <Row></Row>
                                    <Row>
                                        <Col>
                                            <Text>ling 1</Text>
                                        </Col>
                                        <Col><Text>Da ansa</Text></Col>
                                        <Col><Text>Da ansa2</Text></Col>
                                        <Col><Text>Da ansa3</Text></Col>
                                        <Col><Text>Da ansa4</Text></Col>
                                        <Col><Text>Da ansa5</Text></Col>
                                        <Col><Text>Da ansa6</Text></Col>
                                    </Row>
                                    <Row><Text>ling 2</Text></Row>
                                    <Row><Text>ling 3</Text></Row>
                                    <Row><Text>ling 4</Text></Row>
                                    <Row><Text>ling 5</Text></Row>
                                    <Row><Text>ling 6</Text></Row>
                                </Col>
                            </Grid>

                        // <Text key={i}>
                        //     Student name: {student.studentName}~{"\n"}
                        //     Displayed sounds: {item.displayedSounds} {"\n"}
                        //     Selected answer: {item.selectedAnswer} {"\n"}
                        //     Correct answer: {item.correctAnswer}{"\n"}{"\n"}{"\n"}
                        // </Text>
                    );
                });
            }
        }
        return (
             <ScrollView automaticallyAdjustContentInsets={false}>
                {renderHistory()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    topRow: {
        backgroundColor: 'red'
    },
    leftCol: {
        backgroundColor: 'blue'
    }
})

export default HistoryList;