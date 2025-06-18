require('reflect-metadata')
const {DataSource} = require('typeorm')
const { UserTask } = require('../models/Task')
const {PGHOST,PGDATABASE,PGUSER,PGPASSWORD} = process.env

const AppDataSource = new DataSource({
    type:'postgres',
    host: PGHOST,
    port:5432,
    username:PGUSER,
    password:PGPASSWORD,
    database:PGDATABASE,
    synchronize:true,
    ssl:true,
    entities:{UserTask}
})

const connectedDB = async () => {
    try {
        await AppDataSource.initialize()
        console.log('PostgreSQL connected via typeORM')
    } catch (error) {
        console.log('Error to connect postgres!!',error)
        process.exit(100)
    }
}

module.exports = {connectedDB,AppDataSource}