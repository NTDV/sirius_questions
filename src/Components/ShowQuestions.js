import React from 'react';
import ReactDOM from 'react-dom';
import QuestionBlock from './QuestionBlock';
import PropTypes from "prop-types";
import Base64 from "../libs/Base64";

export default class ShowQuestions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      typeMenu: 'first',
      questions: [],
    }
  }

  componentDidMount() {
    this.doUpdate("");
  }

  componentDidUpdate(prevProp, prevState) {
    if (this.state.questions.length !== prevState.questions.length) {
      this.doUpdate("");
    }
  }

  doUpdate(theme) {
    this.sortedArray();
    this.renderQuestions(theme);
  }

  changeTypeMenu = (action) => {
    let blocks = [];
    let qs = this.state.questions;
    switch (action) {
      case 1:
        this.doUpdate("");
        break;
      case 2:
        this.sortedArray();
        for (let i = 0; i < qs.length; i++) {
          if (qs[i].status > 1) {
            blocks.push(<QuestionBlock key={i} question={qs[i]}/>);
          }
        }

        this.setState({
          questionBlocks: blocks
        });
        break;
      case 3:
        this.sortedArray();
        for (let i = 0; i < qs.length; i++) {
          if (qs[i].status < 2) {
            blocks.push(<QuestionBlock key={i} question={qs[i]}/>);
          }
        }

        this.setState({
          questionBlocks: blocks
        });
        break;
    }

    this.setState({
      typeMenu: action,
    })
  }

  sortedArray = () => {
    let usr = JSON.parse(sessionStorage.getItem('user'));
    let myHeaders = new Headers();
    myHeaders.append("Authorization", usr.base);
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://devju.sirius-systems.ru/aq", requestOptions)
        .then(response => response.json())
        .then(result => {
          let questions = [];
          for (let i = 0; i < result.length; i++) {
            let question = {
              id: result[i]["idQuestion"],
              index: i,
              author: result[i]["creator"],
              question: result[i]["question"],
              status: result[i]["status"],
              topic: result[i]["topic"],
              answer: result[i]["answer"]
            };
            questions.push(question);
          }
          this.setState({
            questions: questions
          });
        })
        .catch(error => console.log('error', error));
  }

  renderQuestions(theme) {
    let blocks = [];
    let qs = this.state.questions;
    for (let i = 0; i < qs.length; i++) {
      if (theme == "" || qs[i].topic == theme) {
        blocks.push(<QuestionBlock key={i} question={qs[i]}/>);
      }
    }

    this.setState({
      questionBlocks: blocks
    });
  }

  uniq(a) {
    let seen = {};
    return a.filter((item) => {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  }

  render() {
    return(
        <div className='questions'>
          <div className='questions-menu'>
            <button
                className={`questions-menu__item ${this.state.typeMenu === 1 ? 'questions-menu__item--active' : ''}`}
                onClick={() => this.changeTypeMenu(1)}
            >Вопросы</button>
            <button
                className={`questions-menu__item ${this.state.typeMenu === 2 ? 'questions-menu__item--active' : ''}`}
                onClick={() => this.changeTypeMenu(2)}
            >Нельзя ответить</button>
            <button
                className={`questions-menu__item ${this.state.typeMenu === 3 ? 'questions-menu__item--active' : ''}`}
                onClick={() => this.changeTypeMenu(3)}
            >Можно ответить</button>
          </div>
          <div className="questions__show-block">
            <div className="questions__menu">
              <div className="group-button" onClick={() => this.doUpdate("")}>
                Все
              </div>
              <div className="group-button" onClick={() => this.doUpdate("Математика")}>
                Математика
              </div>
              <div className="group-button" onClick={() => this.doUpdate("Информатика")}>
                Информатика
              </div>
              <div className="group-button" onClick={() => this.doUpdate("Физика")}>
                Физика
              </div>
              <div className="group-button" onClick={() => this.doUpdate("Английский")}>
                Английский язык
              </div>
              <div className="group-button" onClick={() => this.doUpdate("Прочее")}>
                Прочее
              </div>
            </div>
            <div className="questions__container">
              {this.state.questionBlocks}
            </div>
          </div>
        </div>
    )
  }
}
