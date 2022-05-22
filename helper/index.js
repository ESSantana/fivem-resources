const delay = exports.utils.delay;

RegisterCommand(
  "getLoc",
  async (_X, _Y, _Z) => {
    const ped = PlayerPedId();
    const coords = GetEntityCoords(ped);

    emit("chat:addMessage", {
      args: [
        `Your current location is X(${coords[0]}), Y(${coords[1]}), Z(${coords[2]})`,
      ],
    });
  },
  false
);

RegisterCommand(
  "life",
  async (_X, _Y, _Z) => {
    const player = GetPlayerPed(-1);
    ClearPedTasks(player);
  },
  false
);

// setTick(async () => {
//   await delay(100);
//   const ped = PlayerPedId();
//   const vehicle = GetVehiclePedIsIn(ped, false);
//   console.log(vehicle);
// });
