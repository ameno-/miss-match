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
    constructor(props, context){
         super(props, context);
    }

    render() {
        // let historyData = getStudentHistoryAsync(this.props.studentId);
        // console.log(historyData);
        return (
            <View>

                    <Text>My nigga</Text>

            </View>
        );
    }
}

export default HistoryList;