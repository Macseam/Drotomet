import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

import { bindActionCreators } from 'redux';
import * as authActions from '../redux/actions/authActions';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);

    this.actions = authActions;

    this.state = {
      tokenData: null,
    };
  }

  componentWillMount() {
    this.actions.getHeaderAuthToken();
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.booksState.authToken !== this.state.tokenData &&
      nextProps.booksState.loaded)) {
      this.setState({
        tokenData: nextProps.booksState.authToken,
      });
    }
  }

  render() {
    return (
      <div className="entry_form_container">

        <div className="entry_form_window">

          <form className="entry_form">

            <div className="logo"></div>

            <input type="hidden" name="_csrf" value={this.state.tokenData || 'noData'} />

            <label htmlFor="entry_name">Имя пользователя:</label>
            <span className="error_empty">Заполните поле, поручик Голицын</span>

            <input type="text" id="entry_name" name="userName" />

            <label htmlFor="entry_password">Пароль:</label>
            <span className="error_empty">Корнет Оболенскый, введите пароль</span>

            <input type="password" id="entry_password" name="userPassword" />

            <input id="entry_submit" type="submit" value="Войти" name="entry_submit" />

            <div className="entry_confirmation">Спасибо! У вас всё получилось!</div>

          </form>

        </div>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators({
      ... authActions,
    }, dispatch),
  };
}

export default connect(state => state, mapDispatchToProps)(LoginPage);
