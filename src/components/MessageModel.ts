import IMessageItemImage from '../trash/Graphic'
    export default interface MessageModel {
        firstName: string,
        lastName: string,
        message?: string,
        avatar: string,
        isMe: boolean,
        isShowAvatar: boolean,
        images: string,
        getFullName: (first: string, last: string) => string,
        getInitial: (first: string, last: string) => string,

    }
