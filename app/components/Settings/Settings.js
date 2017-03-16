import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View, Image, Alert} from 'react-native';

import SettingsList from 'react-native-settings-list';

import { setLingSoundCount, resetStore, setTestIndex } from '../../actions';
import List from './List';

class Settings extends Component {
    constructor(props, context) {
        super(props, context);

        this.onValueChange = this.onValueChange.bind(this);

        this.updateLingSoundCount = this.updateLingSoundCount.bind(this);

        this.updateManualTestIndex = this.updateManualTestIndex.bind(this);

        this.state = {
            switchValue: false
        };
    }

    onValueChange(value) {
        this.setState({switchValue: value});
        console.log(this.state.switchValue)
    }

    updateLingSoundCount(newCount) {
        console.log(newCount)
        this.props.dispatch(setLingSoundCount(newCount));
        this.props.navigator.pop();
    }

    updateManualTestIndex(newIndex) {
        let i = this.props.visualProp.indexOf(newIndex);
        this.props.dispatch(setTestIndex(i));
        this.props.navigator.pop();
    }

    _navigateToLingSoundsPage() {
        //bad code. Improve it later my nigga.
        let maxSoundOptions = [1,2,3,4,5,6];
        let itemListProps = {};
        itemListProps.items = maxSoundOptions.map((item) => {
            return {title: item}
        });

        itemListProps.handlePress = this.updateLingSoundCount;

         this
            .props
            .navigator
            .push({component: List, title: "Number of Ling sounds", navigationBarHidden: false, passProps: itemListProps})
    }

    _navigateVisualPropsPage() {
        let itemListProps = {};
        itemListProps.items = this.props.visualProp.map((item) => {
            return {title: item}
        });

        itemListProps.handlePress = this.updateManualTestIndex;

         this
            .props
            .navigator
            .push({component: List, title: "Available visual props", navigationBarHidden: false, passProps: itemListProps})
    }

    render() {
        var bgColor = '#DCE3F4';
        return (
            <View
                style={{
                backgroundColor: '#EFEFF4',
                flex: 1
            }}>
                <View
                    style={{
                    borderBottomWidth: 1,
                    backgroundColor: '#f7f7f8',
                    borderColor: '#c8c7cc'
                }}>
                    <Text
                        style={{
                        alignSelf: 'center',
                        marginTop: 30,
                        marginBottom: 10,
                        fontWeight: 'bold',
                        fontSize: 16
                    }}>Settings</Text>
                </View>
                <View
                    style={{
                    backgroundColor: '#EFEFF4',
                    flex: 1
                }}>
                    <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                        <SettingsList.Header
                            headerStyle={{
                            marginTop: 15
                        }}/>
                        <SettingsList.Item
                            hasSwitch={true}
                            switchState={this.state.switchValue}
                            switchOnValueChange={this.onValueChange}
                            hasNavArrow={false}
                            title='Completely random?'/>
                        <SettingsList.Item
                            title='Number of Ling sounds'
                            titleInfo={(this.props.lingSoundCount).toString()}
                            titleInfoStyle={styles.titleInfoStyle}
                            onPress={() => this._navigateToLingSoundsPage()}/>
                        <SettingsList.Item
                            title='Test specific sound'
                            titleInfo={this.props.manualTestIndex != null ? this.props.visualProp[this.props.manualTestIndex] : "random"}
                            titleInfoStyle={styles.titleInfoStyle}
                            onPress={() => this._navigateVisualPropsPage()}/>
                        <SettingsList.Header
                            headerStyle={{
                            marginTop: 15
                        }} />
                        <SettingsList.Item
                            title='Reset options'
                            onPress={() => this.props.dispatch(resetStore())}/>
                    </SettingsList>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        marginLeft: 15,
        alignSelf: 'center',
        height: 30,
        width: 30
    },
    titleInfoStyle: {
        fontSize: 16,
        color: '#8e8e93'
    }
});

const mapStateToProps = (store) => {
    return {
        visualProp: store.visualProp, 
        displayedSounds: store.displayedSounds, 
        manualTestIndex: store.manualTestIndex, 
        lingSoundCount: store.lingSoundCount
    }
}

module.exports = connect(mapStateToProps)(Settings)