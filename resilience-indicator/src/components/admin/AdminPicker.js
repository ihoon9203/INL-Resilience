import AdminQuestion from './admin-questions/AdminQuestions';
import AdminFeedbackCategories from './admin-feedback/AdminFeedbackCategories';
import AdminFeedback from './admin-feedback/AdminFeedback';
import AdminEmailNotifications from './admin-email-notifications/AdminEmailNotifications';

const AdminPicker = function AdminPickerFunc({ pickerValue }) {
  if (pickerValue === 'Questions') {
    return <AdminQuestion />;
  }
  if (pickerValue === 'FeedbackCategories') {
    return <AdminFeedbackCategories />;
  }
  if (pickerValue === 'Feedback') {
    return <AdminFeedback />;
  }
  if (pickerValue === 'EmailNotifications') {
    return <AdminEmailNotifications />;
  }

  // default to admin feedback
  return <AdminFeedback />;
};

export default AdminPicker;
