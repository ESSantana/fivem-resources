const delay = async (timer) =>
  await new Promise((res, _) => setTimeout(res, timer));

exports("delay", async (timer) => {
  await delay(timer);
});

const getNearestVehicle = () => {
  const ped = PlayerPedId();
  let vehicle = GetVehiclePedIsIn(ped, false);

  if (vehicle) {
    return { vehicle, isInVehicle: true };
  }
  const coords = GetEntityCoords(ped);

  vehicle = GetClosestVehicle(
    coords[0],
    coords[1],
    coords[2],
    10,
    0,
    00000000000000100
  );
  return { vehicle, isInVehicle: false };
};

exports("nearestVehicle", () => getNearestVehicle());

const attachAndAnim = (entityToAttach, animToPlay, animVariation) => {
  const player = GetPlayerPed(-1);
  const entityToAttach = AttachEntityToPed(
    entityToAttach,
    60309,
    0,
    0,
    0,
    0,
    0,
    0
  );
  PlayAnim(player, animToPlay, animVariation, 4, 3000);
  delay(2000);
  StopAnimTask(player, "amb@world_human_stand_fishing@idle_a", "idle_c", 2.0);
  DeleteEntity(FishRod);
};
 