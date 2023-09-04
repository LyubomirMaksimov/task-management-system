import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationMessage from "./NotificationMessage";
import { removeNotification } from "../../features/notificationSlice";
import { RootState } from "../../app/Store";
import style from "./NotificationsList.module.css";

interface Notification {
  id: number;
  message: string;
  type: string;
}

const NotificationsList: React.FC = () => {
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );
  const dispatch = useDispatch();

  const onClickHandler = (notif: Notification) => {
    dispatch(removeNotification(notif.id));
  };

  useEffect(() => {
    if (notifications.length < 1) return;
    setTimeout(() => {
      dispatch(removeNotification(notifications[notifications.length - 1].id));
    }, 7500);
  }, [notifications, dispatch]);

  if (notifications.length < 1) return null;

  return (
    <section className={style.container}>
      {notifications.map((notif) => (
        <NotificationMessage
          notifMessage={notif.message}
          notifType={notif.type}
          key={notif.id}
          onClickHandler={() => onClickHandler(notif)}
        />
      ))}
    </section>
  );
};

export default NotificationsList;
