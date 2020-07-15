// SPDX-FileCopyrightText: 2020 Naoyuki Kanezawa <naoyuki.kanezawa@gmail.com>
//
// SPDX-License-Identifier: MIT

var util = require('util');
var crypto = require('crypto');
var PassThrough = require('stream').PassThrough;

module.exports = Checksum;

util.inherits(Checksum, PassThrough);

function Checksum(options) {
  PassThrough.call(this, options);
  this.hash = crypto.createHash('sha1');
  this.resume();
}

Checksum.prototype._write = function(chunk, encoding, callback) {
  this.hash.update(chunk, encoding);
  PassThrough.prototype._write.call(this, chunk, encoding, callback);
};

Checksum.prototype.digest = function() {
  return this.hash.digest('hex');
};
