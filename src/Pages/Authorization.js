import * as React from "react";
import {ReactComponent as Logo} from '../assets/logo.svg';

export default class Authorization extends React.Component {
    constructor(props) {
        super(props);
        this.login = React.createRef();
        this.password = React.createRef();
        this.Auth = this.Auth.bind(this);
    }

    Auth() {
        this.props.Auth({
            login: this.login.current.value,
            password: this.password.current.value
        });
    }

    render() {
        return <div className="auth">
            <div className="auth-form">
                <div className='auth-form__item auth-form__img'></div>

                <div className='auth-form__item auth-form__container'>
                    <div className='auth-form__logo-container'>
                        <Logo className='auth-form__logo'/>
                    </div>
                    <div className='auth-form__title-container'>
                        <span className='auth-form__subtitle'>Для входа в приложение введите свои данные</span>
                    </div>
                    <div className='auth-form__input-container'>
                        <input
                            type='text'
                            className='auth-form___input'
                            ref={this.login}
                            placeholder='Введите логин'/>
                        <input
                            type='password'
                            className='auth-form___input'
                            ref={this.password}
                            placeholder='Введите пароль'/>
                    </div>
                    <div className='auth-form__button-container'>
                        <input type="button"
                               className='auth-form__button'
                               value="Авторизация"
                               onClick={this.Auth}/>
                    </div>
                </div>
            </div>
        </div>
    }
}
