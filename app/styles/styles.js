import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
     container: {
        flex: 1,
        justifyContent:'flex-start', 
        alignItems:'stretch',
    },
    topBar: {
        padding: 16,
        paddingTop: 28,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#3DC64F'
    },
    topBarRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    topBarLeft: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 30
    },
    topBarText: {
        color: 'white',
        fontSize: 16
    }
})