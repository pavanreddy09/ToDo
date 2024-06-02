import React, { useEffect, useState } from "react";

import { getUserAuthInfo, removeUserAuthInfo } from "./userAuth";
import Avatar from "react-nice-avatar";
import { Tooltip } from "@mui/material";

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
    <nav>
      <div>
        <h1>TODO</h1>
      </div>
      {userData && (
        <div className="profile-info">
          <div className="avatar">
            <p>
              {userData.fullName === "" ? userData.email : userData.fullName}
            </p>

            <Avatar
              style={{ width: "50px", height: "50px" }}
              {...userData.avatar}
              className="avatar-icon"
            />
          </div>
          <div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
