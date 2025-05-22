import {Sequelize} from "sequelize";
import db from "../database/database.js";

const {DataTypes} = Sequelize;

const User = db.define("users", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			isEmail: true,
		}
	},
	gender: {
		type: DataTypes.STRING,
		allowNull: false, //validasi jangan biarkan kosong
		validate: {
			isIn: [['male', 'female']]
		}
	},
}, {
	freezeTableName: true,
}); //usefreezeTableName to not allow Sequelize change table name in database

export default User;

(async () => {
	await db.sync();
})(); //generate table in database mysql if nothing found



