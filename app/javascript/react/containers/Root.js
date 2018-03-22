import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ChatApp from './ChatApp';
import configureStore from '../store/configureStore';
import {setMessages, addMessage} from '../actions/chat'

const store = configureStore();

class Root extends Component {

  componentWillMount() {

    store.dispatch(setMessages(this.props.messages));
    if (typeof App !== 'undefined'){
      App.room = App.cable.subscriptions.create("RoomChannel", {
        connected: function() {},
        disconnected: function() {},
        received: function(data) {
          return store.dispatch(addMessage(data['message']));
        },
        speak: function(message) {
          return this.perform('speak', {
            message: message
          });
        }
      });
    }
  }

  render() {
    return (
      <Provider store={store}>
        <ChatApp />
      </Provider>
    );
  }
}

export default Root
