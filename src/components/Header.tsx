import React from 'react'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import AvatarIcons from './AvatarIcons'
import HomeView from './HomeView'
import ChatView from './ChatView'


const MainNavigator = createStackNavigator({
    HomeView: {screen: HomeView, navigationOptions: {
      title: 'Home',
    }},
    ChatView: {screen: ChatView, navigationOptions: {
      title: 'Chat',
      headerRight: <AvatarIcons/>
    }}
  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#332940',
      },
    },
  });
  
  const AppContainer = createAppContainer(MainNavigator);

  export default AppContainer;
  