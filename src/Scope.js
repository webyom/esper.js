"use strict";
/* @flow */

const Variable = require("./values/Variable");

const Value = require("./Value");
const ObjectValue = require("./values/ObjectValue");

class Scope {
	constructor(env) {
		this.parent = null;
		this.object = new ObjectValue(this);
		this.strict = true;
		this.env = env;
		this.global = this;
	}

	/**
	 * @param {string} name - Identifier to retreive
	 * @returns {Value}
	 */
	get(name) {
		return this.object.get(name);
	}

	ref(name) {
		return this.object.ref(name);
	}

	add(name, value) {
		this.object.set(name,value);
	}

	/**
	 * Sets an identifier in the scope to some value.
	 * @param {string} name - Identifier to set
	 * @param {Value} value - Value to set
	 */
	set(name, value) {
		this.object.assign(name, value);
	}

	unset(name) {
		delete this.variables[name];
	}

	has(name) {
		return this.object.has(name);
	}

	/**
	 * Set the identifier in its nearest scope, or create a global.
	 */
	assign(name, value) {
		this.object.assign(name, value);
	}

	createChild() {
		let child = new Scope();
		child.object.setPrototype(this.object);
		child.parent = this;
		child.strict = this.strict;
		child.env = this.env;
		child.global = this.global;
		return child;
	}

	//TODO: This is a patch to let a scope be a variable,
	//      but we could do it better.

	toNative() { return this; }

	*member(name) { 
		let ref = this.ref(name);
		if ( ref ) return ref.value;
		return Value.undef;
	}

}

module.exports = Scope;