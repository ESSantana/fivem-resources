const availableDoors = [0, 1, 2, 3];

const delay = exports.utils.delay;
const keys = exports.utils.keymapping;
const nearestVehicle = exports.utils.nearestVehicle;

const toogleDoor = (vehicle, currentDoor) => {
  const isDoorOpen = GetVehicleDoorAngleRatio(vehicle, currentDoor) !== 0;

  const doorOpenMap = {
    true: () => SetVehicleDoorShut(vehicle, currentDoor, false, false),
    false: () => SetVehicleDoorOpen(vehicle, currentDoor, false, false),
  };
  doorOpenMap[isDoorOpen]();
};

const toogleLock = (vehicle) => {
  const isDoorLocked = GetVehicleDoorLockStatus(vehicle) > 1;

  const DoorLockMap = {
    true: 1,
    false: 2,
  };

  SetVehicleDoorsLocked(vehicle, DoorLockMap[isDoorLocked]);
  return !isDoorLocked;
};

const toogleEngine = (vehicle) => {
  SetVehicleEngineOn(vehicle, !GetIsVehicleEngineRunning(vehicle), false, true);
};

RegisterCommand(
  "p",
  async (_X, args, _Z) => {
    if (args.length < 1) {
      emit("chat:addMessage", {
        args: ["Nenhuma porta especificada"],
      });
      return;
    }

    const currentDoor = parseInt(args[0]) - 1;
    const isValidDoor = availableDoors.includes(currentDoor);
    if (!isValidDoor) {
      emit("chat:addMessage", {
        args: ["Porta inexistente"],
      });
      return;
    }

    const { vehicle } = nearestVehicle();
    toogleDoor(vehicle, currentDoor);
  },
  false
);

RegisterCommand(
  "door5",
  async (_X, _Y, _Z) => {
    const { vehicle } = nearestVehicle();
    toogleDoor(vehicle, 5);
  },
  false
);

RegisterCommand(
  "hood",
  async (_X, _Y, _Z) => {
    const { vehicle } = nearestVehicle();
    toogleDoor(vehicle, 4);
  },
  false
);

RegisterCommand(
  "showOff",
  async (_X, _Y, _Z) => {
    const { vehicle } = nearestVehicle();

    for (let index = 0; index < 10; index++) {
      toogleDoor(vehicle, index);
    }
  },
  false
);

setTick(async () => {
  await delay(10);
  const { vehicle, isInVehicle } = nearestVehicle();
  if (IsControlPressed(0, keys("L"))) {
    const lockStatus = toogleLock(vehicle);

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
    await delay(800);
    SendNuiMessage(
      JSON.stringify({
        transactionType: "playSound",
        transactionFile: "./sounds/car_lock.ogg",
        transactionVolume: 0.2,
        lockStatus,
      })
    );
    SetVehicleAlarm(vehicle, true);
  }
});

setTick(async () => {
  const { vehicle, isInVehicle } = nearestVehicle();
  if (IsControlJustPressed(0, keys("B")) && isInVehicle) {
    await delay(100);
    toogleEngine(vehicle);
  }
});

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
  } else {
    SendNuiMessage(JSON.stringify({ hideHUD: true }));
  }
});

on("hud:seatbelt", (status) => {
  SendNuiMessage(
    JSON.stringify({
      beltStatus: status,
    })
  );
});
