import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';

import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        { front: 'front1', back: 'back1' },
        { front: 'front2', back: 'back2' },
      ],
    };
  }

  addCard = card => {
    const cards = this.state.cards.slice().concat(card);
    this.setState({ cards });
  };

  deleteCard = index => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({ cards });
  };

  editCard = (index, side, newText) => {
    const cards = this.state.cards.slice();
    cards[index][side] = newText;
    this.setState({ cards });
  };

  switchMode = () => this.setState({ editor: !this.state.editor });

  render() {
    return (
      <Switch>
        <Route exact path="/editor">
          <CardEditor
            addCard={this.addCard}
            cards={this.state.cards}
            deleteCard={this.deleteCard}
            editCard={this.editCard}
          />
        </Route>
        <Route exact path="/viewer">
          <CardViewer cards={this.state.cards} />
        </Route>
      </Switch>
    );
  }
}

export default App;
