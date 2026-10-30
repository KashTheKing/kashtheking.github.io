---
name: init-framework
description: Build Roblox games on KashTheKing's Init module loader (Wally package kashtheking/init, Init Framework Studio plugin), in a Rojo project on disk or directly in Roblox Studio. Use when a game has ReplicatedStorage.Packages.Init or InitServer/InitClient boot scripts, when the user asks to install or set up Init, or to add a Service, Controller, GuiController, Binder, Network (Packet) module, Class or Input context to a game that uses Init.
---

# Init framework

Init is a module loader for Roblox. Two boot scripts (one Script, one LocalScript) call `Init.start`
with a list of folders. Init requires every ModuleScript in them, calls each module's `Init`, then
each module's `Start`, then connects the module's hook methods (`OnPlayerAdded`, `OnHeartbeat`, ...).
Modules are plain tables; they never connect those events themselves.

Docs: https://kashtheking.com/init/ · Source: https://github.com/KashTheKing/init

**Templates** (one file per module type) are in the first of these you can read:
1. `templates/` two folders up from this skill (the Claude Code plugin and the Wally package both have it),
   e.g. `Packages/_Index/kashtheking_init@1.0.1/init/templates/` after `wally install`.
2. The **Templates** section at the end of this file, if it has one.
3. `https://kashtheking.com/init/templates/<File>`, e.g. `.../templates/Service.luau`.

## 1. Find out how the game is set up

- **Files (Rojo)**: there's a `*.project.json`, usually a `wally.toml`. Edit files; go to 2A.
- **Studio**: you have Studio tools (`execute_luau`, `multi_edit`, ...) or you are Roblox Studio's Assistant.
  Create instances; go to 2B.
- **Neither** (a chat with no tools): write the code and say exactly where each script goes. For setup,
  send the user to the plugin (2B).
- **Already uses Init** if `ReplicatedStorage.Packages.Init` exists, a `wally.toml` lists `kashtheking/init`,
  or a script calls `Init.start`. Skip to section 3.
- **Old Init** if `ReplicatedStorage.Init` is a ModuleScript with `SharedEntries`/`ServerEntries`
  children and `InitServer`/`InitClient` scripts inside it. It works; don't migrate unless asked
  (guide: https://kashtheking.com/init/docs/migrating/). Its modules use the same methods.

## 2A. Install in a Rojo project

1. In `wally.toml`, under `[dependencies]`: `Init = "kashtheking/init@1.0.1"`. No `wally.toml` yet? Run
   `wally init` first. Then `wally install`.
2. The project file must put `Packages` in `ReplicatedStorage`. If the project already maps
   ReplicatedStorage, ServerScriptService and StarterPlayerScripts to folders, keep its layout and use those
   folders below. A new project can use:

   ```json
   {
   	"name": "Game",
   	"tree": {
   		"$className": "DataModel",
   		"ReplicatedStorage": { "$path": "src/ReplicatedStorage", "Packages": { "$path": "Packages" } },
   		"ServerScriptService": { "$path": "src/ServerScriptService" },
   		"StarterPlayer": { "StarterPlayerScripts": { "$path": "src/StarterPlayerScripts" } }
   	}
   }
   ```

3. Create the boot scripts and folders (paths for the layout above):

   ```
   src/ServerScriptService/InitServer.server.luau
   src/ServerScriptService/Services/.gitkeep
   src/ServerScriptService/Binders/.gitkeep
   src/StarterPlayerScripts/InitClient.client.luau
   src/ReplicatedStorage/Network/.gitkeep
   src/ReplicatedStorage/Services/.gitkeep
   src/ReplicatedStorage/Controllers/.gitkeep
   src/ReplicatedStorage/Binders/Shared/.gitkeep
   src/ReplicatedStorage/Binders/Client/.gitkeep
   ```

   Every folder a boot script names must exist or the boot script errors. Git drops empty folders, so keep
   the `.gitkeep` files (Rojo ignores them).

`InitServer.server.luau`:

```lua
--!strict
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerScriptService = game:GetService("ServerScriptService")

local Init = require(ReplicatedStorage.Packages.Init)

Init.start({
	{ Folders = { ReplicatedStorage.Network } },
	{
		Folders = { ReplicatedStorage.Services, ServerScriptService.Services },
		Predicate = Init.matchesName("Service$"),
	},
	{ Folders = { ReplicatedStorage.Binders.Shared, ServerScriptService.Binders } },
}):andThen(function()
	workspace:SetAttribute("ServerStarted", true)
end)
```

`InitClient.client.luau`:

```lua
--!strict
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Init = require(ReplicatedStorage.Packages.Init)

Init.start({
	{ Folders = { ReplicatedStorage.Network } },
	{ Folders = { ReplicatedStorage.Services }, Predicate = Init.matchesName("Service$") },
	{ Folders = { ReplicatedStorage.Controllers }, Predicate = Init.matchesName("Controller$") },
	{ Folders = { ReplicatedStorage.Binders.Shared, ReplicatedStorage.Binders.Client } },
})
```

Rojo file names: `Name.luau` is a ModuleScript, `Name.server.luau` a Script, `Name.client.luau` a
LocalScript, a folder with `init.luau` is a ModuleScript with children, `Name.model.json` is any instance.
Attributes go in `Name.meta.json`: `{ "attributes": { "Priority": -10 } }`.

## 2B. Install in Studio

Best for the user: install the **Init Framework** plugin
(https://create.roblox.com/store/asset/77164672536940/Init-Framework), then press **Setup** (loader, boot
scripts and folders) and **Add Packages** (Trove, Signal, Packet, Binder). Ask the user to do this; you
can't click plugin buttons. Studio's Assistant can't download files, so this is its only way to install.

If you can run Luau in Studio (`execute_luau`) and read and write the user's files but the plugin isn't an
option:

1. Get `Init.rbxm` from https://github.com/KashTheKing/init/releases/latest.
2. Copy it into Studio's content folder (`%LOCALAPPDATA%\Roblox\Versions\<version>\content\` on Windows,
   `RobloxStudio.app/Contents/Resources/content/` on macOS) and run
   `game:GetObjects("rbxasset://Init.rbxm")[1]` in edit mode, or ask the user to drag the file into the
   Explorer.
3. Put the `Init` ModuleScript in `ReplicatedStorage.Packages` (make the folder if needed).
4. Create Script `InitServer` in ServerScriptService and LocalScript `InitClient` in
   StarterPlayer.StarterPlayerScripts with the boot script sources from 2A, and these Folders:
   `ReplicatedStorage.{Network, Services, Controllers, Binders.Shared, Binders.Client}`,
   `ServerScriptService.{Services, Binders}`.

## 3. Add modules

Read the template, replace every `_SNIPPET_` with the **base name** (no suffix), and save it under the full
module name. The boot scripts only load names that match their predicate, so **the suffix matters**:
`Service.luau` with `_SNIPPET_` = `Shop` gives a module named `ShopService`.

| You want | Template | `_SNIPPET_` | Module name | Goes in (Rojo file in the layout above) |
| --- | --- | --- | --- | --- |
| Server game logic | `Service.luau` | `Shop` | `ShopService` | ServerScriptService.Services (`src/ServerScriptService/Services/ShopService.luau`) |
| Logic on server and client | `Service.luau` | `Time` | `TimeService` | ReplicatedStorage.Services (`src/ReplicatedStorage/Services/TimeService.luau`) |
| Client game logic | `Controller.luau` | `Camera` | `CameraController` | ReplicatedStorage.Controllers (`src/ReplicatedStorage/Controllers/CameraController.luau`) |
| One ScreenGui | `GuiController.luau` | the ScreenGui's name, `Shop` | `ShopGuiController` | ReplicatedStorage.Controllers |
| Remote events (Packet) | `Network.luau` | `Shop` | `ShopNetwork` | ReplicatedStorage.Network |
| Code per tagged instance | `Binder.luau` | the tag, `Lava` | `LavaBinder` | ServerScriptService.Binders (server), ReplicatedStorage.Binders.Client or .Shared |
| An object class | `Class.luau` | `Weapon` | `Weapon` | ReplicatedStorage.Classes (Init doesn't load it; `require` it) |
| A subclass | `InheritedClass.luau` | `Sword` | `Sword` | child of the parent class's ModuleScript (`Classes/Weapon/init.luau` + `Classes/Weapon/Sword.luau`) |
| A class per bound instance | `BoundClass.luau` | `Lava` | `Lava` | child of its Binder (`Binders/LavaBinder/init.luau` + `Lava.luau`); the Binder does `Binder.new(require(script.Lava), { Tags = { "Lava" } })` |
| Player input | `Input.model.json` | (none) | `CombatInput` | ReplicatedStorage.Input (`src/ReplicatedStorage/Input/CombatInput.model.json`); set the Keyboard binding's `KeyCode` |

In Studio, create a ModuleScript with that name and the filled template as its `Source` (for
`Input.model.json`, create the InputContext, InputAction and InputBindings it describes).

Network, Binder and BoundClass need packages, as `ReplicatedStorage.Packages.<Name>`. Rojo: add
`Packet = "kashtheking/packet@1.0.0"`, `Binder = "kashtheking/binder@0.6.3"`, `Trove = "sleitnick/trove@1.8.0"`
to `wally.toml` and `wally install`. Studio: the plugin's **Add Packages**.

## 4. Rules that matter

- **Init**: set up the module's own state. Runs one module at a time; don't wait for other modules or
  yield for long (3 s `InitTimeout`, then the module is reported and skipped).
- **Start**: runs after every Init has finished, so other modules are ready. All Starts run at once; a Start
  that waits doesn't block the others (15 s `StartTimeout`, then Init stops waiting; the Start keeps running).
- To use another module, `require` it (from the top of the file or inside Start). It returns the same table
  Init loaded. Don't call its methods during your Init.
- Hooks (all optional): `OnPlayerAdded(player)` (also runs for players already in game),
  `OnPlayerRemoving(player)`, `Step(dt)` (fixed 60/s), `OnHeartbeat(dt)`, `OnStepped(time, dt)`; client only:
  `OnRenderStepped(dt)`, `OnCharacterAdded(character)`, `OnCharacterRemoving(character)`, `OnDied()`.
  Never connect `Players.PlayerAdded` yourself in an Init module; use the hook.
- A ModuleScript inside another ModuleScript is not loaded by Init. Put private helpers there.
- Every module must `return` exactly one value. Module names should be unique across loaded folders.
- Attributes on a ModuleScript: `Ignore = true` skips it; `Priority = <number>` loads it earlier (lower first)
  within its entry.
- Never call `Init.start` anywhere except the two boot scripts.
- To load another folder, add an entry to **both** boot scripts if it's shared:
  `{ Folders = { ReplicatedStorage.Systems }, Predicate = Init.matchesName("System$") }`, and create the folder.

## 5. Check it works

- **Rojo**: `rojo build <project>.project.json -o build.rbxl` must succeed (it catches bad file names and
  project paths). Run `selene` and `luau-lsp analyze` if the project has them. Then the user runs
  `rojo serve`, connects from Studio and presses Play; ask them for the Output.
- **Studio**: start a playtest and read the Output.

The Output should show:

```
🔲 Initializing Server
✅ Initialized 4 Server modules in 0.02s
🔲 Initializing Client
✅ Initialized 3 Client modules in 0.01s
```

Errors start with `[Init]` and name the module and method. Common ones:
- `X is not a valid member of ReplicatedStorage`: a folder named in a boot script is missing. Create it.
- `must return exactly one value`: the module has no `return` at the end.
- `X:Init() didn't finish within 3s`: Init is waiting on something; move that into Start.
- A module never runs: its name doesn't match the entry's predicate (e.g. `Shop` instead of `ShopService`),
  it's nested inside another ModuleScript, or it has the `Ignore` attribute.
- More: https://kashtheking.com/init/docs/guides/troubleshooting/

## Templates

### Binder.luau

```lua
--!strict
-- A Binder (kashtheking/binder): runs code for every instance with a tag, and cleans up when it goes away.
-- Install Trove and Binder from Wally or the plugin's "Add Packages".
-- Put it in ServerScriptService/Binders (server), ReplicatedStorage/Binders/Client (client) or
-- ReplicatedStorage/Binders/Shared (both). Init calls the binder's Start for you.
-- This example pushes every part tagged "_SNIPPET_" forward at its "Speed" attribute.
-- Binder docs: https://kashtheking.com/library/docs/packages/binder
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

local Binder = require(ReplicatedStorage.Packages.Binder)
local Trove = require(ReplicatedStorage.Packages.Trove)

-- Called for each matching instance. The trove is cleaned when the instance is unbound;
-- anything you return with a :Destroy() method is cleaned too.
local function _SNIPPET_(part: BasePart, trove: Trove.Trove, speed: number)
	trove:Connect(RunService.Heartbeat, function()
		part.AssemblyLinearVelocity = part.CFrame.LookVector * speed
	end)

	return trove
end

return Binder.new(_SNIPPET_, {
	Tags = { "_SNIPPET_" }, -- instances need one of these CollectionService tags
	ClassNames = { "BasePart" }, -- and must be one of these classes (optional)
	Ancestors = { workspace }, -- and must be inside one of these (optional)

	-- Last check (optional). Return true to bind; anything returned after true goes to the constructor.
	Predicate = function(instance: Instance)
		local speed = tonumber(instance:GetAttribute("Speed"))
		if not speed then
			warn(`[_SNIPPET_Binder] {instance:GetFullName()} needs a number "Speed" attribute`)
			return false
		end
		return true, speed
	end,
})
```

### BoundClass.luau

```lua
--!strict
-- A class for a Binder to construct, one per bound instance: Binder.new(_SNIPPET_, { Tags = { "_SNIPPET_" } }).
-- Make it a child of the Binder's ModuleScript (require(script._SNIPPET_)) so Init doesn't load it on its own.
-- The Binder cleans the trove when the instance is unbound.
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Trove = require(ReplicatedStorage.Packages.Trove)

local _SNIPPET_ = {}
_SNIPPET_.__index = _SNIPPET_

export type _SNIPPET_Properties = {
	Instance: Instance,
	Trove: Trove.Trove,
}

export type _SNIPPET_ = typeof(setmetatable({} :: _SNIPPET_Properties, _SNIPPET_))

export type ClassType = _SNIPPET_

-- Called by the Binder for each bound instance. Values your Binder's Predicate returns after `true`
-- arrive as extra parameters after the trove.
function _SNIPPET_.new(instance: Instance, trove: Trove.Trove): _SNIPPET_
	local self = setmetatable(
		{
			Instance = instance,
			Trove = trove,
		} :: _SNIPPET_Properties,
		_SNIPPET_
	)

	return self
end

-- Called by the Binder when the instance is unbound
function _SNIPPET_.Destroy(self: _SNIPPET_): () end

return _SNIPPET_
```

### Class.luau

```lua
--!strict
-- A plain class (an object you make many of with .new). Init does NOT load classes; require them yourself.
-- Put it in ReplicatedStorage/Classes (shared) or ServerScriptService/Classes (server-only).
local _SNIPPET_ = {}
_SNIPPET_.__index = _SNIPPET_

export type _SNIPPET_Properties = {}

export type _SNIPPET_ = typeof(setmetatable({} :: _SNIPPET_Properties, _SNIPPET_))

export type ClassType = _SNIPPET_

-- Creates a new _SNIPPET_
function _SNIPPET_.new(): _SNIPPET_
	local properties: _SNIPPET_Properties = {}

	local self = setmetatable(properties, _SNIPPET_)

	return self
end

-- Cleans up the _SNIPPET_
function _SNIPPET_.Destroy(self: _SNIPPET_): () end

return _SNIPPET_
```

### Controller.luau

```lua
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
```

### GuiController.luau

```lua
--!strict
-- A Controller for one ScreenGui. Name the ScreenGui in StarterGui "_SNIPPET_" (or change the name below).
-- Put it in ReplicatedStorage/Controllers. It's a normal Controller with the GUI lookup done for you.
local Players = game:GetService("Players")

local player = assert(Players.LocalPlayer, "_SNIPPET_GuiController must be required on the client")
local PlayerGui = player:WaitForChild("PlayerGui") :: PlayerGui

-- Gives you autocomplete for the ScreenGui's children (works when the ScreenGui exists in StarterGui)
export type Gui = typeof(game:GetService("StarterGui")["_SNIPPET_"])

local _SNIPPET_GuiController = {
	Gui = (nil :: any) :: Gui,
}

export type _SNIPPET_GuiController = typeof(_SNIPPET_GuiController)

-- The ScreenGui is copied into PlayerGui when the player spawns, which can take a moment, so wait for it in Start
function _SNIPPET_GuiController.Start(self: _SNIPPET_GuiController)
	self.Gui = assert(
		PlayerGui:WaitForChild("_SNIPPET_", 5) :: any,
		`[_SNIPPET_GuiController] the ScreenGui "_SNIPPET_" didn't appear in PlayerGui`
	)
end

return _SNIPPET_GuiController
```

### InheritedClass.luau

```lua
--!strict
-- A class that inherits from another class. Insert it as a child of the parent class's ModuleScript.
-- Init does NOT load classes; require them yourself.
local SuperClass = require(script.Parent)

local _SNIPPET_ = setmetatable({}, SuperClass)
_SNIPPET_.__index = _SNIPPET_

export type _SNIPPET_ = typeof(_SNIPPET_) & SuperClass.ClassType & {
	__super: SuperClass.ClassType,
}

export type ClassType = _SNIPPET_

-- Creates a new _SNIPPET_; arguments go to the parent class's .new
function _SNIPPET_.new(...: any): _SNIPPET_
	local super = SuperClass.new(...)

	local self: _SNIPPET_ = setmetatable(super :: any, _SNIPPET_) :: any
	self.__super = super

	return self
end

return _SNIPPET_
```

### Input.model.json

```json
{
	"className": "InputContext",
	"properties": {
		"Priority": 1000,
		"Sink": false
	},
	"children": [
		{
			"name": "InputAction",
			"className": "InputAction",
			"properties": {
				"Type": "Bool"
			},
			"children": [
				{ "name": "Mouse", "className": "InputBinding", "properties": { "KeyCode": "MouseLeftButton" } },
				{ "name": "Keyboard", "className": "InputBinding" },
				{ "name": "Gamepad", "className": "InputBinding", "properties": { "KeyCode": "ButtonR2" } },
				{ "name": "Touch", "className": "InputBinding" }
			]
		}
	]
}
```

### Network.luau

```lua
--!strict
-- Network packets, made with kashtheking/packet (install it from Wally or the plugin's "Add Packages").
-- Put it in ReplicatedStorage/Network. Init loads Network first on both sides, so every packet exists
-- before anything sends one. Docs: https://kashtheking.com/library/docs/packages/packet
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Packet = require(ReplicatedStorage.Packages.Packet)

return {
	-- Packet.new(name, ...types). Use exact types (Packet.NumberU8, Packet.String, ...) for smaller packets.
	_SNIPPET_ = Packet.new("_SNIPPET_", Packet.Any),
}
```

### Service.luau

```lua
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
```
