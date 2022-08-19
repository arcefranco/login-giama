import { createHash} from "crypto";
const getRandomValues = require('get-random-values')


export const createPass =  (password) => {

const generateNewSalt = () => {
let buffer = new Buffer.alloc(31)
buffer = getRandomValues(buffer)
return buffer.toString('base64')
}

const newSalt = generateNewSalt()
console.log(newSalt)
const pwdsalt = password + newSalt

const storedSaltBytes = new Buffer.from(pwdsalt, 'utf-8');
var sha256 = createHash("sha256");
sha256.update(storedSaltBytes, "utf8");
var result = sha256.digest("base64");

return {passHashed: result, newSalt: newSalt}

}

