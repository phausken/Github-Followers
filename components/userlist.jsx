import React from "react";

class UserList extends React.Component {
  render() {
    const users = this.props.users.map(user => {
      return <img src={user} />;
    });

    return <div className="userlist">{users}</div>;
  }
}

export default UserList;
