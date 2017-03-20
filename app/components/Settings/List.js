import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native';
class List extends Component {
    render() {
        let {items} = this.props;

        const renderList = () => {
            return items.map((item, i) => {
                return (
                    <TouchableOpacity onPress={() => this.props.handlePress(item.title)} key={i} style={styles.buttonStyle}>
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
                <TouchableOpacity onPress={() => this.props.handlePress("sequence")} style={styles.buttonStyle}>
                        <View style={styles.listContainer}>
                            <Text style={styles.listItemTitle}>
                                Sequence
                            </Text>
                        </View>
                    </TouchableOpacity>
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
    },
    buttonStyle: {
        marginTop: 40
    }
});

export default List;