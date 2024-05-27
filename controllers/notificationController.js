import Notification from "../models/notification.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { user_id: req.user.id },
    });
    res.json(notifications);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const markNotificationsAsRead = async (req, res) => {
  try {
    await Notification.update(
      { is_read: true },
      { where: { user_id: req.user.id } }
    );
    res.json({ message: "Notifications marked as read" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
