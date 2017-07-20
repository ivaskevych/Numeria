import React, { Component } from 'react';
import Board from './components/board';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 4
    }
    this.changeBoardSize = this.changeBoardSize.bind(this);
  }

  changeBoardSize(e) {
      this.setState({size: e.target.value});
  }

  render() {
    return (
      <div className="App">
        <select name="size" id="size" value={this.state.size} onChange={ this.changeBoardSize }>
          <option value="2">4</option>
          <option value="4">16</option>
          <option value="6">36</option>
          <option value="8">64</option>
        </select>
        <Board size={ this.state.size }/>
      </div>
    );
  }
}

export default App;
