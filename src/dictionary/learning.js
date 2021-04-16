import React, { Component } from 'react';
import parse from 'html-react-parser';
import Pagination from './pagination.js';
import './difficult.css';
import '../page/main.css';

const styleBlock = {
      display: "block"
    }
const styleNone = {
      display: "none"
    }

const audio = new Audio();

class Learning extends React.Component {
  constructor(){
    super();
    this.state = {
      difWords: [],
      showWords:[],
      groupWords: [],
      wordsForGame: [],
      startItem: 0,
      endItem: 20,
      page: 0,
      currentGroup: 0,
      buttonSubmit: 'Применить',
      pressBtnSbmt: false,
      maxPage: 29     
    }
    this.takeComplexWord = this.takeComplexWord.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.prevGroup = this.prevGroup.bind(this);
    this.nextGroup = this.nextGroup.bind(this);
    this.changeGroup = this.changeGroup.bind(this);
    this.musicDown = this.musicDown.bind(this);
    this.musicUp = this.musicUp.bind(this);
    
    this.openLinkGame = this.openLinkGame.bind(this);
    this.closeLinkGame = this.closeLinkGame.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.customization = this.customization.bind(this);
    this.wordsForGame = this.wordsForGame.bind(this);
    this.audioGameFromPage = this.audioGameFromPage.bind(this); 
    this.sprintGameFromPage = this.sprintGameFromPage.bind(this);
    this.savannaGameFromPage = this.savannaGameFromPage.bind(this); 
    this.speakltGameFromPage = this.speakltGameFromPage.bind(this);
  }

  wordsForGame(){
    let countWords=20; 
    if(this.state.difWords.length < 20) countWords = this.state.difWords.length;
    let arr = this.state.difWords.slice(0, countWords);
    let resArr = [];
    arr.map((item,key)=>{resArr.push(item.optional)});
    return resArr;

  }

  audioGameFromPage(){
    console.log("arr ", this.wordsForGame());
    this.props.audioGameFromPage(this.wordsForGame());     
  }

  sprintGameFromPage(){
    this.props.sprintGameFromPage(this.wordsForGame());
  }

  savannaGameFromPage(){
    this.props.savannaGameFromPage(this.wordsForGame());
  }

   speakltGameFromPage(){
    this.props.speakltGameFromPage(this.wordsForGame());
  }

  openLinkGame(){
    let openLinkGame = document.querySelector('.openLinkGame');
    let windowLinkGame = document.querySelector('.windowLinkGame');
        windowLinkGame.style.display = 'block';
  }

  closeLinkGame(){
    let closeLinkGame = document.querySelector('.closeLinkGame');
    let windowLinkGame = document.querySelector('.windowLinkGame');
        windowLinkGame.style.display = 'none';
  }

  openModal(){
    let openModal = document.querySelector('.openModal');
    console.log("openModal", openModal);
    let formCustomization = document.querySelector('.formCustomization');
        formCustomization.style.display = 'block';
  }

  closeModal(){
    let closeModal = document.querySelector ('.closeModal');
    console.log("closeModal", closeModal);
    let formCustomization = document.querySelector('.formCustomization');
        formCustomization.style.display = 'none';
  }


  musicUp(el) {
    let attrmusicUp = el.target.getAttribute('musicUp');
    let sound = el.target.getAttribute('audio');
    let audioMeaning = el.target.getAttribute('audioMeaning');
    let audioExample = el.target.getAttribute('audioExample');
    let musicUp = document.querySelector('.musicUp-'+attrmusicUp); 
    let musicDown = document.querySelector('.musicDown-'+attrmusicUp);
        musicDown.style.display = "block";
        musicUp.style.display = "none";

    let path = "https://react-rslangbe.herokuapp.com/";
    let playList = [path+sound, path+audioMeaning, path+audioExample];
    let i = 0;

        audio.addEventListener('ended', function () {
          i = ++i < playList.length ? i : -1;
            if(i >0 ){
              audio.src = playList[i];
              audio.play();  
            }
        }, true);
        audio.volume = 0.5;
        audio.loop = false;
        audio.src = playList[0];
        audio.play();
  }

  musicDown(el){
    let attrmusicDown = el.target.getAttribute('musicDown');
    let musicDown = document.querySelector('.musicDown-'+attrmusicDown); 
    let musicUp = document.querySelector('.musicUp-'+attrmusicDown);
        musicDown.style.display = "none";
        musicUp.style.display = "block";
        audio.pause();
  }

  changeGroup(groupNumber){

    let arr = this.state.difWords.filter((el)=>{return el.optional.group == groupNumber});
    let maxElem = 20;
    if(arr.length <= 20) {
        maxElem = arr.length;
        this.setState({endItem: -1});
    }; 
    this.setState({showWords: arr.slice(0,maxElem), groupWords: arr, startItem: 0, endItem: 20, page: 0});
    //this.setState({groupWords: this.state.difWords.filter((el)=>{return el.optional.group == groupNumber})});
  }

  prevGroup(){
    let prev = this.state.currentGroup - 1;
    if(prev < 0) prev = 0;
    this.setState({currentGroup: prev});
    this.changeGroup(prev);
  }

  nextGroup(){
    let next = this.state.currentGroup + 1;
    if(next > 5) next = 5;
    this.setState({currentGroup: next});
    this.changeGroup(next);
  }

  next() {
    if(this.state.endItem != -1){
      let nextPage = this.state.page + 1;
      let start = this.state.endItem;
      if(start >= this.state.groupWords.length - 1) start = this.state.groupWords.length - 1;
      let end = start + 20;
      if(end >= this.state.groupWords.length ) {
        end = this.state.groupWords.length;
        this.setState({startItem: start, endItem: -1, page: nextPage});
      } 
      else {
        
        this.setState({startItem: start, endItem: end, page: nextPage});
      }
      this.setState({showWords: this.state.groupWords.slice(start,end)});
    }
  }

  prev() {
    if(this.state.startItem != -1){
      let nextPage = this.state.page - 1;
      let end = this.state.startItem;
      let start = end - 20;
      if(start <= 0) {
         start = 0;
         this.setState({startItem: -1, endItem: end, page: nextPage}); 
      }
      else {
        this.setState({startItem: start, endItem: end, page: nextPage});
      }
      this.setState({showWords: this.state.groupWords.slice(start,end)});
    }
  }

  componentDidMount(){
    this.takeComplexWord();
  }

  takeComplexWord(){
    let id = localStorage.getItem('userId');
    let token = localStorage.getItem('token');
    let URL = "https://react-rslangbe.herokuapp.com/users/"+id+"/words";
    fetch(URL, {
        method: 'GET',
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    .then(res => res.json())
    .then(json => {
       this.setState({difWords: json.filter((el)=>{
        return (el.difficulty == "difficult" || el.difficulty == "learning" );
          })}, ()=>{
          let arr = this.state.difWords.filter((el)=>{return el.optional.group == this.state.currentGroup});
          let maxElem = 20;
          if(arr.length <= 20) {
            maxElem = arr.length;
            this.setState({endItem: -1});
          }; 
          this.setState({showWords: arr.slice(0,maxElem), groupWords: arr});
        }
       );
    });
  }

  customization(event){
    let elements = event.target.elements;

    let wordTranslate = document.querySelectorAll(".wordTranslate");
      if(elements[0].checked) {
        for(let k=0; k<wordTranslate.length; k++){
          wordTranslate[k].style.display = 'none';
        }
      }   
      else {
        for(let k=0; k<wordTranslate.length; k++){
          wordTranslate[k].style.display = 'block';
        }
      }

    let textMeaning = document.querySelectorAll(".textMeaning");
      if(elements[1].checked) {
        for(let k=0; k<textMeaning.length; k++){
          textMeaning[k].style.display = 'none';
        }
      }   
      else {
        for(let k=0; k<textMeaning.length; k++){
          textMeaning[k].style.display = 'block';
        }
      }

    let textExampleTranslate = document.querySelectorAll(".textExampleTranslate");
      if(elements[2].checked) {
        for(let k=0; k<textExampleTranslate.length; k++){
          textExampleTranslate[k].style.display = 'none';
        }
      }   
      else {
        for(let k=0; k<textExampleTranslate.length; k++){
          textExampleTranslate[k].style.display = 'block';
        }
      }

    let btnSbmt = this.state.buttonSubmit;
      if(btnSbmt == 'Сброс настроек'){
        for(let i=0; i<elements.length-1; i++){
          elements[i].checked = false;

          for (let k=0; k<wordTranslate.length; k++){
            wordTranslate[k].style.display = 'block';
            textMeaning[k].style.display = 'block';
            textExampleTranslate[k].style.display = 'block';
          }
        }
      }

      if(btnSbmt == "Применить") this.setState({buttonSubmit: 'Сброс настроек'});
      else this.setState({buttonSubmit: 'Применить'});
  }

	render(){
		return (
	<section className = "dictionary">
    <div className ="container diction">

        <div className = "row">
         <div className = "link">
          <div className = "titleSection">
            <div className="leftSection" onClick={this.prevGroup}></div>
            <div className = "iconSection"></div>
            <div>Раздел  {this.state.currentGroup +1}</div>
            <div className="rightSection" onClick={this.nextGroup}></div>
          </div>    
        </div>

          <div className = "linkBtnGame">
            <div className = "openLinkGame" onClick={this.openLinkGame}></div>
              <div className = "windowLinkGame">
                <div className = "windowLinkGameHover">
                  <div className="closeLinkGame" onClick={this.closeLinkGame}></div>
                  <div className = "btnLinkGame">
                    <button onClick={this.savannaGameFromPage}>Саванна</button>
                    <button onClick={this.audioGameFromPage}>Аудиовызов</button>
                    <button onClick={this.sprintGameFromPage}>Спринт</button>
                    <button onClick={this.speakltGameFromPage}>Speaklt</button>
                  </div>
                </div>
            </div>     
          
            <div className="openModal" onClick={this.openModal}></div>
           
              <form onSubmit={this.customization} className="formCustomization">
                <div className= "checked">
                  <div className="closeModal" onClick={this.closeModal}></div>
                    <div className="checked-setting">
                      <div className="checkbox">
                        <label><input type="checkbox" value="1" /> Не показывать перевод слова</label>
                      </div>
                      <div className="checkbox">
                        <label><input type="checkbox" value="2"/> Не показывать перевод предложения с объяснением слова</label>
                      </div>
                      <div className="checkbox">
                        <label><input type="checkbox" value="3"/> Не показывать перевод предложения с примером</label>
                      </div>
                      <input type="submit" value={this.state.buttonSubmit} className="setting-btn"/>
                  </div>
                </div>
              </form>
        
          </div>

      </div>

			<div className="row cards">

        {
                  
          this.state.showWords.map((item, key)=>{
            let style = {};
              if(item.difficulty == "difficult") {style = styleBlock}
              else {style = styleNone};  
            let page = item.optional.page;
            let group = item.optional.group;
                    
            let nameClass = "col-12 " + item.optional.word;
            let musicClass = "icon-music mus-" + item.word;
            let imgPath = "https://react-rslangbe.herokuapp.com/"+item.optional.image;
                  
            let musicUp = "musicUp musicUp-" + item.optional.word;
            let musicDown = "musicDown musicDown-" + item.optional.word;

                return(
                  <div className="col-12">
                    <div className="media border card-word">
                      <div className="card-word-img">
                        <img src={imgPath}/>
                      </div>
                      <div className="media-body">
                        <p className = "complex-word"><span className="color-word">{item.optional.word}</span>- <span> - {item.optional.transcription} - </span>
                          <span className="wordTranslate"> - {item.optional.wordTranslate} -</span>
                          <span className = "icon-music" onClick={this.sound}>
                          <div className={musicUp} audio={item.optional.audio} 
                              audioMeaning={item.optional.audioMeaning} 
                              audioExample={item.optional.audioExample} 
                              onClick={this.musicUp} 
                              musicUp={item.optional.word}>
                          </div>
                          <div className={musicDown} onClick={e => this.musicDown(e)} musicDown={item.optional.word}></div>
                          </span>
                          <span className="recover" style={style}></span>
                        </p>
                        <p>
                          {parse(item.optional.textMeaning)}<br/>
                          <div className = "textMeaning">{parse(item.optional.textMeaningTranslate)}</div>
                          {parse(item.optional.textExample)}<br/>
                          <span className = "textExampleTranslate">{parse(item.optional.textExampleTranslate)}</span>
                        </p>
                      </div>      
                    </div>
                  </div>
                )
                    
          })
        }
      </div>

      <Pagination next={this.next} prev={this.prev} page={this.state.page}/>
      
    </div>
  </section>
		)
	}
}


export default Learning;