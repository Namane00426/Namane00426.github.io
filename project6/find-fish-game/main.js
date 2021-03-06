// This was built based on the Find-hat game, and I remodel it to the Find-fish game to become more fun to play. 
//When the player goes out of bounds, it is placed wrap-around instead of game over. 

const prompt = require('prompt-sync')({sigint: true});

const hat = '🐠';  // hat = target 
const hole = '🐍';  // hole = enemy
const fieldCharacter = '░░';  
const pathCharacter = '  ' ;  
const currentLocation = '🐈';  //player
let gameContinue = true;

class Field {
  constructor(field) {
    this._field = field;
    this.x = this._field[0].length-1;
    this.y = 0;
  }

  get field() {
    return this._field;
  }

  //If player start from the top-left corner
  // setStart() {
  //   this._field[0][0] = `${pathCharacter}`;
  //   return this._field;
  // }


  print() {
    for(let i in this._field){
     console.log( `${this._field[i].join('')}`);
    }
  }


 //Retrieve user's input and move the player's cursor
  ask() {
    let move = prompt('Which way you go? (u = up, d = down, l = left, r = right, n = new field) ');
    switch(move.toLowerCase()) {
      case 'u':
        console.log('Moved to up.\n')
        this._field[this.y][this.x] = pathCharacter;
        this.y -= 1;
        break;
      case 'd':
        console.log('Moved to down.\n')
        this._field[this.y][this.x] = pathCharacter;
        this.y += 1;
        break;
      case 'r':
        console.log('Moved to right.\n')
        this._field[this.y][this.x] = pathCharacter;
        this.x += 1;
        break;
      case 'l':
        console.log('Moved to left.\n')
        this._field[this.y][this.x] = pathCharacter;
        this.x -= 1;
        break;
      case 'n':
        console.log('Field change!\n');
        this.askLevel();
        break;
      default:
        console.log('Error! Please type correct direction!')
        break;
    }
  } 

  checkWin() {
    //Check if the current location is out of bounds. If so, place it wrap-around.
    //Check if the current location is the same as the target, the enemy, or on the field.
    //The player wins if the current location is the same as the target, or loses if it meets the enemy.

    // Helper function for checking if the current location meets the target or the enemy.
    const meetHatOrHole = () => {
      if (this._field[this.y][this.x] == hat) {
        this._field[this.y][this.x] = currentLocation;
        this.print();
        console.log('\nYou win!🏆 You got the fish! Yum🐱!');
        this.askLevel();  
        return gameContinue = false;
      } else if (this._field[this.y][this.x] == hole) {
        this._field[this.y][this.x] = '❎';   
        this.print();
        console.log('\nYou lose!😢 You stepped on the snake!'); 
        this.askLevel();  
        return gameContinue = false;
      } 
  }

  // If the current location is out of bounds, place it as a wrap-around. 
    if(this.y == -1 || this.y > this._field.length-1) {
      if(this.y < 0){
        this.y += this._field.length;
        console.log ('Game continue. You jumped to the other side of field!\n');
        meetHatOrHole();
        } else {
        this.y -= this._field.length;
        console.log ('Game continue. You jumped to the other side of field!\n');
        meetHatOrHole();
        }
      this._field[this.y][this.x] = currentLocation;
      console.log ('Game continue. You jumped to the other side of field!');

    } else if (this.x == -1 || this.x > this._field[0].length-1) {
      if(this.x < 0){
        this.x += this._field[0].length;
        console.log ('Game continue. You jumped to the other side of field!\n');
        meetHatOrHole();
      } else {
        this.x -= this._field[0].length;
        console.log ('Game continue. You jumped to the other side of field!\n');
        meetHatOrHole();
      }
      this._field[this.y][this.x] = currentLocation;
      console.log ('Game continue. You jumped to the other side of field!');
    } 

    meetHatOrHole();
    if (this._field[this.y][this.x] == fieldCharacter) {
      console.log('Game continue. You are searching..')
      this._field[this.y][this.x] = currentLocation;
    } else if (this._field[this.y][this.x] == pathCharacter) {
      this._field[this.y][this.x] = currentLocation;
      console.log('Game continue, you are on your path..')
    // } else {
    //   console.log('Something error happen.');
    }

  }

  // When one game end, ask if the player wants to choose a difficult field or normal for the next or end the game.
  askLevel() {
    let askLevel = prompt('......\nDo you play again? If you play the difficult level, type \'d\'. Or normal level, type\'n\'. If play end, type \'e\'.');
    switch(askLevel.toLowerCase()) {
      case 'd':
        gameContinue = true;
        console.log('\n\nStart to play the difficult level!');
        myField = new Field(Field.generateField(7,8,55));
        game(); 
        break;
      case 'n':
        gameContinue = true;
        console.log('Start to play the same level!');
        myField = new Field(Field.generateField(6,6,40));
        game(); 
        break;
      case 'e':
        console.log('Thank you for playing the game! Bye!');
        break;
      default:
        console.log('\nType d, n or e.')
        this.askLevel();
        break;
    }
  }

 //Generate a randomized two-dimensional array that contains a target and one or more enemies.
  static generateField(width, height, percentage) {
    const availableField = (width * height) - 2;
    let holeTotal = Math.round((availableField * (percentage / 100)));
    let holeInRow = Math.round(width * 0.5);

    //Helper function that places the determined amount of enemies depending on the percentage and the field size.
    const setHoleOrField = (percentage) => {
      if( 0 < percentage && percentage < 100 ) {
          if(holeTotal > 0 && Math.random() >= 0.5 && holeInRow > 0){
            holeTotal -= 1;
            holeInRow -= 1;
            return hole;
          } else {
            holeInRow += 1;
            return fieldCharacter;
          } 
        } else {
      console.log('Please set percentage(1 - 99) again! ');
      }
    }
    //Helper function that makes new game field depending on the height, width.
    const plainField = () => {
      function makeRow() {
        let fieldRow = [];
        for (let i = 0; i < width; i++){
          fieldRow.push(setHoleOrField(percentage));
      }
      return fieldRow;
    }
      let plainField = [];
      for(let j = 0; j < height; j++){
        plainField.push(makeRow());
      }

      //Set a hat on this field, avoid holes and start point
      do {
        plainField[Math.floor(Math.random()* height)][Math.floor(Math.random()* width)] = hat;
      } while (plainField[0][width-1] == hat || hole == hat);
      

      // Set the start point on this field(= Top-right corner).
      plainField[0][width-1] = currentLocation;
      return plainField;
    }
    const startField = plainField();
    return startField;
    
  } 

}
// demo field 
// const myField = new Field([
//   ['*', '░', 'O'],
//   ['░', 'O', '^'],
//   ['^', '^', '░'],
// ])

let myField = new Field(Field.generateField(6,6,40));

//Function to run the game.
  function game() {
    console.log('\nStart find-fish-game!');  
    console.log('\nYour current location shows 🐈.\nMove it and get a fish.\nDon\'t step on the snake.\n')
    while(gameContinue){
    myField.print();  
    myField.ask();
    myField.checkWin();
    }
    console.log('Game end.')
    // myField.askLevel();
}


game();