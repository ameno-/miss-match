import React, { Component } from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    TouchableOpacity
} from 'react-native';
class StudentItem extends Component {
    render() {
        let {studentName, teacherName, id} = this.props

        return (
            <TouchableOpacity onPress={() => this.props.select({studentName, teacherName, id})}>
                <View style={styles.studentItemContainer}>
                    <Text style={styles.studentNameText}>
                        {studentName}
                    </Text>
                    <Text style={styles.teacherNameText}>
                        {teacherName}
                    </Text>
                </View>
            </TouchableOpacity>
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

// const mapStateToProps = (store) => {
//    return { 
//        students: store.students
//    }
// }


export default StudentItem;