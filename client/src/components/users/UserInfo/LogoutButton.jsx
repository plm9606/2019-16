import React from "react";
import Cookies from "js-cookie";

const LogoutButton = () => {
  return (
    <button
      className="button is-rounded is-warning"
      onClick={() => {
        Cookies.remove("access_token");
        alert("로그아웃 되었습니다.");
        window.location.href = "/";
      }}
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;