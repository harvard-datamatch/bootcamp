import React from 'react';
import './CardViewer.css';

class CardViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      displayFront: true,
    };
  }

  nextCard = () => {
    if (this.state.currentIndex < this.props.cards.length - 1) {
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

  render() {
    // this uses the ternary operator:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    const card = this.props.cards[this.state.currentIndex][
      this.state.displayFront ? 'front' : 'back'
    ];

    return (
      <div>
        <h2>Card Viewer</h2>
        Card {this.state.currentIndex + 1} out of {this.props.cards.length}.
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
          disabled={this.state.currentIndex === this.props.cards.length - 1}
          onClick={this.nextCard}
        >
          Next card
        </button>
        <hr />
        <button onClick={this.props.switchMode}>Go to card editor</button>
      </div>
    );
  }
}

export default CardViewer;
