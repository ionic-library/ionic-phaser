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
  PreloadState = {};
  Level = {};
  tenisball:any;
  platform:any;
  tapScreen = false;

  constructor(public navCtrl: NavController) {
    this.PreloadState = {
      preload(){
        this.game.load.image('tenisball', '../../assets/imgs/tennisball.png');
        this.game.load.image('platform', '../../assets/imgs/platform.png');
      },
      create() {
        this.game.stage.backgroundColor = '#3090a1';           
        },
        update() {
        this.game.state.start('Level');
        }
    }

    this.Level = {
      preload(){
          
          },
      create() {
        this.game.input.onTap.add((pointer)=>{this.tapScreen =  this.tenisball.body.touching.down ? true:false;}, this);
        this.platform =  this.game.add.sprite(0, this.game.world.bounds.height - 100,'platform');
        this.game.physics.enable(this.platform, Phaser.Physics.ARCADE);
        this.platform.scale.setTo(1, 3);
        this.platform.width = this.game.world.bounds.width;
        this.platform.body.enable = true;
        this.platform.body.immovable = true;

        this.tenisball =  this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'tenisball');
        this.game.physics.enable(this.tenisball, Phaser.Physics.ARCADE);
        this.tenisball.body.enable = true;
        this.tenisball.body.gravity.y = 100;
        this.tenisball.body.bounce.y = 0.4;
        this.tenisball.body.collideWorldBounds = true;
        },
        update() {
           this.game.physics.arcade.collide(this.tenisball, this.platform);

           if(this.tapScreen){             
              this.tenisball.body.velocity.y = -200;
              this.tapScreen = false;
           }
        }
    }
  }

  ionViewDidLoad(){
       this.game = new Phaser.Game('100%', '100%', Phaser.CANVAS, 'game0');
       this.game.state.add('PreloadState', this.PreloadState);
       this.game.state.add('Level', this.Level);
       this.game.state.start('PreloadState');
  }

}