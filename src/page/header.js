import React, { Component } from 'react';
import Registration from '../form/registration.js';
import Enter from '../form/enter.js';

import './header.css';

class Header extends React.Component {
  constructor(){
    super();
    this.state={
      userEntered: false,
      

    }
    this.userName ='';
    this.groupHandle = this.groupHandle.bind(this);
    this.dictionaryHandle = this.dictionaryHandle.bind(this);
    this.deletedHandle = this.deletedHandle.bind(this); 
    this.mainHandle = this.mainHandle.bind(this); 
    this.openFormRegistration = this.openFormRegistration.bind(this);
    this.closeFormRegistration = this.closeFormRegistration.bind(this);
    this.openFormEnter = this.openFormEnter.bind(this);
    this.closeFormEnter = this.closeFormEnter.bind(this);
    this.isUserEntered = this.isUserEntered.bind(this); 
    this.exit = this.exit.bind(this); 
    this.deleteUser = this.deleteUser.bind(this);
  }

  deleteUser(){
    console.log("userId ", localStorage.getItem('userId'));
    let token = localStorage.getItem('token');
    let URL = `https://react-rslangbe.herokuapp.com/users/`+localStorage.getItem('userId');
    fetch(URL, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    .then(res => {
      
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      this.props.clickTeam();
    })
    .catch((error) => {
      console.log("error ", error);
      alert('Ошибка удаления');

    });
  }

  exit(){
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.props.clickTeam();
  }

  isUserEntered(){
    console.log("isUserEntered user ", localStorage.getItem('user'));
    if (localStorage.getItem('user') == undefined) {
       return(
          <div className="btn-authorization">
              <button type="button" className="btn btn-secondary button-registration" onClick={this.openFormRegistration}>Регистрация</button>
              <button type="button" className="btn btn-secondary button-enter" onClick={this.openFormEnter}>Войти</button>
          </div>
       )
     } else {
      return(
        <div className="btn-not-authorization">
                <button type="button" className="btn btn-secondary not-authorization" onClick={this.deleteUser}>Разавторизоваться</button>
                <button type="button" className="btn btn-secondary not-exit" onClick={this.exit}>Выход</button>
        </div>
      )
     }
  }

  dictionaryHandle(){
    console.log("HeaderDictionary");
    this.props.clickDifficult();
  }

  deletedHandle(){
    this.props.clickDeleted();
  }

  mainHandle(){
    console.log("mainHandle");
  }

  groupHandle(e) {
    let group = e.target.getAttribute('group');
    this.props.changeGroup(group);
  }
  openFormRegistration(){
    let windowModalRegistration = document.querySelector('.modal-registration');
        windowModalRegistration.style.visibility = "visible";
  }

  closeFormRegistration(){
    let windowModalRegistration = document.querySelector('.modal-registration');
        windowModalRegistration.style.visibility = "hidden";
  }
  openFormEnter(){
    let windowModalEnter = document.querySelector('.modal-enter');
    let messageEnter = document.querySelector('.message-enter');
        windowModalEnter.style.visibility = "visible";
        messageEnter.style.visibility = "hidden";
  }
  closeFormEnter(){
    let windowModalEnter = document.querySelector('.modal-enter');
    let messageEnter = document.querySelector('.message-enter');
        windowModalEnter.style.visibility = "hidden";
        messageEnter.style.visibility = "hidden";
  }
	render(){
		 let user = localStorage.getItem('user');
   
    return(
    <div>
      <div className="modal-registration">
        <div className = "modal-form">
          <div className = "modal-close-button" onClick={this.closeFormRegistration}></div>
          <div className = "modal-window ">
            <Registration
              clickTeam={this.props.clickTeam}
            />
          </div>
        </div>
      </div>

      <div className="modal-enter">
        <div className = "modal-form">
          <div className = "modal-close-button" onClick={this.closeFormEnter}></div>
          <div className = "modal-window ">
            <div className="message-enter">Вы зарегистрировались теперь можете войти.</div>
            <Enter
               clickTeam={this.props.clickTeam}
            />
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className ="container">
          <a className="navbar-brand" href="#">RS Lang</a>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse navTop " id="collapsibleNavbar" >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" onClick={this.props.clickTeam} href="#">Главная</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" onClick={this.props.main} href="#" data-toggle="dropdown">Учебник</a>
                  <div className="dropdown-menu">
                    <li><a className="dropdown-item" group="0" onClick = {this.groupHandle} href="#">Раздел 1</a></li>
                    <li><a className="dropdown-item" group="1" onClick = {this.groupHandle} href="#">Раздел 2</a></li>
                    <li><a className="dropdown-item" group="2" onClick = {this.groupHandle} href="#">Раздел 3</a></li>
                    <li><a className="dropdown-item" group="3" onClick = {this.groupHandle} href="#">Раздел 4</a></li>
                    <li><a className="dropdown-item" group="4" onClick = {this.groupHandle} href="#">Раздел 5</a></li>
                    <li><a className="dropdown-item" group="5" onClick = {this.groupHandle} href="#">Раздел 6</a></li>
                  </div>
              </li>
              <li className="nav-item dropdown" >
                <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown">Словарь</a>
                  <div className="dropdown-menu">
                    <li><a className="dropdown-item" onClick={this.props.clickLearning} href="#">Изучаемые слова</a></li>
                    <li><a className="dropdown-item" onClick={this.dictionaryHandle}>Сложные слова</a></li>
                    <li><a className="dropdown-item" onClick={this.deletedHandle} href="#">Удаленные слова</a></li>
                  </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#"  data-toggle="dropdown">Игры</a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" onClick = {this.props.clickAudioGame} href="#">Аудиовызов</a>
                    <a className="dropdown-item" onClick = {this.props.clickSavannaGame} href="#">Саванна</a>
                    <a className="dropdown-item" onClick = {this.props.clickSprintGame} href="#">Спринт</a>
                    <a className="dropdown-item" onClick = {this.props.clickSpeakltGame} href="#">Speaklt</a>
                  </div>
              </li>
            </ul>
            <div className ="name-start-btn">
              <div className="nameUser">{user}</div>
          
              {this.isUserEntered()}
                        
              
            </div>
          </div> 
        </div>
      </nav>
    </div>
		);
	}
}

export default Header;