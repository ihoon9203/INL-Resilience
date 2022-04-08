import React from 'react';

const PasswordResetExpiryPage = function PasswordResetExpiryPageFunc() {
  return (
    <div style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: 300,
      paddingBottom: 300,
      justifyContent: 'center',
      textAlign: 'center',
    }}
    >
      <h1>Password reset token is invalid or has expired</h1>
    </div>

  );
};

export default PasswordResetExpiryPage;
