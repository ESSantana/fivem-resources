const availableDoors = [0, 1, 2, 3];

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

const toogleDoor = (vehicle, currentDoor) => {
  const isDoorOpen = GetVehicleDoorAngleRatio(vehicle, currentDoor) !== 0;

  if (isDoorOpen) {
    SetVehicleDoorShut(vehicle, currentDoor, false, false);
  } else {
    SetVehicleDoorOpen(vehicle, currentDoor, false, false);
  }
};

const toogleLock = (vehicle) => {
  const isDoorLocked = GetVehicleDoorLockStatus(vehicle) > 1;

  if (isDoorLocked) {
    SetVehicleDoorsLocked(vehicle, 1);
  } else {
    SetVehicleDoorsLocked(vehicle, 2);
  }
};

const toogleEngine = (vehicle) => {
  SetVehicleEngineOn(vehicle, !GetIsVehicleEngineRunning(vehicle), false, true);
};

RegisterCommand(
  "p",
  async (source, args, raw) => {
    if (args.length < 1) {
      emit("chat:addMessage", {
        args: ["Nenhuma porta especificada"],
      });
    }

    const currentDoor = parseInt(args[0]) - 1;

    const isValidDoor = availableDoors.includes(currentDoor);

    if (!isValidDoor) {
      emit("chat:addMessage", {
        args: ["Porta inexistente"],
      });
    } else {
      const { vehicle } = getNearestVehicle();
      toogleDoor(vehicle, currentDoor);
    }
  },
  false
);

RegisterCommand(
  "portaMalas",
  async (source, args, raw) => {
    const { vehicle } = getNearestVehicle();
    toogleDoor(vehicle, 5);
  },
  false
);

RegisterCommand(
  "capo",
  async (source, args, raw) => {
    const { vehicle } = getNearestVehicle();
    toogleDoor(vehicle, 4);
  },
  false
);

RegisterCommand(
  "showOff",
  async (source, args, raw) => {
    const { vehicle } = getNearestVehicle();

    for (let index = 0; index < 10; index++) {
      toogleDoor(vehicle, index);
    }
  },
  false
);

setTick(async () => {
  await delay(10);
  const { vehicle, isInVehicle } = getNearestVehicle();
  if (IsControlPressed(0, 7)) {
    if (!isInVehicle) {
      const dict = "anim@mp_player_intmenu@key_fob@";
      RequestAnimDict(dict);
      while (HasAnimDictLoaded(dict) != 1) {
        await delay(0);
      }
      const ped = PlayerPedId();
      TaskPlayAnim(
        ped,
        dict,
        "fob_click_fp",
        8.0,
        8.0,
        -1,
        1,
        1,
        false,
        false,
        false
      );
      await delay(800);
      ClearPedTasks(ped);
    }
    toogleLock(vehicle);
    SetVehicleAlarm(vehicle, true);
  }
});

setTick(async () => {
  const { vehicle, isInVehicle } = getNearestVehicle();
  if (IsControlJustPressed(0, 29) && isInVehicle) {
    await delay(100);
    toogleEngine(vehicle);
  }
});

// Speedometer
setTick(async () => {
  await delay(0);

  const ped = PlayerPedId();
  const vehicle = GetVehiclePedIsIn(ped, false);
  if (vehicle != 0) {
    const vehicleVelocity = GetEntitySpeed(vehicle) * 3.6;
    const roundVelocity = Math.round(vehicleVelocity);
    SendNuiMessage(
      JSON.stringify({
        velocity: roundVelocity,
        vehicle,
      })
    );
  }
});