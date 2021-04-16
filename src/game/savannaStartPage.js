import React, { Component } from 'react';
import SavannaGame from './savannaGame.js';
import './savannaStartPage.css';

class SavannaStartPage extends React.Component {
    constructor(props) {
    super(props);
    this.state={
      clickStart: false,
      words: [] 
    }
    this.pages = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    this.openSettingSavanna = this.openSettingSavanna.bind(this);
    this.closeSettingSavanna = this.closeSettingSavanna.bind(this);
    this.startGame = this.startGame.bind(this);
    this.menu = this.menu.bind(this);
    this.startPage = this.startPage.bind(this); 
  }

  menu(){
    if(!this.state.clickStart) {
      return (this.startPage());
    } else
    {
      return(<SavannaGame 
              data={this.state.words} 
              main={this.props.main}
              clickTeam={this.props.clickTeam}  
            />);
    }
  }

  startGame(){
    let group = document.getElementById("savannaSelectGroup").options.selectedIndex;
    let page = document.getElementById("savannaSelectPage").options.selectedIndex;
    if(page == -1) page = 0;
    let URL = "https://react-rslangbe.herokuapp.com/words?group="+group+"&page="+page;
    fetch(URL)
      .then(res => res.json())
      .then(json => {
          //console.log(json);
          this.setState({words: json, clickStart: true});
      });
  }

  openSettingSavanna(){
    let btnSettingSavannaOpen = document.querySelector('.btn-setting-savanna-open');
    let btnSettingSavannaClose = document.querySelector('.btn-setting-savanna-close');
    let savannaSetting = document.querySelector('.savanna-setting');
        savannaSetting.style.visibility = "visible ";
        btnSettingSavannaOpen.style.display = "none";
        btnSettingSavannaClose.style.display = "block";
  }
  closeSettingSavanna(){
    let btnSettingSavannaOpen = document.querySelector('.btn-setting-savanna-open');
    let btnSettingSavannaClose = document.querySelector('.btn-setting-savanna-close');
    let savannaSetting = document.querySelector('.savanna-setting');
        savannaSetting.style.visibility =  "hidden";
        btnSettingSavannaOpen.style.display = "block";
        btnSettingSavannaClose.style.display = "none";
  }

  startPage(){
    return(
      <section className ="savanna-start-page">
        <div className ="container savanna-main-container h-100">
          <div className = "row">
            <div className = "savanna-btns-setting">
              <button className="btn btn-setting-savanna-open" onClick={this.openSettingSavanna}>
                <i className="fas fa-cogs h4"></i>
              </button>
              <button className="btn btn-setting-savanna-close" onClick={this.closeSettingSavanna}>
                <span className="fas fa-cogs h4"></span>
              </button>
              <button className="btn btn-close-savanna" onClick={this.props.clickTeam}>
                <i className="fas fa-times h4"></i>
              </button>
            </div>
            <div className="savanna-setting">
              <div className ="card savanna-card-setting">
                <div className="card-body">
                  <h5 className="card-title">Настройки игры</h5>
                    <div className="d-flex align-items-center">
                      <select id="savannaSelectGroup" className="form-control col-3 mr-3 mb-3">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                      </select>
                      <label for="savanna-setting-game">Сложность игры</label>
                    </div> 
                    <div className="d-flex align-items-center  select-page">
                      <select id="savannaSelectPage" className="form-control col-3 mr-3 mb-3" size="2">
                        {this.pages.map((item, key)=>{
                          return(
                            <option value={item}>{item}</option>
                          )
                        })}
                      </select>
                      <label for="savanna-setting-game">Страницы</label>
                    </div>         
                </div>
              </div>
            </div>
          </div>

          <div className = "row">
            <div className = "title-start-savanna">
              <h2 className="name-start-savanna">Саванна</h2>
              <p className="text-start-savanna">Игра Саванна позволит расширить тебе словарный запас.</p>
              <button className="btn btn-start-savanna" onClick={this.startGame}>Начать</button>
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


export default SavannaStartPage;