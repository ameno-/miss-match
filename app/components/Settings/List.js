import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
class List extends Component {
    render() {
        let {items} = this.props
        let listItems = items.map((item) => {
            return <Text style={styles.listItemTitle}>
                {item.title}
            </Text>
        })

        return (
            <TouchableOpacity onPress={() => this.props.handlePress}>
                <View style={styles.listContainer}>
                    {listItems}
                </View>
            </TouchableOpacity>
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