import { toast } from 'react-toastify';

export const notify = (text, type, theme) => {
    if (type === 'success') {
        toast.success(text, theme)
    } else {
        toast.error(text, theme)
    }
};