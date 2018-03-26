import React from "react";

class Header extends React.Component {
  //Conditional rendering -- username will be true only on a successful
  //user 'get'. Otherwise, it's an empty div
  render() {
    const username = this.props.username;

    return (
      <div className="header">
        {username && (
          <h3>
            Number of Followers:{" "}
            <span className="numFollow">{this.props.numFollow}</span>
          </h3>
        )}
        {username && (
          <h3>
            Currently Displaying:{" "}
            <span className="numFollow">{this.props.currentDisplay}</span>
          </h3>
        )}
      </div>
    );
  }
}

export default Header;
