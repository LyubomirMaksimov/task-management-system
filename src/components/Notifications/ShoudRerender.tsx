// shouldRerender.ts

interface NotificationMessageProps {
  notifMessage?: string;
  notifType?: string;
}

const shouldRerender = (
  prevProps: NotificationMessageProps,
  nextProps: NotificationMessageProps
) => prevProps?.notifMessage === nextProps?.notifMessage;

export default shouldRerender;
