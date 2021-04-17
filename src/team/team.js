import React, { Component } from 'react';
import YouTube from 'react-youtube';
import './team.css';

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateDimensions = this.updateDimensions.bind(this); 
  }
  updateDimensions(){
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
   this.updateDimensions();
  }
	render(){
    let opts={};
    let w = this.state.width;
    if(w > 992) {
      opts = {
      height: '450',
      width: '680',
      }
    };
    
    if(w > 768 && w <= 992) {
      opts = {
      height: '390',
      width: '640',
      }
    };
    if(w >= 576 && w <= 768) {
      opts = {
       height: '290',
       width: '500',
      }
    }
    if(w >= 320 && w <= 576) {
      opts = {
       height: '290',
       width: '280',
      }
    }
    if(w >= 0 && w <320) {
      opts = {
       height: '250',
       width: '250',
      }
    }
  
		return (
			<section className = "team">
        <div className ="container basic-start">
          <div className = "row">
            <div className = "diviz">
              <div className = "logo-text">  
                <h1>Учи английский вместе с RS Lang.</h1>
                <br/> 
                <p>Отличное приложение для изучения онлайн самых распространненых слов английского языка.</p>
              </div>
              <div className = "logo">
                <img src={ require('../images/team/logo.jpg') } alt="foto"/>
              </div>
            </div>
          </div>
          <div className = "row">
            <div className = "title-features">
              <h3>Особенности</h3>
            </div>
            <div className = "basic-games">
              <div className = "overlay">
                <img src={ require('../images/team/letters.jpg') } alt="foto"/>
              </div>
              <h5>Учебник</h5>
              <p>Разнообразие слов позволяет выучить онлайн английский с нуля. Учебник содержит наиболее 
              употребляемые слова в английской речи. Для удобства изучения слова резделены по группам взависимости от сложности.</p> 
            </div>
            <div className = "basic-games">
              <div className = "overlay">
                <img src={ require('../images/team/clock.jpg') } alt="foto"/>
              </div>
              <h5>Доступность</h5>
              <p>Изучением слов Вы можете заниматься в любое удобное время. 
                Для удобства предусотрен словарь, для формирования слов из учебника.</p>
            </div>
            <div className = "basic-games">
              <div className = "overlay">
                <img src={ require('../images/team/play.jpg') } alt="foto"/>
              </div>
              <h5>Игры</h5>
              <p>Изучать новое всегда интересно, а во время игры в двойне. Поэтому для Вас мы 
              подготовили 4 увлекательные, красочные, интересные игры, чтобы учить английский было не скучно.
              Игры позволят повторить изученые слова.</p>
            </div>
            <div className = "basic-games">
              <div className = "overlay">
                <img src={ require('../images/team/nayshniki.png') } alt="foto"/>
              </div>
              <h5>Произношение</h5>
              <p>Использование записей аудио файлов позволит научиться правильно произносить слова.</p> 

            </div>
          </div>  
          <div className = "row">
            <div className = "title-video">
              <h3>Видео презентация</h3>
            </div>
            <div className = "video">
              <YouTube videoId="14iERiPoNRc" opts={opts}/>
            </div>
          </div>

          <div className = "row">
            <div className = "title-team">
              <h3>Наша команда</h3>
              <p>Мы работали над проектом для вас!</p>
            </div>
          </div>
        	<div className = "row mb-3">
            <div className ="col-11 align-items-center">
              <div className = "card team-member">
                <div className = "foto">
                   <img src={ require('../images/team/oleg.jpg') } alt="foto"/>
                </div>
                <div className="card-body">
                  <h4 className="card-title">Олег Дробот</h4>
                  <p className="card-text-developer">Team Leader</p>
                  <p className="card-text">Помощь в поиске решений поставленных задач. Реализация логики основного приложения, 
                    мини-игр "Аудиовызов", "Спринт и страниц "Словаря". Создание репозитория с бекендом, деплой на heroku, 
                    а так же реализована авторизация и разавторизация пользователя.</p>
                  <div className = "icon">
                    <div className = "icon-github"></div>
                    <div className = "icon-github-text"><a href="https://github.com/olegdrobot">github</a></div>
                  </div>
                </div>
              </div>

              <div className = "card team-member">
                <div className = "foto">
                  <img src={ require('../images/team/marina.jpg') } alt="foto"/>
                </div>
                <div className="card-body">
                  <h4 className="card-title">Марина Дробот</h4>
                  <p className="card-text-developer">Frontend-developer</p>
                  <p className="card-text">Предложение способов решений поставленных задач. 
                    Реализация страниц "Электронного учебника", мини-игр "Саванна", "Speaklt". Верстка и дизайн приложения RS Lang.</p>
                  <div className = "icon">
                    <div className = "icon-github"></div>
                    <div className = "icon-github-text"><a href="https://github.com/marinatwice82">github</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
		)
	}
}

export default Team;