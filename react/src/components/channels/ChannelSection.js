import React, { Component } from "react";
import PropTypes from "prop-types";
import ChannelList from "./ChannelList";
import ChannelForm from "./ChannelForm";
export default class ChannelSection extends Component {
  render() {
    return (
      <div
        style={{
          boxShadow:
            "0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)",
          maxWidth: "400px",
          width: "100%",
          padding: "10px",
          borderRadius: "10px",
          position: "relative"
        }}
      >
        <div className="card-body">
          <h1
            style={{
              fontFamily: "Sans-serif",
              fontWeight: "300",
              fontSize: "15pt",
              marginBottom: "5px"
            }}
          >
            Chat Websocket
          </h1>
          <h3
            style={{
              fontFamily: "Sans-serif",
              fontWeight: "700",
              fontSize: "12pt",
              margin: "0",
              color: this.props.connected ? "green" : "red"
            }}
          >
            {this.props.connected ? "Connected" : "Disconnect"}
          </h3>
          <ChannelList {...this.props} />
          <ChannelForm {...this.props} />
        </div>
      </div>
    );
  }
}

ChannelSection.propTypes = {
  channels: PropTypes.array.isRequired,
  addChannel: PropTypes.func.isRequired,
  setChannel: PropTypes.func.isRequired,
  activeChannel: PropTypes.object.isRequired
};
