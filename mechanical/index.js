const CANT_REPAIR_MSG = "Não é possível reparar o veículo por dentro";
const CANT_BODYKIT_MSG =
  "Não é possível arrumar a funilaria do veículo por dentro";
const CANT_HEALTHCHECK_MSG =
  "Não é possível verificar os status do veículo fora dele";

const delay = async (timer) =>
  await new Promise((res, rej) => setTimeout(res, timer));

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

RegisterCommand(
  "repair",
  async (source, args, raw) => {
    const { vehicle, isInVehicle } = getNearestVehicle();
    if (isInVehicle) {
      emit("chat:addMessage", {
        args: [CANT_REPAIR_MSG],
      });
      return;
    }
    const ped = PlayerPedId();
    TaskStartScenarioInPlace(ped, "PROP_HUMAN_BUM_BIN", 0, true);
    await delay(15000);
    ClearPedTasks(ped);
    SetVehicleEngineHealth(vehicle, 1000);
  },
  false
);

RegisterCommand(
  "bodykit",
  (source, args, raw) => {
    const { vehicle, isInVehicle } = getNearestVehicle();
    if (isInVehicle) {
      emit("chat:addMessage", {
        args: [CANT_BODYKIT_MSG],
      });
      return;
    }
    currentEngineHealht = GetVehicleEngineHealth(vehicle);
    SetVehicleFixed(vehicle);
    SetVehicleEngineHealth(vehicle, currentEngineHealht);
  },
  false
);

RegisterCommand(
  "health",
  (source, args, raw) => {
    const { vehicle, isInVehicle } = getNearestVehicle();
    if (isInVehicle) {
      console.log("Body: ", GetVehicleBodyHealth(vehicle));
      console.log("Engine: ", GetVehicleEngineHealth(vehicle));
    } else {
      emit("chat:addMessage", {
        args: [CANT_HEALTHCHECK_MSG],
      });
    }
  },
  false
);
