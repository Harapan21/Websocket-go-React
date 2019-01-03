import React, { Component } from "react";
import PropTypes from "prop-types";
class ChannelForm extends Component {
  state = {
    channelName: ""
  };
  onChange = e => {
    this.setState({ channelName: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const node = this.refs.channel;
    const channelName = node.value;
    this.props.addChannel(channelName);
    this.setState({ channelName: "" });
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <input
            style={{
              boxShadow:
                "0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)",
              border: "0",
              padding: "10px",
              width: "100%",
              borderRadius: "5px",
              fontFamily: "Sans-serif",
              fontSize: "12pt",
              fontWeight: "500"
            }}
            type="text"
            ref="channel"
            onChange={this.onChange}
            value={this.state.channelName}
          />
        </div>
      </form>
    );
  }
}
ChannelForm.propTypes = {
  addChannel: PropTypes.func.isRequired
};
export default ChannelForm;
