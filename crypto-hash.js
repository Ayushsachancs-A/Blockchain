const crpyto = require('crypto');

const cryptoHash = (...inputs) => {
    const hash = crpyto.createHash('sha256');
    hash.update(inputs.sort().join(' '));
    return hash.digest('hex');
};

module.exports = cryptoHash;