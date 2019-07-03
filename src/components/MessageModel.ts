import IMessageItemImage from './Graphic'
    export default interface MessageModel {
        firstName: string,
        lastName: string,
        message?: string,
        avatar: string,
        isMe: boolean,
        isShowAvatar: boolean,
        graphicMaterial: IMessageItemImage[],
        getFullName: (first: string, last: string) => string
        getInitial: (first: string, last: string) => string

    }
