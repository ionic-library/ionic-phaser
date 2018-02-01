import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import "pixi";
import "p2";
import * as Phaser from "phaser-ce";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private game:any;
  private clicks= 0;
	//private that:any;
  constructor(public navCtrl: NavController) {
  	//this.that = this;
  }

  ionViewDidLoad(){
  	this.game = new Phaser.Game('100%', '100%', Phaser.CANVAS, 'game0', { preload: this.preload.bind(this), create: this.create.bind(this), update: this.update.bind(this) });
  }


  preload(){
  		
  }

  

  create() {
    this.game.stage.backgroundColor = '#e43a19';
    let text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "click me", { font: "24px Arial", fill: "#f2f4f7", align: "center" });

    text.anchor.set(0.5);

    text.inputEnabled = true;
    text.events.onInputDown.add(()=>{
      this.clicks++;
      text.text = "clicked " + this.clicks + " times";
    }, this);
    

}
 update() {
   //console.log("its me update");
}

}