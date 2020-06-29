import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle as faCircleSolid, faFileExcel, faBell, faEdit
  } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faDotCircle } from '@fortawesome/free-regular-svg-icons';

import './Card.scss';

// import CardInput from '../CardInput';
import EditCard from '../EditCard';

class Card extends Component {
  state = {
    isHovering: false,
    isSolid: false,
    isEditing: false,
  };

  handleOnclick = () => {
    const { onCompleteCard, cardId } = this.props;
    onCompleteCard(cardId);
  };

  // Hovers sobre botón. Entrada y salida.
  handleOnMouseEnter = () => {
    this.setState({
      isHovering: true,
    });
  };

  handleOnMouseLeave = () => {
    this.setState({
      isHovering: false,
      isSolid: false,
    });
  };

  handleOnMouseDown = () => {
    this.setState({
      isSolid: true,
    });
  };

  handleOnMouseUp = () => {
    this.setState({
      isSolid: false,
    });
  };

  handleOnEditCard = () => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
    }));
  };

  handleOnEditInput = (ev) => {
    const { value, name } = ev.target;
    this.props.onEditTodo(this.props.cardId, name, value);
  };
  

  render() {
    const { isHovering, isSolid, isEditing } = this.state;
    const circleIcon = isSolid ? faCircleSolid : faCircle;

    if (isEditing) {
      return (
        <li className="Card">
          <EditCard
            title={this.props.title}
            description={this.props.description}
            onChangeInput={this.handleOnEditInput}
            onEditCard={this.handleOnEditCard}
          />
        </li>
      );
    }

    return (
      <li className="Card">
        <div className="Card__urgent">
          {this.props.onCompleteCard ? (
            <button
              onClick={this.handleOnclick}
              onMouseEnter={this.handleOnMouseEnter}
              onMouseLeave={this.handleOnMouseLeave}
              onMouseDown={this.handleOnMouseDown}
              onMouseUp={this.handleOnMouseUp}
              className="Card__button"
            >
              <FontAwesomeIcon
                icon={isHovering && !isSolid ? faDotCircle : circleIcon}
              />
            </button>
          ) : (
            <span className="Card__button">
              <FontAwesomeIcon icon={faFileExcel} />
            </span>
          )}

          <div className="Card__text">
            <h4 className="Card__title">{this.props.title}</h4>
            <p className="Card__description">{this.props.description}</p>
          </div>
        </div>
              
        <FontAwesomeIcon icon={faBell} className="Card__bell"/>

        <div className="Card__edition">
          {this.props.onEditTodo ? (
            <button onClick={this.handleOnEditCard} className="Card__button">
            <FontAwesomeIcon icon={faEdit} className="Card__edit"/>
        
            </button>

            ) : null }

        </div>
      </li>
    );
  }
}

Card.propTypes = {
  cardId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onCompleteCard: PropTypes.func,
  onEditTodo: PropTypes.func,
};

Card.defaultProps = {
  onCompleteCard: null,
  onEditTodo: null,
};

export default Card;
