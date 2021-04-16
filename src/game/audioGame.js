import React, { Component } from 'react';

import AudioStaticPage from './audioStaticPage.js';

import musicBtnDontKnow from '../audio/wrong.mp3';
import '../game/audioGame.css';

const audio = new Audio();
let Keypress = require("react-keypress");


class AudioGame extends React.Component {
	constructor(props){
		super(props);
		this.state = {
     		qWords: [],

     		rightWords: [],
     		missWords: [],
        activButton: 0,
        activeElemBtn: '',
        maxButton: 5,
      		qWord1: {},
      		qWord2: {},
      		qWord3: {},
      		qWord4: {},
      		qWord5: {},
      		wordsAmount: 0,
      		currentWord: 0,
      		finished: false,
          isMusic: true
    	}
      this.gameW = [];
      this.data = props.data;
    	this.preparingWords = this.preparingWords.bind(this);
    	this.changeWord = this.changeWord.bind(this);
    	this.playSound = this.playSound.bind(this);
    	this.clickWordButton = this.clickWordButton.bind(this);
    	this.checkAnswer = this.checkAnswer.bind(this); 
      this.changeAnswer = this.changeAnswer.bind(this);
      this.onMusic = this.onMusic.bind(this);
      this.keypress = this.keypress.bind(this);
      this.tryAgain = this.tryAgain.bind(this);   
	}

tryAgain(){
    this.setState({
      qWords: [],
        rightWords: [],
        missWords: [],
        activButton: 0,
        activeElemBtn: '',
        maxButton: 5,
          qWord1: {},
          qWord2: {},
          qWord3: {},
          qWord4: {},
          qWord5: {},
          wordsAmount: 0,
          currentWord: 0,
          finished: false,
          isMusic: true
    });

    let statisticPage = document.querySelector(".audio-static");
        statisticPage.style.display = "none";
    let gamePage = document.querySelector(".audio-game");
        gamePage.style.display = "block";


    this.setState({wordsAmount: this.data.length}, ()=>{
         this.preparingWords();  
         this.playSound();
    });
  }

  finishedGame(){
    if(this.state.finished) {
      let gamePage = document.querySelector(".audio-game");
          gamePage.style.display = "none";
      return(
        <AudioStaticPage 
          rightWords={this.state.rightWords} 
          missWords={this.state.missWords}
          tryAgain={this.tryAgain}
          main={this.props.main}
        />
      )
    } 
  }

	checkAnswer(word){
		if(word == this.data[this.state.currentWord].wordTranslate) return true
			else return false;
	}

	clickWordButton(e, key){
		let word = '';
      if(key) word = e.querySelector(".round-word").innerText;
		  else word = e.target.innerText;
		if(this.checkAnswer(word)){
			let arr = this.state.rightWords;
			   arr.push(this.data[this.state.currentWord]);
			   this.setState({rightWords: arr},
				    //console.log("Правильно ", this.state.rightWords)
            );
		} else {
			let arr = this.state.missWords;
			   arr.push(this.data[this.state.currentWord]);
			this.setState({missWords: arr},
				  //console.log("Неправильно ", this.state.missWords)
          );
		}
		
		let elements = document.querySelectorAll(".round-word");
		  for(let i=0; i<elements.length; i++){
			  elements[i].style.color = "grey";
        if(elements[i].innerText == word
            && elements[i].innerText != this.data[this.state.currentWord].wordTranslate) {
          elements[i].style.textDecoration = "line-through";
        }
			  if(elements[i].innerText == this.data[this.state.currentWord].wordTranslate){
				  elements[i].style.color = "#c33124";
			   }
		  }

    let audioQuestion = document.querySelector('.audio-question');
        audioQuestion.style.display = 'none';
    let audioAnswer = document.querySelector('.audio-answer');
        audioAnswer.style.display = "flex";
    let btnDontKnow = document.querySelector('.btn-dont-know');
        btnDontKnow.style.display = "none";
    let btnNext = document.querySelector('.btn-next');
        btnNext.style.display = "block";
	}

	componentDidMount(){
    document.addEventListener("keydown", this.keypress, false);
    this.setState({wordsAmount: this.data.length}, ()=>{
     		 //console.log("wordsAmount ", this.state.wordsAmount);
     		 this.preparingWords();  
     		 this.playSound();
    });
    
  }

  changeWord(){
   	let nextWord = this.state.currentWord+1;
   	if(nextWord == this.state.wordsAmount-1) this.setState({finished: true});
  	if(nextWord != this.state.wordsAmount-1)
   		this.setState({currentWord: nextWord}, ()=>{
   		this.preparingWords();
   		this.playSound();
   	});

   	let elements = document.querySelectorAll(".round-word");
   		for(let i=0; i<elements.length; i++){
   			elements[i].style.color = "#000";
        elements[i].style.textDecoration = "";
   		}

    let audioQuestion = document.querySelector('.audio-question');
        audioQuestion.style.display = 'flex';
    let audioAnswer = document.querySelector('.audio-answer');
        audioAnswer.style.display = "none";
    let btnDontKnow = document.querySelector('.btn-dont-know');
        btnDontKnow.style.display = "block";
    let btnNext = document.querySelector('.btn-next');
        btnNext.style.display = "none";
   		
    }

 	preparingWords(){
  	let arr = [];
  		arr[0] = this.state.currentWord;
  	let rand = 0;
    let temp =0;
  		for(let i = 0; i<4; i++){
        	do{
            temp++;
   			     rand = Math.floor(Math.random() * (this.state.wordsAmount));
            console.log("temp ", temp);
   			  } while(arr.includes(rand));
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
    	qWord5: this.data[arr[4]]
   	});
 	}

	playSound(){
		let path = "https://react-rslangbe.herokuapp.com/" + this.data[this.state.currentWord].audio;
    	audio.src = path;
      if(this.state.isMusic)audio.play();
	}

  changeAnswer(){
     let arr = this.state.missWords;
      arr.push(this.data[this.state.currentWord]);
      this.setState({missWords: arr},
        //console.log("Неправильно ", this.state.missWords)
        );
    let audioQuestion = document.querySelector('.audio-question');
        audioQuestion.style.display = 'none';
    let audioAnswer = document.querySelector('.audio-answer');
        audioAnswer.style.display = "flex";
    let btnDontKnow = document.querySelector('.btn-dont-know');
        btnDontKnow.style.display = "none";
    let btnNext = document.querySelector('.btn-next');
        btnNext.style.display = "block";

    let elements = document.querySelectorAll(".round-word");
    for(let i=0; i<elements.length; i++){
      elements[i].style.color = "grey";
      
      if(elements[i].innerText == this.data[this.state.currentWord].wordTranslate){
        elements[i].style.color = "#c33124";
      }
    }

    audio.src = musicBtnDontKnow;
      if(this.state.isMusic)audio.play();
  }
  onMusic(){
    if(this.state.isMusic){
      this.setState({isMusic: false});
      let music = document.querySelector('.audio-music');
          music.style.display = "block";
          music = document.querySelector('.audio-onmusic');
          music.style.display = "none";

    } else {
      this.setState({isMusic: true});
      let music = document.querySelector('.audio-music');
          music.style.display = "none";
          music = document.querySelector('.audio-onmusic');
          music.style.display = "block";
    }

  }
  keypress(e){
    if(e.key === 'ArrowRight'){
      let activeBut = this.state.activButton + 1;
      if(activeBut > this.state.maxButton) activeBut = 1; 

      this.setState({activButton: activeBut}, ()=>{
            let elemBtn = document.getElementById('btn-word' + this.state.activButton);
            this.setState({activeElemBtn: elemBtn});
            elemBtn.focus();
          });
    }
    
    if(e.key === 'ArrowLeft'){
      let activeBut = this.state.activButton - 1;
      if(activeBut < 1) activeBut = this.state.maxButton; 

      this.setState({activButton: activeBut}, ()=>{
            let elemBtn = document.getElementById('btn-word' + this.state.activButton);
            this.setState({activeElemBtn: elemBtn});
            elemBtn.focus();
          });
     
    }

    if (e.key === 'Enter') {
        let btn = document.querySelector(".btn-dont-know");
        if(btn.style.display === 'none') {
            this.changeWord(); 
            this.state.activeElemBtn.blur();
        }
        else {
          this.changeAnswer();
          this.state.activeElemBtn.blur();
        }
      }
    
    if(e.key === 'Shift'){
        this.clickWordButton(this.state.activeElemBtn, true);
        this.state.activeElemBtn.blur();   
    }
  }

  openFullscreen(){
    let elem = document.documentElement;
    let openWindow = document.querySelector('.btn-audio-openfullscreen');
        openWindow.style.display = "none";
    let closeWindow = document.querySelector('.btn-audio-closefullscreen');
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
    let openWindow = document.querySelector('.btn-audio-openfullscreen');
        openWindow.style.display = "block";
    let closeWindow = document.querySelector('.btn-audio-closefullscreen');
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
	 
    let imgPath = "https://react-rslangbe.herokuapp.com/"+this.data[this.state.currentWord].image;

		return (

      
			<section className ="audio-game-page">


		   {this.finishedGame()}

				<div className = "container audio-game h-100">
					
						<div className="row">
              <div className="audio-header">
                <button className="audio-music" onClick ={this.onMusic}>
                  <i className="fas fa-volume-mute h4"></i>
                </button>
                <button className="audio-onmusic" onClick ={this.onMusic}>
                  <i className="fas fa-volume-up h4"></i>
                </button>
                <div className="audio-btn-header">
                  <button className="btn-audio-openfullscreen" onClick={this.openFullscreen}>
                    <i className="fas fa-expand h4"></i>
                  </button>
                  <button className="btn-audio-closefullscreen" onClick={this.closeFullscreen}>
                    <i className="fas fa-compress h4"></i>
                  </button>
                  <button className="btn-audio-close" onClick={this.props.clickTeam}>
                    <i className="fa fa-times h4"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="row audio-question-answer">
              <div className="audio-question">
                <button className="audio-question-music" onClick={this.playSound}>
                  <i className="fas fa-volume-up"></i>
                </button>
              </div>

              <div className="audio-answer">
                <div className ="answer-img">
                  <img id="ansPicture" src={imgPath} alt="foto"/>
                </div>
                <div className="audio-block-answer">
                  <div className="audio-answer-text">
                    <button onClick={this.playSound} className="btn on-answer" type="button">
                      <i className="fas fa-volume-up"></i>
                    </button>
                    <p className="answer-word" id="ansWord">{this.data[this.state.currentWord].word} </p>
                  </div>
                </div> 
              </div>

           	</div>

           	<div className="row">
              <div className="btn-group-words">
                <button id="btn-word1" type="button" className="audio-btn-word" onClick={this.clickWordButton} >
                  <span className="mr-2 round-word-number">1</span> 
                  <span className="round-word" >{this.state.qWord1.wordTranslate}</span>
                </button>
                <button id="btn-word2" type="button" className="audio-btn-word" onClick={this.clickWordButton}>
                  <span className="mr-2 round-word-number">2</span>
                  <span className="round-word">{this.state.qWord2.wordTranslate}</span>
                </button>
                <button id="btn-word3" type="button" className="audio-btn-word" onClick={this.clickWordButton}>
                  <span className="mr-2 round-word-number">3</span> 
                  <span className="round-word">{this.state.qWord3.wordTranslate}</span>
                </button>
                <button id="btn-word4" type="button" className="audio-btn-word" onClick={this.clickWordButton}>
                  <span className="mr-2 round-word-number">4</span>
                  <span className="round-word">{this.state.qWord4.wordTranslate}</span>
                </button>
                <button id="btn-word5" type="button" className="audio-btn-word" onClick={this.clickWordButton}>
                  <span className="mr-2 round-word-number">5</span>
                  <span className="round-word">{this.state.qWord5.wordTranslate}</span>
                </button>
              </div>
            </div>

            <div className="row my-5">
              <div className="col-sm-4 col-md">
                <button type="button" className="btn btn-outline-light ml-auto mr-auto text-uppercase btn-dont-know" onClick={this.changeAnswer}>
                 	<span className="px-2 word-dont-know">не знаю</span>
                </button>
                
                <button type="button" className="btn btn-outline-light ml-auto mr-auto text-uppercase btn-next" onClick={this.changeWord}
                onKeyPress={Keypress(this.keypress)}>
                 	<i className="fas fa-long-arrow-alt-right px-5"></i>
                </button>
              </div>
            </div>

					
				</div>

			</section>
   
		)
	}


}

export default AudioGame;