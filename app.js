/* 
Game Function:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values - min and max
let min = 1,
    max = 10,
    winnNum = getRandomNum (min, max),
    guessLeft = 3

// UI Elements in Game Box container
const gameBox = document.querySelector('#game_box'),
      minNum = document.querySelector('.min_number'),
      maxNum = document.querySelector('.max_number'),
      guessBtn = document.querySelector('#guess_button'),
      guessInput = document.querySelector('#guess_input'),
      message = document.querySelector('.message')

// Assign UI min and max to change dynamically
minNum.textContent = min
maxNum.textContent = max

// Event listener for play again button
// Mousedown event is used because it is not a form submit 
// and it will not reload the page on every click
gameBox.addEventListener('mousedown', (e) => {
  if(e.target.className === 'play_again') {
    window.location.reload()
  }
})

// Event listener for guess button
guessBtn.addEventListener('click', (e) => {
  e.preventDefault()
  let guess = parseInt(guessInput.value);

  // Validate input is a number and between min and max
  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red')
    guessInput.style.borderColor = 'red'
  }

  // Check if winning number
  if(guess === winnNum) {
    guessInput.style.borderColor = 'green'
    // Game over - you win!
    gameOver(true, `${winnNum} is correct, YOU WIN!`, 'green')
  } else {
    // Wrong number - subtract 1 from guessLeft
    guessLeft -= 1

    if(guessLeft === 0) {
      // Game over - you lost! - no guesses left
      gameOver(false, `Game Over, you lost. The correct number was ${winnNum}`, 'red')
    } else {
      // Game continues - you have - guesses left
      guessInput.style.borderColor = 'red'
      guessInput.value = ''
      setMessage(`${guess} is not correct, You have ${guessLeft} guesses left`, 'red')
    }
  }
})

// Game over function to change border color, text color, message text and button text
function gameOver(won, msg) {
  let color
  // Ternary operator to change border color
  won === true ? color = 'green' : color = 'red'
  // Disable input
  guessInput.disabled = true
  // Change border color
  guessInput.style.borderColor = color
  // Change text color
  message.style.color = color
  // Set message
  setMessage(msg)
  // Play again button
  guessBtn.value = 'Play Again'
  guessBtn.className += 'play_again'
}

// Get winning number function to get random number
function getRandomNum(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min)
}

// Set message function to change message color and text
function setMessage(msg, color){
  message.style.color = color
  message.textContent = msg 
}