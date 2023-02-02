import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/authContext/AuthContext";

import {
  UserProfile,
  UserImg,
  Texto,
  BackgroundColour,
  TextArea,
  ProfileTableStyle,
  Main,
} from "../ui";

export const ProfilePage = () => {
  const { login, authState } = useContext(AuthContext);
  const { isLogged, user } = authState;

  return (
    <>
      <Main className="main">
        <BackgroundColour>
          <UserProfile>
            <div className="image">
              <UserImg
                src={
                  user.picture
                    ? user.picture
                    : "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"
                }
              />
              <button className="bt-ed">
                <Link to="/editProfile">
                  <Texto>Edit Profile</Texto>
                </Link>
              </button>
            </div>
          </UserProfile>
          <ProfileTableStyle>
            <div>
              <label className="line">Username:</label>
              <TextArea> {user?.userName}</TextArea>
            </div>
            <div>
              <label className="line">Name:</label>
              <TextArea> {user?.firstName}</TextArea>
            </div>
            <div>
              <label className="line">First Name:</label>
              <TextArea> {user?.lastName}</TextArea>
            </div>
            <div>
              <label className="line">Email:</label>
              <TextArea> {user?.email}</TextArea>
            </div>
          </ProfileTableStyle>
        </BackgroundColour>
      </Main>
    </>
  );
};
