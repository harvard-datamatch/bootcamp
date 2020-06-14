import React from 'react';
import './CardViewer.css';

import { Link } from 'react-router-dom';

class CardViewer extends React.Component {
  constructor(props) {
    super(props);

    // we save cards into internal state, so we can change the order for shuffling
    // without affecting the actual ordering of the cards in the App component
    this.state = {
      cards: props.cards,
      currentIndex: 0,
      displayFront: true,
    };
  }

  handleKeyPress = event => {
    // left arrow
    if (event.keyCode === 37) {
      this.prevCard();
    }
    // right arrow
    else if (event.keyCode === 39) {
      this.nextCard();
    }
    // space
    else if (event.keyCode === 32) {
      this.flipCard();
    }
  };

  // reference: https://stackoverflow.com/questions/37440408/how-to-detect-esc-key-press-in-react-and-how-to-handle-it/46123962
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false);
  }

  nextCard = () => {
    if (this.state.currentIndex < this.state.cards.length - 1) {
      this.setState({
        currentIndex: this.state.currentIndex + 1,
        displayFront: true,
      });
    }
  };

  prevCard = () => {
    if (this.state.currentIndex > 0) {
      this.setState({
        currentIndex: this.state.currentIndex - 1,
        displayFront: true,
      });
    }
  };

  flipCard = () => this.setState({ displayFront: !this.state.displayFront });

  shuffleCards = () => {
    // before mutating state, always make a copy!
    const cards = this.state.cards.slice();

    // Durstenfeld shuffle from
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    this.setState({ cards });
  };

  render() {
    // this uses the ternary operator:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    const card = this.state.cards[this.state.currentIndex][
      this.state.displayFront ? 'front' : 'back'
    ];

    return (
      <div>
        <h2>Card Viewer</h2>
        Card {this.state.currentIndex + 1} out of {this.state.cards.length}.
        <div className="card" onClick={this.flipCard}>
          {card}
        </div>
        <br />
        <button
          disabled={this.state.currentIndex === 0}
          onClick={this.prevCard}
        >
          Prev card
        </button>
        <button
          disabled={this.state.currentIndex === this.state.cards.length - 1}
          onClick={this.nextCard}
        >
          Next card
        </button>
        <button onClick={this.shuffleCards}>Shuffle cards</button>
        <hr />
        <Link to="/editor">Go to card editor</Link>
      </div>
    );
  }
}

export default CardViewer;
