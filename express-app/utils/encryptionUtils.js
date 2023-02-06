const SHA256 = require('crypto-js/sha256');

function hash(str){
    const hashDigest = SHA256(str)
    return hashDigest.toString();
}

module.exports = {
    hash: hash,
};