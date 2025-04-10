import {Sequelize}  from 'sequelize';

const db = new Sequelize('dailynotes','root','stecu',{
    host: '34.67.239.228',
    dialect: 'mysql'
});

export default db;
