import React, {Component} from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'
import {NavigationInjectedProps} from "react-navigation";

type IHomeViewWrapperProps = NavigationInjectedProps

export default class HomeView extends Component <IHomeViewWrapperProps> {
    render() {
        return (
              <View style = {styles.mainStyle}>
                <Text>
                    There will be contacts table. In future.
                </Text>
                <Button onPress={() =>this.props.navigation.navigate('ChatView')} title="go Chat"/>
            </View>        
        );
    };
};

const styles = StyleSheet.create ({

    mainStyle: {
        backgroundColor: '#332940',
        flex: 1
    }
});
