import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './src/reducers/rootReducer';
import { RouterComp } from './src/router';
import messaging from '@react-native-firebase/messaging';

export default class App extends Component {

  componentWillMount() {

    // Check whether an initial notification is available
    this.requestUserPermission()
  }
  async requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus);
      messaging().getToken().then((token) => {
        console.log('token', token)
      })
    }
  }
  render() {
    const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk))
    return (
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <RouterComp />
      </Provider>
    )
  }
}