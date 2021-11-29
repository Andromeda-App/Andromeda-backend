const sequelize = require("../config/connection");
const {User,Events} = require("../models");

const seed = async ()=>{
    await sequelize.sync({force:true})
    await User.bulkCreate([
        {
            user_name: "whitneylovesspace",
            email:"whitney@whitney.whitney",
            password:"password",
            zipCode: 90210
        },
        {
            user_name: "mple06",
            email:"mv@mv.mv",
            password:"password",
            zipCode: 91808
        },
        {
            user_name: "melysspace",
            email:"melyssa@melyssa.melyssa",
            password:"password",
            zipCode: 93043
        },
        {
            user_name: "kellystars",
            email:"kelly@kelly.kelly",
            password:"password",
            zipCode: 53083
        }
    ],{
        individualHooks:true
    })

    await Events.bulkCreate([
        {
            eventType:"meteor shower",
            dataSource:"taurid",
            image:"img.png",
        },
        {
            eventType:"aurora borealis",
            dataSource:"taurid",
            image:"img.png",
        },
        {
            eventType:"stars",
            dataSource:"taurid",
            image:"img.png",
        }
    ])
    console.log("seeded")
    process.exit(0)
}

seed();