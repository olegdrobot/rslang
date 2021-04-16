import React, { Component } from "react";
import Header from '../page/Header';
import Main from '../page/Main';
import Footer from '../page/Footer';
//import Dictionary from '../page/dictionary.js';
import Difficult from '../dictionary/difficult.js';
import Deleted from '../dictionary/deleted.js';
import Registration from '../form/registration.js';
import Enter from '../form/enter.js';

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
		}

		this.changeGroup = this.changeGroup.bind(this); 
    this.clickDifficult = this.clickDifficult.bind(this);
    this.clickDeleted = this.clickDeleted.bind(this);
    this.clickMain = this.clickMain.bind(this);
    this.menu = this.menu.bind(this);
    this.clickEnter = this.clickEnter.bind(this);
    this.takeUserWords = this.takeUserWords.bind(this);
	}

  takeUserWords(arr){
    console.log("App userW ", arr);
    this.setState({userWords: arr});
  }

  clickDifficult(){
    console.log("dictionary");
    this.setState(
      {
        difficult: true,
        deleted: false,
        textBook: false
      }
    );
  }

  clickDeleted(){
    console.log("deleted");
    this.setState(
      {
        difficult: false,
        deleted: true,
        textBook: false
      }
    );
  }

  clickMain(){
    this.setState(
        {
          difficult: false,
          deleted: false,
          textBook: true
        }
    );
  }

  changeGroup(groupNamber){
  	//console.log("groupNamber ", groupNamber);
  	this.setState(
      { group: groupNamber, 
        textBook: true,
        deleted: false,
        difficult:false}, 
        ()=>{
  		    console.log("this.state.group ", this.state.group);
  	});
  	
  }

  clickEnter(){
    this.setState({enter: true});
  }

  menu(){
    let ret = [];
    
    if(this.state.difficult) {
      ret.push(<Difficult/>);
      //return (<Dictionary/>);
    }
    if(this.state.textBook) {
      ret.push(<Main group = {this.state.group} userWords={this.state.userWords}/>);
      //return (<Main group = {this.state.group}/>);
    }
    if(this.state.enter){
      ret.push(<Enter takeUserWords={this.takeUserWords}/>);
    }
    if(this.state.deleted){
      ret.push(<Deleted/>); 
    }
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
