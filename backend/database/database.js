import { Sequelize } from "sequelize";

const db = new Sequelize( "auth_db", "root", "", {
	host: "localhost",
	dialect: "mysql",
	port: 3310
});

export default db;