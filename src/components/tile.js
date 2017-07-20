import React, { Component } from 'react';

class Tile extends Component {
	constructor(props) {
		super(props);

    this.tileStyle = {
      width: this.props.size + 'px',
      height: this.props.size + 'px',
      lineHeight: this.props.size + 'px',
      fontSize: this.props.size * 0.6 + 'px'
    }
  }


  renderTile() {
    return (
      <div id={ this.props.idx } style={ this.tileStyle } className={ this.props.classNames } onClick={ this.props.onClick } data-value={ this.props.value }>
        <figure className="avers">
          {/* <img src="" alt={value} width="50" height="50" /> */}
          { this.props.value }
        </figure>
        <figure className="revers">
          {/* <img src="" alt={value} width="50" height="50" /> */}
        </figure>
      </div>
    )
  }

  render() {
    return (
      this.renderTile()
    );
  }
}

export default Tile;
