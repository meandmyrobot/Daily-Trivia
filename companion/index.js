import * as messaging from "messaging";
import TriviaService from "./triviaservice.js";

console.log("Companion Started");

/** Open a connection. */
messaging.peerSocket.onopen = function() {
  console.log("Socket open");
}

/** Handle communication error. */
messaging.peerSocket.onerror = function(err) {
  console.log("Connection error: " + err.code + " - " + err.message);
}

/** Call Kentico and return response to watch. */
messaging.peerSocket.onmessage = function(evt) {
  console.log('Got message from watch '+ JSON.stringify(evt.data));
  
  let triviaService = new TriviaService(evt.data.day, evt.data.month);
  triviaService.getDayOfTheMonth().then(function(data){  
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      messaging.peerSocket.send(data);
    }  
  });
}
