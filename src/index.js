import express from "express";
import  db  from "./database";

const app = express();
db.sequelize; 

app.listen(3001, () => {
    console.log(`Our app is running on port 3001`);
});

