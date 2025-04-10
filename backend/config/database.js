import {Sequelize}  from 'sequelize';

const db = new Sequelize('dailynotes','root','',{
    host: '34.72.3.159',
    dialect: 'mysql'
});

export default db;