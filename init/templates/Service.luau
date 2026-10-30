--!strict
-- A Service: game logic that Init loads and starts for you. Name it <Something>Service.
-- Server-only: ServerScriptService/Services. Shared (runs on server AND client): ReplicatedStorage/Services.
-- Every method below is optional; delete the ones you don't use.
local _SNIPPET_Service = {}

export type _SNIPPET_Service = typeof(_SNIPPET_Service)

-- Runs first, one module at a time. Set up this module's own state here.
-- Don't wait for other modules here (they may not have run Init yet); use Start for that.
function _SNIPPET_Service.Init(self: _SNIPPET_Service) end

-- Runs after every module's Init has finished. Safe to use other modules here.
-- Waiting here is fine for a few seconds (StartTimeout is 15s); it doesn't hold up other modules.
function _SNIPPET_Service.Start(self: _SNIPPET_Service) end

---- Runs for every player already in the game, then for every player who joins
--function _SNIPPET_Service.OnPlayerAdded(self: _SNIPPET_Service, player: Player)
--
--end

---- Runs when a player is leaving the game
--function _SNIPPET_Service.OnPlayerRemoving(self: _SNIPPET_Service, player: Player)
--
--end

---- Runs exactly 60 times a second, however fast the frames are (good for game ticks)
--function _SNIPPET_Service.Step(self: _SNIPPET_Service, dt: number)
--
--end

---- Runs every RunService.Heartbeat
--function _SNIPPET_Service.OnHeartbeat(self: _SNIPPET_Service, dt: number)
--
--end

---- Runs every RunService.Stepped (before physics)
--function _SNIPPET_Service.OnStepped(self: _SNIPPET_Service, time: number, dt: number)
--
--end

return _SNIPPET_Service
