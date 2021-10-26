import React from 'react';
import { useGoogleLogout } from 'react-google-login';

const clientId = "google_client_id"

  

function Logout() {
  const onLogoutSuccess = (res) => {
    console.log('Logged out Success');
    alert('Logged out Successfully ✌');
  };

  const onFailure = () => {
    console.log('Handle failure cases');
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <button onClick={signOut} className="button">
      <span className="buttonText">Sign out</span>
    </button>
  );
}

export default Logout;