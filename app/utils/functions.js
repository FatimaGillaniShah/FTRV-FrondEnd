import { toast } from 'react-toastify';

export function ShowToast(
  id = 'random',
  message = 'Testing',
  type = 'success'
) {
  switch (type) {
    case 'success':
      if (!toast.isActive(id)) {
        toast.success(message, {
          position: 'bottom-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: id,
        });
      }
      break;

    case 'error':
      if (!toast.isActive(id)) {
        toast.error(message, {
          position: 'bottom-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: id,
        });
      }
      break;
    case 'warning':
      if (!toast.isActive(id)) {
        toast.warning(message, {
          position: 'bottom-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: id,
        });
      }

      break;

    case 'dark':
      if (!toast.isActive(id)) {
        toast.dark(message, {
          position: 'bottom-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: id,
        });
      }
      break;
    case 'info':
      if (!toast.isActive(id)) {
        toast.info(message, {
          position: 'bottom-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: id,
        });
      }
      break;
    default:
      if (!toast.isActive(id)) {
        toast.info(message, {
          position: 'bottom-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: id,
        });
      }
      break;
  }
}
