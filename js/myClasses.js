/* class for all Entities on the the game */
class Entity {
  constructor(x, y, image) {
    this.x = x;  
    this.y = y;
    this.sprite = image;
  }

  /* methode to drow the Entites */
  render(x, y) {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
  }
};

/* class for player inheriting from Entity class */
class Player extends Entity {
  constructor(x, y, image) {
    super();
    this.x = x;
    this.y = y;
    this.sprite = image;
    this.wins = 0;
    this.lives = 3;
    this.lostStatus = false ;
  }

/* player method : For handle the key Input to move the player entity
called from >> app.js  */
  handleInput(keyCode) {
    switch (keyCode) {
      case 'right':
        if (this.x < 4) this.x++;
        break;
      case 'left':
        if (this.x > 0) this.x--;
        break;
      case 'up':
        if (this.y > 0) this.y--;
        break;
      case 'down':
        if (this.y < 5) this.y++;
        break;
    }
  }
/* player methode : for chech the collisions with any enemy 
   called from >>  enemy update methode */ 
  checkCollisions(enemy) {
    if (this.y === enemy.y) {
      if (this.x >= enemy.x - 0.3 && this.x <= enemy.x + 0.5) {
        this.x = 2;
        this.y = 5;
        if (this.lives > 1) {
          this.lives--;
          hideOneLife();
        } else {
          this.lostStatus = true ;
          gameReset();
        }
      }
    }
  }
  /* player method : for updating 
    called from >> engine.js */   
  update() {
    if (player.y < 0.2) {
      this.x = 2;
      this.y = 5
      this.wins++;
      changeScore();
    }
  }
}
/* class for all enemies inheriting from Entity class */
class Enemy extends Entity {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png'
  }
 /* enemy methode : updating the speeed of enemies by random nbr between 0 and 1 */
  update(dt) {
    if (this.x > 5) {
      this.x = -1;

    } else {
      this.x += dt + Math.random() / 7;
    }
    player.checkCollisions(this);
  }

}





