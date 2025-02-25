import { DataTypes, Model, QueryInterface } from "sequelize"

type MatchModel = {
  id: number,
	homeTeamId: number,
	homeTeamGoals: number,
	awayTeamId: number,
	awayTeamGoals: number,
	inProgress: boolean,
}

export default {
	up(queryInterface: QueryInterface) {
		return queryInterface.createTable<Model<MatchModel>>('matches', {
			id: {
				type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
			},
			homeTeamId: {
				type: DataTypes.INTEGER,
        allowNull: false,
				field: 'home_team_id' ,
				references: {
					model: 'teams',
					key: 'id'
				}
			},
			homeTeamGoals: {
				type: DataTypes.INTEGER,
				allowNull: false,
				field: 'home_team_goals',
			},
			awayTeamId: {
				type: DataTypes.INTEGER,
        allowNull: false,
				field: 'away_team_id',
				references: {
					model: 'teams',
					key: 'id'
				}
			},
			awayTeamGoals: {
				type: DataTypes.INTEGER,
				allowNull: false,
				field: 'away_team_goals',
			},
			inProgress: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				field: 'in_progress',
				defaultValue: true,
			}
		})
	},
	down(queryInterface: QueryInterface) {
		return queryInterface.dropTable('matches')
	},
}