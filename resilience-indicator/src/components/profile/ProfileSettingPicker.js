import AccountSetting from './settings/AccountSetting';
import FeedbackSetting from './settings/FeedbackSetting';
import NotificationSetting from './settings/NotificationSetting';
import PasswordSetting from './settings/PasswordSetting';
import PrivacySetting from './settings/PrivacySetting';

const ProfileSettingPicker = function ProfileSettingPickerFunc({ setting }) {
  if (setting === 'Notifications') {
    return <NotificationSetting />;
  }
  if (setting === 'Password') {
    return <PasswordSetting />;
  }
  if (setting === 'Feedback') {
    return <FeedbackSetting />;
  }
  if (setting === 'Privacy') {
    return <PrivacySetting />;
  }

  // default to account settings
  return <AccountSetting />;
};

export default ProfileSettingPicker;
