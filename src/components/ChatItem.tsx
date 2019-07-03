import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import AvatarIcons from './AvatarIcons'
import MessageModel from './MessageModel'

type IChatMessageComponentProps = MessageModel

export default class ChatItem extends Component <IChatMessageComponentProps> {

    private _onLongPress = () => {
       const {item, deleteItem} = this.props;
       deleteItem(item);
    };
    public render() {
        const {item } = this.props
        // const invertStyle = isMe ? styles.textContainerRight : styles.textContainerLeft
        return(

            <View style = {styles.messagesContainer}>
                {/*showAvatar or not ( {this.showAvatarOrNoT(message)})*/}
                <View style = {[styles.textContainer,]}>
                    <TouchableOpacity
                        onLongPress = {this._onLongPress}
                    >
                        <Text style = {styles.sender}>
                            {item.firstName}, {item.lastName}
                        </Text>

                        {item.images ?
                        <Image
                        source={{uri: item.images}}
                        style={{width: 200, height: 200}}


                        /> : null}

                        <Text style = {styles.message}>
                            {item.message}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    messagesContainer: {
        flexDirection: 'row',
        padding: 20,
    },
    textContainer: {
        flexDirection: 'column',
        marginLeft: 5,
        height: 'auto',
        width: 'auto',
        justifyContent:'center',
        alignItems: 'center',
        marginRight: 100,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
       // borderWidth: 1,
        backgroundColor: '#d5d8d4',
    },
    textContainerLeft: {
        alignItems: 'flex-start',
        backgroundColor: '#d5d8d4',
    },
    textContainerRight: {
        alignItems: 'flex-end',
        backgroundColor: '#66db30',
    },
    sender: {
        fontWeight: 'bold',
        paddingRight: 10,
    },
    message: {
        fontSize: 16,
    },
})
