import React from 'react';
import './CardViewer.css';

import { Link, withRouter } from 'react-router-dom';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  populate,
} from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

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
    if (!isLoaded(this.props.cards)) {
      return <div>Loading...</div>;
    }

    if (isEmpty(this.props.cards)) {
      return <div>Page not found!</div>;
    }

    // this uses the ternary operator:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    const card = this.props.cards[this.state.currentIndex][
      this.state.displayFront ? 'front' : 'back'
    ];

    return (
      <div>
        <h2>{this.props.name}</h2>
        <h4>Created by {this.props.username}</h4>
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
        <Link to="/">Home</Link>
      </div>
    );
  }
}

const populates = [{ child: 'owner', root: 'users' }];

const mapStateToProps = (state, props) => {
  const deck = populate(state.firebase, props.match.params.deckId, populates);
  const name = deck && deck.name;
  const cards = deck && deck.cards;
  const username = deck && deck.owner && deck.owner.username;
  return { cards: cards, name: name, username: username };
};

export default compose(
  withRouter,
  firebaseConnect(props => {
    const deckId = props.match.params.deckId;
    return [{ path: `/flashcards/${deckId}`, storeAs: deckId, populates }];
  }),
  connect(mapStateToProps),
)(CardViewer);
