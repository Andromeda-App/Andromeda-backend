const User = require("./User");
const Events = require("./Events");
// const chosenEvents = require("./chosenEvents");

Events.belongsToMany(User, {
    foreignKey: "user_id"
})

User.hasMany(Events, {
    onDelete: "CASCADE",
    through: "chosenEvents"
})

// User.hasMany(chosenEvents, {
//     onDelete: "CASCADE"
// })

module.exports = {
    User,
    Events,
    chosenEvents
}

module.exports = { User, Events, chosenEvents }