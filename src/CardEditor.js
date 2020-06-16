import React from 'react';
import './CardEditor.css';

class CardEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { front: '', back: '' };
  }

  addCard = () => {
    if (!this.state.front.trim() || !this.state.back.trim()) {
      alert('Cannot add empty card');
      return;
    }

    this.props.addCard(this.state);
    this.setState({ front: '', back: '' });
  };

  deleteCard = index => this.props.deleteCard(index);

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleEditChange = (index, side, event) => {
    this.props.editCard(index, side, event.target.value);
  };

  render() {
    const cards = this.props.cards.map((card, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
            <input
              onChange={event => this.handleEditChange(index, 'front', event)}
              value={card.front}
            />
          </td>
          <td>
            <input
              onChange={event => this.handleEditChange(index, 'back', event)}
              value={card.back}
            />
          </td>
          <td>
            <button
              disabled={this.props.cards.length === 1}
              onClick={() => this.deleteCard(index)}
            >
              Delete card
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <h2>Card Editor</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Front</th>
              <th>Back</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{cards}</tbody>
        </table>
        <br />
        <input
          name="front"
          onChange={this.handleChange}
          placeholder="Front of card"
          value={this.state.front}
        />
        <input
          name="back"
          onChange={this.handleChange}
          placeholder="Back of card"
          value={this.state.back}
        />
        <button onClick={this.addCard}>Add card</button>
        <hr />
        <button onClick={this.props.switchMode}>Go to card viewer</button>
      </div>
    );
  }
}

export default CardEditor;
