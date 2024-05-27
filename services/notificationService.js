import { Notification } from "../models/notification.js";

export const createNotification = async (user_id, message) => {
  try {
    const notification = await Notification.create({
      user_id,
      message,
    });
    return notification;
  } catch (error) {
    throw new Error(error.message);
  }
};
