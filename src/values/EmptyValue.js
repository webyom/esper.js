'use strict';

const Value = require('../Value');
const BridgeValue = require('./BridgeValue');
const CompletionRecord = require('../CompletionRecord');

class EmptyValue extends Value {
	constructor() {
		super(null);
	}

	get truthy() { return false; }

	*not() { return Value.fromNative(true); }

	*doubleEquals(other) {
		if ( other instanceof EmptyValue ) return Value.true;
		else if ( other instanceof BridgeValue ) return this.fromNative(this.toNative() == other.toNative());
		else return Value.false;
	}

	*observableProperties() {
		return;
	}

	*instanceOf() {
		return Value.false;
	}

	/**
	 * @param {String} name
	 * @param {Realm} realm
	 * @returns {CompletionRecord} Indexing empty values is a type error.
	 */
	*get(name, realm) {
		let err = 'Cannot read property \'' + name + '\' of ' + this.specTypeName;
		return CompletionRecord.makeTypeError(realm, err);
	}

}

module.exports = EmptyValue;
