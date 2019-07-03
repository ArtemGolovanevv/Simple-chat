
import React, {Component} from 'react'
import {View,
        StyleSheet,
        FlatList,
        Keyboard,
        TouchableWithoutFeedback, Alert} from 'react-native'
import ChatItem from './ChatItem'
import MessageModel from './MessageModel'
import isIphoneX from './isIphoneXFamily'
import TextInputView from './TextInput'
import IMessageItemImage from '../trash/Graphic'
import ImagePicker from 'react-native-image-picker'


interface IChatMessageItem {
    message: string,
    firstName: string,
    lastName: string,
    images: string

    //IMessageItemImage[],
    // imageViewerVisible: boolean,
    // startIndex: number,
    // modalImageViewerImages: IMessageItemImage[],
    // images: IMessageItemImage[],
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
            lastName: 'some',
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

    const options = {
    title: 'Select attachment',
    mediaType: 'mixed' as 'mixed',
    videoQuality: 'high' as 'high',
    takePhotoButtonTitle: 'Take Photo or Video',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class ChatView extends Component <IChatMessageComponentProps, IChatViewStateProps> {
    public static defaultProps: Partial<IChatMessageComponentProps> = {
        message: '',
        isMe: false,
        firstName: 'Test',
        lastName: 'Chat',
        images: ''
    };

    public constructor(props: IChatMessageComponentProps) {
        super(props);
        this.state = {
            chatMessages: tmpData,
            chatInputText: '',
        }
    };

    private onIconPressed = () => {
        const {chatMessages } = this.state;
        const chatMessagesNew = chatMessages.slice()
        ImagePicker.showImagePicker (options, response => {
            if (response.uri) {
                chatMessagesNew.push({
                        firstName: 'Test',
                        lastName: 'Chat',
                        images: response.uri,
                        message: ''
                })
                this.setState({chatMessages: chatMessagesNew})
            }
            Alert.alert('alert', response.uri)
            console.log(chatMessagesNew)
        })
    }

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
            lastName: 'Chat',
            message: chatInputText,
            images: ''

            //date: new Date()
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

    renderChatItem = (item, index) => (
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
                       onIconPressed = {this.onIconPressed}
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

// private showImagePicker = () => {
//     ImagePicker.showImagePicker(options, (response) => {
//         if (!response.didCancel && !response.error && !response.customButton) {
//             const source: IMessageItemImage = {uri: response.uri};
//             const {images} = this.state;
//             const newArray = images;
//             newArray.push(source);
//             this.setState({
//                 images: newArray,
//             })
//         }
//     });
// }