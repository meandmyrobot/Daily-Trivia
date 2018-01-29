import document from "document";

/** Class that manages the app UI. */
export default class Ui {
  /**
   * The constructor grabs a reference to the elements the UI will play with.
   */    
  constructor(){
    this.date = document.getElementById('date');
    this.loadingScreen = document.getElementById('loadingScreen');
    this.loadingMsg = document.getElementById('loadingMsg');
    this.loadingSpinner = document.getElementById('loadingSpinner');  
    this.loadingCloud = document.getElementById('loadingCloud');
    this.loadingSadCloud = document.getElementById('loadingSadCloud');
    this.menuScreen = document.getElementById('menuScreen');
    this.triviaScreen = document.getElementById('triviaScreen');
    this.birthdayScreen = document.getElementById('birthdayScreen');
    this.btnTrivia = document.getElementById('btnTrivia');
    this.btnBirthday = document.getElementById('btnBirthday');
    this.triviaItems = document.getElementsByClassName('trivia-item');
    this.birthdayItems = document.getElementsByClassName('birthday-item');
  }
  
  /**
   * Setup the navigation events (buttons and the left physical button).
   * A reference to 'this' is passed in so that the events still work from an instance of this class.
   */     
  setupNav(){
     let self = this;
    
    this.btnTrivia.onclick = function(e) {
      self.menuScreen.style.display = 'none';
      self.triviaScreen.style.display = 'inline';
      self.birthdayScreen.style.display = 'none'; 
    }
    
    this.btnBirthday.onclick = function(e) {
      self.menuScreen.style.display = 'none';
      self.triviaScreen.style.display = 'none';
      self.birthdayScreen.style.display = 'inline'; 
    }
    
    document.onkeypress = function(evt) {
      if(evt.key === 'back' && self.menuScreen.style.display === 'none' ){
        self.menuScreen.style.display = 'inline';
        self.triviaScreen.style.display = 'none';
        self.birthdayScreen.style.display = 'none';  
        evt.preventDefault();
      }
    }   
  }
  
  /**
   * Main UI method. Called when there is data available. If data is present
   * then the app will load the navigation and populate the lists, otherwise
   * an error will be shown (message that no data is available).
   * @param {data} Daily feed info either created now or loaded from file.
   */      
  draw(data){
    console.log('In draw : ' + data);
    
    if(data === null){
      this.showError();
    }
    else{
      this.setupNav();
      this.showHome();
      this.buildTrivia(data['facts']);
      this.buildBirthdays(data['birthdays']); 
    }
  }
  
  /**
   * Display a message to the user if data can not be loaded
   */    
  showError(){
    this.loadingMsg.style.fill = 'fb-light-gray';
    this.loadingMsg.text = 'No trivia today!';
    this.loadingSpinner.style.display = 'none';
    this.loadingCloud.style.display = 'none';
    this.loadingSadCloud.style.display = 'inline';
  }
  
  /**
   * Work out the day and show the home screen.
   */      
  showHome(){
    let today = new Date();
    var day = today.getDate().toString();

    if(day.substring(day.length - 1) === '1'){
      day = day + 'st';
    }
    else{
      day = day + 'th';
    }

    let months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    this.date.text = day + ' ' + months[today.getMonth()]; 
    
    this.loadingScreen.style.display = "none";
    this.menuScreen.style.display = "inline";
  }
  
  /**
   * Load the facts into the scroll list.
   * @param {array} Array of facts
   */   
  buildTrivia(facts){    
    for(let i = 0; i < facts.length; i++){
      this.buildScrollItem(this.triviaItems[i], facts[i].title, facts[i].factoid);
    }
    
    for(var index in this.triviaItems){
      if(facts[index] === undefined){
        this.triviaItems[index].style.display = 'none';
      }
    }
  }
  
  /**
   * Load the birthdays into the scroll list.
   * @param {array} Array of birthdays
   */     
  buildBirthdays(birthdays){
    for(let i = 0; i < birthdays.length; i++){
      let header = birthdays[i].name + ', ' + birthdays[i].age;  
      this.buildScrollItem(this.birthdayItems[i], header, birthdays[i].description);
    }
    
    for(var index in this.birthdayItems){
      if(birthdays[index] === undefined){
        this.birthdayItems[index].style.display = 'none';
      }
    }
  }
  
  /**
   * Populate an individual scroll item.
   * @param {object} Scroll Item component
   * @param {string} Header text of the scroll item
   * @param {string} Copy text of the scroll item  
   */    
  buildScrollItem(scrollItem, headerText, copyText){
    let header = scrollItem.getElementById('header');
    let copy = scrollItem.getElementById('copy');
    header.text = headerText; 
    copy.text = copyText;    
  }
}