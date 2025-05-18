import { Sequelize } from "sequelize";
import db from "../config/database.js";

const user = db.define('user', {
    email : Sequelize.STRING,
    username : Sequelize.STRING,
    password : Sequelize.STRING,
    refresh_token : Sequelize.TEXT,
},{
    freezeTableName:true
});

db.sync().then(() => {  
    console.log('User table created successfully!');
});

export default user;