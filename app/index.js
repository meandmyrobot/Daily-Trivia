import document from "document";
import * as messaging from "messaging";
import TriviaStore from "./triviastore.js";
import Ui from "./ui.js";

/*
// delete the file - 27_1.txt
// delete the settings file - triviasettings.txt
import * as fs from "fs";
try{
  fs.unlinkSync('28_1.txt');  
  fs.unlinkSync('triviasettings.txt');   
}
catch(error){
  console.log(error);
}
*/

let today = new Date();

let app = {

  /**
   * @property {number} day - The day, today!
   */   
  day: today.getDate(),
  
  /**
   * @property {number} month - The month, today!
   */   
  month: today.getMonth() + 1,
  
  /**
   * The main entry point for the app. Shoulda called it main.
   */    
  init(){
        
    console.log(this.day + ' ' + this.month);
    let triviaStore = new TriviaStore(this.day, this.month);
    let data = triviaStore.getData();
    if(data === null){
      messaging.peerSocket.onopen = function() {
        if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
          console.log('Calling for data');          
          messaging.peerSocket.send({day:app.day,month:app.month});
        }
        else{
          app.loadUi(null);
        }
      }
      
      this.setupMessaging();
    }
    else{
      console.log('Loading from existing data');
      this.loadUi(data);
    }
  },
  
  /**
   * Creates an instance of the Ui module and loads the data into it.
   * Called from the component or watch depending on data availability.
   * @param {object} data - Data for today.   
   */   
  loadUi(data){
    var ui = new Ui();
    ui.draw(data);
  },
  
  /**
   * Setup messaging with the component, assuming we aren't loading data locally.
   */    
  setupMessaging(){
   
    messaging.peerSocket.onmessage = function(evt) {
      let triviaStore = new TriviaStore(app.day, app.month);
      triviaStore.setData(evt.data);
      app.loadUi(evt.data)
    }

    messaging.peerSocket.onerror = function(err) {
      app.loadUi(null);
    }    
  }
};

//Kick off the party
app.init();