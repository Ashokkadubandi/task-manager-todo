const {EntitySchema} = require('typeorm')

const UserTask = new EntitySchema({
    name:'Task',
    tableName:'Task',
    columns:{
        id:{
            primary:true,
            type:'uuid',
            generated:'uuid'
        },
        title:{
            type:'varchar',
            nullable:false
        },
        description:{
            type:'varchar'
        },
        status:{
            type:'enum',
            enum:['todo','in_progress','done'],
            default:'in_progress',
            nullable:false
        },
        DueDate:{
            type:'date',
            nullable:true
        },
        createdAt:{
            type:'timestamp',
            createDate:true
        },
        updatedAt:{
            type:'timestamp',
            updateDate:true
        }
    }
})

module.exports = {UserTask};