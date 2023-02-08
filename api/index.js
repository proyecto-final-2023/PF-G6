const server = require('./src/app');
const {sequelize} = require ('./src/db')

const PORT = process.env.PORT || 3001;


server.listen(PORT, () => {
    sequelize.sync();
    console.log(`listening at ${PORT}`); 
});