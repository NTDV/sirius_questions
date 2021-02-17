import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

export default class CreateQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.topicNameToId = this.topicNameToId.bind(this);
        this.state = {
            questionValue: '',
            answerValue: '',
        }
    }


    addQuestion = () => {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let myHeaders = new Headers();
        myHeaders.append("Authorization", usr.base);
        //myHeaders.append("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        console.log(this.state.anonState);
        console.log(`http://devju.sirius-systems.ru/createq?question=${encodeURIComponent(this.state.questionValue)}&answer=${encodeURIComponent(this.state.answerValue)}&topic=${this.state.topicValue}&${this.state.anonState ? 'anonymous=true' : ''}`);

        fetch(`http://devju.sirius-systems.ru/createq?question=${encodeURIComponent(this.state.questionValue)}&answer=${encodeURIComponent(this.state.answerValue)}&topic=${this.state.topicValue}&${this.state.anonState ? 'anonymous=true' : ''}`, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log(error));

        this.setState({
            topicValue: '100510000304',
            questionValue: '',
            answerValue: '',
            anonState: ''
        })
    }

    topicNameToId(e) {
        let usr = JSON.parse(sessionStorage.getItem('user'));
        let myHeaders = new Headers();
        myHeaders.append("Authorization", usr.base);
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch("http://devju.sirius-systems.ru/topic", requestOptions)
        .then(response => response.json())
        .then(result => {
            this.setState({ topicValue: result.filter(t => t.theme == e.target.value)[0].idTopic });
        })
        .catch(error => console.log(error));

    }

    changeQuestionValue = (event) => {
        this.setState({questionValue: event.target.value});
    }

    changeAnswerValue = (event) => {
        this.setState({answerValue: event.target.value});
    }

    changeAnonState = (event) => {
        this.setState({anonState: event.target.value === 'on'});
    }

    render() {
        return (
            <div className='questions'>
                <select className='questions-input' defaultValue='Прочее' onChange={this.topicNameToId}>
                    <option>Английский</option>
                    <option>Информатика</option>
                    <option>Математика</option>
                    <option>Прочее</option>
                    <option>Физика</option>
                </select>
                <input
                    type="text"
                    value={this.state.questionValue}
                    onChange={this.changeQuestionValue}
                    className='questions-input'
                    placeholder='Введите свою загадку'
                />
                <input
                    type="text"
                    value={this.state.answerValue}
                    onChange={this.changeAnswerValue}
                    className='questions-input'
                    placeholder='Введите ответ загадки'
                />
                <div className='submit'>
                    <div className='anon'>
                        <input type="checkbox"
                               onChange={this.changeAnonState}
                               className='questions-checkbox'
                               id='isAnon'/>
                        <label htmlFor='isAnon'>Анонимный</label>
                    </div>
                    <input type="button"
                           className='questions-button'
                           value='Отправить'
                           onClick={this.addQuestion}/>
                </div>
            </div>
        )
    }
}
