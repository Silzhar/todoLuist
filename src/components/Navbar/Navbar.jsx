import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { faClipboardCheck , faClipboard, faBell } from '@fortawesome/free-solid-svg-icons';

import './Navbar.scss';

class Navbar extends React.Component {
  state = {
    urgentOpen: false,
  };

  handleClickMenu = () => {

    this.setState((prevState) => ({
      urgentOpen: !prevState.urgentOpen,
    }));
  };

  render() {
    const { urgentOpen } = this.state;
    const isHiddenClass = urgentOpen ? '' : 'Navbar__submenu--hidden';

    return (
      <nav className="navBar">
        <div className="navBar__button">
          <Link to="/" >
          <FontAwesomeIcon  icon ={faClipboard} className="navBar__icon" />
          <p className="navBar__text">TodoLuist</p>
          </Link>
        </div>

        <nav className="navBar">
          <button onClick={this.handleClickMenu} className="navBar__menu">
          <div className={`navBar__submenu ${isHiddenClass}`}>
            <FontAwesomeIcon icon={faBell} />
              <Link to="/urgent" className="navBar__text">
              Tareas urgentes
              </Link>
            </div>
          </button>
            
          </nav>

        <nav className="navBar">
          <div className="navBar__menu">
            <Link to="/complet"  className="navBar__text--end">
            <FontAwesomeIcon  icon ={faClipboardCheck}  />
            Finalizado
            </Link>
          </div>
        </nav>
      </nav>
    );
  }
}

export default Navbar;
