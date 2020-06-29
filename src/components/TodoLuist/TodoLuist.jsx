import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import './TodoLuist.scss';

import CardList from '../CardList';
import CardInput from '../CardInput';

class TodoLuist extends Component {
  state = {
    isEditing: false,
  };

  handleSetEdit = () => {
    this.setState({
      isEditing: true,
    });
  };

  handleStopEdit = () => {
    this.setState({
      isEditing: false,
    });
  };

  render() {
    return (
      <div className="TodoLuist">
        <h2 className="TodoLuist__title">{this.props.title}</h2>

        <div className="TodoLuist__list">
          <CardList
            list={this.props.todos}
            onCompleteCard={this.props.onCompleteCard}
            onEditTodo={this.props.onEditTodo}
          />

          {this.props.onCompleteCard && this.props.onAddCard ? (
            <React.Fragment>
              {this.state.isEditing ? (
                <CardInput
                  onAddCard={this.props.onAddCard}
                  onCancel={this.handleStopEdit}
                />
              ) : (
                <div className="TodoLuist__end">
                  <button
                    className="TodoLuist__button"
                    onClick={this.handleSetEdit}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <span>Añadir tarea</span>
                </div>
              )}
            </React.Fragment>
          ) : null}
        </div>
      </div>
    );
  }
}

TodoLuist.propTypes = {
  title: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
    })
  ).isRequired,
  onCompleteCard: PropTypes.func,
  onAddCard: PropTypes.func,
  onEditTodo: PropTypes.func,
};

TodoLuist.defaultProps = {
  onCompleteCard: null,
  onAddCard: null,
  onEditTodo: null,
};

export default TodoLuist;
