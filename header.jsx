import React from 'react';

class Header extends React.Component {

  render(){
    const username = this.props.username;

    return(
    <div className="header">
      { username && <h3>Number of Followers: <span className="numFollow">{ this.props.numFollow }</span></h3>}
      { username && <h3>Currently Displaying: <span className="numFollow">{ this.props.currentDisplay }</span></h3>   }
    </div>
    );
  }


}

export default Header;
