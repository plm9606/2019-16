import React from "react";

const LogoutButton = () => {
  return (
    <button
      className="button is-rounded is-warning"
      onClick={async () => {
        const url = `${process.env.REACT_APP_REQUEST_URL}/auth/users/logout`;
        const options = { method: "GET", credentials: "include" };
        const result = await fetch(url, options);

        if (result.ok) window.location.href = process.env.REACT_APP_CLIENT_URL;
      }}
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
