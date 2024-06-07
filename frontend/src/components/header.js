import React, { useEffect, useState } from "react";

import { getUserAuthInfo, removeUserAuthInfo } from "./userAuth";
import Avatar from "react-nice-avatar";

function Header() {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const userInfo = getUserAuthInfo();
    if (userInfo) {
      setUserData(JSON.parse(userInfo));
    }
  }, []);

  const handleLogout = () => {
    removeUserAuthInfo();
    window.location.href = "/login";
  };
  return (
    <nav role="navbar">
      <div>
        <h1 aria-label="nav-title">TODO</h1>
      </div>
      {userData && (
        <div className="profile-info">
          <div className="avatar">
            <p aria-label="profile-name">
              {userData.user.fullName === ""
                ? userData.user.email
                : userData.user.fullName}
            </p>

            <Avatar
              style={{ width: "50px", height: "50px" }}
              {...userData.user.avatar}
              className="avatar-icon"
              aria-label="profile-icon"
            />
          </div>
          <div>
            <button
              className="logout-btn"
              onClick={handleLogout}
              aria-label="logout"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
