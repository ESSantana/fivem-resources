const spanwPos = [183.758, -1010.259, 29.322];
const defaultValue = 0.0;

const delay = exports.utils.delay;

setTick(async () => {
  await delay(0);
  SetVehicleDensityMultiplierThisFrame(defaultValue);
  SetRandomVehicleDensityMultiplierThisFrame(defaultValue);
  SetParkedVehicleDensityMultiplierThisFrame(defaultValue);
  SetPedDensityMultiplierThisFrame(defaultValue);
  SetScenarioPedDensityMultiplierThisFrame(defaultValue, defaultValue);

  const player = PlayerId();
  if (GetPlayerWantedLevel(player) > 0) {
    SetPlayerWantedLevel(player, 0, false);
    SetPlayerWantedLevelNow(player, false);
  }
});

on("onClientGameTypeStart", () => {
  exports.spawnmanager.setAutoSpawnCallback(() => {
    exports.spawnmanager.spawnPlayer(
      {
        x: spanwPos[0],
        y: spanwPos[1],
        z: spanwPos[2],
        model: "a_m_m_skater_01",
      },
      () => {
        emit("chat:addMessage", {
          args: ["Welcome to the party!"],
        });
      }
    );
  });

  exports.spawnmanager.setAutoSpawn(true);
  exports.spawnmanager.forceRespawn();
});

RegisterCommand(
  "initLoc",
  async (_X, _Y, _Z) => {
    const ped = PlayerPedId();
    SetEntityCoords(ped, spanwPos[0], spanwPos[1], spanwPos[2]);
  },
  false
);