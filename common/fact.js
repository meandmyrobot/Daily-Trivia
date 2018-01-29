/** Class that represents a fact. */
export default class Fact {
  /**
   * Create a fact
   * @param {string} title - Title for the fact.
   * @param {string} factoid - A little factoid.
   */   
  constructor(title, factoid){
    this.title = title;
    this.factoid = factoid;
  }
}