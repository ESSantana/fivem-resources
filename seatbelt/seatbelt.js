const delay = exports.utils.delay;
const getNearestVehicle = exports.utils.nearestVehicle;
const keys = exports.utils.keymapping;

var speedBuffer = [];
var velBuffer = [];

let beltOn = false;

const Fwv = (entity) => {
  let hr = GetEntityHeading(entity) + 90.0;
  if (hr < 0.0) {
    hr = 360.0 + hr;
  }
  hr = hr * 0.0174533;
  return { x: Math.cos(hr) * 2.0, y: Math.sin(hr) * 2.0 };
};

setTick(async () => {
  await delay(500);

  const ped = PlayerPedId();
  const vehicle = GetVehiclePedIsIn(ped, false);
  if (vehicle != 0) {
    const vehicleVelocity = GetEntitySpeed(vehicle) * 3.6;
    const roundVelocity = Math.round(vehicleVelocity);

    speedBuffer[2] = speedBuffer[1];
    speedBuffer[1] = roundVelocity;

    if (
      speedBuffer[2] > 60 &&
      speedBuffer[2] - speedBuffer[1] > 60 &&
      !beltOn
    ) {
      const co = GetEntityCoords(ped);
      const fw = Fwv(ped);

      SetEntityCoords(
        ped,
        co[0] + fw.x,
        co[1] + fw.y,
        co[2] - 0.47,
        true,
        true,
        true
      );
      SetEntityVelocity(ped, velBuffer[2][0], velBuffer[2][1], velBuffer[2][3]);
      await delay(1);
      SetPedToRagdoll(ped, 1000, 1000, 0, false, false, false);
    }
    velBuffer[2] = velBuffer[1];
    velBuffer[1] = GetEntityVelocity(vehicle);
  }
});

let actionLock = false;
setTick(async () => {
  const ped = PlayerPedId();
  const vehicle = GetVehiclePedIsIn(ped, false);

  if (IsControlJustPressed(0, keys("G")) && vehicle && !actionLock) {
    actionLock = !actionLock;
    beltOn = !beltOn;
    emit("chat:addMessage", {
      args: [`Sinto colocado: ${beltOn}`],
    });
    if (beltOn) {
      emit("seatbelt:sounds", "buckle", 0.4);
    } else {
      emit("seatbelt:sounds", "unbuckle", 0.4);
    }
    await delay(3000);
    emit("hud:seatbelt", beltOn);
    actionLock = !actionLock;
  } else if (!vehicle && beltOn) {
    beltOn = !beltOn;
    emit("hud:seatbelt", beltOn);
  }
});

setTick(async () => {
  await delay(0);
  if (beltOn) {
    DisableControlAction(0, 75, true);
    DisableControlAction(27, 75, true);
  }
});

on("seatbelt:sounds", (soundFile, soundVolume) => {
  const path = "./sounds/" + soundFile + ".ogg";
  const transactionType = "playSound";
  SendNuiMessage(
    JSON.stringify({
      transactionType,
      transactionFile: path,
      transactionVolume: soundVolume,
    })
  );
});
