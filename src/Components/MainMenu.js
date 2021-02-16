import * as React from "react";
import {ReactComponent as MenuIcon} from '../assets/menu.svg';

export default class  MainMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    changeVisibility() {
        document.getElementsByClassName("menu")[0].className =
            document.getElementsByClassName("menu")[0].className == 'menu' ?
                "menu menu__active" : "menu";
    }

    render() {
        return <div className='menu'>
            <div className="main-menu">
                <div className="menu-site-bar" onClick={this.changeVisibility}>
                    <span className="menu-title">Главное меню</span>
                    <MenuIcon className="menu-icon"/>
                </div>
                <div className="menu-icons__container">
                    {this.props.children}
                </div>
            </div>
        </div>
    }
}
