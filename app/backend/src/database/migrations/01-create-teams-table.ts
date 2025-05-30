import { DataTypes, Model, QueryInterface } from "sequelize";

type TeamModel = {
	id: number;
  teamName: string,
}

export default {
	up(queryInterface: QueryInterface) {
		return queryInterface.createTable<Model<TeamModel>>('teams', {
			id: {
				type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
			},
			teamName: {
				type: DataTypes.STRING,
				allowNull: false,
				field: 'team_name'
			}
		})
	},
	down(queryInterface: QueryInterface) {
		return queryInterface.dropTable('teams');
	},
};