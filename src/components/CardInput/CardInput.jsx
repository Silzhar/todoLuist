import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uuid } from 'uuidv4';

import './CardInput.scss';

class CardInput extends Component {
  state = {
    title: '',
    description: '',
  };

  handleOnChangeInput = (ev) => {
    const { name, value } = ev.target;

    this.setState({
      [name]: value,
    });
  };

  handleClickAdd = () => {
    const newCard = {
      title: this.state.title,
      description: this.state.description,
      id: uuid(),
    };

    this.props.onAddCard(newCard);
    this.props.onCancel();
  };

  render() {
    return (
      <div className="CardInput">
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={this.state.title}
          onChange={this.handleOnChangeInput}
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={this.state.description}
          onChange={this.handleOnChangeInput}
        />


        <div className="CardInput__buttons">
          <button
            onClick={this.handleClickAdd}
            disabled={!this.state.title || !this.state.description}
            className="CardInput__add-button"
          >
            Nueva tarea
          </button>

          {/* enabled: pinta siempre.
            disabled: funciona pero anula acción de cancelar. */}
          <button
            onClick={this.props.onCancel}
            enabled={this.state.title && this.state.description}
            className="CardInput__cancel-button"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }
}

CardInput.propTypes = {
  onAddCard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CardInput;
