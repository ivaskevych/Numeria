import React, { Component } from 'react';

class Spinner extends Component {
	constructor(props) {
		super(props);

    this.spinnerStyle = {
      width: this.props.size + 'px',
      height: this.props.size + 'px'
    }
  }

  render() {
    return (
      <div className="spinner" style={ this.spinnerStyle }></div>
    );
  }
}

export default Spinner;
