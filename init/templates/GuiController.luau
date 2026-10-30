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
