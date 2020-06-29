import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './EditCard.scss';

export default class EditCard extends Component {
  render() {
    return (
      <div className="EditCard">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={this.props.title}
          onChange={this.props.onChangeInput}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={this.props.description}
          onChange={this.props.onChangeInput}
        />

        <div className="EditCard__buttons">
          <button
            onClick={this.props.onEditCard}
            disabled={!this.props.title || !this.props.description}
            className="EditCard__add-button"
          >
            Editar tarea
          </button>

          <button
            onClick={this.props.onCancel}
            className="CardInput__cancel-button"
          >
            Cancelar
          </button>

        </div>
      </div>
    );
  }
}

EditCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onEditCard: PropTypes.func.isRequired,
  onChangeInput: PropTypes.func.isRequired,
};
