const CANT_REPAIR_MSG = "Não é possível reparar o veículo por dentro";
const CANT_BODYKIT_MSG =
  "Não é possível arrumar a lataria do veículo por dentro";
const CANT_HEALTHCHECK_MSG =
  "Não é possível verificar os status do veículo fora dele";

const delay = exports.utils.delay;
const getNearestVehicle = exports.utils.nearestVehicle;

const playAnim = async (anim, duration) => {
  const ped = PlayerPedId();
  TaskStartScenarioInPlace(ped, anim, 0, true);
  await delay(duration);
  ClearPedTasks(ped);
};

RegisterCommand(
  "repair",
  async (_X, _Y, _Z) => {
    const { vehicle, isInVehicle } = getNearestVehicle();
    if (isInVehicle) {
      emit("chat:addMessage", {
        args: [CANT_REPAIR_MSG],
      });
      return;
    }
    await playAnim("PROP_HUMAN_BUM_BIN", 15000);
    SetVehicleEngineHealth(vehicle, 1000);
  },
  false
);

RegisterCommand(
  "bodykit",
  async (_X, _Y, _Z) => {
    const { vehicle, isInVehicle } = getNearestVehicle();
    if (isInVehicle) {
      emit("chat:addMessage", {
        args: [CANT_BODYKIT_MSG],
      });
      return;
    }
    await playAnim("WORLD_HUMAN_WELDING", 15000);
    currentEngineHealht = GetVehicleEngineHealth(vehicle);
    SetVehicleFixed(vehicle);
    SetVehicleEngineHealth(vehicle, currentEngineHealht);
  },
  false
);

RegisterCommand(
  "health",
  (_X, _Y, _Z) => {
    const { vehicle, isInVehicle } = getNearestVehicle();
    if (isInVehicle) {
      const bodyHealth = Math.floor(GetVehicleBodyHealth(vehicle));
      const engineHealth = Math.floor(GetVehicleEngineHealth(vehicle));
      emit("chat:addMessage", {
        args: [`Body: ${bodyHealth} / Engine: ${engineHealth}`],
      });
    } else {
      emit("chat:addMessage", {
        args: [CANT_HEALTHCHECK_MSG],
      });
    }
  },
  false
);

// const dict = "amb@world_human_welding@male@base";
//       RequestAnimDict(dict);
//       while (HasAnimDictLoaded(dict) != 1) {
//         await delay(0);
//       }
//       const ped = PlayerPedId();
//       TaskPlayAnim(
//         ped,
//         dict,
//         "base",
//         8.0,
//         8.0,
//         -1,
//         1,
//         1,
//         false,
//         false,
//         false
//       );