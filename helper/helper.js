RegisterCommand(
  "getLoc",
  async (source, args, rawCommand) => {
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
  async (source, args, raw) => {
    const player = GetPlayerPed(-1);
    ClearPedTasks(player);
  },
  false
);
