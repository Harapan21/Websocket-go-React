import React, { Component } from "react";
import ChannelSection from "../channels/ChannelSection";

export default class User extends Component {
  constructor() {
    super();
    this.socket = new WebSocket("ws://localhost:8080/echo");
  }
  state = {
    channels: [],
    activeChannel: {},
    connected: false
  };
  componentDidMount() {
    this.socket.onopen = () => {
      this.setState({ connected: true });
    };
    this.getchannel();
  }
  componentWillUnmount() {
    this.getchannel();
  }
  getchannel = () => {
    this.socket.onmessage = e => {
      const { channels } = this.state;

      channels.push({ id: channels.length, name: JSON.parse(e.data) });
      this.setState({ channels });
    };
  };
  addChannel = name => {
    // let { channels } = this.state;
    // channels.push({ id: channels.length, name });
    this.socket.send(name);
    // this.setState({ channels });
  };
  setChannel = activeChannel => {
    this.setState({ activeChannel });
  };
  render() {
    return (
      <ChannelSection
        addChannel={this.addChannel}
        setChannel={this.setChannel}
        {...this.state}
      />
    );
  }
}
