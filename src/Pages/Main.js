import * as React from "react";
import MainMenu from "../Components/MainMenu";
import Header from "../Components/Header";
import {ReactComponent as MenuIcon} from '../assets/menu.svg';
import {ReactComponent as QuestionIcon} from '../assets/icon-cognitive.svg';
import {ReactComponent as ServiceIcon} from '../assets/icon-service-4.svg';
import {ReactComponent as UserIcon} from '../assets/icon-user.svg';
import QuestionBlock from "../Components/QuestionBlock";
import ShowQuestions from "../Components/ShowQuestions";
import Profile from "../Components/Profile";
import CreateQuestions from "../Components/CreateQuestions";

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWindow: <ShowQuestions ChangeCorrectAnswer={this.props.ChangeCorrectAnswer}/>
        }
        this.changeContent = this.changeContent.bind(this);
    }

    changeContent(content) {
        this.setState({
           currentWindow: content
        });
        let menu = document.getElementsByClassName("menu__active")[0];
        if (menu != undefined && menu != null)
            menu.className = "menu";
    }

    render() {
        return (
            <div className="main-page">
                <MainMenu>
                    <div onClick={() => this.changeContent(<ShowQuestions ChangeCorrectAnswer={this.props.ChangeCorrectAnswer}/>)}
                         className="menu-icon__block">
                        <span className='menu-icon__info'>Посмотреть вопросы</span>
                        <QuestionIcon className='menu-icon'/>
                    </div>
                    <div onClick={() => this.changeContent(<CreateQuestions addQuestion={this.props.AddQuestion} user={this.props.user}/>)}
                         className="menu-icon__block">
                        <span className='menu-icon__info'>Новый вопрос</span>
                        <ServiceIcon className='menu-icon' />
                    </div>
                    <div onClick={() => this.changeContent(<Profile exit={this.props.LogOut} user={this.props.user}/>)}
                         className="menu-icon__block">
                        <span className='menu-icon__info'>Профиль</span>
                        <UserIcon className='menu-icon' />
                    </div>
                </MainMenu>
                <div className="main-content">
                    <Header user={this.props.user}
                            GoToProfile={() => this.changeContent(<Profile exit={this.props.LogOut}
                                                                           user={this.props.user}/>)}
                            LogOut={this.props.LogOut}/>
                    {this.state.currentWindow}
                </div>
            </div>);
    }
}
