import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

export default class QuestionBlock extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  checkAnswer = () => {
    const userAnswer = this.inputRef.current.value;
    const input = this.inputRef.current;

    let usr = JSON.parse(sessionStorage.getItem('user'));
    let myHeaders = new Headers();
    myHeaders.append("Authorization", usr.base);
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(`http://devju.sirius-systems.ru/ansq?idQuestion=${this.props.question.id}&answer=${userAnswer}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result['answer'] == 'ok') {
            this.props.ChangeCorrectAnswer(this.props.question.id);
            input.classList.add('corrected-answer');
            input.setAttribute('disabled', '')
          }

          if (!input.classList.contains('corrected-answer')) {
            input.classList.add('error-answer');
          }
        })
        .catch(error => console.log('error', error));
  }

  render() {
    return(
        <div className='questions-block'>
          <div className="questions-block__header">
            <span className='questions-block__count'>Вопрос №{this.props.question.index + 1}</span>
            <span className='questions-block__author'>{this.props.question.author}</span>
          </div>

          <span className='questions-block__text'>{this.props.question.question}</span>
          {this.props.question.status < 2 ?
            <div className='questions-block__answer'>
              <input
                type="text"
                placeholder='Введите ответ'
                ref={this.inputRef}
                />
              <button
                onClick={this.checkAnswer}
                >Ответить</button>
            </div> :
              <span
                style={{
                  color: 'green',
                }}
              >{this.props.question.answer}</span>
          }

        </div>
    )
  }
}
