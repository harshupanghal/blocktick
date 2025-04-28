import { toast as reactToast } from 'react-toastify';

export const useToast = () => {
  // Function to trigger a toast message
  const toast = (message, type = 'success') => {
    switch (type) {
      case 'success':
        reactToast.success(message);
        break;
      case 'error':
        reactToast.error(message);
        break;
      case 'info':
        reactToast.info(message);
        break;
      default:
        reactToast(message);
    }
  };

  return { toast };
};
