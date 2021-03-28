const clickSounds = ["click1.mp3", "click2.mp3"];

const cursedSounds = [
  "cursed.mp3",
  "losing-horn.wav",
  "mc-damage-taken.wav",
  "mc-villager-oof.wav",
  "noice.wav",
  "oof.wav",
  "sad-trombone.wav",
  "satania-scream.wav",
  "scooby-dooby-doo.mp3",
  "mc-villager-oof.wav",
  "wilhelm-scream.wav",
  "wow.wav",
];

function playClickSound() {
  let soundIndex;
  let audio;
  // get a random index from the sound list
  // there are two lists, generic sounds and special sounds. They former has 90% chance to be played, the latter is 10%
  if (Math.floor(Math.random() * Math.floor(100)) <= 75) {
    soundIndex = Math.floor(Math.random() * Math.floor(clickSounds.length));
    audio = new Audio(
      "./assets/sounds/genericClicks/" + clickSounds[soundIndex]
    );
  } else {
    soundIndex = Math.floor(Math.random() * Math.floor(cursedSounds.length));
    audio = new Audio("./assets/sounds/easterEggs/" + cursedSounds[soundIndex]);
  }

  audio.play();
}

