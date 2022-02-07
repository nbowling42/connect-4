/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
let board = []; // array of rows, each row is array of cells  (board[y][x])
let WIDTH = 7;
let HEIGHT = 6;
let currPlayer = 1; // active player: 1 or 2

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  for(let i = 0; i < HEIGHT; i++) {
    let row = Array(WIDTH).fill(null);
    board.push(row);
  }; return board;
};
/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // Selects the game board
  const htmlBoard = document.querySelector('#board');
  // Creates the top row of the board and gives it a function to handle click plus gives it an id for styling with css
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  // Creates the individual header cells with a id so we can get the x value later
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  // Appends the top row and cells to the game board
  htmlBoard.append(top);

  // Loops through the height of the gameboard and creates a row which then loops through the width and adds that many data cells to each individual row
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for(let i = 5; i > -1; i--) {
    if(board[i][x] === null) {
      return i;
    }
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // Create piece and append to cell
  const piece = document.createElement('div');
  piece.classList.add('piece', `p${currPlayer}`);
  const cell = document.getElementById(`${y}-${x}`);
  cell.append(piece);
  // Set the associated board value to true indicating a piece is in that current slot
  board[y][x] = currPlayer;
}
/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  } 

  // place piece in board and add to HTML table
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  let completeBoard = [].concat.apply([], board)
  completeBoard.every((val) => {
    if(typeof(val) === 'number') {
      endGame("It's a tie!")
    }
  })

  // switch players
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  //  This loops through every y/x coordinate and then checks four pieces vertical, horizontal, and diagonally and runs the _win function to determine if all four match currPlayer
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
