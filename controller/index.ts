import { RequestHandler } from 'express';
import * as Reminder from 'service';

export const addReminder: RequestHandler = async (req, res, next) => {
  try {
    const reminder = await Reminder.addReminder(req.body);
    return res.status(201).json({
      data: reminder,
    });
  } catch (error) {
    next(error);
  }
};

export const getReminders: RequestHandler = async (req, res, next) => {
  try {
    const reminders = await Reminder.getReminders(req.query);
    return res.status(200).json({ data: reminders });
  } catch (error) {
    next(error);
  }
};

export const getReminder: RequestHandler = async (req, res, next) => {
  try {
    const reminder = await Reminder.getReminder(req.params.id);
    return res.status(200).json({ data: reminder });
  } catch (error) {
    next(error);
  }
};
