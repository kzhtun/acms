import React, {Component} from "react";
import {connect} from "react-redux";
import {Avatar, Popover} from "antd";
import {userSignOut} from "appRedux/actions/Auth";

class UserInfo extends Component {

  render() {
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li>My Account</li>
        <li>Connections</li>
        <li onClick={() => this.props.userSignOut()}>Logout
        </li>
      </ul>
    );

    return (
      <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
        <Avatar src="http://via.placeholder.com/150x150"
                className="gx-size-50 gx-pointer" alt=""/>
      </Popover>
    )

  }
}

export default connect(null, {userSignOut})(UserInfo);
