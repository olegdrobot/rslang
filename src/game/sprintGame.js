import React, { Component } from 'react';
import SprintStaticPage from './sprintStaticPage.js';

import pew from "../audio/pew.mp3"; 
import wrong from '../audio/wrong.mp3';
import bird from '../audio/birds.mp3';

import '../game/sprintGame.css';

let Keypress = require("react-keypress");

const pevSound = new Audio(pew);
const wrongSound = new Audio(wrong);
const birdSound = new Audio(bird); 


class SprintGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rightWords: [],
      missWords: [],
      time: 60,
      rightAnswers: 0,
      score: 10,
      countScore: 0,
      currentWord: 0,
      amountWords: 0,
      answerWord: '',
      finished: false,
      isSound: true
    } 
    this.data = props.data;
    this.timer = this.timer.bind(this);
    this.preparingWords = this.preparingWords.bind(this);
    this.changeWord = this.changeWord.bind(this);
    this.clickRight = this.clickRight.bind(this);
    this.clickWrong = this.clickWrong.bind(this);
    this.hideProgress = this.hideProgress.bind(this);
    this.showProgress = this.showProgress.bind(this);  
    this.shoeRightIcon = this.shoeRightIcon.bind(this);
    this.SoundSwitch = this.SoundSwitch.bind(this); 
    this.finishedGame = this.finishedGame.bind(this);
    this.tryAgain = this.tryAgain.bind(this);
    this.keypress = this.keypress.bind(this);
    this.openFullscreen = this.openFullscreen.bind(this);
    this.closeFullscreen = this.closeFullscreen.bind(this);
    
  }

  tryAgain(){
    this.setState({
      rightWords: [],
      missWords: [],
      time: 60,
      rightAnswers: 0,
      score: 10,
      countScore: 0,
      currentWord: 0,
      amountWords: 0,
      answerWord: '',
      finished: false,
      isSound: true
    });
    let statisticPage = document.querySelector(".sprint-static");
    statisticPage.style.display = "none";
    let gamePage = document.querySelector(".sprint-game");
    gamePage.style.display = "block";

    this.setState({amountWords: this.data.length}, ()=>{
        this.preparingWords();
        this.timer();  
    });
    let rightIcon = document.getElementById("rightIcon");
    rightIcon.style.visibility = "hidden";
  }

  finishedGame(){
    if(this.state.finished) {
      document.removeEventListener("keydown", this.keypress);
      let gamePage = document.querySelector(".sprint-game");
      gamePage.style.display = "none";
      return(
        <SprintStaticPage 
          totalScore={this.state.countScore} 
          rightWords={this.state.rightWords} 
          missWords={this.state.missWords}
          tryAgain={this.tryAgain}
          main={this.props.main}
        />
      )
    }  
  }

  SoundSwitch(){
    if(this.state.isSound) {
      this.setState({isSound: false});
      let sound = document.querySelector(".sprint-music");
      sound.style.display = "block";
      sound = document.querySelector(".sprint-onmusic");
      sound.style.display = "none";
    } else {
      this.setState({isSound: true});
      let sound = document.querySelector(".sprint-music");
      sound.style.display = "none";
      sound = document.querySelector(".sprint-onmusic");
      sound.style.display = "block";
    } 
  }

  hideProgress(){
    let progress = document.getElementById("prog1");
        progress.style.background = "#fff";

        progress = document.getElementById("prog2");
        progress.style.background = "#fff";

        progress = document.getElementById("prog3");
        progress.style.background = "#fff";
     
  }

  showProgress(rAnsw){
    if(rAnsw == 1) {
          let progress = document.getElementById("prog1");
          progress.style.background = "green";
        }

        if(rAnsw == 2) {
          let progress = document.getElementById("prog2");
          progress.style.background = "green";
        }

         if(rAnsw == 3) {
          let progress = document.getElementById("prog3");
          progress.style.background = "green";
        }
  }

  clickWrong(){
    if(this.data[this.state.currentWord].wordTranslate != this.state.answerWord) {
      //--------добавляем правильно отвеченные слова
      let arr = this.state.rightWords;
      arr.push(this.data[this.state.currentWord]);
      this.setState({rightWords: arr}, ()=>{console.log("Првильно ", this.state.rightWords)});

      //--------------------------------------------
      let addScore = this.state.countScore + this.state.score;
      if (this.state.rightAnswers == 0) {this.hideProgress()};
      let rAnsw = this.state.rightAnswers + 1;
      this.showProgress(rAnsw);
      this.shoeRightIcon();
      if(this.state.isSound) pevSound.play();
      //console.log("rAnsw ", rAnsw);
      let s = this.state.score;
      

      if(rAnsw == 3 && this.state.score != 80) {
        s = s*2;
        rAnsw = 0;
        
        if(s == 20) {
          let bird = document.querySelector(".bird-2");
          bird.style.display = "block";
          if(this.state.isSound) birdSound.play();
        }
        if(s == 40) {
          let bird = document.querySelector(".bird-3");
          bird.style.display = "block";
          if(this.state.isSound) birdSound.play();
        }
        if(s == 80) {
          let bird = document.querySelector(".bird-4");
          bird.style.display = "block";
          if(this.state.isSound) birdSound.play();
        }
      } 
       this.setState({countScore: addScore, rightAnswers: rAnsw, score: s}, ()=>{
          this.changeWord();  
      });
      } else {
         this.setState({rightAnswers: 0, score: 10}, ()=>{
            //-----------добавляем неверно отвеченные слова--------
            let arr = this.state.missWords;
            arr.push(this.data[this.state.currentWord]);
            this.setState({missWords: arr}, ()=>{console.log("Непрвильно ", this.state.missWords)});
            //-----------------------------------------------------
            this.changeWord();
            let bird = document.querySelector(".bird-2");
            bird.style.display = "none";
            bird = document.querySelector(".bird-3");
            bird.style.display = "none";
            bird = document.querySelector(".bird-4");
            bird.style.display = "none";
            this.hideProgress();
            if(this.state.isSound) wrongSound.play();
      });
    }
  }

  clickRight(){
    if(this.data[this.state.currentWord].wordTranslate == this.state.answerWord){
      //--------добавляем правильно отвеченные слова
      let arr = this.state.rightWords;
      arr.push(this.data[this.state.currentWord]);
      this.setState({rightWords: arr}, ()=>{console.log("Првильно ", this.state.rightWords)});

      //--------------------------------------------
      let addScore = this.state.countScore + this.state.score;
      if (this.state.rightAnswers == 0) {this.hideProgress()};
      let rAnsw = this.state.rightAnswers + 1;
      this.showProgress(rAnsw);
      this.shoeRightIcon();
      if(this.state.isSound) pevSound.play();
      
      //console.log("rAnsw ", rAnsw);
      let s = this.state.score;
      if(rAnsw == 3 && this.state.score != 80) {
        s = s*2;
        rAnsw = 0;
        let progress = document.getElementById("prog1");
       
        if(s == 20) {
          let bird = document.querySelector(".bird-2");
          bird.style.display = "block";
          if(this.state.isSound) birdSound.play();
        }
        if(s == 40) {
          let bird = document.querySelector(".bird-3");
          bird.style.display = "block";
          if(this.state.isSound) birdSound.play();
        }
        if(s == 80) {
          let bird = document.querySelector(".bird-4");
          bird.style.display = "block";
          if(this.state.isSound) birdSound.play();
        }
      } 
      this.setState({countScore: addScore, rightAnswers: rAnsw, score: s}, ()=>{
          this.changeWord();  
      });
    } else {
      this.setState({rightAnswers: 0, score: 10}, ()=>{
          //-----------добавляем неверно отвеченные слова--------
          let arr = this.state.missWords;
          arr.push(this.data[this.state.currentWord]);
          this.setState({missWords: arr}, ()=>{console.log("Непрвильно ", this.state.missWords)});
          //-----------------------------------------------------
          this.changeWord();
            let bird = document.querySelector(".bird-2");
            bird.style.display = "none";
            bird = document.querySelector(".bird-3");
            bird.style.display = "none";
            bird = document.querySelector(".bird-4");
            bird.style.display = "none";
            this.hideProgress();
            if(this.state.isSound) wrongSound.play();
      });
    }
  }

  changeWord() {
    let next = this.state.currentWord + 1;
    if(next < this.state.amountWords - 1) {this.setState({currentWord: next}, ()=>{
      this.preparingWords() }) 
    } else {
      this.setState({finished: true});
    };
  }

  preparingWords(){
    let rnd = Math.floor(Math.random()*this.state.amountWords);
    
    if(rnd > (0.5*this.state.amountWords)) this.setState({answerWord: this.data[this.state.currentWord].wordTranslate})
        else this.setState({answerWord: this.data[rnd].wordTranslate});
      
  }

  timer(){
    let timerID = setInterval(() => {
      this.setState({time: --this.state.time}, ()=>{
        if(this.state.time == 0 ) {
          clearInterval(timerID);
          this.setState({finished: true});
        }
      })
    }, 1000);
  }

  componentDidMount(){
    console.log("Sprint data ", this.data);
    this.setState({amountWords: this.data.length}, ()=>{
        this.preparingWords();
        this.timer();  
    });
    
    let rightIcon = document.getElementById("rightIcon");
    rightIcon.style.visibility = "hidden";
    document.addEventListener("keydown", this.keypress, false);
  }

  shoeRightIcon(){
    let rightIcon = document.getElementById("rightIcon");
        rightIcon.style.visibility = "visible";
        setTimeout(()=>{rightIcon.style.visibility = "hidden"}, 300);
  }

  keypress(e){
    if (e.key === 'ArrowRight') { 
      this.clickRight();
    }
    if (e.key === 'ArrowLeft') { 
      this.clickWrong();
    }
  }

  openFullscreen(){
    let elem = document.documentElement;
    let openWindow = document.querySelector('.btn-sprint-openfullscreen');
        openWindow.style.display = "none";
    let closeWindow = document.querySelector('.btn-sprint-closefullscreen');
        closeWindow.style.display = "block";

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
  }

  closeFullscreen(){
    let openWindow = document.querySelector('.btn-sprint-openfullscreen');
        openWindow.style.display = "block";
    let closeWindow = document.querySelector('.btn-sprint-closefullscreen');
        closeWindow.style.display = "none";

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
  }

	render(){
  
		return (

      <section className="sprint-game-page">

        {this.finishedGame()}

        <div className="container sprint-game">
          <div className="row">
            <div className="sprint-header">
              <div className="sprint-time">{this.state.time}</div>
                <div className="sprint-btn-header">
                  <button className="btn-sprint-openfullscreen" onClick={this.openFullscreen}>
                    <i className="fas fa-expand h4"></i>
                  </button>
                  <button className="btn-sprint-closefullscreen" onClick={this.closeFullscreen}>
                    <i className="fas fa-compress h4"></i>
                  </button>
                  <button className="btn btn-sprint-close" onClick={this.props.clickTeam}>
                    <i className="fa fa-times h4"></i>
                  </button>
                </div>
            </div>
          </div>

          <div className="row">
            <div className="sprintScore-main">
              <div className="sprint-score">
                <div className="score-sprint">
                <div className="sprint-score-table">{this.state.countScore}</div>
                <div className="sprint-music" onClick={this.SoundSwitch}>
                  <i className="fas fa-volume-mute h4"></i>
                </div>
                <div className="sprint-onmusic" onClick={this.SoundSwitch}>
                  <i className="fas fa-volume-up h4"></i>
                </div>
                </div>
              </div>
            </div>

            <div className='sprint-game-block'>
              <div className="sprint-progress-place">
                
                <div id="prog1" className = "progress-score-div" >
                  <i   className="fas fa-check sprint-progress-check"></i>
                </div>
                
                <div id="prog2" className = "progress-score-div">
                  <i  className="fas fa-check sprint-progress-check"></i>
                </div>
                
                <div id="prog3" className = "progress-score-div">
                  <i  className="fas fa-check sprint-progress-check"></i>
                </div>
              </div>

              <span className="points-progress">+{this.state.score} очков за слово.</span>

              <div className="birds">
                <span>
                  <img className="bird-1" src={ require('../images/sprint/bird-1.png')} alt="bird" />
                </span>
                <span>
                  <img className="bird-2" src={ require('../images/sprint/bird-2.png')} alt="bird" />
                </span>
                <span>
                  <img className="bird-3" src={ require('../images/sprint/bird-3.png')} alt="bird" />
                </span>
                 <span>
                  <img className="bird-4" src={ require('../images/sprint/bird-4.png')} alt="bird" />
                </span>
              </div>

              <div className="language-eng">{this.data[this.state.currentWord].word}</div>
              <div className="language-rus">{this.state.answerWord}</div>
              <div className="sprint-progress-mainCheck" id="rightIcon">    
                <i className="fas fa-check h4" ></i>
              </div>
          

              <div className="click-buttons">
                <button className="btn btn-danger sprint-wrong" onClick={this.clickWrong}>Неверно</button>
                <button className="btn btn-success sprint-correct" onClick={this.clickRight}>Верно</button>
              </div>

              <div className="press-buttons">
                <span className="sprint-left-arrow" onKeyPress={this.keypress}>
                  <i className="fas fa-long-arrow-alt-left" data-button="Wrong"></i>
                </span>
                <span className="sprint-right-arrow" onKeyPress={this.keypress}>
                  <i className="fas fa-long-arrow-alt-right" data-button="Correct"></i>
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>
		)
	}
}


export default SprintGame;