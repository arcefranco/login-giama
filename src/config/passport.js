const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
import { QueryTypes } from "sequelize";
import db from "../database";

const dbGiama = db.sequelize

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'JWT_SECRET',
  
}

const strategy = new JwtStrategy(options, async (payload, done) => {
    console.log('this is jwtstrategy payload: ', payload)
    const user = await dbGiama.query('SELECT * FROM usuarios WHERE ID = ?',
    {
      replacements: [payload.id],
      type: QueryTypes.SELECT
    }
  ).then((user) => {
    if(user) {
        return done(null, user)
    }else{
        console.log('this')
        return done(null, false)
    }
  })
  .catch((err) => {
    console.log(err)
    done(err, null)

})


})

module.exports = (passport) => {
    passport.use(strategy)
}