import React from 'react';

export default class MessageablePage extends React.Component {
  constructor(props){
    super(props);
  }

  showMessage(message, type) {
    if(typeof this.messenger !== 'undefined'){
      this.messenger.sendMessage({
        text: message,
        open: true,
        type: type
      });
    }
  }

  subscribe(sender) {
    this.messenger = sender;
  }
}
