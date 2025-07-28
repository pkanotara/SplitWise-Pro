import React, { useEffect } from 'react';
import { MdCheckCircle, MdError, MdWarning, MdInfo, MdClose } from 'react-icons/md';

const Notification = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const typeConfig = {
    success: { icon: MdCheckCircle, className: 'notification-success' },
    error: { icon: MdError, className: 'notification-error' },
    warning: { icon: MdWarning, className: 'notification-warning' },
    info: { icon: MdInfo, className: 'notification-info' }
  };

  const config = typeConfig[type];
  const IconComponent = config.icon;

  return (
    <div className={`notification ${config.className}`}>
      <IconComponent className="notification-icon" />
      <span className="notification-message">{message}</span>
      <button className="notification-close" onClick={onClose}>
        <MdClose />
      </button>
    </div>
  );
};

export default Notification;
