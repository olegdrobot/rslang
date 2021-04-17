import React, { Component } from "react";
import Header from '../page/Header';
import Main from '../page/Main';
import Footer from '../page/Footer';
import Team from '../team/team.js'
import Difficult from '../dictionary/difficult.js';
import Deleted from '../dictionary/deleted.js';
import Learning from '../dictionary/learning.js';
import Registration from '../form/registration.js';
import Enter from '../form/enter.js';

import SprintStartPage from '../game/sprintStartPage.js';
import AudioStartPage from '../game/audioStartPage.js';
import SpeakltStartPage from '../game/speakltStartPage.js';
import SavannaStartPage from '../game/savannaStartPage.js';

import SprintGame from '../game/sprintGame.js';
import AudioGame from '../game/audioGame.js';
import SpeakltGame from '../game/speakltGame.js';
import SavannaGame from '../game/savannaGame.js';

import '../styles/App.css';


class App extends Component {
	constructor() {
		super();
		this.state = {
			userWords: [],
      group: 0,
      team: true,
      textBook: false,
      difficult: false,
      deleted: false,
      learning: false,
      enter: false,
      register: false,

      game: false,
      audioGame: false,
       audioPageGame:false,
      savannaGame: false,
       savannaPageGame: false, 
      sprintGame: false,
       sprintPageGame: false,
      speakltGame: false,
      speakltPageGame: false,
      myselfGame: false

		}

		this.changeGroup = this.changeGroup.bind(this); 
    this.clickDifficult = this.clickDifficult.bind(this);
    this.clickDeleted = this.clickDeleted.bind(this);
    this.clickLearning = this.clickLearning.bind(this);
    this.clickMain = this.clickMain.bind(this);
    this.menu = this.menu.bind(this);
    this.clickEnter = this.clickEnter.bind(this);
    this.takeUserWords = this.takeUserWords.bind(this);
    this.clickRegister = this.clickRegister.bind(this);
    this.clickTeam = this.clickTeam.bind(this);
    //-------------------------------------
    this.audioGameFromPage = this.audioGameFromPage.bind(this);
    this.clickAudioGame = this.clickAudioGame.bind(this);
    this.savannaGameFromPage = this.savannaGameFromPage.bind(this);
    this.clickSavannaGame = this.clickSavannaGame.bind(this);
    this.sprintGameFromPage = this.sprintGameFromPage.bind(this); 
    this.clickSprintGame = this.clickSprintGame.bind(this);
    this.speakltGameFromPage = this.speakltGameFromPage.bind(this);
    this.clickSpeakltGame = this.clickSpeakltGame.bind(this);
    //------------------------------------
    
	}

    speakltGameFromPage(data){
      console.log("speakltGameFromPage ", data);
      if(data.length >5){
        this.setState({
          userWords: data,
          team: false,
          textBook: false,
          difficult: false,
          deleted: false,
          learning: false,
          enter: false,
          register: false,

          game: true,
          audioGame: false,
           audioPageGame:false,
         savannaGame: false,
          savannaPageGame: false, 
         sprintGame: false,
          sprintPageGame: false,
         speakltGame: false,
         speakltPageGame: true

        });
      } else {
        alert("Для игры необходимо наличие на странице не менее 6 слов");
      }
      
    }

    savannaGameFromPage(data){
      console.log("savannaGameFromPage ", data);
      if(data.length >5){
        this.setState({
          userWords: data,
          team: false,
          textBook: false,
          difficult: false,
          deleted: false,
          learning: false,
          enter: false,
          register: false,

          game: true,
          audioGame: false,
           audioPageGame:false,
         savannaGame: false,
          savannaPageGame: true, 
         sprintGame: false,
          sprintPageGame: false,
         speakltGame: false, 
         speakltPageGame: false

        });
      } else {
        alert("Для игры необходимо наличие на странице не менее 6 слов");
      }
      
    }

    sprintGameFromPage(data){
      console.log("sprintGameFromPage ", data);
      if(data.length >5){
        this.setState({
           userWords: data,
           team: false,
           textBook: false,
           difficult: false,
           deleted: false,
           learning: false,
           enter: false,
           register: false,

           game: true,
           audioGame: false,
           audioPageGame:false,
           savannaGame: false,
           savannaPageGame: false, 
           sprintGame: false,
           sprintPageGame: true,
           speakltGame: false,
           speakltPageGame: false
        });
      } else {
        alert("Для игры необходимо наличие на странице не менее 6 слов");
      }
      
    }

     audioGameFromPage(data){
    console.log("audioGameFromPage ", data);
    if(data.length >5) {
      this.setState({
          audioPageGame: true,
         userWords: data,
         team: false,
         game: true,
         difficult: false,
        deleted: false,
        learning: false,
        textBook: false,
        audioGame: false,
        savannaGame: false,
        savannaPageGame: false, 
        sprintGame: false,
        sprintPageGame: false,
        speakltGame: false,
        speakltPageGame: false,
        register: false
      });
    } else {
      alert("Для игры необходимо наличие на странице не менее 6 слов");
    }
    
    
  
   } 
 

   clickRegister(){
    this.setState({
        difficult: false,
        deleted: false,
        learning: false,
        team: false,
        textBook: false,
        
        audioGame: false,
        audioPageGame:false,
        savannaGame: false,
        savannaPageGame: false, 
        sprintGame: false,
        sprintPageGame: false,
        speakltGame: false,
        speakltPageGame: false,
        register: true

    });
   }

   takeUserWords(arr){
    //console.log("App userW ", arr);
    this.setState({userWords: arr}, ()=>{
      console.log("takeUserWords ", this.state.userWords);
    });
  }

  clickAudioGame(){
    console.log("clickAudioGame");
    
    this.setState({
        textBook: false,
        team: false,
         difficult: false,
        deleted: false,
        learning: false,
        enter: false,
        register: false,

        game: true,
        audioGame: true,
        audioPageGame:false,
        savannaGame: false,
         savannaPageGame: false, 
        sprintGame: false,
        speakltGame: false,
        speakltPageGame: false

    });
    
  }

    clickSpeakltGame(){
    console.log("clickSpeakltGame");
    
    this.setState({
        textBook: false,
        team: false,
         difficult: false,
        deleted: false,
        learning: false,
        enter: false,
        register: false,

        game: true,
        audioGame: false,
        audioPageGame:false,
        savannaGame: false,
         savannaPageGame: false, 
       sprintGame: false,
        sprintPageGame: false,
       speakltGame: true,
        speakltPageGame: false,
       myselfGame: false

    });
  }

  clickSavannaGame(){
    console.log("Savanna");
    this.setState(
      {
        textBook: false,
        team: false,
        difficult: false,
        deleted: false,
        learning: false,
        enter: false,
        register: false,

        game: true,
        audioGame: false,
        audioPageGame:false,
        savannaGame: true,
        savannaPageGame: false, 
        sprintGame: false,
        sprintPageGame: false,
        speakltGame: false,
        speakltPageGame: false
        
      }
    );
  }

  clickSprintGame(){
    console.log("clickSprintGame");
    this.setState(
      {
        textBook: false,
        team: false,
        difficult: false,
        deleted: false,
        learning: false,
        enter: false,
        register: false,

        game: true,
        audioGame: false,
        audioPageGame:false,
        savannaGame: false,
        savannaPageGame: false, 
        sprintGame: true,
        sprintPageGame: false,
        speakltGame: false,
        speakltPageGame: false
        
      }
    );
  }

  clickDifficult(){
    console.log("dictionary");
    this.setState(
      {
        difficult: true,
        deleted: false,
        learning: false,
        textBook: false,
        team: false,
         audioGame: false,
         audioPageGame:false,
        savannaGame: false,
        savannaPageGame: false, 
        sprintGame: false,
        sprintPageGame: false,
        speakltGame: false,
        speakltPageGame: false,
        register: false
      }
    );
  }

  clickDeleted(){
    console.log("deleted");
    this.setState(
      {
        difficult: false,
        deleted: true,
        learning: false,
        textBook: false,
        team: false,
         audioGame: false,
         audioPageGame:false,
        savannaGame: false,
        savannaPageGame: false, 
        sprintGame: false,
        sprintPageGame: false,
        speakltGame: false,
        speakltPageGame: false,
        register: false
      }
    );
  }

  clickLearning(){
    console.log("learning");
    this.setState(
      {
        difficult: false,
        deleted: false,
        learning: true,
        textBook: false,
        team: false,
         audioGame: false,
         audioPageGame:false,
        savannaGame: false,
        savannaPageGame: false, 
        sprintGame: false,
        sprintPageGame: false,
        speakltGame: false,
        speakltPageGame: false,
        myselfGame: false,
        register: false
      }
    );
  }

  clickTeam(){
    this.setState(
        {
          difficult: false,
          deleted: false,
          learning: false,
          textBook: false,
          team: true,
           game: false, 
           audioGame: false,
           audioPageGame:false,
           savannaGame: false,
           savannaPageGame: false, 
           sprintGame: false,
           sprintPageGame: false,
           myselfGame: false,
           register: false,
           speakltGame: false,
           speakltPageGame: false
        }
    );
  }

  clickMain(){
    this.setState(
        {
          difficult: false,
          deleted: false,
          learning: false,
          textBook: true,
          team: false,
           game: false, 
           audioGame: false,
           audioPageGame:false,
           savannaGame: false,
           savannaPageGame: false, 
           sprintGame: false,
           sprintPageGame: false,
           myselfGame: false,
           register: false,
           speakltGame: false,
           speakltPageGame: false
        }
    );
  }

  changeGroup(groupNamber){
  	//console.log("groupNamber ", groupNamber);
  	this.setState(
      { group: groupNamber, 
        textBook: true,
        team: false,
        deleted: false,
        learning: false,
        difficult:false,
         audioGame: false,
         audioPageGame:false,
        savannaGame: false,
        savannaPageGame: false, 
        sprintGame: false,
        sprintPageGame: false,
        myselfGame: false,
        speakltGame: false,
        speakltPageGame: false
      }, 
        ()=>{
  		    console.log("this.state.group ", this.state.group);
  	});
  	
  }

  clickEnter(){
    this.setState({enter: true});
  }

  menu(){
    let ret = [];
    if(this.state.game == false) {
      ret.push(
          <Header 
            changeGroup = {this.changeGroup} 
            clickDifficult = {this.clickDifficult}
            clickDeleted = {this.clickDeleted}
            clickLearning = {this.clickLearning}
            clickEnter = {this.clickEnter}
            clickSavannaGame = {this.clickSavannaGame}
            clickSprintGame = {this.clickSprintGame}
            clickSpeakltGame = {this.clickSpeakltGame}
            clickAudioGame = {this.clickAudioGame}
            main={this.clickMain}
            clickTeam = {this.clickTeam}
          />
        );
    }
    if(this.state.difficult) {
      ret.push(<Difficult 
                  audioGameFromPage={this.audioGameFromPage}
                  sprintGameFromPage={this.sprintGameFromPage}
                  savannaGameFromPage={this.savannaGameFromPage}
                  speakltGameFromPage = {this.speakltGameFromPage}
               />);
      //return (<Dictionary/>);
    }
    if(this.state.team){
      ret.push(<Team />);
    }
    
    if(this.state.textBook) {
      ret.push(
        <Main 
          group = {this.state.group} 
          userWords={this.state.userWords}
          audioGameFromPage={this.audioGameFromPage}
          sprintGameFromPage={this.sprintGameFromPage}
          savannaGameFromPage={this.savannaGameFromPage}
          speakltGameFromPage={this.speakltGameFromPage}
        />);
    }
    
    if(this.state.enter){
      ret.push(<Enter takeUserWords={this.takeUserWords}/>);
    }
    if(this.state.deleted){
      ret.push(<Deleted
                  audioGameFromPage={this.audioGameFromPage}
                  sprintGameFromPage={this.sprintGameFromPage}
                  savannaGameFromPage={this.savannaGameFromPage}
                  speakltGameFromPage = {this.speakltGameFromPage}
                />); 
    }
    if(this.state.savannaGame){
      ret.push(<SavannaStartPage 
                  main={this.clickMain}
                  clickTeam = {this.clickTeam}
               />); 
    }

    if(this.state.audioGame){
      ret.push(<AudioStartPage 
                  main={this.clickMain}
                  clickTeam={this.clickTeam}
              />);
    }

    if(this.state.learning){
      ret.push(<Learning
                  audioGameFromPage={this.audioGameFromPage}
                  sprintGameFromPage={this.sprintGameFromPage}
                  savannaGameFromPage={this.savannaGameFromPage}
                  speakltGameFromPage = {this.speakltGameFromPage}
              />);
    }
    
    if(this.state.sprintGame){
      ret.push(<SprintStartPage 
                  main={this.clickMain}
                  clickTeam = {this.clickTeam}
               />);
    }
    
    if(this.state.audioPageGame){
      ret.push(<AudioGame 
                  data={this.state.userWords} 
                  main={this.clickMain}
                  clickTeam = {this.clickTeam}
               />);
    }
    if(this.state.sprintPageGame) {
      ret.push(<SprintGame 
                  data={this.state.userWords} 
                  main={this.clickMain}
                  clickTeam = {this.clickTeam}
                />);
    }
    if(this.state.savannaPageGame){
      ret.push(<SavannaGame 
                  data={this.state.userWords} 
                  main={this.clickMain}
                  clickTeam = {this.clickTeam}
              />);
    }
    if(this.state.speakltPageGame){
      ret.push(<SpeakltGame 
                  data={this.state.userWords} 
                  main={this.clickMain}
                  clickTeam = {this.clickTeam}
                />);
    }
    if(this.state.speakltGame){
      ret.push(<SpeakltStartPage 
                  main={this.clickMain}
                  clickTeam={this.clickTeam}
                />);
    }
    if(this.state.game == false) {
      ret.push(
          <Footer/>
        );
    }
    console.log('hello ', ret);

    return ret;    
  }

  render() {
    return (
        	<div>
          
          {this.menu().map((item, key)=>{
              return (item);
            })}
          
          
        	</div>
    );
  }
}

export default App;
