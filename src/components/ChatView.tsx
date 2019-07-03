
import React, {Component} from 'react'
import {View,
        StyleSheet,
        FlatList,
        Keyboard,
        TouchableWithoutFeedback} from 'react-native'
import ChatItem from './ChatItem'
import MessageModel from './MessageModel'
import isIphoneX from './isIphoneXFamily'
import TextInputView from './TextInput'


interface IChatMessageItem {
    message: string,
    firstName: string,
    lastName: string,
    graphicItem: []
   // date: Date(),
}

interface IChatViewStateProps {
    chatMessages: IChatMessageItem[],
    chatInputText: string,
}
type IChatMessageComponentProps = MessageModel
    const HEADER_SIZE = isIphoneX() ? 25 : 0;
    const tmpData = [
        {
            firstName: 'Title 1',
            message: 'Message short 1. Short message.'
        },
        {
            firstName: 'Title 2',
            message: 'Message short 2. Short message.'
        },
        {
            firstName: 'Title 3',
            message: 'Message short 3. Short message.'
        },
    ];

export default class ChatView extends Component <IChatMessageComponentProps, IChatViewStateProps> {
    public static defaultProps: Partial<IChatMessageComponentProps> = {
        message: '',
        isMe: false,
        firstName: 'Test',
        lastName: 'Chat'
    };

    public constructor(props: IChatMessageComponentProps) {
        super(props);
        this.state = {
            chatMessages: tmpData,
            chatInputText: '',
        }
    };

    private _onTyping = (text) => {
        console.log('some text')
        this.setState({
            chatInputText: text,
        });
    };

    private onSendBtnPressed = () => {
        const { chatInputText, chatMessages } = this.state;
        const chatMessagesNew = chatMessages.slice();
        chatMessagesNew.push({
            firstName: 'Test',
            message: chatInputText,
            date: new Date()
        });
        this.setState({
            chatMessages: chatMessagesNew,
            chatInputText: ''

        })
    };

    private deleteItem = (item) => {
        const { chatMessages } = this.state;
        const itemIndex = chatMessages.findIndex((message) => message.message === item.message);
        if (itemIndex !== -1) {
            chatMessages.splice(itemIndex, 1);
            const newChatMessages = chatMessages.slice()
                this.setState({
                chatMessages: newChatMessages,
            })
        }
    };

    renderChatItem = (item) => (
        <ChatItem
        item={item}
        deleteItem={this.deleteItem}
        />
    );

    private keyExtractor = (item, index) => index;

    render() {
        const { firstName, lastName, message, isMe, avatar, isShowAvatar} = this.props
        const { chatInputText, chatMessages } = this.state
        return (
            <View style ={styles.container} >
                <FlatList
                    data = {chatMessages}
                    keyExtractor={this.keyExtractor}
                    renderItem={({item, index}) => this.renderChatItem(item, index)}
                />
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                >
                   <TextInputView
                       onSendBtnPressed={this.onSendBtnPressed}
                       _onTyping={this._onTyping}
                       chatInputText={chatInputText}
                       HEADER_SIZE={HEADER_SIZE}
                   />
                </TouchableWithoutFeedback>

            </View>

        );
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#232740',
    },
});
