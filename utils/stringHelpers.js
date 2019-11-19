const crypto = require('crypto')

const generateRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex')
        .slice(0, length)
}

const sha512 = (string, salt) => {
    let hash = crypto.createHmac('sha512', salt)
    hash.update(string)

    let value = hash.digest('hex')
    return value;
}

module.exports = {
    generateRandomString,
    sha512
}