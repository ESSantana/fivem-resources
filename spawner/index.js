RegisterCommand(
  "car",
  async (source, args, raw) => {
    let model = "adder";

    if (args.length > 0) {
      emit("chat:addMessage", { args: args });
      model = args[0].toString();
    }

    const hash = GetHashKey(model);

    if (!IsModelInCdimage(hash) || !IsModelAVehicle(hash)) {
      emit("chat:addMessage", {
        args: [
          `It might have been a good thing that you tried to spawn a ${model}. Who even wants their spawning to actually ^*succeed?`,
        ],
      });
      return;
    }

    RequestModel(hash);

    while (!HasModelLoaded(hash)) {
      await new Promise((res) => setTimeout(res, 500));
    }

    const ped = PlayerPedId();

    const coords = GetEntityCoords(ped);

    const vehicle = CreateVehicle(
      hash,
      coords[0],
      coords[1],
      coords[2],
      GetEntityHeading(ped),
      true,
      false
    );
    SetVehicleBodyHealth(vehicle, 1000);
    SetPedIntoVehicle(ped, vehicle, -1);
    SetVehicleNumberPlateText(vehicle, "NULL");

    SetEntityAsNoLongerNeeded(vehicle);
    SetModelAsNoLongerNeeded(model);

    emit("chat:AddMessage", {
      args: [`Woohoo! Enjoy your new ^*${model}!`],
    });
  },
  false
);

RegisterCommand(
  "weapon",
  (source, args, raw) => {
    const ped = PlayerPedId();
    GiveWeaponToPed(ped, "weapon_assaultrifle", 500, true, true);
  },
  false
);
