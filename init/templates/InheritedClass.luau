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
