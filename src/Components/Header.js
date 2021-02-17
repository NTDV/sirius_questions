import React from 'react';
import ReactDOM from 'react-dom';
import {ReactComponent as UserIcon} from '../assets/icon-user.svg';
import {ReactComponent as Logo} from '../assets/logo.svg';
import PropTypes from "prop-types";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.LogOut = this.LogOut.bind(this);
    }

    LogOut() {
        this.props.LogOut();
    }

    render() {
        return(
            <header className='header'>
                <Logo className='header-title' style={{width: '150px'}}/>
                <div className='header-user'>
                    <div className='header-info'>
                        <span><span className='mobile__hidden'>Пользователь:</span> {this.props.user.name}</span>
                        <button className='exit' onClick={this.LogOut}>Выйти</button>
                    </div>
                    <div className="header-icon__container"
                        onClick={this.props.GoToProfile}>
                        <UserIcon className='header-icon' />
                    </div>
                </div>
            </header>
        )
    }
}
