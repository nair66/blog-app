const  {scrypt, randomBytes} = require('crypto')

async function toHash(password){
    const salt = randomBytes(8).toString('hex')

    const buff = await new Promise((resolve, reject) => {
        scrypt(password, salt, 64, (err, derivedKey) => {
            if(err){
                reject(err)
            }
            resolve(derivedKey)
        }) 
    })
    return `${buff.toString('hex')}.${salt}`
}

async function comparePassword(storedPassword, password){
    const [hashedPassword, salt] = storedPassword.split('.')
    const buff = await new Promise((resolve, reject) => {
        scrypt(password, salt, 64, (err, derivedKey) => {
            if(err){
                reject(err)
            }
            resolve(derivedKey)
        }) 
    })

    return hashedPassword === buff.toString('hex')
}


module.exports = {
    toHash, comparePassword
}