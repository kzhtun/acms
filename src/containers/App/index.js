import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import {LocaleProvider} from "antd";
import {IntlProvider} from "react-intl";

import AppLocale from "lngProvider";
import MainApp from "./MainApp";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import {setInitUrl} from "appRedux/actions/Auth";
import {LAYOUT_TYPE_BOXED, LAYOUT_TYPE_FRAMED, LAYOUT_TYPE_FULL} from "constants/ThemeSetting";

const RestrictedRoute = ({component: Component, ...rest, authUser}) =>
  <Route
    {...rest}
    render={props =>
      authUser
        ? <Component {...props} />
        : <Redirect
        to={{
          pathname: '/signin',
          state: {from: props.location}
        }}
      />}
  />;


class App extends Component {

  componentWillMount() {
    if (this.props.initURL === '') {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
  }

  setLayoutType = (layoutType) => {
    if (layoutType === LAYOUT_TYPE_FULL) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('full-layout');
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
      document.body.classList.remove('full-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('boxed-layout');
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('full-layout');
      document.body.classList.add('framed-layout');
    }
  };

  render() {
    const {match, location, layoutType, locale, authUser, initURL} = this.props;

    if (location.pathname === '/') {
      if (authUser === null) {
        return ( <Redirect to={'/signin'}/> );
      } else if (initURL === '' || initURL === '/' || initURL === '/signin') {
        return ( <Redirect to={'/main/dashboard/crm'}/> );
      } else {
        return ( <Redirect to={initURL}/> );
      }
    }
    this.setLayoutType(layoutType);

    const currentAppLocale = AppLocale[locale.locale];
    return (
      <LocaleProvider locale={currentAppLocale.antd}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}>

          <Switch>
            <Route exact path='/signin' component={SignIn}/>
            <Route exact path='/signup' component={SignUp}/>
            <RestrictedRoute path={`${match.url}`} authUser={authUser}
                             component={MainApp}/>
          </Switch>
        </IntlProvider>
      </LocaleProvider>
    )
  }


}

const mapStateToProps = ({settings, auth}) => {
  const {locale, layoutType} = settings;
  const {authUser, initURL} = auth;
  return {locale, layoutType, authUser, initURL}
};
export default connect(mapStateToProps, {setInitUrl})(App);
