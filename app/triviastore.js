import * as fs from "fs";

/** Class that handles the persistence of daily trivia on the watch. */
export default class TriviaStore {
  
  /**
   * Create a trivia store
   * @param {number} day - The day you want the store to work with.
   * @param {number} month - The month you want the store to work with. 
   */     
  constructor(day, month){
    this.day = day;
    this.month = month;
    this.fileName = this.day + '_' + this.month + '.txt';
    this.settingsFileName = 'triviasettings.txt';
  }
  
  /**
   * Get data from file storage.
   * @return {object} The daily feed populated from file, or null if not available.
   */    
  getData(){
    try{
      let data  = fs.readFileSync(this.fileName, "json");
      return data;      
    }
    catch(err){
      return null;
    }
  }
  
  /**
   * Set data into file storage.
   * @param {object} The daily feed as populated by the call to Kentico.
   */    
  setData(data){
    try{
      this.refreshSettings();
      fs.writeFileSync(this.fileName, data, "json");      
    }
    catch(err){
      console.log(err);
    }
  }
  
  /**
   * A settings file is also stored on disk to allow
   * the app to reference and clean up old files.
   * This method creates the setting file and manages
   * the information stored.
   */  
  refreshSettings(){
    try{
      let currentSettings  = fs.readFileSync(this.settingsFileName, "json");
      console.log('Saved file ' + currentSettings.ref);
      console.log('New file ' + this.fileName);
      if(currentSettings.ref !== this.fileName){
        this.deleteFile(currentSettings.ref);
        currentSettings.ref = this.fileName;
        fs.writeFileSync(this.settingsFileName, currentSettings, "json");  
      }
    }
    catch(err){
      let newSettings = {
        'ref' : this.fileName
      }
      fs.writeFileSync(this.settingsFileName, newSettings, "json");  
    }
  }
  
  /**
   * Delete a file
   * @param {string} The name of the file you want to delete.
   */  
  deleteFile(fileName){
    try{
      fs.unlinkSync(fileName);  
      console.log('Deleting ' + fileName);
    }
    catch(err){
      console.log(err);
    }
  }
}