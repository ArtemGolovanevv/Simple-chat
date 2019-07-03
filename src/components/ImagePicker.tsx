import React, {Component} from 'react'
import ImagePicker from 'react-native-image-picker'
import {Icon} from "react-native-elements";
import {View, Image, Text, Button, Alert, StyleSheet} from "react-native";

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

interface IContainerState {
    imageViewerVisible: boolean,
    startIndex: number,
    modalImageViewerImages: IMessageItemImage[],
    images: IMessageItemImage[],
}

interface IDefaultButtonOwnProps {
    text?: string,
    label: string,
    onChangeText?: (a: string) => void,
    onFocus: () => void,
    onBlur: () => void,
    leftIcon?: IconProps,
    noMarginBottom?: boolean,
    images: IMessageItemImage[],
}

type ISubtaskInputLoadFileProps = IDefaultButtonOwnProps;

class SubtaskInputLoadFile extends React.Component<ISubtaskInputLoadFileProps, IContainerState> {
    public static defaultProps: Partial<IDefaultButtonOwnProps> = {
        onChangeText: () => null,
        text: '',
        leftIcon: undefined,
        noMarginBottom: false,
    };

    constructor(props: ISubtaskInputLoadFileProps) {
        super(props);
        this.state = {imageViewerVisible: false, startIndex: 0, modalImageViewerImages: [], images: []};
    }

    public render(): React.ReactNode {
        const {imageViewerVisible, startIndex, modalImageViewerImages, images} = this.state;
        return (
            <View style={styles.mbd2}>
                <Text fontWeight={"bold"} fontSize={16} color={"#86939e"}>
                    Add the attachments
                </Text>
                <View style={styles.flatListWrapper}>

                    <Icon
                        name={"attachment"}
                        size={42}
                        onPress={this.showImagePicker}
                        containerStyle={styles.attachmentIconContainer}
                    />
                </View>
                <SubtaskImageModal dismissModal={this.dismissModal} imageViewerVisible={imageViewerVisible}
                                   images={modalImageViewerImages} startIndex={startIndex}/>
            </View>
        );
    }

    private renderItem = ({item}: ListRenderItemInfo<IMessageItemImage>) => (
        <SubtaskInfoAttachment
            itemFormat={getElementFormat(item.uri)}
            key={item.uri}
            image={item}
            onPressImage={this.onPressImage}
            onPressDeleteIcon={this.onPressDeleteIcon}
        />
    );


    private onPressImage = (image: IMessageItemImage) => {
        this.setState({
            modalImageViewerImages: Array(image),
            imageViewerVisible: true,
        })
    };

    private keyExtractor = (item: IMessageItemImage) => item.uri;


    private onPressDeleteIcon = (image: IMessageItemImage) => {
        const {images} = this.state;
        const newImages = images.filter((item) => item.uri !== image.uri);
        this.setState({
            images: newImages,
        });
    };

    private dismissModal = () => {
        this.setState({imageViewerVisible: false})
    };

    private showImagePicker = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (!response.didCancel && !response.error && !response.customButton) {
                const source: IMessageItemImage = {uri: response.uri};
                const {images} = this.state;
                const newArray = images;
                newArray.push(source);
                this.setState({
                    images: newArray,
                })
            }
        });
    }
}

const styles = StyleSheet.create({
    attachmentIconContainer: {
        width: 55,
        height: 55,
        borderWidth: 2,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0,
    },
    flatListContentContainer: {
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    mbd2: {
        marginBottom: theme.defaultSize * 2
    },
    flatListWrapper: {
        flexDirection: 'row',
        marginTop: theme.defaultSize / 2,
        flex: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    }
});

export default SubtaskInputLoadFile;


// export default class ImagePickerView extends React.Component {
//     const options = {
//         title: 'Select attachment',
//         mediaType: 'mixed' as 'mixed',
//         videoQuality: 'high' as 'high',
//         takePhotoButtonTitle: 'Take Photo or Video',
//         storageOptions: {
//             skipBackup: true,
//             path: 'images',
//         },
//     };
//     private showImagePicker = () => {
//         ImagePicker.showImagePicker(options, (response) => {
//             if (!response.didCancel && !response.error && !response.customButton) {
//                 const source: IMessageItemImage = {uri: response.uri};
//                 const {images} = this.state;
//                 const newArray = images;
//                 newArray.push(source);
//                 this.setState({
//                     images: newArray,
//                 })
//             }
//         });
//     }
//
//
// }
//
//
//     return (
//
//
//         <View style={styles.container}>
//             <View style={styles.container}>
//                 {/*<Image
//           source={{ uri: this.state.filePath.path}}
//           style={{width: 100, height: 100}} />*/}
//                 <Image
//                     source={{
//                         uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
//                     }}
//                     style={{ width: 100, height: 100 }}
//                 />
//                 <Image
//                     source={{ uri: this.state.filePath.uri }}
//                     style={{ width: 250, height: 250 }}
//                 />
//                 <Text style={{ alignItems: 'center' }}>
//                     {this.state.filePath.uri}
//                 </Text>
//                 <Button title="Choose File" onPress={this.chooseFile.bind(this)} />
//             </View>
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });
