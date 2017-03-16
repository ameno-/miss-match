import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View, Image, Alert} from 'react-native';

import SettingsList from 'react-native-settings-list';

import { setLingSoundCount, resetStore } from '../../actions';
import List from './List';

class Settings extends Component {
    constructor(props, context) {
        super(props, context);

        this.onValueChange = this.onValueChange.bind(this);

        this.updateLingSoundCount = this.updateLingSoundCount.bind(this);

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
                            icon={< Image style = {
                            styles.imageStyle
                        }
                        source = {
                            require('./images/blutooth.png')
                        } />}
                            title='Blutooth'
                            titleInfo='Off'
                            titleInfoStyle={styles.titleInfoStyle}
                            onPress={() => Alert.alert('Route to Blutooth Page')}/>
                        <SettingsList.Item
                            icon={< Image style = {
                            styles.imageStyle
                        }
                        source = {
                            require('./images/cellular.png')
                        } />}
                            title='Cellular'
                            onPress={() => Alert.alert('Route To Cellular Page')}/>
                        <SettingsList.Item
                            icon={< Image style = {
                            styles.imageStyle
                        }
                        source = {
                            require('./images/hotspot.png')
                        } />}
                            title='Personal Hotspot'
                            titleInfo='Off'
                            titleInfoStyle={styles.titleInfoStyle}
                            onPress={() => Alert.alert('Route To Hotspot Page')}/>
                        <SettingsList.Header
                            headerStyle={{
                            marginTop: 15
                        }}/>
                        <SettingsList.Item
                            icon={< Image style = {
                            styles.imageStyle
                        }
                        source = {
                            require('./images/notifications.png')
                        } />}
                            title='Reset options'
                            onPress={() => this.props.dispatch(resetStore())}/>
                        <SettingsList.Item
                            title='Control Center'
                            onPress={() => Alert.alert('Route To Control Center Page')}/>
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
    return {visualProp: store.visualProp, displayedSounds: store.displayedSounds, manualTestIndex: store.manualTestIndex, lingSoundCount: store.lingSoundCount}
}

module.exports = connect(mapStateToProps)(Settings)