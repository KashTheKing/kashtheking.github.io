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
