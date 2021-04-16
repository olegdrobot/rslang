import React, { Component } from 'react';
import '../form/registration.css';


class Registration extends React.Component {
  constructor() {
    super();
    this.register = this.register.bind(this);
  }

  register(e){
    let windowModalRegistration = document.querySelector('.modal-registration');
    let windowModalEnter = document.querySelector('.modal-enter');
    let messageEnter = document.querySelector('.message-enter');
   
    let email = e.target[1].value;
    let password = e.target[2].value;
    let user = { "email": email, "password": password};
      fetch('https://react-rslangbe.herokuapp.com/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
       })
    .then(res => res.json())
    .then(json => {
    console.log("registred ", json);
      windowModalRegistration.style.visibility = "hidden";
      windowModalEnter.style.visibility = "visible";
      messageEnter.style.visibility = "visible";
      this.props.clickTeam();
    });
    event.preventDefault();
  }

	render(){
		return (
        <div className = "form-registration">
          <form onSubmit={this.register} action="#" enctype="multipart/form-data">
            <div className="form-group-registration">
              <label for="name">Имя:</label>
              <input type="name" className="form-control"  placeholder="Введите имя..." required autofocus pattern="^([[А-ЯЁ а-яё]{2,23}|[A-Za-z]{2,23})$"/>
            </div>
            <div className="form-group-registration">
              <label for="email">Email:</label>
              <input type="email" className="form-control" placeholder="Введите email..." required autofocus pattern="^[a-zA-Z0-9_.+-]+@[a-z]+.[a-z]+$"/>
            </div>
            <div className="form-group-registration">
              <label for="pwd">Пароль:</label>
              <input type="password" className="form-control" placeholder="Введите пароль..." required autofocus pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,15}$"/>
            </div>
             <div className="form-group-registration">
              <div className="footnotes">Пароль должен быть не менее 8 символов и содержать одну заглавную, одну маленькую буквы, спецсимвол и цифры.</div>
            </div>
            <button type="submit" className="btn btn-secondary">Регистрация</button>
          </form>
        </div>
		)
	}
}

export default Registration;