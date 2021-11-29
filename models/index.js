const User = require("./User");
const Event = require("./Event");
// const chosenEvent = require("./chosenEvent");

Event.belongsToMany(User, {
    foreignKey: "user_id",
    through: "chosenEvent"
})

User.belongsToMany(Event, {
    onDelete: "CASCADE",
    through: "chosenEvent"
})

// User.hasMany(chosenEvents, {
//     onDelete: "CASCADE"
// })

module.exports = {
    User,
    Event,
}