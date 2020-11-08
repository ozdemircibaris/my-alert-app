import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './src/reducers/rootReducer';
import { RouterComp } from './src/router';

export default class App extends Component {
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