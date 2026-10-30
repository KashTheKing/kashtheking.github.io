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
