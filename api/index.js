const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const PORT = process.env.PORT || 4000;

// Syncing all the models at once.
conn.sync({ Alter: true}).then(() => {
  server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});
