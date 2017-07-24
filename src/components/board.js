import React, { Component } from 'react';
import Tile from './tile';
import Score from './score';
import Spinner from './spinner';

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tiles: [],
			score: 0,
			show: false
		}

		this.flipped = 0;
		this.prevTile = '';
		this.firstTargetId = '';
		this.debounce = false;
		this.moves = 0;

		let screenWidth;
		if(window.innerWidth >= 640) {
			screenWidth = 640;
		} else {
			screenWidth = window.innerWidth;
		}

		this.boardStyle = {
			width: screenWidth + 'px',
			height: screenWidth + 'px'
		}

		this.tileClickHandler = this.tileClickHandler.bind(this);
		this.startNewGame = this.startNewGame.bind(this);
	}

	componentWillMount() {
		this.startNewGame()
	}

	componentWillReceiveProps(nextProps) {
		this.startNewGame()
 	}

	generateNumbers(size) {
		let generatedNumbers = Array.from(Array(size * size).keys());
		let sortedNumbers = [];

		for(let i = 0; i < (size * size) / 2; i++) {
			let randomNumber = Math.floor(Math.random() * generatedNumbers.length);
			let filteredNumbers = generatedNumbers[randomNumber];
			sortedNumbers.push(filteredNumbers);
			sortedNumbers.push(filteredNumbers);
			generatedNumbers.splice(randomNumber, 1)
		}

		sortedNumbers.sort(() => 0.5 - Math.random());
		let tiles = [];
		let classNames = 'tile';
		sortedNumbers.map(number => tiles.push({ value: number, classNames: classNames }))

		this.setState({
			tiles
		})
	}

	tileClickHandler(e) {
		if(!this.debounce && !e.currentTarget.classList.contains('matched') && this.firstTargetId !== e.currentTarget.getAttribute('id')) {
			e.currentTarget.classList.toggle('flipped', true);
			if(this.prevTile === '') {
					this.prevTile = e.currentTarget.getAttribute('data-value');
					this.firstTargetId = e.currentTarget.getAttribute('id');
			}
			this.flipped = this.flipped + 1;

			if(this.flipped === 2 && this.prevTile === e.currentTarget.getAttribute('data-value')) {
				this.debounce = true;
				let el = e.currentTarget;
				setTimeout(() => {
					el.classList.toggle('matched', true);
					document.getElementById(this.firstTargetId.toString()).classList.toggle('matched', true);
					this.flipped = 0;
					this.prevTile = '';
					this.firstTargetId = '';
					this.moves = this.moves + 1;
					this.debounce = false;
					this.setState({
						score: this.moves
					})
					if(this.checkForEnd(this.props.size)) {
						console.log('End of the GAME');
						console.log('Your scores: ' + this.moves);
					}
				}, 500)
			} else if (this.flipped === 2) {
				this.debounce = true;
				let el = e.currentTarget;
				setTimeout(() => {
					el.classList.toggle('flipped', false);
					document.getElementById(this.firstTargetId) && document.getElementById(this.firstTargetId).classList.toggle('flipped', false);
					this.flipped = 0;
					this.prevTile = '';
					this.firstTargetId = '';
					this.moves = this.moves + 1;
					this.debounce = false;
					this.setState({
						score: this.moves
					})
				}, 1000)
			}
		}
	}

	checkForEnd(size) {
		return document.getElementsByClassName('matched').length === size * size;
	}

	renderTiles() {
		let screenWidth;
		if(window.innerWidth >= 640) {
			screenWidth = 640;
		} else {
			screenWidth = window.innerWidth;
		}
		let tileSize = (screenWidth - 6 * this.props.size -17) / this.props.size;
		return this.state.tiles.map((tile, index) => <Tile key={ index } idx={ index } size={ tileSize } classNames={ tile.classNames } value={ tile.value } onClick={ this.tileClickHandler }/>)
	}

	startNewGame() {
		this.setState({
			score: 0,
			tiles: [],
			show: false
		})
		let oldTiles = document.querySelectorAll('.tile');
		for (let tile of oldTiles) {
		  tile.classList.remove('flipped')
		  tile.classList.remove('matched')
		}
		this.flipped = 0;
		this.prevTile = '';
		this.firstTargetId = '';
		this.moves = 0;
		this.debounce = false;
		setTimeout(function() {
			this.generateNumbers(this.props.size);
			this.setState({show: true});
		}.bind(this), 1000);
		// setTimeout(() => this.generateNumbers(this.props.size), 500)
	}

	renderSpinner() {
		let spinnerSize = window.innerWidth * 0.1;
		return <Spinner size={ spinnerSize }/>;
	}

  render() {
    return (
			<div className="game-wrapper">
				<Score value={ this.state.score } size={ this.checkForEnd(this.props.size) && this.props.size } />
				<div className="board" style={ this.boardStyle }>
					{ this.state.show ? this.renderTiles() : this.renderSpinner()}
				</div>
				<button onClick={ this.startNewGame }>New Game</button>
			</div>
    );
  }
}

export default Board;
