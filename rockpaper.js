const game = () => {
  let YourScore = 0;
  let computerScore = 0;
  let moves = 0;
  const maxMoves = 30;

  const playGame = () => {
    const rockBtn = document.getElementById("rock");
    const paperBtn = document.getElementById("paper");
    const scissorBtn = document.getElementById("scissor");
    const playerOptions = [rockBtn, paperBtn, scissorBtn];
    const computerOptions = ["rock", "paper", "scissors"];
    const chosenImagesContainer = document.querySelector(".chosen-images");
    const result = document.querySelector(".result");
    const reloadBtn = document.querySelector(".reload");
    const newGameBtn = document.querySelector(".new-game");
    const nextBtn = document.getElementById("nextButton");

    playerOptions.forEach((option) => {
      option.addEventListener("click", function () {
        if (moves < maxMoves) {
          const playerChoice = this.id;
          const choiceNumber = Math.floor(Math.random() * 3);
          const computerChoice = computerOptions[choiceNumber];
          displayChoices(playerChoice, computerChoice);
          determineWinner(playerChoice, computerChoice);
          moves++;
          if (moves === maxMoves) {
            gameOver();
          } else {
            hideButtons();
            reloadBtn.style.display = "block";
          }
        }
      });
    });

    reloadBtn.addEventListener("click", () => {
      resetRound();
    });

    newGameBtn.addEventListener("click", () => {
      resetGame();
    });
  };

  const displayChoices = (playerChoice, computerChoice) => {
    const chosenImagesContainer = document.querySelector(".chosen-images");
    chosenImagesContainer.innerHTML = "";

    const playerImage = document.createElement("img");
    playerImage.src = `img/${playerChoice}.png`;
    playerImage.alt = playerChoice;
    chosenImagesContainer.appendChild(playerImage);

    const computerImage = document.createElement("img");
    computerImage.src = `img/${computerChoice}.png`;
    computerImage.alt = computerChoice;
    chosenImagesContainer.appendChild(computerImage);
  };

  const determineWinner = (You, computer) => {
    You = You.toLowerCase();
    computer = computer.toLowerCase();
    const result = document.querySelector(".result");
    const nextBtn = document.getElementById("nextButton");

    if (You === computer) {
      result.textContent = "It's a Tie!";
      nextBtn.style.display = "none";
    } else if (
      (You === "rock" && computer === "scissors") ||
      (You === "paper" && computer === "rock") ||
      (You === "scissor" && computer === "paper")
    ) {
      result.textContent = "You Won!";
      YourScore++;
      nextBtn.style.display = "block";
    } else {
      result.textContent = "Computer Won!";
      computerScore++;
      nextBtn.style.display = "none";
    }
    updateScores();
  };

  const updateScores = () => {
    document.querySelector(".p-count").textContent = YourScore;
    document.querySelector(".c-count").textContent = computerScore;
  };

  const gameOver = () => {
    const buttonContainer = document.getElementById("buttonContainer");
    buttonContainer.style.display = "none";
    const result = document.querySelector(".result");
    result.textContent += ` Game Over! Final Score - You: ${YourScore}, Computer: ${computerScore}`;
    document.querySelector(".reload").style.display = "block";
    document.querySelector(".new-game").style.display = "block";
  };

  const hideButtons = () => {
    const buttonContainer = document.getElementById("buttonContainer");
    buttonContainer.style.display = "none";
  };

  const resetRound = () => {
    document.querySelector(".result").textContent = "";
    document.querySelector(".chosen-images").innerHTML = "";
    document.getElementById("buttonContainer").style.display = "flex";
    document.querySelector(".reload").style.display = "none";
    document.getElementById("nextButton").style.display = "none";
  };

  const resetGame = () => {
    YourScore = 0;
    computerScore = 0;
    moves = 0;
    updateScores();
    document.querySelector(".result").textContent = "";
    document.querySelector(".chosen-images").innerHTML = "";
    document.getElementById("buttonContainer").style.display = "flex";
    document.querySelector(".reload").style.display = "none";
    document.querySelector(".new-game").style.display = "none";
    document.getElementById("nextButton").style.display = "none";
  };

  playGame();
};

game();
document.getElementById("rulesButton").onclick = function () {
  document.getElementById("rulesPopup").style.display = "block";
};

document.getElementById("closeButton").onclick = function () {
  document.getElementById("rulesPopup").style.display = "none";
};

window.onclick = function (event) {
  const popup = document.getElementById("rulesPopup");
  if (event.target === popup) {
    popup.style.display = "none";
  }
};
