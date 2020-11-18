const Sequelize = require('sequelize')

const sequelize = new Sequelize('zambonContabilidade', 'root','',{ 
    host:'localhost:8080',
    dialect:'mysql'
})

module.exports = {
    Sequelize:Sequelize,
    sequelize:sequelize,
}