import React, { Component } from 'react';

import parse from 'html-react-parser';
import './main.css';
import './pagination.css';

const audio = new Audio();
const styleBlock = {
      display: "block"
    }
const styleNone = {
      display: "none"
    }

class Main extends React.Component {
   constructor(props) {
    super(props);
    this.audio = new Audio();
    this.state = {
     words: [], 
     wordsForGame: [],
     userDB: [],
     isSoundWord: false,
     page: 0,
     maxPage: 29,
     currentGroup: 0,
     buttonSubmit: 'Применить',
     pressBtnSbmt: false

    }
    this.complexWord = this.complexWord.bind(this);
    this.deleteWord = this.deleteWord.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.takeWords = this.takeWords.bind(this);
    this.musicDown = this.musicDown.bind(this);
    this.musicUp = this.musicUp.bind(this);
    this.customization = this.customization.bind(this);
    this.openLinkGame = this.openLinkGame.bind(this);
    this.closeLinkGame = this.closeLinkGame.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.loadUserDB = this.loadUserDB.bind(this);
    this.wordStatus = this.wordStatus.bind(this);

    this.wordsForGame = this.wordsForGame.bind(this);
    this.audioGameFromPage = this.audioGameFromPage.bind(this); 
    this.sprintGameFromPage = this.sprintGameFromPage.bind(this);
    this.savannaGameFromPage = this.savannaGameFromPage.bind(this);
    this.speakltGameFromPage = this.speakltGameFromPage.bind(this); 
    this.addToLearningWords = this.addToLearningWords.bind(this); //--добавить в изучаемые слово ------------
  }

  speakltGameFromPage(){
    this.props.speakltGameFromPage(this.wordsForGame());
  }

  addToLearningWords(item){
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');
    let wordId = item.id;
       let word = { "difficulty": "learning", 
                    "optional": {group: item.group,
                                 page: item.page,
                                 word: item.word,
                                 image: item.image,
                                 audio: item.audio,
                                 audioMeaning: item.audioMeaning,
                                 audioExample: item.audioExample,
                                 textMeaning: item.textMeaning,
                                 textExample: item.textExample,
                                 transcription: item.transcription,
                                 textExampleTranslate: item.textExampleTranslate,
                                 textMeaningTranslate: item.textMeaningTranslate,
                                 wordTranslate: item.wordTranslate,
                                 rightAnswers: 0,
                                 mistakeAnswers: 0
            } 
    };
    
    fetch(`https://react-rslangbe.herokuapp.com/users/${userId}/words/${wordId}`, {
        method: 'POST',
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(word)
      })
    .then(res => res.json())
    .then(json => {
    console.log(json);
    this.loadUserDB();
    });
  }

  wordsForGame(){
    
    let arr = this.state.words.filter((item)=>{
        let page = item.page;
        let group = item.group;
        if(page== this.state.page && 
            group == this.state.currentGroup &&
              !this.wordStatus(item, "deleted")) return true;
    });
     //----add learning words--------------
    if(localStorage.getItem('userId') !=undefined) {
      arr.map((item, key)=>{
        this.addToLearningWords(item);
      });
    } 
    //------------------
    return arr;
  }

  savannaGameFromPage(){
    this.props.savannaGameFromPage(this.wordsForGame());
  }

  sprintGameFromPage(){
    this.props.sprintGameFromPage(this.wordsForGame());
  }

  audioGameFromPage(){
    this.props.audioGameFromPage(this.wordsForGame());
  }

  wordStatus(item, status){
    let delArr = this.state.userDB.filter((el)=>{
      return el.difficulty == status;
    });
    let arr = delArr.filter((el)=>{           
      return el.wordId == item.id;    
    });
    if(arr.length == 0) return false
      else return true;
  }

  loadUserDB(){
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
      this.setState({userDB: json});
      //console.log("userDB ", this.state.userDB);
    });
  }

  takeWords(gr, pg){
    let URL = "https://react-rslangbe.herokuapp.com/words?group="+gr+"&page="+pg;
    fetch(URL)
      .then(res => res.json())
      .then(json => {
          console.log(json);
          this.setState({words: json});
      });
  }

  componentDidMount(){
    this.takeWords(this.state.currentGroup,this.state.page); 
  }

  next() {
    let nextPage = this.state.page+1;
    if(nextPage > this.state.maxPage) nextPage = this.state.maxPage;
      this.setState({page: nextPage}, ()=>{
      this.takeWords(this.state.currentGroup,this.state.page);
    });
  }

  prev() {
    let prevPage = this.state.page-1;
    if(prevPage < 0) prevPage = 0;
      this.setState({page: prevPage}, ()=>{
      this.takeWords(this.state.currentGroup,this.state.page);
   });
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

  complexWord(el, item){
    console.log("complex ", item);
    let attr = el.target.getAttribute('word');
    let complexWord =document.getElementById(attr);
    complexWord.style.display = 'block';

    //-----------добавить сложное слово (начало)-------------
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');
    let wordId = item.id;
    let word = { "difficulty": "difficult", 
                 "optional": {group: item.group,
                              page: item.page,
                              word: item.word,
                              image: item.image,
                              audio: item.audio,
                              audioMeaning: item.audioMeaning,
                              audioExample: item.audioExample,
                              textMeaning: item.textMeaning,
                              textExample: item.textExample,
                              transcription: item.transcription,
                              textExampleTranslate: item.textExampleTranslate,
                              textMeaningTranslate: item.textMeaningTranslate,
                              wordTranslate: item.wordTranslate,
                              rightAnswers: 0,
                              mistakeAnswers: 0
               } 
    };
    
    fetch(`https://react-rslangbe.herokuapp.com/users/${userId}/words/${wordId}`, {
        method: 'POST',
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(word)
      })
    .then(res => res.json())
    .then(json => {
    console.log(json);
    this.loadUserDB();
    });
  //------------добавить сложное слово (конец)---------
  }

  deleteWord(el, item){
    let attr = el.target.getAttribute('delWord');
    let id = el.target.getAttribute('delID');
    let deleteWord = document.querySelector('.'+attr);
        deleteWord.style.display = 'none';

    //-----------добавить удаленное слово (начало)-----
        let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');
    let wordId = item.id;
    let word = { "difficulty": "deleted", 
                 "optional": {group: item.group,
                              page: item.page,
                              word: item.word,
                              image: item.image,
                              audio: item.audio,
                              audioMeaning: item.audioMeaning,
                              audioExample: item.audioExample,
                              textMeaning: item.textMeaning,
                              textExample: item.textExample,
                              transcription: item.transcription,
                              textExampleTranslate: item.textExampleTranslate,
                              textMeaningTranslate: item.textMeaningTranslate,
                              wordTranslate: item.wordTranslate,
                              rightAnswers: 0,
                              mistakeAnswers: 0

               } 
    };
    
    fetch(`https://react-rslangbe.herokuapp.com/users/${userId}/words/${wordId}`, {
        method: 'POST',
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(word)
      })
    .then(res => res.json())
    .then(json => {
    console.log(json);
    this.loadUserDB();
    });

    //-----------добавить удаленное слово (конец)------
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
    let formCustomization = document.querySelector('.formCustomization');
        formCustomization.style.display = 'block';
  }

  closeModal(){
    let closeModal = document.querySelector ('.closeModal');
    let formCustomization = document.querySelector('.formCustomization');
        formCustomization.style.display = 'none';
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

    let move = document.querySelectorAll(".move");
      if(elements[3].checked) {
        for(let k=0; k<move.length; k++){
          move[k].style.display = 'none';
        }
      }   
      else {
        for(let k=0; k<move.length; k++){
          move[k].style.display = 'block';
        }
      }

    let busket = document.querySelectorAll(".busket");
      if(elements[4].checked) {
        for(let k=0; k<busket.length; k++){
          busket[k].style.display = 'none';
        }
      }   
      else {
        for(let k=0; k<busket.length; k++){
          busket[k].style.display = 'block';
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
            move[k].style.display = 'block';
            busket[k].style.display = 'block';
          }
        }
      }
      if(btnSbmt == "Применить") this.setState({buttonSubmit: 'Сброс настроек'});
      else this.setState({buttonSubmit: 'Применить'});
  }

  render(){
    let currentPage = this.state.page;
      if(localStorage.getItem('userId') !=undefined && this.state.userDB.length == 0){
        this.loadUserDB();
      }

      if(this.state.currentGroup !== this.props.group) {
        this.setState({currentGroup: this.props.group, page: 0}, ()=>{
            console.log("if");
        this.takeWords(this.state.currentGroup,this.state.page);
      });
    }

    
	return (
		<section className = "main">
      <div className ="container textbook">
        <div className = "row">
          <div className = "link">
            <div className = "titleSection">
              <div className = "iconSection"></div>
              <div>Раздел {parseInt(this.state.currentGroup) + 1}</div>
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
                    <div className="checkbox">
                      <label><input type="checkbox" value="4"/> Не показывать кнопку "Добавить в сложные"</label>
                    </div>
                    <div className="checkbox">
                      <label><input type="checkbox" value="5"/> Не показывать кнопку "Удалить"</label>
                    </div>
                    <input type="submit" value={this.state.buttonSubmit} className="setting-btn"/>
                  </div>
                </div>
              </form>
        
          </div>
        </div>

        <div className = "row cards">
          {
            this.state.words.map((item,key)=>{
              let page = item.page;
              let group = item.group;
              let nameClass = "col-12 "+ item.word;
              let musicClass = "icon-music mus-" + item.word;
              let imgPath = "https://react-rslangbe.herokuapp.com/"+item.image;
              let musicUp = "musicUp musicUp-" + item.word;
              let musicDown = "musicDown musicDown-" + item.word;
              let style = {};
              if(this.wordStatus(item, "difficult")) {style = styleBlock}
              else {style = styleNone};  

                if(page== this.state.page && 
                    group == this.state.currentGroup &&
                      !this.wordStatus(item, "deleted")
                    ){
                  
                  return(
                    <div className = {nameClass}>
                      <div className="media border card-word">
                        <div className="card-word-img">
                          <img src = {imgPath}/>
                        </div>
                        <div className="media-body card-body-word">
                          <p className = "complex-word {item.id}"><span className="color-word"> {item.word} </span>- <span> - {item.transcription} - </span>
                            <span className="wordTranslate"> - {item.wordTranslate} --</span>
                            <span className = {musicClass} onClick={this.sound}>
                              <div className={musicUp} audio={item.audio} audioMeaning={item.audioMeaning} audioExample={item.audioExample} onClick={this.musicUp} musicUp={item.word}></div>
                              <div className={musicDown} onClick={e => this.musicDown(e)} musicDown={item.word}></div>
                            </span>
                            <span className="none" style = {style} id = {item.id} ></span>
                          </p>
                          <p>{parse(item.textMeaning)}<br/>
                            <div className = "textMeaning">{parse(item.textMeaningTranslate)}</div>
                            {parse(item.textExample)}<br/> 
                            <span className = "textExampleTranslate">{parse(item.textExampleTranslate)}</span>
                          </p>
                          <div className="move-busket">
                            <div className = "move"  onClick={(el)=>(this.complexWord(el, item))} word={item.id}></div>
                            <div className = "busket" onClick={(el)=>(this.deleteWord(el, item))} delWord={item.word} delID={item.id}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              })
            }
        </div>

        <div className = "row">
          <div className = "col-12">
            <nav aria-label="Page navigation example" >
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true" onClick={this.prev}>&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
                <li className="page-item"><a className="page-link page-link-none" href="#"></a></li>
                <li className="page-item"><a className="page-link" href="#">{this.state.page + 1}</a></li>
                <li className="page-item"><a className="page-link page-link-none" href="#"></a></li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true" onClick={this.next}>&raquo;</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

      </div>
       
    </section>

		)
	}
}

export default Main;