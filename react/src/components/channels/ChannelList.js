import React, { Component } from "react";
import PropTypes from "prop-types";
import Channels from "./Channels";
class ChannelList extends Component {
  render() {
    return (
      <ul>
        {this.props.channels.map(chan => (
          <Channels key={chan.id} channel={chan} {...this.props} />
        ))}
      </ul>
    );
  }
}
ChannelList.propTypes = {
  channels: PropTypes.array.isRequired,
  setChannel: PropTypes.func.isRequired,
  activeChannel: PropTypes.object.isRequired
};
export default ChannelList;
