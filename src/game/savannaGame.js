import React, { Component } from 'react';
import SavannaStaticPage from './savannaStaticPage.js';

import pew from "../audio/pew.mp3"; 
import wrong from '../audio/wrong.mp3';

import './savannaGame.css';

let Keypress = require("react-keypress");
const pevSound = new Audio(pew);
const wrongSound = new Audio(wrong);
let moveID;

class SavannaGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qWords: [],
      rightWords: [],
      missWords: [],
        qWord1: {},
        qWord2: {},
        qWord3: {},
        qWord4: {},
      activButton: 0,
      activeElemBtn: '',
      maxButton: 4,
      hartBroken: 0,
      word: '',
      wordNone: '',
      backgroundPage: -3500,
      rightAnswers: 0,
      top: -5,
      topNone: -5,
      wordsAmount: 0,
      currentWord: 0,
      finished: false,
      isSound: true,
    }
  this.data = props.data;  
  this.openSettingSavanna = this.openSettingSavanna.bind(this);
  this.closeSettingSavanna = this.closeSettingSavanna.bind(this);
  this.startSavannaGame = this.startSavannaGame.bind(this);
  this.moveWord = this.moveWord.bind(this);
  this.moveWordNone = this.moveWordNone.bind(this);
  this.changeWord = this.changeWord.bind(this);
  this.preparingWords = this.preparingWords.bind(this);
  this.breakHeart = this.breakHeart.bind(this);
  this.clickWordButton = this.clickWordButton.bind(this);
  this.checkAnswer = this.checkAnswer.bind(this); 
  this.makeRedButton = this.makeRedButton.bind(this);
  this.SoundSwitch = this.SoundSwitch.bind(this);
  this.finishedGame = this.finishedGame.bind(this);
  this.tryAgain = this.tryAgain.bind(this);
  this.keypress = this.keypress.bind(this);
  }

  finishedGame(){
    if(this.state.finished) {
      clearInterval(moveID);
      let gamePage = document.querySelector(".savanna-main-container");
      gamePage.style.display = "none";
      return(
        <SavannaStaticPage 
          rightWords={this.state.rightWords} 
          missWords={this.state.missWords}
          tryAgain={this.tryAgain}
          main={this.props.main}
        />
      )
    } 
  }

  tryAgain(){
    this.setState({
      qWords: [],
      rightWords: [],
      missWords: [],
        qWord1: {},
        qWord2: {},
        qWord3: {},
        qWord4: {},
      activButton: 0,
      activeElemBtn: '',
      maxButton: 4,
      hartBroken: 0,
      word: '',
      wordNone: '',
      backgroundPage: -3500,
      rightAnswers: 0,
      top: -5,
      topNone: -5,
      wordsAmount: 0,
      currentWord: 0,
      finished: false,
      isSound: true,
    });
    let statisticPage = document.querySelector(".savanna-static");
    statisticPage.style.display = "none";
    let gamePage = document.querySelector(".savanna-main-container");
    gamePage.style.display = "block";
    for(let i=1; i<=5; i++){
      let heart = document.getElementById("heart"+i);
          heart.style.display="block";
          heart = document.getElementById("heart"+i+"1"); 
          heart.style.display="none";   
    }

    this.setState({
      word: document.querySelector(".energy-container"), 
      wordNone: document.querySelector(".energy-container-two"),
      wordsAmount: this.data.length}, ()=>{
          this.moveWord();
          this.preparingWords();
    });

     let sound = document.querySelector(".fa-volume-mute");
      sound.style.display = "none";
      sound = document.querySelector(".fa-volume-up");
      sound.style.display = "block";

    let bg_Object = document.querySelector('.savanna-game');
    bg_Object.style.backgroundPosition = "center " + "-3500px";
  }

  SoundSwitch(){
    if(this.state.isSound) {
      this.setState({isSound: false});
      let sound = document.querySelector(".fa-volume-mute");
      sound.style.display = "block";
      sound = document.querySelector(".fa-volume-up");
      sound.style.display = "none";
    } else {
      this.setState({isSound: true});
      let sound = document.querySelector(".fa-volume-mute");
      sound.style.display = "none";
      sound = document.querySelector(".fa-volume-up");
      sound.style.display = "block";
    } 
  }

  checkAnswer(word){
    if(word == this.data[this.state.currentWord].wordTranslate) return true
      else return false;

  }

  makeRedButton(){
    let btns = document.querySelectorAll(".btn-success");
    for(let i=0; i<btns.length; i++){
      if(btns[i].innerText !== this.data[this.state.currentWord].wordTranslate){
        //console.log("btns ");
        btns[i].style.background = "red";
      }
    }
  }

  clickWordButton(e, key){
   // let bg_Object = document.querySelector('.savanna-game');
   // console.log("start pos ", bg_Object.style.backgroundPosition);
    let word='';
    if(e == '') { word = e;}
    else if(key) {
      
      word = e.querySelector(".btn-success").innerText
      //word = e.querySelector(".btn-success").innerText
      console.log('if word', word);
     // word = ''; console.log('if word', word = '')
    } 
    else {//console.log('else'); 
    word = e.target.innerText};
    //console.log("clickWordButton ", word);

      if(this.checkAnswer(word)){
      //console.log("Правильно");
      let arr = this.state.rightWords;
      arr.push(this.data[this.state.currentWord]);
      //arr = this.state.rightWords.concat(gameWords[this.state.currentWord]);
      //console.log("arr ", arr);
      //arr.concat(this.state.rightWords, gameWords[this.state.currentWord]);
      this.setState({rightWords: arr},
        console.log("Правильно ", this.state.rightWords));
      if(this.state.isSound) pevSound.play();
      this.moveWordNone();
      clearInterval(moveID);
      //---------------------------------
      let btns = document.querySelectorAll(".btn-success");
      for(let i=0; i<btns.length; i++){
         if(btns[i].innerText === this.data[this.state.currentWord].wordTranslate){
           //console.log("btns ");
           btns[i].style.background = "#7CE700";
         }
      }
      //---------------------------------
      setTimeout(()=>{
        this.changeWord();
        this.preparingWords();
        this.moveWord();  
      }, 1000);
      let bg_Object = document.querySelector('.savanna-game');
      let bgPage = this.state.backgroundPage + 50;
      //console.log('background',  bgPage );
      this.setState({backgroundPage: bgPage }, ()=>{
        bg_Object.style.backgroundPosition = "center " + this.state.backgroundPage + "px";
        //console.log("bg_Object ", bg_Object.style.backgroundPosition);
      });
       
    } else {
      //console.log("Неправильно");
      let arr = this.state.missWords;
      arr.push(this.data[this.state.currentWord]);
      this.setState({missWords: arr},
        console.log("Неправильно ", this.state.missWords));
      if(this.state.isSound) wrongSound.play();
      clearInterval(moveID);
      //---------------------------------
      let btns = document.querySelectorAll(".btn-success");
      for(let i=0; i<btns.length; i++){
        if(btns[i].innerText !== this.data[this.state.currentWord].wordTranslate){
           btns[i].style.background = "red";
        }
      }
      //---------------------------------
      setTimeout(()=>{
        this.changeWord();
        this.preparingWords();      
        this.breakHeart();
        this.moveWord();
      },1000);
      
    }
    

  }

  breakHeart(){
    this.setState({hartBroken: ++this.state.hartBroken}, ()=>{
      if(this.state.hartBroken > 4) {this.setState({finished: true})}
        else {
          let heart = document.getElementById("heart"+this.state.hartBroken);
          heart.style.display="none";
          heart = document.getElementById("heart"+this.state.hartBroken+"1"); 
          heart.style.display="block";    
        }
      
    });
  }

  preparingWords(){
    let arr = [];
      arr[0] = this.state.currentWord;
    let rand = 0;
      for(let i = 0; i<3; i++){
           do{
             rand = Math.floor(Math.random() * (this.state.wordsAmount-1));
           }while(arr.includes(rand));
         arr.push(rand);
      }
        for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    
      this.setState({qWords: arr}, ()=>{
          console.log("word0 ", this.state.qWords);
      });

      this.setState({
        qWord1: this.data[arr[0]],
        qWord2: this.data[arr[1]],
        qWord3: this.data[arr[2]],
        qWord4: this.data[arr[3]],
      });

  }

  changeWord(){
    this.state.wordNone.style.visibility = 'hidden';

    let btns = document.querySelectorAll(".btn-success");
      for(let i=0; i<btns.length; i++){
          btns[i].style.background = "#077632";

      }

    let nextWord = this.state.currentWord+1;
      if(nextWord == this.state.wordsAmount-1) this.setState({finished: true});
      if(nextWord != this.state.wordsAmount)
      this.setState({currentWord: nextWord, top: -10, topNone: -10}, ()=>{
        let str = this.state.top+'%';
        this.state.word.style.top = str;
        this.preparingWords();
      });  
    }

  moveWord(){
    moveID = setInterval(()=>{
      
      if(this.state.top == 55) this.setState({top: -10, topNone: -10}, ()=>{
        let str = this.state.top+'%';
        this.state.word.style.top = str;
        this.clickWordButton('', true);
        //this.breakHeart();
        //this.changeWord();
        //this.preparingWords()
      })
      else this.setState({top: ++this.state.top, topNone:++this.state.top},()=>{
        let str = this.state.top+'%';
        this.state.word.style.top = str;
      });  
    
      
    }, 100);
    
  }

  moveWordNone(){
    this.state.wordNone.style.visibility = 'visible';

    setInterval(()=>{
      this.setState({topNone:++this.state.topNone},()=>{
        let str = this.state.topNone+'%';
        this.state.wordNone.style.top = str;
      });  
    }, 50);
  }

  openSettingSavanna(){
    let btnSettingSavannaOpen = document.querySelector('.btn-setting-savanna-open');
    let btnSettingSavannaClose = document.querySelector('.btn-setting-savanna-close');
    let savannaSetting = document.querySelector('.savanna-setting');
        savannaSetting.style.display = "block";
        btnSettingSavannaOpen.style.display = "none";
        btnSettingSavannaClose.style.display = "block";
  }
  closeSettingSavanna() {
    let btnSettingSavannaOpen = document.querySelector('.btn-setting-savanna-open');
    let btnSettingSavannaClose = document.querySelector('.btn-setting-savanna-close');
    let savannaSetting = document.querySelector('.savanna-setting');
        savannaSetting.style.display = "none";
        btnSettingSavannaOpen.style.display = "block";
        btnSettingSavannaClose.style.display = "none";
  }
  startSavannaGame(){
    let savannaStartPage = document.querySelector('.savanna-start-page');
    let savannaGamePage = document.querySelector('.savanna-game-page');
    
        savannaStartPage.style.display = "none";
        savannaGamePage.style.display = "block";
  }

  componentDidMount(){
    console.log("Savanna data ", this.data);
    document.addEventListener("keydown", this.keypress, false);
    this.setState({
      word: document.querySelector(".energy-container"), 
      wordNone: document.querySelector(".energy-container-two"),
      wordsAmount: this.data.length}, ()=>{
          this.moveWord();
          this.preparingWords();
    });
    /*
    let word = document.querySelector(".energy-container");
    let str = top+'%';
    word.style.top = str;
    */
    /*
    setInterval(()=>{
      let word = document.querySelector(".energy-container");
      top +=1;
      let str = top+'%';
      console.log("top ", str);

      word.style.top = str;
    }, 500);
    */
  }

  keypress(e){
   
    if(e.key === 'ArrowRight'){
       
      let activeBut = this.state.activButton + 1;

      if(activeBut > this.state.maxButton) activeBut = 1; 

      this.setState({activButton: activeBut}, ()=>{
          let elemBtn = document.getElementById('savanna-btn-word' + this.state.activButton);
      this.setState({activeElemBtn: elemBtn});
          elemBtn.focus();
          });

    }
    if(e.key === 'ArrowLeft'){
      
      let activeBut = this.state.activButton - 1;

      if(activeBut < 1) activeBut = this.state.maxButton; 

      this.setState({activButton: activeBut}, ()=>{
          let elemBtn = document.getElementById('savanna-btn-word' + this.state.activButton);
      this.setState({activeElemBtn: elemBtn});
            elemBtn.focus();
      });

    }
    if(e.key === 'Enter'){
      this.clickWordButton(this.state.activeElemBtn, true);
      this.state.activeElemBtn.blur();   
    }
  }

  openFullscreen(){
    let elem = document.documentElement;
    let openWindow = document.querySelector('.btn-savanna-openfullscreen');
        openWindow.style.display = "none";
    let closeWindow = document.querySelector('.btn-savanna-closefullscreen');
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
    //let elem = document.documentElement;
    let openWindow = document.querySelector('.btn-savanna-openfullscreen');
        openWindow.style.display = "block";
    let closeWindow = document.querySelector('.btn-savanna-closefullscreen');
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
    <section className ="savanna-game">

      {this.finishedGame()}

      <div className="container-fluid savanna-main-container h-100">

        <div className="savanna-game-page d-flex flex-column justify-content-between w-100">
          <div className="word-container">
            <div className="gaming-word-guess">Word</div>
          </div>
          <div className="energy-container">
            <div className="energy-rotate">{this.data[this.state.currentWord].word}</div>
      
          </div>
          <div className="energy-container-two">
         
            <div className="energy-rotate-none"></div>
          </div>
          <div className="container main-game-header my-2">
            <div className="row">
              <div className="col-6 d-flex justify-content-start h3 savanna-sound-on-off-container">
                <span className="fas fa-volume-up" onClick={this.SoundSwitch}></span>
                <span className="fas fa-volume-mute" onClick={this.SoundSwitch}> </span>
              </div>
              <div className="col-6 d-flex justify-content-end h3">
                <div className="p-1 ml-3">
                  <span className="savanna-step-word-counter">{this.state.currentWord + 1}</span>
                  <span className="savanna-step-word-counter">/</span>
                  <span className="savanna-step-word-counter">{this.state.wordsAmount}</span>
                </div>
                <button className="btn-savanna-openfullscreen" onClick={this.openFullscreen}>
                    <i className="fas fa-expand h4"></i>
                  </button>
                  <button className="btn-savanna-closefullscreen" onClick={this.closeFullscreen}>
                    <i className="fas fa-compress h4"></i>
                  </button>
                <div className="btn-savanna-close p-1 ml-3" onClick={this.props.clickTeam}>
                  <span className="fas fa-times"></span>
                </div> 
              </div>
            </div>
            <div className="row">   
              <div className="col-12 d-flex justify-content-end h3">
                <div className="savanna-lives savanna-lives-broken p-1">
                  <span id="heart1" className="fas fa-heart"></span>
                  <span id="heart11" className="fas fa-heart-broken"></span>
                </div>
                <div className="savanna-lives p-1">
                  <span id="heart2" className="fas fa-heart"></span>
                  <span id="heart21" className="fas fa-heart-broken"></span>
                </div>
                <div className="savanna-lives p-1">
                  <span id="heart3" className="fas fa-heart"></span>
                  <span id="heart31" className="fas fa-heart-broken"></span>
                </div>
                <div className="savanna-lives p-1">
                  <span id="heart4" className="fas fa-heart"></span>
                  <span id="heart41" className="fas fa-heart-broken"></span>
                </div>
                <div className="savanna-lives p-1">
                  <span id="heart5" className="fas fa-heart"></span>
                  <span id="heart51" className="fas fa-heart-broken"></span>
                </div>
              </div>
            </div>

          </div>

          <div className="container savanna-main-game">
            <div className="row text-left text-sm-center">
              <button id="savanna-btn-word1" type="button" className="btn btn-success savanna-round-word col-12 col-sm-auto my-2"
                      onClick={this.clickWordButton} onKeyPress={Keypress(this.keypress)}>
                <span >{this.state.qWord1.wordTranslate}</span>
              </button>
              <button  id="savanna-btn-word2" type="button" className="btn btn-success savanna-round-word col-12 col-sm-auto my-2" 
                      onClick={this.clickWordButton} onKeyPress={Keypress(this.keypress)}>
                <span >{this.state.qWord2.wordTranslate}</span>
              </button>
              <button id="savanna-btn-word3" type="button" className=" btn btn-success col-12 col-sm-auto my-2 savanna-round-word" 
                      onClick={this.clickWordButton} onKeyPress={Keypress(this.keypress)}>
                <span>{this.state.qWord3.wordTranslate}</span>
              </button>
              <button id="savanna-btn-word4" type="button" className="btn btn-success  savanna-round-word col-12 col-sm-auto my-2"
                         onClick={this.clickWordButton} onKeyPress={Keypress(this.keypress)}>
                <span>{this.state.qWord4.wordTranslate}</span>
              </button>
             
             
          </div>
        </div>
        <div className="main-game-footer d-flex justify-content-center w-100">
          <div className="crystall-container my-2">
            <div className="crystall"></div>
          </div>
        </div>
      </div>


      </div>
    </section>      
		)
	}
}


export default SavannaGame;