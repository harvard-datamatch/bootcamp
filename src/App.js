import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import Homepage from './Homepage';
import Test from './Test';

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

  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/editor">
          <CardEditor
            addCard={this.addCard}
            cards={this.state.cards}
            deleteCard={this.deleteCard}
          />
        </Route>
        <Route exact path="/viewer">
          <CardViewer cards={this.state.cards} />
        </Route>
        <Route path="/test/:id">
          <Test test="asdf" />
        </Route>
      </Switch>
    );
  }
}

export default App;
