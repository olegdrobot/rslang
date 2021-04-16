import React, { Component } from "react";
import Header from '../page/Header';
import Main from '../page/Main';
import Footer from '../page/Footer';
import Team from '../team/team.js'
import Difficult from '../dictionary/difficult.js';
import Deleted from '../dictionary/deleted.js';
import Registration from '../form/registration.js';
import Enter from '../form/enter.js';

//import AudioGame from '../game/audioGame.js';
//import SprintStartPage from '../game/sprintStartPage.js';
//import SprintGame from '../game/sprintGame.js';
//import AudioStartPage from '../game/audioStartPage.js';
//import AudioStaticPage from '../game/AudioStaticPage.js';
//import SpeakltGame from '../game/speakltGame.js';
import SavannaGame from '../game/savannaGame.js';
import '../styles/App.css';


class App extends Component {
	constructor() {
		super();
		this.state = {
			userWords: [],
      group: 0,
      textBook: true,
      difficult: false,
      deleted: false,
      enter: false,
      register: false,


      game: false,
      audioGame: false,
      audioPageGame:false,
      savannaGame: false,
      sprintGame: false,
      myselfGame: false

		}

		this.changeGroup = this.changeGroup.bind(this); 
    this.clickDifficult = this.clickDifficult.bind(this);
    this.clickDeleted = this.clickDeleted.bind(this);
    this.clickMain = this.clickMain.bind(this);
    this.menu = this.menu.bind(this);
    this.clickEnter = this.clickEnter.bind(this);
    this.takeUserWords = this.takeUserWords.bind(this);
    this.audioGameFromPage = this.audioGameFromPage.bind(this);
    //this.clickAudioGame = this.clickAudioGame.bind(this);
    this.clickSavannaGame = this.clickSavannaGame.bind(this);
    //this.clickSprintGame = this.clickSprintGame.bind(this);
    this.clickRegister = this.clickRegister.bind(this);
	}

   audioGameFromPage(data){
    console.log("audioGameFromPage ", data);
    this.state({
      audioPageGame: true,
      userWords: data
    });
   } 

   clickRegister(){
    this.setState({
     //   difficult: false,
     //   deleted: false,
     //   textBook: false,
     //   audioGame: false,
     //   savannaGame: false,
     //   sprintGame: false,
     //   myselfGame: false,
        register: true

    });
   }

   takeUserWords(arr){
    //console.log("App userW ", arr);
    this.setState({userWords: arr}, ()=>{
      console.log("takeUserWords ", this.state.userWords);
    });
  }

  clickSavannaGame(){
    console.log("Savanna");
    this.setState(
      {
     //   difficult: false,
     //   deleted: false,
     //   textBook: false,
     //   audioGame: false,
        savannaGame: true
     //   sprintGame: false,
     //   myselfGame: false,
     //   register: false
      }
    );
  }

  clickDifficult(){
    console.log("dictionary");
    this.setState(
      {
        difficult: true
      //  deleted: false,
      //  textBook: false,
      //   audioGame: false,
      //  savannaGame: false,
      //  sprintGame: false,
      //  myselfGame: false,
      //  register: false
      }
    );
  }

  clickDeleted(){
    console.log("deleted");
    this.setState(
      {
    //    difficult: false,
        deleted: true
    //    textBook: false,
    //     audioGame: false,
    //    savannaGame: false,
    //    sprintGame: false,
    //    myselfGame: false,
    //    register: false
      }
    );
  }

  clickMain(){
    this.setState(
        {
      //    difficult: false,
      //    deleted: false,
          textBook: true
      //     audioGame: false,
     //      savannaGame: false,
      //     sprintGame: false,
      //     myselfGame: false,
      //     register: false
        }
    );
  }

  changeGroup(groupNamber){
  	//console.log("groupNamber ", groupNamber);
  	this.setState(
      { group: groupNamber, 
        textBook: true
    //    deleted: false,
    //    difficult:false,
    //     audioGame: false,
    //    savannaGame: false,
    //    sprintGame: false,
    //    myselfGame: false,
    //    register: false
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
  /*  if(this.state.game == false) {
      ret.push(
          <Header 
            changeGroup = {this.changeGroup} 
            clickDifficult = {this.clickDifficult}
            clickDeleted = {this.clickDeleted}
            clickEnter = {this.clickEnter}
            clickSavannaGame = {this.clickSavannaGame}
          />
        );
    }
 */   
/*
    if(audioPageGame) {
      ret.push(<AudioGame data={this.state.userWords}/>);
    } 
*/    
    if(this.state.difficult) {
      ret.push(<Difficult/>);
      //return (<Dictionary/>);
    }
    if(this.state.textBook) {
      ret.push(<Main 
                group = {this.state.group} 
                userWords={this.state.userWords}
                audioGameFromPage={this.audioGameFromPage}
               />
        );
      //return (<Main group = {this.state.group}/>);
    }
    if(this.state.enter){
      ret.push(<Enter takeUserWords={this.takeUserWords}/>);
    }
    if(this.state.deleted){
      ret.push(<Deleted/>); 
    }
    if(this.state.savannaGame){
      ret.push(<Savanna/>); 
    }
/*
    if(this.state.game == false) {
      ret.push(
          <Footer/>
        );
    }
*/
    /*
    this.setState({
         difficult: false,
          deleted: false,
        textBook: false,
        game: false,
         audioGame: false,
         audioPageGame:false,
        savannaGame: false,
        sprintGame: false,
        myselfGame: false,
        register: false
    });
    */
    console.log('hello ', ret);
    return ret;    
  }

  render() {
    return (
        	<div>
           <Header 
            changeGroup = {this.changeGroup} 
            clickDifficult = {this.clickDifficult}
            clickDeleted = {this.clickDeleted}
            clickEnter = {this.clickEnter}
            clickSavannaGame = {this.clickSavannaGame}
          />     
          {this.menu().map((item, key)=>{
              return (item);
            })}
          <Footer/>
        	</div>
    );
  }
}

export default App;
