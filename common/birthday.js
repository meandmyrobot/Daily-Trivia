/** Class that represents a birthday. */
export default class Birthday {
  /**
   * Create a birthday
   * @param {string} name - Name of whoever has the birthday.
   * @param {number} age - Age they are on this date.
   * @param {string} description - Bio or fact.   
   */   
  constructor(name, age, description){
    this.name = name;
    this.age = age;
    this.description = description;
  }
}