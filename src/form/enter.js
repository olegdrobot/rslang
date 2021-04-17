import React, { Component } from 'react';
import '../form/enter.css';

class Enter extends React.Component {
  constructor() {
    super();
    this.signIn = this.signIn.bind(this);
  }

  signIn(e){
    let windowModalEnter = document.querySelector('.modal-enter');
    let messageEnter = document.querySelector('.message-enter');
    let btnAuthorization = document.querySelector('.btn-authorization');
    let buttonRegistration = document.querySelector('.button-registration');
    let buttonEnter = document.querySelector(".button-enter");
    let btnNotAuthorization = document.querySelector(".btn-not-authorization");
    let notAuthorization = document.querySelector('.not-authorization');
    let notExit = document.querySelector('.not-exit');
    let email = e.target.elements[1].value;
    console.log("email ", email);
    
    let password = e.target.elements[2].value
    console.log("password ", password);
    let user = { "email": email, "password": password };
    fetch('https://react-rslangbe.herokuapp.com/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
      })
    .then(res => res.json())
    .then(json => {
    console.log("token ", json.token);
    console.log("userId ", json.userId);
   
    localStorage.setItem('token', json.token);
    localStorage.setItem('userId', json.userId);
    localStorage.setItem('user', e.target.elements[0].value);
    windowModalEnter.style.visibility = "hidden";
    messageEnter.style.visibility = "hidden";
     /*
    
    
    btnAuthorization.style.display = "none";
    buttonRegistration.style.display = "none";
    buttonEnter.style.display = "none";
    btnNotAuthorization.style.display = "flex";
    notAuthorization.style.display = "block";
    notExit.style.display = "block";
    */
    this.props.clickTeam();
    console.log("enter  clickTeam");
    })
    .catch((error) => {
      console.log("error ", error);
      alert('Такого пользователя не существует');

    });

    event.preventDefault();

  }

	render(){
		return (
        <div className="form-enter">
          <form onSubmit={this.signIn} action="#"  enctype="multipart/form-data">
          	<div className="form-group-enter">
              <label for="name">Имя:</label>
              <input type="name" id="name" className="form-control" placeholder="Введите имя..." required autofocus pattern="^([[А-ЯЁ а-яё 0-9]{2,23}|[A-Za-z]{2,23})$"/>
            </div>
            <div className="form-group-enter">
              <label for="email">Email:</label>
              <input type="email" id="email" className="form-control" placeholder="Введите email..." required autofocus pattern="^[a-zA-Z0-9_.+-]+@[a-z]+.[a-z]+$"/>
            </div>
            <div className="form-group-enter">
              <label for="pwd">Пароль:</label>
              <input type="password" id="password" className="form-control" placeholder="Введите пароль..." required autofocus pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,15}$"/>
            </div>
            <button type="submit" className="btn btn-secondary">Войти</button>
          </form>
        </div>
		)
	}
}

export default Enter;