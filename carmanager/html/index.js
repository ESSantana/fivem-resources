var audioPlayer = null;

const CONTAINER_ID = "container";
const SPEEDOMETE_ID = "speedometer";
const LOCK_ID = "lock";
const SEATBELT_ID = "seatbelt";

const toogleLockStatus = ({ lockStatus }) => {
  const complement = lockStatus ? "on" : "off";
  const image = document.createElement("img");
  image.setAttribute("src", `./icons/lock-${complement}.png`);

  const div = document.getElementById(LOCK_ID);
  div.innerHTML = "";
  div.appendChild(image);
};

const toogleBeltStatus = ({ beltStatus }) => {
  const complement = beltStatus ? "on" : "off";
  const image = document.createElement("img");
  image.setAttribute("src", `./icons/seatbelt-${complement}.png`);

  const div = document.getElementById(SEATBELT_ID);
  div.innerHTML = "";
  div.appendChild(image);
};

const playLockSound = async ({ transactionFile, transactionVolume }) => {
  if (audioPlayer != null) {
    audioPlayer.pause();
  }
  audioPlayer = new Audio(transactionFile);
  audioPlayer.volume = transactionVolume;
  await audioPlayer.play();
};

const toogleVehicleSpeedometer = (display = "none") => {
  document.getElementById(CONTAINER_ID).style.display = display;
};

window.addEventListener("message", async (event) => {
  if (event.data.vehicle) {
    document.getElementById(
      SPEEDOMETE_ID
    ).innerHTML = `${event.data.velocity} Km/h`;
    toogleVehicleSpeedometer("flex");
  } else if (event.data.hideHUD) {
    toogleVehicleSpeedometer();
  }

  if (event.data.lockStatus !== undefined) {
    toogleLockStatus(event.data);
  }
  if (event.data.beltStatus !== undefined) {
    toogleBeltStatus(event.data);
  }
  if (event.data.transactionType == "playSound") {
    await playLockSound(event.data);
  }
});
