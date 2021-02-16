import React from 'react';
import PropTypes from "prop-types";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <div className='profile'>
          <div className='profile__container'>
            <span className='profile__user-name'><b>Ваше имя: </b>{this.props.user.name}</span>
            <div className='exit__container' onClick={this.props.exit}>
              <span className='exit'>Выйти</span>
            </div>
          </div>
        </div>
    )
  }
}
