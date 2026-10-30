--!strict
-- A Controller: client-only game logic that Init loads and starts for you. Name it <Something>Controller.
-- Put it in ReplicatedStorage/Controllers. Every method below is optional; delete the ones you don't use.
local _SNIPPET_Controller = {}

export type _SNIPPET_Controller = typeof(_SNIPPET_Controller)

-- Runs first, one module at a time. Set up this module's own state here.
-- Don't wait for other modules here (they may not have run Init yet); use Start for that.
function _SNIPPET_Controller.Init(self: _SNIPPET_Controller) end

-- Runs after every module's Init has finished. Safe to use other modules here.
-- Waiting here is fine for a few seconds (StartTimeout is 15s); it doesn't hold up other modules.
function _SNIPPET_Controller.Start(self: _SNIPPET_Controller) end

---- Runs for the local player's current character, then every time it respawns
--function _SNIPPET_Controller.OnCharacterAdded(self: _SNIPPET_Controller, character: Model)
--
--end

---- Runs when the local player's character is being removed
--function _SNIPPET_Controller.OnCharacterRemoving(self: _SNIPPET_Controller, character: Model)
--
--end

---- Runs when the local player's Humanoid dies
--function _SNIPPET_Controller.OnDied(self: _SNIPPET_Controller)
--
--end

---- Runs every frame before it renders (camera, UI that follows things)
--function _SNIPPET_Controller.OnRenderStepped(self: _SNIPPET_Controller, dt: number)
--
--end

---- Runs for every player already in the game (the local player too), then for every player who joins
--function _SNIPPET_Controller.OnPlayerAdded(self: _SNIPPET_Controller, player: Player)
--
--end

---- Runs when a player is leaving the game
--function _SNIPPET_Controller.OnPlayerRemoving(self: _SNIPPET_Controller, player: Player)
--
--end

---- Runs exactly 60 times a second, however fast the frames are
--function _SNIPPET_Controller.Step(self: _SNIPPET_Controller, dt: number)
--
--end

---- Runs every RunService.Heartbeat
--function _SNIPPET_Controller.OnHeartbeat(self: _SNIPPET_Controller, dt: number)
--
--end

return _SNIPPET_Controller
