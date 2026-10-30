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
