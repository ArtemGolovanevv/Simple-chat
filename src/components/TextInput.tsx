import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from "react-native";
import {Header} from "react-navigation";
import {Icon} from "react-native-elements";
import React from "react";

export const TextInputView = ({onSendBtnPressed, _onTyping, HEADER_SIZE, chatInputText, onIconPressed }) => {
    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset = {Header.HEIGHT + HEADER_SIZE}
            behavior = "padding" >
            <View style = {styles.inputBar}>
                <Icon
                    name={'attach-file'}
                    onPress={onIconPressed}
                   // style = {styles.iconStyle}
                />
                <TextInput
                    style = {styles.inputText}
                    keyboardAppearance = 'dark'
                    multiline = {true}
                    value={chatInputText}
                    //numberOfLine = {5}
                    onChangeText = {_onTyping}
                />
                <TouchableHighlight
                    style = {[styles.btn, ]}
                    onPress = {onSendBtnPressed}
                >
                    <Text>
                        Send
                    </Text>
                </TouchableHighlight>
            </View>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create ({

    inputBar: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: '#332940',
        maxHeight: 100
    },
    iconStyle: {
        //paddingHorizontal: 5,
        // paddingVertical: 10,
        // marginLeft: 5,
       // paddingLeft: 10,
        //paddingTop: 0

    },
    inputText: {
        borderRadius: 15,
        borderWidth: 1,
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flex: 1,
        marginLeft: 10,
        borderColor: 'black'
    },
    btn: {
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 15,
        marginLeft: 4,
        backgroundColor: '#232740',
        height: 35,
    },
});
export default TextInputView
