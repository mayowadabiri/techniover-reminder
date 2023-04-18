import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import db from 'db';

interface IReminderDoc {
  user: number;
  description: string;
  date: Date;
  id: number;
}
interface ReminderDocumentCreationAttribute
  extends Optional<IReminderDoc, 'id'> {}

class Reminder
  extends Model<IReminderDoc, ReminderDocumentCreationAttribute>
  implements IReminderDoc
{
  public id!: number;
  public user!: number;
  public description!: string;
  public date!: Date;
}

Reminder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: db,
    modelName: 'Reminders',
    name: {
      singular: 'ReminderDoc',
      plural: 'ReminderDocs',
    },
    tableName: 'ReminderDocs',
  }
);

export default Reminder;
