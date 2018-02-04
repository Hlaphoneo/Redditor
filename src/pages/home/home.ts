import { Component } from '@angular/core';
import { NavController , Events } from 'ionic-angular';
import { TweetsProvider } from '../../providers/tweets/tweets';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    author : any;
    post : any;

  constructor(public events : Events , public navCtrl: NavController , public twitter : TweetsProvider) {
      this.events.subscribe("done",(results)=>{
          this.author = results.data.author;
          this.post = results.data.selftext;
          this.author = results.data.author;
      })
      this.prepareTweets();
  }

  check(){
    alert(this.author)
  }

  prepareTweets(){
    this.twitter.loadTweets();
  }

}
