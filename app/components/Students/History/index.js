import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native';

import {Col, Row, Grid} from "react-native-easy-grid";

import {getStudentHistoryAsync} from '../../../db';

class HistoryList extends Component {
    constructor() {
        super();

        this.state = {
            historyData: 'Nothing found',
            correctCellStyle: [styles.cellDefault, styles.cellCorrect],
            wrongCellStyle: [styles.cellDefault, styles.cellWrong],
        }
    }
    componentDidMount() {
        getStudentHistoryAsync(this.props.student.id).then(result => {
            //console.log(result);
            this.setState({
                historyData: JSON.parse(result)
            })
        });
    }

    buildGridGroups() {
        let train = [];
        let airplane = [];
        let mouse = [];
        let baby = [];
        let snake = [];
        let pizza = [];

        this.state.historyData.forEach(function (item) {
            switch (item.correctAnswer) {
                case "train":
                    train.push(item);
                    break;
                case "airplane":
                    airplane.push(item);
                    break;
                case "train":
                    train.push(item);
                    break;
                case "baby":
                    baby.push(item);
                    break;
                case "mouse":
                    mouse.push(item);
                    break;
                case "pizza":
                    pizza.push(item);
                    break;
                case "snake":
                    snake.push(item);
                    break;
            }
        });
    }

    render() {
        // if (answerIndex === correctIndex) && answerIndex === i : return correct cell
        // else if answerIndex === i : return wrongCell style
        // else do Nothing

        const renderRow = (rowData) => {
            return rowData.map((item, i) => {
                if ((item.correctAnswer === item.selectedAnswer) && this.props.visualProps.indexOf(item.selectedAnswer) === i) {
                    return(
                        <Col>
                            <View style={styles.cellCorrect}>
                            </View>
                        </Col>
                    )
                } else if(this.props.visualProps.indexOf(item.selectedAnswer) === i) {
                    return(
                        <Col>
                            <View style={styles.cellWrong}>
                            </View>
                        </Col>
                    )
                } else {
                    return(
                        <Col>
                            <View style={styles.cellDefault}>
                            </View>
                        </Col>
                    )
                }
            })
        }
        const {student} = this.state;
        const renderHistory = () => {
            console.log(this.state.historyData);
            if (this.state.historyData != 'Nothing found') {
                return this
                    .state
                    .historyData
                    .map((item, i) => {
                        //ounds: ["ah", "ee", "oo", "m", "s", "sh"],
                        return (
                            <Grid key={i} style={styles.mainGrid}>
                                <Row style={styles.topRow}>
                                    <Col></Col>
                                    <Col>
                                        <Text style={{textAlign: 'center'}}>Ling sound: "ah"</Text>
                                    </Col>
                                    <Col>
                                        <Text>Ling sound: "ee"</Text>
                                    </Col>
                                    <Col>
                                        <Text>Ling sound: "oo"</Text>
                                    </Col>
                                    <Col>
                                        <Text>Ling sound: "m"</Text>
                                    </Col>
                                    <Col>
                                        <Text>Ling sound: "s"</Text>
                                    </Col>
                                    <Col>
                                        <Text>Ling sound: "sh"</Text>
                                    </Col>
                                </Row>
                                <Col style={styles.leftCol}>
                                    <Row></Row>
                                    <Row>
                                        <Col>
                                            <Text>Ling sound: "ah"</Text>
                                        </Col>
                                        {renderRow([this.state.historyData])}
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Text>ling 2</Text>
                                        </Col>
                                        <Col style={styles.colBorder}>
                                            <View style={styles.cell}></View>
                                        </Col>
                                        <Col style={styles.colBorder}>
                                            <View style={styles.cell}></View>
                                        </Col>
                                        <Col style={styles.colBorder}>
                                            <View style={styles.cell}></View>
                                        </Col>
                                        <Col style={styles.colBorder}>
                                            <View style={styles.cell}></View>
                                        </Col>
                                        <Col style={styles.colBorder}>
                                            <View style={styles.cell}></View>
                                        </Col>
                                        <Col style={styles.colBorder}>
                                            <View style={styles.cell}></View>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Text>ling 3</Text>
                                    </Row>
                                    <Row>
                                        <Text>ling 4</Text>
                                    </Row>
                                    <Row>
                                        <Text>ling 5</Text>
                                    </Row>
                                    <Row>
                                        <Text>ling 6</Text>
                                    </Row>
                                </Col>
                            </Grid>

                        // <Text key={i}>     Student name: {student.studentName}~{"\n"}     Displayed
                        // sounds: {item.displayedSounds} {"\n"}     Selected answer:
                        // {item.selectedAnswer} {"\n"}     Correct answer:
                        // {item.correctAnswer}{"\n"}{"\n"}{"\n"} </Text>
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
    mainGrid: {
        marginTop: 100
    },
    topRow: {
        backgroundColor: '#D0D5E5',
        padding: 10,
        
    },
    leftCol: {
        backgroundColor: 'white',
        borderRightWidth: 0.5,
        borderRightColor: 'black' 
    },
    colBorder: {
        borderRightWidth: 0.5,
        borderRightColor: 'black',
    },
    cellWrong: {
        height: 10,
        backgroundColor: 'red',
    },
    cellCorrect: {
        height: 10,
        backgroundColor: 'green',
    },
    cellDefault: {
        height: 10,
        backgroundColor: 'white',
    },
})

export default HistoryList;