import React, { Component } from 'react';
import { 
    StyleSheet, 
    View, 
    Text 
} from 'react-native';
class StudentItem extends Component {
    render() {
        return (
            <View style={styles.studentItemContainer}>
                <Text style={styles.studentNameText}>
                    {this.props.studentName}
                </Text>
                <Text style={styles.teacherNameText}>
                    {this.props.teacherName}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    studentItemContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginBottom: -1,
        borderColor: '#ccc',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    studentItemText: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    teacherNameText: {
        color: '#808782'
    }
})

export default StudentItem;