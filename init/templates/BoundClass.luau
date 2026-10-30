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
