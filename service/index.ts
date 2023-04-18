import { format } from 'date-fns';
import Reminder from 'models/reminder';
import { Op } from 'sequelize';
import { NotFoundError } from 'utils/error';

interface IReminder {
  user: number;
  description: string;
  date: Date;
}
export const addReminder = async (data: IReminder): Promise<Reminder> => {
  const reminder = await Reminder.create({
    ...data,
  });
  return reminder;
};

export const getReminders = async (query: any): Promise<Reminder[]> => {
  let data: { [key: string]: any } = {};
  if (query.user) {
    data['user'] = query.user;
  }
  if (query.after) {
    data = {
      ...data,
      date: {
        [Op.gte]: format(new Date(Number(query.after)), 'yyyy-MM-dd HH:mm:ss'),
      },
    };
  }
  const reminders = await Reminder.findAll({
    where: {
      ...data,
    },
    order: ['id'],
  });
  return reminders;
};

export const getReminder = async (id: string): Promise<Reminder> => {
  const reminder = await Reminder.findByPk(id);
  if (!reminder) {
    throw new NotFoundError('ID not found');
  }
  return reminder;
};
