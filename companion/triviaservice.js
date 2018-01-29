import DailyFeed from "../common/dailyfeed.js";

/** Service that calls Kentico for the daily trivia. */
export default class TriviaService {

  /**
   * Create a trivia service
   * @param {number} day - The day you want to query for.
   * @param {number} month - The month you want to query for.
   */  
  constructor(day, month){
    this.day = day;
    this.month = month;
  }
  
  /**
   * Get the daily trivia for the configured date.
   * @return {object} The daily feed populated from Kentico, or null if not available.
   */  
  getDayOfTheMonth(){
    if(this.month < 10){
      this.month = '0' + this.month;
    }
    
    let url = 'https://deliver.kenticocloud.com/[PUT-YOUR-API-KEY-HERE]/items?system.type=daily_feed&elements.date=2018-' + this.month + '-' + this.day + 'T00:00:00Z';
     
    let self = this;
    
    return new Promise(function(resolve, reject) {
      fetch(url).then(function(response) {
        if(!response.ok) {
          throw new Error(response.status + ' ' + response.statusText);    
        }
        return response.json(); 
      }).then(function(json){
        let model = self.buildTrivia(json);
        resolve(model);     
      }).catch(function(error){
        console.log(error);
        reject(null);        
      }); 
    });   
  }

  /**
   * Build an instance of the DailyFeed from a Kentico response
   * @return {object} The daily feed populated from Kentico, or null if data is empty.
   */    
  buildTrivia(data){
    let dailyFeed = new DailyFeed();
    var model = dailyFeed.populateFromKentico(data);
    return model;
  }
}