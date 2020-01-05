const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});
sequelize.authenticate().then(
    function(){
        console.log('Connected to locker server!');
    },
    function(err){
        console.error(err);
    }
);
module.exports = sequelize;
