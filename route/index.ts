import express from 'express';
import { addReminder, getReminder, getReminders } from 'controller';
import { createSchema, genericValidation } from 'utils/validation';

const router = express.Router();

router.post('/reminders', genericValidation(createSchema), addReminder);
router.get('/reminders', getReminders);
router.get('/reminder/:id', getReminder);

export default router;
