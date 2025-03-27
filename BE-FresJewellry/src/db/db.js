import { Sequelize } from "sequelize";

const sequelize = new Sequelize("fres_jewellry", "root", "", {
  host: process.env.DB_HOST || "localhost",
  dialect: "mysql",
  logging: false, // Matikan logging query di console
});

export default sequelize;
