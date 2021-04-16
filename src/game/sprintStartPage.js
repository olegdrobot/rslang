import React, { Component } from 'react';
import SprintGame from './sprintGame.js';


import './sprintStartPage.css';

class SprintStartPage extends React.Component {
    constructor(props) {
    super(props);
     this.state={
      clickStart: false,
      words: [] 
    }
    this.pages = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    this.openSettingSprint = this.openSettingSprint.bind(this);
    this.closeSettingSprint = this.closeSettingSprint.bind(this);
    this.startGame = this.startGame.bind(this);
    this.menu = this.menu.bind(this);
    this.startPage = this.startPage.bind(this); 
  }

  menu(){
    if(!this.state.clickStart) {
      return (this.startPage());
    } else
    {
      return(<SprintGame 
                data={this.state.words} 
                main={this.props.main}
                clickTeam={this.props.clickTeam}
              />);
    }
  }

  startGame(){
    let group = document.getElementById("sprintSelectGroup").options.selectedIndex;
    
    let page = document.getElementById("sprintSelectPage").options.selectedIndex;
    if(page == -1) page = 0;
    console.log("startGame ", group, page);
    let URL = "https://react-rslangbe.herokuapp.com/words?group="+group+"&page="+page;
    fetch(URL)
      .then(res => res.json())
      .then(json => {
          console.log(json);
          this.setState({words: json, clickStart: true});
      });
  }

  openSettingSprint(){
    let btnSettingSprintOpen = document.querySelector('.btn-setting-sprint-open');
    let btnSettingSprintClose = document.querySelector('.btn-setting-sprint-close');
    let sprintSetting = document.querySelector('.sprint-setting');
        sprintSetting.style.visibility = "visible ";
        btnSettingSprintOpen.style.display = "none";
        btnSettingSprintClose.style.display = "block";
  }
  closeSettingSprint(){
    let btnSettingSprintOpen = document.querySelector('.btn-setting-sprint-open');
    let btnSettingSprintClose = document.querySelector('.btn-setting-sprint-close');
    let sprintSetting = document.querySelector('.sprint-setting');
        sprintSetting.style.visibility =  "hidden";
        btnSettingSprintOpen.style.display = "block";
        btnSettingSprintClose.style.display = "none";
  }

  startPage(){
    return(
       <section className ="sprint-start-page">
        <div className ="container sprint-main-container h-100">
          <div className = "row">
            <div className = "sprint-btns-setting">
              <button className="btn btn-setting-sprint-open" onClick={this.openSettingSprint}>
                <i className="fas fa-cogs h4"></i>
              </button>
              <button className="btn btn-setting-sprint-close" onClick={this.closeSettingSprint}>
                <span className="fas fa-cogs h4"></span>
              </button>
              <button className="btn btn-close-sprint" onClick={this.props.clickTeam}>
                <i className="fas fa-times h4"></i>
              </button>
            </div>
            <div className="sprint-setting">
              <div className ="card sprint-card-setting">
                <div className="card-body">
                  <h4 className="card-title">Настройки игры</h4>
                    <div className="d-flex align-items-center">
                      <select id="sprintSelectGroup" className="form-control col-3 mr-3 mb-3">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                      </select>
                      <label for="sprint-setting-game">Сложность игры</label>
                    </div> 
                     <div className="d-flex align-items-center  select-page">
                      <select id="sprintSelectPage" className="form-control col-3 mr-3 mb-3" size="2">
                      {this.pages.map((item, key)=>{
                          return(
                            <option value={item}>{item}</option>
                          )
                        })}
                      </select>
                      <label for="audio-setting-game">Страницы</label>
                    </div>           
                </div>
              </div>
            </div>
          </div>

          <div className = "row">
            <div className = "title-start-sprint">
              <h2 className="name-start-sprint">Спринт</h2>
              <p className="text-start-sprint">Игра Спринт позволит проверить еще раз знания  английских слов.</p>
              <button className="btn btn-start-sprint" onClick={this.startGame}>Начать</button>
            </div>
          </div>

        </div>
      </section>    

    )
  }

	render(){
		return (
        <div>
          {this.menu()}
        </div>
		)
	}
}


export default SprintStartPage;