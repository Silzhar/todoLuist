import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';

import './CardList.scss';

class CardList extends Component {
  render() {
    return (
      <ul className="CardList">
        {!this.props.list.length ? (
          <h3 className="CardList__not-completed">
            No tienes hay ninguna tarea
           
          </h3>
        ) : null}

        {this.props.list.map(({ id, title, description }) => (
          <React.Fragment key={id}>
            <Card
              cardId={id}
              title={title}
              description={description}
              onCompleteCard={this.props.onCompleteCard}
              onEditTodo={this.props.onEditTodo}
            />
            <hr />
          </React.Fragment>
        ))}
      </ul>
    );
  }
}

CardList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
    })
  ).isRequired,
  onCompleteCard: PropTypes.func,
  onEditTodo: PropTypes.func,

};

CardList.defaultProps = {
  onCompleteCard: null,
};

export default CardList;
