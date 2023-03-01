
class Game {
  constructor (P1, P2, height = 6, width = 7){
    this.players = [P1, P2];
    this.height = height;
    this.width = width;
    
    this.currPlayer = P1;
    this.makeBoard()
    this.makeHTMLBoard();

    //this property will determine if the game has finished or not
    this.gameOver = false; 
  }
  //makeBoard creates board structure using width and height 
  makeBoard(){

    this.board = [];

    for(let y = 0; y < this.height; y++){
      this.board.push(Array.from({length: this.width}));
    }
  }

  //makeHTMLBoard will create the connect 4 
  makeHTMLBoard(){
    const board = document.getElementById('board');
    board.innerHTML = '';

    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', "column-top");

    //this stores a reference to the handleClick method so that we can remove the event listener
    this.handleGameClick = this.handleClick.bind(this);

    top.addEventListener('click', this.handleGameClick);

    for(let x = 0; x < this.width; x++){
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    board.append(top);

    //make main part of the board using nested for lopps that give each cell a unique ID
    for(let y = 0; y < this.height; y++){
      const row = document.createElement('tr');

      for(let x = 0; x <this.width; x++){
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);

    }
  }

  //findSpotForCol, return the most top empty y(null if filled)
  findSpotForCol(x){
    for(let y = this.height -1; y >= 0; y--){
      if(!this.board[y][x]){
        return y;
      }
    }
    return null;
  }

  //placeInTable will update DOM to place piece into HTML board 
  placeInTable(y,x){
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundColor = this.currPlayer.color;
    

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  //alert the end of the game
  endGame(msg){
    const top = document.querySelector('#column-top');
    top.removeEventListener('click', this.handleGameClick);
    alert(msg);
  }

  //handleCLick will handle click events of column tops to play piece
  handleClick(evt){
    //get x from ID of clicked cell
    const x = +evt.target.id;

    //get next spot in column(if none, ignore click)
    const y = this.findSpotForCol(x);
    if(y === null){
      return;
    }

    //place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y,x);

    //check for win
    if(this.checkForWin()){
      this.gameOver = true;
      return this.endGame(`The ${this.currPlayer.color} player won!!!`);
    }

    //check for tie
    if(this.board.every(row => row.every(cell => cell))){
      return this.endGame('TIE, NO WINNER');
    }

    //switch players
    this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
  }

  //checks the board cell by cell to determine if a win starts from anywhere on the board
  checkForWin(){
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
  const _win = (cells) =>(
    cells.every(
      ([y,x]) => 
      y >= 0 &&
        y < this.height &&
        x >= 0 &&
        x < this.width &&
        this.board[y][x] === this.currPlayer
    )
  );
  
  for (let y = 0; y < this.height; y++) {
    for (let x = 0; x < this.width; x++) {
      // get "check list" of 4 cells (starting here) for each of the different
      // ways to win
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}
}
//this class will take a string color name ('orange' or '#ff3366' abd store on the player instance)
class Player {
  constructor(color){
    this.color = color;
  }
}

const startButton = document.getElementById('start-game');
startButton.addEventListener("click", () => {
  let p1 = new Player(document.getElementById('player1-color').value);
  let p2 = new Player(document.getElementById('player2-color').value);
  new Game (p1, p2);

});

