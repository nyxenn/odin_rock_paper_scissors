const event_log = [];
const event_popups_el = document.querySelector(".event-popups");
const event_list_el = document.querySelector(".event-list");
const toggle_event_list_el = document.getElementById("event-list-toggle");
let event_list_open = false;

const rock_el = document.getElementById("rock");
const paper_el = document.getElementById("paper");
const scissors_el = document.getElementById("scissors");

const player_score_el = document.querySelector(".player-score");
const cpu_score_el = document.querySelector(".cpu-score");

/**
 * Game logic
 **/
let player_score = 0;
let computer_score = 0;
let is_game_underway = false;

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
const results = ["ai overlords win again", "Tied!", "gg sit"];

rock_el.addEventListener("click", async () => await play_round("rock"));
paper_el.addEventListener("click", async () => await play_round("paper"));
scissors_el.addEventListener("click", async () => await play_round("scissors"));
toggle_event_list_el.addEventListener("click", () => toggle_event_list());

function get_computer_choice() {
  const i = Math.floor(Math.random() * choices.length);
  return choices[i];
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function play_round(player_choice) {
  if (is_game_underway) return;
  disable_actions();
  is_game_underway = true;

  const player_choice_event = create_notification_event(
    `You chose: ${player_choice}`,
  );
  document.dispatchEvent(player_choice_event);

  await sleep(300);
  const computer_choice = get_computer_choice();
  const computer_choice_event = create_notification_event(
    `CPU chose: ${computer_choice}`,
  );
  document.dispatchEvent(computer_choice_event);

  await sleep(200);
  const player_matchup = matchups[player_choice][computer_choice];

  // player_matchup should be either -1, 0, or 1, add 1 and use for easy indexing
  const result = results[player_matchup + 1];
  const result_event = create_notification_event(result);
  document.dispatchEvent(result_event);

  enable_actions();
  is_game_underway = false;

  if (player_matchup == 0) return;

  if (player_matchup == 1) {
    player_score++;
    player_score_el.textContent = player_score;
  } else {
    computer_score++;
    cpu_score_el.textContent = computer_score;
  }
}

function disable_actions() {
  rock_el.setAttribute("disabled", true);
  paper_el.setAttribute("disabled", true);
  scissors_el.setAttribute("disabled", true);
}

function enable_actions() {
  rock_el.removeAttribute("disabled");
  paper_el.removeAttribute("disabled");
  scissors_el.removeAttribute("disabled");
}

function toggle_event_list() {
  event_list_el.classList.toggle("d-none");
  event_popups_el.classList.toggle("d-none");
}

/**
 * Event list stuff
 **/
document.addEventListener("notification", (e) => show_event_popup(e));

function show_event_popup(e) {
  push_to_event_log(e);

  const event = document.createElement("div");
  const active_time_ms = 5000;
  const fade_out_time_ms = 600;

  event.classList.add("event");
  fade_out(event, active_time_ms, fade_out_time_ms);

  event.innerText = e.detail.message;
  event_popups_el.appendChild(event);

  setTimeout(() => event_popups_el.removeChild(event), active_time_ms);
}

function push_to_event_log(e) {
  const date_received = new Date(Date.now());
  event_log.push({ event: e, date_time_received: date_received });
  const el = document.createElement("div");
  el.innerText = `[${date_received.toLocaleTimeString()}]: ${e.detail.message}`;
  event_list_el.appendChild(el);
}

function fade_out(element, active_time_ms, fade_out_time_ms) {
  element.style.animationName = "fade-out";
  element.style.animationDelay = active_time_ms - fade_out_time_ms + "ms";
  element.style.animationDuration = fade_out_time_ms + "ms";
  element.style.transitionTimingFunction = "ease";
}

function create_notification_event(message) {
  return new CustomEvent("notification", { detail: { message } });
}
