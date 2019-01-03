import React, { Component } from "react";
import PropTypes from "prop-types";
class Channels extends Component {
  onClick = e => {
    e.preventDefault();
    const { setChannel, channel } = this.props;
    setChannel(channel);
  };
  render() {
    const { channel, activeChannel } = this.props;
    const active = channel === activeChannel ? "active font-weight-bold" : "";
    return (
      <li style={{ listStyle: "none" }}>
        <a
          className={`nav-link ${active}`}
          onClick={this.onClick}
          style={{ cursor: "pointer" }}
        >
          {channel.name}
        </a>
      </li>
    );
  }
}
Channels.propTypes = {
  channel: PropTypes.object.isRequired,
  setChannel: PropTypes.func.isRequired,
  activeChannel: PropTypes.object.isRequired
};

export default Channels;
