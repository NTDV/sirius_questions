import logo from './logo.svg';
import './App.css';
import * as React from "react";
import Authorization from "./Pages/Authorization";
import Main from "./Pages/Main";
import "./style/index.scss";
import Base64 from "./libs/Base64";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.Auth = this.Auth.bind(this);
    this.LogOut = this.LogOut.bind(this);
    this.state = {
      isAuthorized: false,
      user: {
        name: '',
        questionsList: []
      },
    };
  }

  LogOut() {
    sessionStorage.removeItem("user");
    this.setState({
      isAuthorized: false,
      user: {
        name: '',
        questionsList: []
      },
    });
  }

  Auth(_user) {
    let AuthString = "Basic " + Base64.btoa(_user.login.trim() + ":" + _user.password)
    let myHeaders = new Headers();
    myHeaders.append("Authorization", AuthString);
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://devju.sirius-systems.ru/profile", requestOptions)
        .then(response => response.json())
        .then(result => {
          let usr = {
            name: result["nickName"],
            base: "Basic " + Base64.btoa(_user.login.trim() + ":" + _user.password),
            questionsList: []
          };
          sessionStorage.setItem('user', JSON.stringify(usr));
          this.setState({
            isAuthorized: true,
            user: usr
          });
        })
        .catch(error => console.log('error', error));
  }

  AddQuestion (user, item) {
    const questionsList = user.questionsList;
    item.id = questionsList.length;
    item.index = questionsList.length;
    questionsList.push(item)
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  ChangeCorrectAnswer (id) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const questionsList = user.questionsList;

    questionsList.find(x => x.id === id).correctAnswer = true;
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  render() {
    return <>
      {this.state.isAuthorized ?
          <Main user={this.state.user}
                AddQuestion={this.AddQuestion}
                ChangeCorrectAnswer={this.ChangeCorrectAnswer}
                LogOut={this.LogOut}/> :
          <Authorization Auth={this.Auth}/>}
    </>
  }
}
