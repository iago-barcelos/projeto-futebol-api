import { DataTypes, Model, QueryInterface } from "sequelize"

type UserModel = {
  id: number,
	username: string,
	role: string,
	email: string,
	password: string,
}

export default {
	up(queryInterface: QueryInterface) {
		return queryInterface.createTable<Model<UserModel>>('users', {
			id: {
				type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			role: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		})
	},
	down(queryInterface: QueryInterface) {
		return queryInterface.dropTable('users');
	},
}