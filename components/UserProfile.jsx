import React from "react";

class UserProfile extends React.Component {
  render() {
    const name = this.props.name;
    const username = this.props.username;
    const avatar = this.props.avatar;
    const bio = this.props.bio;

    return (
      <div className="user-info">
        {username && <img src={avatar} />}
        <h1>{name}</h1>
        <h2>{username}</h2>
        <div className="bio">{bio}</div>
      </div>
    );
  }
}

export default UserProfile;
