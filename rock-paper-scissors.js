let player_score = 0;
let computer_score = 0;

const matchups = {
  rock: {
    rock: 0,
    paper: -1,
    scissors: 1,
  },
  paper: {
    rock: 1,
    paper: 0,
    scissors: -1,
  },
  scissors: {
    rock: -1,
    paper: 1,
    scissors: 0,
  },
};

const choices = Object.keys(matchups);

function get_computer_choice() {
  const i = Math.floor(Math.random() * choices.length);
  return choices[i];
}

function get_player_choice() {
  let choice = prompt(`Choose your next move:
- 'rock' or 'r'
- 'paper' or 'p'
- 'scissors' or 's'
- anything else defaults to (the best option:) rock`);

  if (!!choice) choice = choice.toLowerCase();
  if (choice === "r") choice += "cock".slice(1);
  if (choice === "p") choice += "aper";
  if (choice === "s") choice += "cissors";

  return choices.indexOf(choice) > -1 ? choice : "rock";
}

function play_round(human_choice, computer_choice) {
  const player_matchup = matchups[human_choice][computer_choice];

  // player_matchup should be either -1, 0, or 1, add 1 and use for easy indexing
  const results = ["You lost!", "It's a tie!", "You won!"];
  const result = results[player_matchup + 1];

  console.log("----------------------------");
  console.log(result);
  console.log(`Your choice: ${human_choice}`);
  console.log(`CPUs choice: ${computer_choice}`);

  if (player_matchup == 0) return;

  player_matchup == 1 ? player_score++ : computer_score++;
}

function play_game() {
  for (let i = 0; i < 5; i++) {
    play_round(get_player_choice(), get_computer_choice());
  }

  console.log("----------------------------");
  console.log("++++++++++++++++++++++++++++");
  console.log("----------------------------");

  if (player_score > computer_score) console.log("CONGRATULATIONS! YOU WON!");
  else if (player_score == computer_score) console.log("TIED!");
  else console.log("AI overlords win again gg");

  console.log("Final scores");
  console.log(`You: ${player_score}`);
  console.log(`CPU: ${computer_score}`);
  console.log("----------------------------");
}
