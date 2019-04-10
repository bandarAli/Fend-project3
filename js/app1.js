/* ------------------------------------------------- *
|  Entity Creation  
/* ------------------------------------------------- */


/* create new object of constructor Player for player */
const player = new Player(2, 5, 'images/char-boy.png');
/*  create new 3 object of constructor Enemy for enemy */
const allEnemies = new Array(3);
for (i = 0; i <= 2; i++) {
  const pos = Math.floor(Math.random() * Math.floor(4));
  allEnemies[i] = new Enemy(pos, i + 1);
};

/* ------------------------------------------------- *
|  Edit on the Panal 
/* ------------------------------------------------- */

/* score how many player reach to the win line */
const scoreSpan = document.getElementById('score');
function changeScore() {
  scoreSpan.textContent = player.wins;
}

/* decrease the lives of the player after every collision */
const livesDiv = document.querySelector('.lifebar');
const lifes = livesDiv.querySelectorAll('.life');
function hideOneLife() {
  lifes[player.lives].classList.add('hide');
}


/* ------------------------------------------------- *
|  player moving control calling player methode : handleInput
/* ------------------------------------------------- */

document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
  // The 'Enter' key is pressed and the modal is visible 
    hideModal();    // Remove the modal
    pause = false ;
});

/* ------------------------------------------------- *
| Modal controls
/* ------------------------------------------------- */

let pause = false ;                  
const modal = document.querySelector('.modal');                     
const modalMessage = document.querySelector('.modal-message');  
const modalTiltl = document.querySelector('.modal-title');
const modalCharcter = document.querySelectorAll('.img');     

/* hide modal function */
const hideModal = () => {
  modal.classList.add('out');
};

/* show modal loser function */
const youLose = () => {
  modalTiltl.innerHTML = '😭 Game Over 😭'
  modalMessage.innerHTML = `You scored : ${player.wins} Choose character:`; 
  modal.classList.remove('out');  
  pause = true ;
};

/* show modal for first time only */
const newGame = () => {
  modalTiltl.innerHTML = 'Wellcome ..Arcade Game!!'
  modalMessage.innerHTML = `Choose Character to play`; 
  modal.classList.remove('out');  
  pause = true ;
};

/* Select the player character and change it immediately along with the lives symbols */
modalCharcter.forEach(char => {
  char.addEventListener('click', function(){
     const imageSrc = char.src ;
     const imageSprite = imageSrc.substring(imageSrc.indexOf("images/char"), imageSrc.length);
     player.sprite = imageSprite ;
     lifes.forEach(lives => lives.src = imageSprite);
  });
});

/* ------------------------------------------------- *
|  Reset the game and show the loser player modele
/* ------------------------------------------------- */
/* for only first time */
if (!player.lostStatus){
  newGame(); 
}

/* when player lost 3 lives on the game */
function gameReset() {
  youLose();
  player.wins = 0;
  changeScore();
  player.lives = 3;
  lifes.forEach(lives => lives.classList.remove('hide'));
}

   

