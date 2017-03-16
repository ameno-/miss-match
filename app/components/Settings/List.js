import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native';
class List extends Component {
    render() {
        let {items} = this.props;

        const renderList = () => {
            return items.map((item, i) => {
                return (
                    <TouchableOpacity onPress={() => this.props.handlePress(item.title)} key={i}>
                    <View style={styles.listContainer}>
                        <Text style={styles.listItemTitle}>
                            {item.title}
                        </Text>
                    </View>
                </TouchableOpacity>
                )
            })
        }

        return (
            <ScrollView automaticallyAdjustContentInsets={false}>
                {renderList()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginBottom: -1,
        borderColor: '#ccc',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    listItemTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    listItemSubTitleText: {
        color: '#808782'
    }
});

export default List;