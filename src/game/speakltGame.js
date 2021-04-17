import React, { Component } from 'react';
import  '../images/speaklt/speak.png';

import musicResult from '../audio/correct.mp3';
import musicMistake from '../audio/error.mp3';
import '../game/speakltGame.css';
import SpeakltStaticPage from './speakltStaticPage.js';

let Keypress = require("react-keypress");
const audio = new Audio();
let dataArr = [];
let rightWords = [];
let missWords = [];

class SpeakltGame extends React.Component {
	constructor(props){
		super(props);
    this.state = {
      qWords: [],
      isSpeaking: false,
      activButton: 0,
      maxButton: 0,
      activeElemBtn: '',
      finished: false
    }
    this.data = props.data;
    this.speakInterval;
    this.recognition = new webkitSpeechRecognition();
    this.clickWordButton = this.clickWordButton.bind(this);
    this.speakWord = this.speakWord.bind(this);
    this.closeRound = this.closeRound.bind(this);
    this.registart = this.registart.bind(this);
    this.openFullscreen = this.openFullscreen.bind(this);
    this.closeFullscreen = this.closeFullscreen.bind(this);
    this.keypress = this.keypress.bind(this);
    this.tryAgain = this.tryAgain.bind(this);
    this.finishedGame = this.finishedGame.bind(this);
	}

  finishedGame(){
    console.log("finishedGame");
    if(this.state.finished){
      let gamePage = document.querySelector(".speaklt-game");
      gamePage.style.display = "none";
      missWords = dataArr.filter((el)=>{
        let tempArr = rightWords.filter((item)=>{
          if(item.word == el.word) return true;
        });
        if(tempArr.length == 0) return true;
      });
        return(
            <SpeakltStaticPage 
              rightWords={rightWords} 
              missWords={missWords}
              tryAgain={this.tryAgain}
              main={this.props.main}
             />
          )

    }
    

  }

  tryAgain(){
    this.state = {
      qWords: [],
      isSpeaking: false,
      activButton: 0,
      maxButton: 0,
      finished: false,
      activeElemBtn: '',
    }
    let statisticPage = document.querySelector(".speaklt-static");
    statisticPage.style.display = "none";
    let gamePage = document.querySelector(".speaklt-game");
    console.log("Speaklt gamePage ", gamePage);
    gamePage.style.display = "block";
    
    console.log("Speaklt gamePage After", gamePage);
    this.setState({maxButton: this.data.length, qWords: this.data});
    dataArr = this.data;
    
  }

  componentDidMount(){
    document.addEventListener("keydown", this.keypress, false);
    this.setState({maxButton: this.data.length, qWords: this.data});
    dataArr = this.data;
    console.log("speakltGame finished", this.state.finished);
  }
  clickWordButton(e, item){
    if(this.state.isSpeaking == false) {
      let elements = document.querySelectorAll(".card");
        console.log("elements ", elements);
    for(let i = 0; i<elements.length; i++){
        elements[i].style.background = 'grey';
    }

    let speakltWord =document.getElementById(item);
       speakltWord.style.background = "green";
 
    let sound = speakltWord.getAttribute('audio');
    let path = "https://react-rslangbe.herokuapp.com/" + sound;
        audio.src = path;
        audio.play();

    let cardImg = speakltWord.getAttribute('img');

    let imgEng = document.querySelector('.card-img-word');
        imgEng.style.display = "none";

    let img = document.querySelector('.card-img-top');
        img.style.display = "block";
    let src = "https://react-rslangbe.herokuapp.com/" + cardImg;
        img.src=src;

    let wordCardTranslation = document.querySelector('.word-card-translation');
        wordCardTranslation.innerText = item;
    }
  }
  speakWord(){
    if(this.state.isSpeaking == false){
      this.setState({isSpeaking: true});

    let speakSee = document.querySelector('.speak-see');
        speakSee.classList.remove('btn-danger');
        speakSee.classList.add('btn-secondary');

    let faMicrophone = document.querySelector('.fa-microphone');
    let speakRound = document.querySelector('.speak-round');
        speakRound.style.visibility = "visible";

    this.speakInterval = setInterval(()=>{
          if (faMicrophone.style.color == "red"){
             faMicrophone.style.color = "#fff";
          } else {
            faMicrophone.style.color = "red";
          }
        }, 500);

    let formGroup = document.querySelector('.form-group');
        formGroup.style.display = "block";

    let imgEng = document.querySelector('.card-img-word');
        imgEng.style.display = "block";
    let img = document.querySelector('.card-img-top');
        img.style.display = "none";
    
    let wordCardTranslation = document.querySelector('.word-card-translation');

        wordCardTranslation.style.display = "none";

    let elements = document.querySelectorAll(".card");
 
      for(let i = 0; i<elements.length; i++){
          elements[i].style.background = 'grey';
      }

    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = "en-US";

    this.recognition.onerror = function(event) {
        console.error(event);
    };

    this.recognition.onstart = function() {
        console.log('Speech recognition service has started');
    };

    this.recognition.onend = function() {
        console.log('Speech recognition service disconnected');
    };

    this.recognition.onresult = function(event) {
        var interim_transcript = '';
        var final_transcript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
      } else {
          interim_transcript += event.results[i][0].transcript;
      }
    }

    let str = final_transcript.trim();  
    let resArr = dataArr.filter((el)=>{
      if(el.word.toLowerCase() === str.toLowerCase()) return true;
    });

    if(resArr.length != 0){     
      rightWords.push(resArr[0]);

      let speakltWord = document.getElementById(resArr[0].word);
          speakltWord.style.background = "green";
      
      let img = document.querySelector('.card-img-top');
          img.style.display = "block";      
      
      let imgEng = document.querySelector('.card-img-word');
          imgEng.style.display = "none";
      
      let src = "https://react-rslangbe.herokuapp.com/" + resArr[0].image;
          img.src=src;
      
      let wordCardTranslation = document.querySelector('.word-card-translation');
          wordCardTranslation.style.display = "block";
          wordCardTranslation.innerText = resArr[0].word;

      document.querySelector('.input-text').value =  resArr[0].word;
          audio.src = musicResult;
          audio.play();

      let startStart = document.querySelector('.speaklt-starts');

      let divStart = document.createElement('div');
          divStart.classList.add('speaklt-start');
          startStart.append(divStart);

      let iStart = document.createElement('i');
          iStart.classList.add('fa');
          iStart.classList.add('fa-star');
          iStart.classList.add('h4');
          divStart.append(iStart);
    }
    };
      
    this.recognition.start();  
    }
  }

  closeRound(){
    clearInterval(this.speakInterval);

    this.recognition.stop();

    this.setState({isSpeaking: false, finished: true});

    let speakSee = document.querySelector('.speak-see');
        speakSee.classList.remove('btn-secondary');
        speakSee.classList.add('btn-danger');

    let faMicrophone = document.querySelector('.fa-microphone');
        faMicrophone.style.color = "#fff";

    let speakRound = document.querySelector('.speak-round');
        speakRound.style.visibility = "hidden";

    let formGroup = document.querySelector('.form-group');
      console.log('formGroup  = ', formGroup);
        formGroup.style.display = "none";

    let wordCardTranslation = document.querySelector('.word-card-translation');
        wordCardTranslation.style.display = "block";
        wordCardTranslation.innerText = ' ';

    let imgEng = document.querySelector('.card-img-word');
        imgEng.style.display = "block";

    let img = document.querySelector('.card-img-top');
        img.style.display = "none";

    let elements = document.querySelectorAll(".card");
      for(let i = 0; i<elements.length; i++){
        elements[i].style.background = 'grey';
      }

    document.querySelector('.input-text').value = '';

    let startStart = document.querySelector('.speaklt-starts');
        startStart.innerHTML = " ";
  }

  registart(){
    this.setState({
      isSpeaking: false,
      activButton: 0,
      activeElemBtn: ''
    });
    clearInterval(this.speakInterval);
    this.recognition.stop();

    let speakSee = document.querySelector('.speak-see');
        speakSee.classList.remove('btn-secondary');
        speakSee.classList.add('btn-danger');

    let faMicrophone = document.querySelector('.fa-microphone');
        faMicrophone.style.color = "#fff";

    let elements = document.querySelectorAll(".card");
        console.log("elements ", elements);

    for(let i = 0; i<elements.length; i++){
        elements[i].style.background = 'grey';
    }

    let imgEng = document.querySelector('.card-img-word');
        imgEng.style.display = "block";
    let img = document.querySelector('.card-img-top');
        img.style.display = "none";

    let wordCardTranslation = document.querySelector('.word-card-translation');
        wordCardTranslation.innerText = " ";

    let formGroup = document.querySelector('.form-group');
        formGroup.style.display = "none";
     document.querySelector('.input-text').value = '';

    let startStart = document.querySelector('.speaklt-starts');
        startStart.innerHTML = " ";
    
    let speakRound = document.querySelector('.speak-round');
        speakRound.style.visibility = "hidden";
  }

  openFullscreen(){
    let elem = document.documentElement;
    
    let openWindow = document.querySelector('.btn-speaklt-openfullscreen');
        openWindow.style.display = "none";
    
    let closeWindow = document.querySelector('.btn-speaklt-closefullscreen');
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
    let openWindow = document.querySelector('.btn-speaklt-openfullscreen');
        openWindow.style.display = "block";

    let closeWindow = document.querySelector('.btn-speaklt-closefullscreen');
        closeWindow.style.display = "none";

      if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
          document.msExitFullscreen();
      }
  }

  keypress(e, item){

    if(e.key === 'ArrowRight'){
      
    let activeBut = this.state.activButton + 1;
      if(activeBut > this.state.maxButton-1) activeBut = 0; 
        let elements = document.querySelectorAll(".card");

      for(let i = 0; i<elements.length; i++){
        elements[i].style.background = 'grey';
      }

    let elemBtn = document.getElementById(this.state.qWords[activeBut].word);
        elemBtn.style.background="green";
        elemBtn.focus();

    this.setState({activButton: activeBut}, ()=>{
        let elemBtn = document.getElementById(item);
    });
    }

    if(e.key === 'ArrowLeft'){
      
    let activeBut = this.state.activButton-1;
    console.log('activeBut = ',activeBut );
    
    if(activeBut <0) activeBut = this.state.maxButton-1;
        let elements = document.querySelectorAll(".card");

    for(let i = 0; i<elements.length; i++){
        elements[i].style.background = 'grey';
    }

    let elemBtn = document.getElementById(this.state.qWords[activeBut].word);
        elemBtn.style.background="green";
        elemBtn.focus();

      this.setState({activButton: activeBut}, ()=>{
         let elemBtn = document.getElementById(item);
      });

     }

     if(e.key === 'Enter'){

      audio.src = "https://react-rslangbe.herokuapp.com/" + this.state.qWords[this.state.activButton].audio;
      audio.play();

    let imgEng = document.querySelector('.card-img-word');
        imgEng.style.display = "none";

    let img = document.querySelector('.card-img-top');
        img.style.display = "block";
    let src = "https://react-rslangbe.herokuapp.com/" + this.state.qWords[this.state.activButton].image;
        img.src=src;

    let wordCardTranslation = document.querySelector('.word-card-translation');
        wordCardTranslation.innerText = this.state.qWords[this.state.activButton].word;

     }
     if(e.key === 'Shift'){
        this.speakWord();
     }
  }

	render(){
		
		return (
  
			<section className ="speaklt-game-page">

        {this.finishedGame()}

				<div className="container speaklt-game">

					<div className="row">
						<div className="speaklt-header">
							<div className="speaklt-time">
								<button type="button" className="btn btn-success" onClick={this.registart}>
        					<i className="fas fa-retweet"></i> Рестарт
        				</button>
								<button type="button" className="btn btn-danger speak-see" onClick={this.speakWord}>
          				<i className="fas fa-microphone"></i> Говорить
        				</button>
        				<button type="button" className="btn btn-warning speak-round" onClick={this.closeRound}>
         					<i className="fas fa-ban"></i> Завершить раунд
        				</button>

							</div>
							<div className="speaklt-btn-header">
                <button className="btn-speaklt-openfullscreen" onClick={this.openFullscreen}>
                	<i className="fas fa-expand h4"></i>
                </button>
                <button className="btn-speaklt-closefullscreen" onClick={this.closeFullscreen}>
                	<i className="fas fa-compress h4"></i>
                </button>
                <button className="btn btn-speaklt-close" onClick={this.props.clickTeam}>
                	<i className="fa fa-times h4"></i>
                </button>
              </div>
						</div>
					</div>

					<div className="row">
			 			<div className="card-container-content d-flex justify-content-center mt-3">
    						<div className="word-card card mb-3 text-white text-center word-card-speaklt">	
        					<img className="card-img-top img-thumbnail img-fluid" alt="word image" src={require('../images/speaklt/speak.png')}/>
                  <img className="card-img-word img-thumbnail img-fluid" alt="word image" src={require('../images/speaklt/speak.png')}/>
      						<div className="word-card-body">
        							<p className="card-text word-card-translation"></p>

        							<div className="form-group">
          								<div className="input-group">
            								<div className="input-group-prepend">
             					 				<span className="input-group-text">
                									<i className="fa fa-microphone"></i>
              									</span>
            								</div>

            								<input className="form-control text-center font-weight-bold text-success input-text" type="text" readonly=""/>

            								<div className="input-group-append">
              									<span className="input-group-text">
                									<i className="fa fa-microphone"></i>
              									</span>
            								</div>

          								</div>
        							</div>

      							</div>
      						</div>

    					</div>
              <div className="speaklt-starts">
              </div>
    				</div>

    				<div className="row">
    					<div className="speaklt-word">
           
              {this.state.qWords.map((item, key)=>{
                return (
                  <div className="speaklt-word-card card  border-white text-white" 
                       audio={item.audio} img={item.image} id={item.word} onClick={(e)=>(this.clickWordButton(e, item.word))}
                       onKeyPress={(e)=>(this.keypress(e, item.word))}>
                    <span className="fab fa-itunes-note"></span>
                    <p className="term">{item.word}</p>
                    <p className="transcription">{item.transcription}</p>
                  </div>)
              })}
    					
  						</div>
    				</div>


  				</div>
			</section>
   
		)
	}


}

export default SpeakltGame;
