import { Http , Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';



@Injectable()
export class TweetsProvider {
  apiUrl  = "http://www.reddit.com/r/subreddit/search.json?limit=100&&q='qoutes'&&sort=new";
  rawData = Array();

  constructor(public http: Http , public events : Events) {

  }


  loadTweets(){
    return this.http.get(this.apiUrl).subscribe(raw => {
      this.rawData = JSON.parse(raw["_body"]).data.children;
      console.log(this.rawData)
      this.start();
      this.stream();
    }, err => {
        return err;
    });

  }

  stream(){
    let index = 0;
    setInterval( () => {
      for (let i = 0; i < this.rawData.length; i++) {
        index = Math.floor((Math.random() * this.rawData.length -1 ) + 1)
        if(this.rawData[index].data.selftext.length != 0){
            if(this.rawData[index].data.selftext.length < 250){
                this.events.publish("done" , this.rawData[index]);
              return;
            }
        }
      }
    }, 1000*25);
  }

  start(){
    let index = 0;

    for (let i = 0; i < this.rawData.length; i++) {
      index = Math.floor((Math.random() * this.rawData.length -1 ) + 1)
      if(this.rawData[index].data.selftext.length != 0){
          if(this.rawData[index].data.selftext.length < 250){
              this.events.publish("done" , this.rawData[index]);
            return;
          }
      }
    }
  }
}
