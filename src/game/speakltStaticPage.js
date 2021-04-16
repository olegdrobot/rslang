import React, { Component } from 'react';

import '../game/speakltStaticPage.css';

const audio = new Audio();

class SpeakltStaticPage extends React.Component {
  constructor(){
    super();
    this.playSound = this.playSound.bind(this);
  }

  playSound(item){
    console.log("playSound ", item);
    let path = "https://react-rslangbe.herokuapp.com/" + item.audio;
    audio.src = path;
    audio.play();
  }
 
	render(){
		return (
        <div className="container speaklt-static">
        
          <div className="row">
            <div className="speaklt-statistic-blocks">
              <div className="speaklt-points-result">Результат игры:</div>
              <div className="speaklt-resuit-mistakes">
                <span>Ошибся:</span>
                <span className='speaklt-answer-mistakes'>{this.props.missWords.length}</span>
              </div>
              {this.props.missWords.map((item, key)=>{
                return(
                    <div className="mistakes-answers">
                      <i className="fas fa-volume-down" onClick={()=>(this.playSound(item))}></i>
                      <span> {item.word}</span>
                      <span> {item.transcription}</span>
                      <span> {item.wordTranslate}</span>
                    </div>
                )
              })
              }
            
              <hr/>

              <div className="speaklt-resuit-correct">
                <span>Правильно:</span>
                <span className='speaklt-answer-correct'>{this.props.rightWords.length}</span>
              </div>
              {this.props.rightWords.map((item, key)=>{
                  return(
                    <div className="corrects-answers">
                      <i className="fas fa-volume-down" onClick={()=>(this.playSound(item))}></i>
                      <span> {item.word}</span>
                      <span> {item.transcription}</span>
                      <span> {item.wordTranslate}</span>
                    </div>
                  )
               })
              }

              <div className='speaklt-statistic-buttons'>
                <button className="btn btn-success speaklt-statistic-button" onClick={this.props.tryAgain}>Новая игра</button>
                <button className="btn btn-success speaklt-statistic-button" onClick={this.props.main}>На главную</button>
              </div>
            </div>
          </div>
        </div>
		)
	}
}

export default SpeakltStaticPage;