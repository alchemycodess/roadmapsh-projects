// /*
// Number guessing game;
// this program starts by showing a msg like this:
// Welcom to the num guessing game!
// im thinking of a number between 1 and 100
// You have 5 chances to guess the correct number.
// so first
// 1. this program will select a num between 1 and 100
// 2. it will have 3 levels and it shows u like this
// 1. Easy(10 c) if u choose easy => get 10 chances
// 2. Medium (5c)  if u choose medium => get 5 chances
// 3. Hard (3c)  if u choose hard => get 3 chances

// 3. first select the level with number 1,2,3 by entering
// Enter your choice: 2
// 4. program will show the msg of what u choose and how many chances u will get like this
// Great! you have selected the medium difficulty leve.
// lets start the game

// Enter your guess: 50
// then it shows
// incorrect the num is less than 50

// Enter your guess: 25
// then it shows
// incorrect the num is greater then 25

// Enter your guess: 35
// then it shows
// incorrect the num is less than 35

// Enter your guess: 30
// congratulations you guessed the correct number in 4 attempts

// 4. the game should end when user guess it crcts or num of chances runs out

// */



// // function startGame() {
// //     console.log("Please select the difficulty level:")
// //     console.log("1. Easy (10 chances)")
// //     console.log("2. Medium (5 chances)")
// //     console.log("3. Hard (3 chances)")
// // }

    

// // startGame()
// // const choice = process.argv[2]
// // if(choice === choice) {

// //     console.log(choice)
// // }


// // function startGame() {
// //     console.log("Please select the difficulty level:")
// //     console.log("1. Easy (10 chances)")
// //     console.log("2. Medium (5 chances)")
// //     console.log("3. Hard (3 chances)")
// // }

// // const choice = process.argv[2]

// // const guess = process.argv[2]
// // const num = process.argv[3]

// // const randomNumber = 10
// // function guesss() {
// //     if(guess === guess && num === num) {
// //         if(randomNumber == num) {
// //             console.log("ok", num, "is crct")
// //         } else {
// //             console.log("n")
// //         }
// //     }
// // }
// // if (!choice) {
// //     startGame()
// // } else if(choice === "1") {
// //     console.log("Great! You have selected the Easy difficulty level." , "\n", "Let's start the game!")
// //     console.log("Enter your guess:")
// //     guesss()
// // } else if(choice === "2") {
// //     console.log("Great! You have selected the Medium difficulty level." , "\n", "Let's start the game!")
// //     console.log("Enter your guess:")
// //     guesss()
// // } else if(choice === "3") {
// //     console.log("Great! You have selected the Hard difficulty level." , "\n", "Let's start the game!")
// //     console.log("Enter your guess:")
// //     guesss()
// // }


// function game() {
//     // const randomNumber = Math.floor(Math.random() * 100) + 1

    
    
//     // const num = process.argv[2]
//     const level = process.argv[2]
//     const levelNum = process.argv[3]
//     if(level === "level" && levelNum == levelNum) {
//         console.log("levelNum: ", levelNum)
        
//         if(levelNum == 1) {
//             console.log("Enter a num: ")
//         }
//     } else if(level == level && levelNum == levelNum) {
                    
//                     const randomNumber = 15
//                 // for(i = 0; i <= 10; i++) {
//                 //     if(randomNumber == levelNum) {
//                 //         console.log("win")
//                 //     } else if(randomNumber > levelNum) {
//                 //         console.log("your num is low")
//                 //     } else if(randomNumber < levelNum) {
//                 //         console.log("your num is high")
//                 //     }
//                 // }

//                 let i = 0;
//                 while (i <= 10) {
//                     if(randomNumber == levelNum) {
//                         console.log("win")
//                         // i++
//                     } else if(randomNumber > levelNum) {
//                         console.log("your num is low")
//                         // i++
//                     } else if(randomNumber < levelNums) {
//                         console.log("your num is high")
//                         // i++
//                     }
//                     i++
//                 }


//                 }
    
// }

// // i = 0;
// // while (i <= 10) {
// //     if(randomNumber == levelNum) {
// //                         console.log("win")
// //                     } else if(randomNumber > levelNum) {
// //                         console.log("your num is low")
// //                     } else if(randomNumber < levelNum) {
// //                         console.log("your num is high")
// //                     }
// //     i++
// // }

// game()

// // function run() {
// //                 const guess = process.argv[2]
// //                 console.log("g: ", guess)
// //                 const guessNum = process.argv[3]
// //                 console.log("gn: ", guessNum)
// //                 if(guess === "guess" && guessNum == guessNum) {
                    
// //                     const randomNumber = 15
// //                 for(i = 0; i <= 10; i++) {
// //                     if(randomNumber == guessNum) {
// //                         console.log("win")
// //                     } else if(randomNumber > guessNum) {
// //                         console.log("your num is low")
// //                     } else if(randomNumber < guessNum) {
// //                         console.log("your num is high")
// //                     }
// //                 }
// //                 }
// //             }


const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let usedAttempts = 0;

function startGame() {
  console.log("Welcome to the Number Guessing Game!");
  console.log("I'm thinking of a number between 1 and 100.\n");

  console.log("Please select the difficulty level:");
  console.log("1. Easy (10 chances)");
  console.log("2. Medium (5 chances)");
  console.log("3. Hard (3 chances)");

  rl.question("Enter your choice: ", (choice) => {
    if (choice === "1") {
      attempts = 10;
      console.log("\nGreat! You selected Easy mode.");
      startGuessing();
    } else if (choice === "2") {
      attempts = 5;
      console.log("\nGreat! You selected Medium mode.");
      startGuessing();
    } else if (choice === "3") {
      attempts = 3;
      console.log("\nGreat! You selected Hard mode.");
      startGuessing();
    } else {
      console.log("\nInvalid choice. Please select 1, 2, or 3.\n");
      startGame();
    }
  });
}



function startGuessing() {
  if (attempts === 0) {
    console.log(`\nGame Over! The number was ${randomNumber}.`);
    rl.close();
    return;
  }

  rl.question("\nEnter your guess: ", (guess) => {
    guess = Number(guess);
    usedAttempts++;

    if (isNaN(guess)) {
      console.log("Please enter a valid number.");
      startGuessing();
      return;
    }

    if (guess === randomNumber) {
      console.log(
        `\nCongratulations! You guessed the correct number in ${usedAttempts} attempts.`
      );
      rl.close();
    } else if (guess < randomNumber) {
      console.log("Incorrect! The number is greater than your guess.");
      attempts--;
      startGuessing();
    } else {
      console.log("Incorrect! The number is less than your guess.");
      attempts--;
      startGuessing();
    }
  });
}




startGame();
