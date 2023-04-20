import { createHash } from "crypto";

export const verifyPass = (pwdsalt) => {
    
    const storedSaltBytes = new Buffer.from(pwdsalt, 'utf-8');
    var sha256 = createHash("sha256");
    sha256.update(storedSaltBytes, "utf8");
    var result = sha256.digest("base64");
     
    return result

}
