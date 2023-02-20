require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });
// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => {
  model(sequelize);
});
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);
const {
  Activity,
  Aliments,
  Certificates,
  Data,
  Logueo,
  Membership,
  Plan,
  PlanTrainee,
  PlanTrainer,
  SocialNetworks,
  Tiempo,
  Trainee,
  Trainer,
  User,
  Voucher,
} = sequelize.models;

// User 1 a 1 con Login
User.hasOne(Logueo, {as:"Logueo"});
Logueo.belongsTo(User);
// Membership 1 A 1 con Voucher
Membership.hasOne(Voucher);
Voucher.belongsTo(Membership);
// Membership de muchos a 1 con PlanTrainer
Membership.belongsTo(PlanTrainer);
// Membership de muchos a 1 con PlanTrainee
Membership.belongsTo(PlanTrainee);
// PlanTrainer de 1 a muchos con Trainer
PlanTrainer.belongsTo(Trainer);
Trainer.hasMany(PlanTrainer);
// Trainer de uno a muchos con PlanTrainee
Trainer.hasMany(PlanTrainee);
PlanTrainee.belongsTo(Trainer);
// Trainer de uno a muchos con SolcialNetworks
Trainer.belongsToMany(SocialNetworks, { through: "TrainerSocialNetworks" });
SocialNetworks.belongsToMany(Trainer, { through: "TrainerSocialNetworks" });
// Trainer de uno a muchos con Certificates
Trainer.hasMany(Certificates);
Certificates.belongsTo(Trainer);
// PlanTrainee de 1 a muchos con Trainee
PlanTrainee.hasMany(Trainee);
Trainee.belongsTo(PlanTrainee);
// Trainee de uno a uno con Data
Trainee.hasOne(Data);
Data.belongsTo(Trainee);
// Trainee de 1 a 1 con Plan
Trainee.hasOne(Plan);
Plan.belongsTo(Trainee);
// Plan de muchos a muchos con Aliments
Plan.belongsToMany(Aliments, { through: "PlanAliments" });
Aliments.belongsToMany(Plan, { through: "PlanAliments" });
// Plan de muchos a muchos con Activities
Plan.belongsToMany(Activity, { through: "PlanActivity" });
Activity.belongsToMany(Plan, { through: "PlanActivity" });
// PlanTrainer 1 a 1 con Tiempo
PlanTrainer.hasOne(Tiempo);
Tiempo.belongsTo(PlanTrainer);
// PlanTrainee 1 a 1 con Tiempo
PlanTrainee.hasOne(Tiempo);
Tiempo.belongsTo(PlanTrainee);
// PlanTrainer 1 a 1 con Plan
PlanTrainer.belongsTo(Plan);
Plan.hasOne(PlanTrainer);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
