import Fact from "./fact.js";
import Birthday from "./birthday.js";

/** Class that builds the dailyfeed. */
export default class DailyFeed {

  /**
   * Create a daily feed
   * @param {array} facts - Array of fact objects.
   * @param {array} birthdays - Array of birthday objects.
   */     
  constructor(){
    this.facts = [];
    this.birthdays = [];
  }
  
  /**
   * Create a fact and add it to the fact array
   * @param {string} title - Title for the fact.
   * @param {string} factoid - A little factoid.
   */    
  addFact(title, factoid){
    let fact = new Fact(title, factoid);
    this.facts.push(fact);
  }
  
  /**
   * Create a birthday and add it to the birthday array
   * @param {string} name - Name of whoever has the birthday.
   * @param {number} age - Age they are on this date.
   * @param {string} description - Bio or fact.   
   */     
  addBirthday(name, age, description){
    let birthday = new Birthday(name, age, description);
    this.birthdays.push(birthday);
  }
  
  /**
   * Build an object storing facts and birthdays from Kentico JSON
   * @param {object} data - Kentico JSON.
   * @return {object} anonymous - facts and birthdays to store and display.  
   */   
  populateFromKentico(data){
    if(data['items'].length === 0){
      return null;
    }
    
    let factKeys = data['items'][0]['elements']['facts']['value'];
    let birthdayKeys = data['items'][0]['elements']['birthdays']['value'];
    
    for(var index in birthdayKeys){
      let birthdayKey = birthdayKeys[index];
      let name = data['modular_content'][birthdayKey]['elements']['name']['value'];
      let age = data['modular_content'][birthdayKey]['elements']['age']['value'];
      let description = data['modular_content'][birthdayKey]['elements']['description']['value'];
      this.addBirthday(name, age, description);
    }  
    
    for(var index in factKeys){
      let factKey = factKeys[index];
      let title = data['modular_content'][factKey]['elements']['title']['value'];
      let factoid = data['modular_content'][factKey]['elements']['factoid']['value'];
      this.addFact(title, factoid);  
    }
    
    return {
      facts: this.facts,
      birthdays: this.birthdays
    };   
  }
}