---
name: init-framework
description: Build Roblox games on KashTheKing's Init module loader (Wally package kashtheking/init, Init Framework Studio plugin). Use when a game has ReplicatedStorage.Packages.Init or InitServer/InitClient boot scripts, when the user asks to install or set up Init, or to add a Service, Controller, GuiController, Binder, Network (Packet) module, Class or Input context to a game that uses Init.
---

# Init framework

Init is a module loader for Roblox. Two boot scripts (one Script, one LocalScript) call `Init.start`
with a list of folders. Init requires every ModuleScript in them, calls each module's `Init`, then
each module's `Start`, then connects the module's hook methods (`OnPlayerAdded`, `OnHeartbeat`, ...).
Modules are plain tables; they never connect those events themselves.

Docs: https://kashtheking.com/init/ · Source: https://github.com/KashTheKing/init ·
Templates: https://kashtheking.com/init/templates/ (raw `.luau` files)

## 1. Find out how the game is set up

- **Rojo project** (a `*.project.json` and usually a `wally.toml`): edit files, install with Wally.
- **Studio only** (no project files; you may have Roblox Studio MCP tools such as `execute_luau`): create
  instances in Studio.
- **Already uses Init** if `ReplicatedStorage.Packages.Init` exists, or a Script calls `Init.start`.
  Skip to section 3.
- **Old Init** if `ReplicatedStorage.Init` is a ModuleScript with `SharedEntries`/`ServerEntries`
  children and `InitServer`/`InitClient` scripts inside it. It works; don't migrate unless asked
  (guide: https://kashtheking.com/init/docs/migrating/). Its modules use the same methods.

## 2. Install

### Rojo + Wally

1. `wally.toml`, under `[dependencies]`: `Init = "kashtheking/init@1.0.0"`, then run `wally install`.
2. The project file must map `Packages` to `ReplicatedStorage.Packages`.
3. Add the two boot scripts and the folders from the example project
   (https://github.com/KashTheKing/init/tree/main/example), mapped like `example.project.json`:
   - `ServerScriptService/InitServer.server.luau`
   - `StarterPlayer/StarterPlayerScripts/InitClient.client.luau`
   - folders: `ReplicatedStorage/{Network, Services, Controllers, Binders/Shared, Binders/Client}`,
     `ServerScriptService/{Services, Binders}`. Every folder a boot script names must exist, or the boot
     script errors. Rojo skips empty directories in git, so keep a `.gitkeep` in each or declare it in the
     project file with `"$className": "Folder"`.

### Studio only

Best for the user: install the **Init Framework** plugin
(https://create.roblox.com/store/asset/77164672536940/Init-Framework), then press **Setup** (loader, boot
scripts and folders) and **Add Packages** (Trove, Signal, Packet, Binder). Ask them to do this if you can't
click in Studio.

If you can run Luau in Studio but can't use the plugin:

1. Get `Init.rbxm` from https://github.com/KashTheKing/init/releases/latest.
2. Load it: copy it into Studio's content folder
   (`%LOCALAPPDATA%\Roblox\Versions\<version>\content\` on Windows, `RobloxStudio.app/Contents/Resources/content/`
   on macOS) and run `game:GetObjects("rbxasset://Init.rbxm")[1]` in edit mode, or ask the user to drag the
   file into Studio's Explorer.
3. Put the `Init` ModuleScript in `ReplicatedStorage.Packages` (make the folder if needed).
4. Create the boot scripts (Script `InitServer` in ServerScriptService, LocalScript `InitClient` in
   StarterPlayer.StarterPlayerScripts) with the source of the example's boot scripts, and the folders
   listed above.

## 3. Add modules

Copy the matching template, replace every `_SNIPPET_` with the name, and put it in the right folder.
The boot scripts only load names that match their predicate, so **the suffix matters**.

| You want | Template | Name | Folder |
| --- | --- | --- | --- |
| Server game logic | `Service.luau` | `ShopService` | `ServerScriptService/Services` |
| Logic on server and client | `Service.luau` | `TimeService` | `ReplicatedStorage/Services` |
| Client game logic | `Controller.luau` | `CameraController` | `ReplicatedStorage/Controllers` |
| One ScreenGui | `GuiController.luau` | `ShopGuiController` (for a ScreenGui named `Shop`) | `ReplicatedStorage/Controllers` |
| Remote events (Packet) | `Network.luau` | `ShopNetwork` | `ReplicatedStorage/Network` |
| Code per tagged instance | `Binder.luau` | `LavaBinder` | `ServerScriptService/Binders`, `ReplicatedStorage/Binders/Client` or `/Shared` |
| An object class | `Class.luau` | `Weapon` | `ReplicatedStorage/Classes` (Init does not load it) |
| A subclass | `InheritedClass.luau` | `Sword` | child of the parent class's ModuleScript |
| A class for a Binder | `BoundClass.luau` | `Lava` | next to its Binder |
| Player input | `Input.model.json` (InputContext) | `CombatInput` | `ReplicatedStorage/Input` |

Templates are at `https://kashtheking.com/init/templates/<Template>` (for example `.../templates/Service.luau`).
Network, Binder and BoundClass need packages: `Packet = "kashtheking/packet@1.0.0"`,
`Binder = "kashtheking/binder@0.6.3"`, `Trove = "sleitnick/trove@1.8.0"` (or the plugin's Add Packages).

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
  `{ Folders = { ReplicatedStorage.Systems }, Predicate = Init.matchesName("System$") }`.

## 5. Check it works

Play the game (Studio MCP: start a playtest, then read the output). The Output should show:

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
