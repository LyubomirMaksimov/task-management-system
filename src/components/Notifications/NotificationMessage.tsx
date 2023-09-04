// NotificationMessage.tsx

import React, { memo } from "react";
import style from "./NotificationMessage.module.css";

interface NotificationMessageProps {
  notifMessage: string;
  notifType: string;
  onClickHandler: () => void;
}

const NotificationMessage: React.FC<NotificationMessageProps> = ({
  notifMessage,
  notifType,
  onClickHandler,
}) => {
  return (
    <article
      className={`${style.notification} ${style[notifType]}`}
      onClick={onClickHandler}
    >
      <h1 className={style.message}>{notifMessage}</h1>
    </article>
  );
};

export default memo(NotificationMessage);
