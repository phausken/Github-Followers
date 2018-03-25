import React from 'react';

class Header extends React.Component {

  render(){
    const username = this.props.username;

    return(
    <div className="header">
      <h1>{ username }</h1>
      { username && <h3>Number of Followers: <span className="numFollow">{ this.props.numFollow }</span></h3>}
    </div>
    );
  }


}

export default Header;
