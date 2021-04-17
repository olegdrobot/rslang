import React, { Component } from 'react';

import SpeakltGame from './speakltGame.js';
import './speakltStartPage.css';

class SpeakltStartPage extends React.Component {
    constructor(props) {
    super(props);
    this.state={
      clickStart: false,
      words: [] 
    }
    this.pages = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    this.openSettingSpeaklt = this.openSettingSpeaklt.bind(this);
    this.closeSettingSpeaklt = this.closeSettingSpeaklt.bind(this);
    this.startGame = this.startGame.bind(this);
    this.menu = this.menu.bind(this);
    this.startPage = this.startPage.bind(this); 
  }

  menu(){
    if(!this.state.clickStart) {
      return (this.startPage());
    } else
    {
      return(<SpeakltGame 
                data={this.state.words} 
                main={this.props.main}
                clickTeam={this.props.clickTeam}  
            />);
    }
  }

  startGame(){
    let group = document.getElementById("speakltSelectGroup").options.selectedIndex;
    let page = document.getElementById("speakltSelectPage").options.selectedIndex;
    console.log("startGame ", group, page);
    if(page == -1) page = 0;
    let URL = "https://react-rslangbe.herokuapp.com/words?group="+group+"&page="+page;
    fetch(URL)
      .then(res => res.json())
      .then(json => {
          this.setState({words: json, clickStart: true});
      });
  }

  openSettingSpeaklt(){
    let btnSettingSpeakltOpen = document.querySelector('.btn-setting-speaklt-open');
    let btnSettingSpeakltClose = document.querySelector('.btn-setting-speaklt-close');
    let speakltSetting = document.querySelector('.speaklt-setting');
        speakltSetting.style.visibility = "visible ";
        btnSettingSpeakltOpen.style.display = "none";
        btnSettingSpeakltClose.style.display = "block";
  }

  closeSettingSpeaklt(){
    let btnSettingSpeakltOpen = document.querySelector('.btn-setting-speaklt-open');
    let btnSettingSpeakltClose = document.querySelector('.btn-setting-speaklt-close');
    let speakltSetting = document.querySelector('.speaklt-setting');
        speakltSetting.style.visibility =  "hidden";
        btnSettingSpeakltOpen.style.display = "block";
        btnSettingSpeakltClose.style.display = "none";
  }

  startPage(){
   return (
      <section className ="speaklt-start-page">
        <div className ="container speaklt-main-container h-100">
          <div className = "row">
            <div className = "speaklt-btns-setting">
              <button className="btn btn-setting-speaklt-open" onClick={this.openSettingSpeaklt}>
                <i className="fas fa-cogs h4"></i>
              </button>
              <button className="btn btn-setting-speaklt-close" onClick={this.closeSettingSpeaklt}>
                <span className="fas fa-cogs h4"></span>
              </button>
              <button className="btn btn-close-speaklt" onClick={this.props.clickTeam}>
                <i className="fas fa-times h4"></i>
              </button>
            </div>
            <div className="speaklt-setting">
              <div className ="card speaklt-card-setting">
                <div className="card-body">
                  <h5 className="card-title">Настройки игры</h5>
                    <div className="d-flex align-items-center">
                      <select id="speakltSelectGroup" className="form-control col-3 mr-3 mb-3">
                        <option value="1" >1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>  
                      </select>
                      <label for="speaklt-setting-game">Сложность игры</label>
                    </div> 
                    <div className="d-flex align-items-center  select-page">
                      <select id="speakltSelectPage" className="form-control col-3 mr-3 mb-3" size="2">
                      {this.pages.map((item, key)=>{
                          return(
                            <option value={item}>{item}</option>
                          )
                        })}
                      </select>
                      <label for="speaklt-setting-game">Страницы</label>
                    </div>         
                </div>
              </div>
            </div>
          </div>

          <div className = "row">
            <div className = "title-start-speaklt">
              <h2 className="name-start-speaklt">Speaklt</h2>
              <p className="text-start-speaklt">Игра Speaklt позволит улучшить восприятие английской речи на слух.</p>
              <button className="btn btn-start-speaklt" onClick={this.startGame}>Начать</button>
            </div>
          </div>

        </div>
      </section>      
    )

  }


	render(){
    return(
      <div>
          {this.menu()}
      </div>
    )
		
	}
}


export default SpeakltStartPage;