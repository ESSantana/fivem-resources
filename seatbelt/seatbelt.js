const delay = async (timer) =>
  new Promise((res, rej) => setTimeout(res, timer));

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
      console.log("Deveria ser jogado pra fora do carro!!!");
      const co = GetEntityCoords(ped);
      const fw = Fwv(ped);

      console.log(`SPEED 1: ${speedBuffer[1]} - SPEED 2: ${speedBuffer[2]}`);

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

setTick(async () => {
  const ped = PlayerPedId();
  const vehicle = GetVehiclePedIsIn(ped, false);

  if (IsControlJustPressed(0, 47) && vehicle) {
    beltOn = !beltOn;
    emit("chat:addMessage", {
      args: [`Sinto colocado: ${beltOn}`],
    });
    await delay(500);
  }
});
