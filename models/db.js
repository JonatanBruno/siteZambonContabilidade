const Sequelize = require('sequelize')

const sequelize = new Sequelize('zambonContabilidade', 'root','',{ 
    host:'localhost',
    dialect:'mysql'
})

module.exports = {
    Sequelize:Sequelize,
    sequelize:sequelize,
}