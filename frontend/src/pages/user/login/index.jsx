import {Alert, Checkbox} from 'antd';
import {FormattedMessage, formatMessage} from 'umi-plugin-react/locale';
import React, {Component} from 'react';
import Link from 'umi/link';
import {connect} from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';

const {Tab, UserName, Password, Mobile, Captcha, Submit} = LoginComponents;

@connect(({login, loading}) => ({
  userLogin: login,
  submitting: loading.effects['login/login']
}))
class Login extends Component {
  loginForm = undefined;

  state = {
    type: 'account',
    autoLogin: true
  };


  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked
    });
  };

  handleSubmit = (err, values) => {
    const {type} = this.state;

    if(!err) {
      const {dispatch} = this.props;
      dispatch({
        type: 'login/login',
        payload: {...values, type}
      });
    }
  };

  onTabChange = type => {
    this.setState({
      type
    });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      if(!this.loginForm) {
        return;
      }

      this.loginForm.validateFields(['mobile'], {}, async (err, values) => {
        if(err) {
          reject(err);
        } else {
          const {dispatch} = this.props;

          try {
            const success = await dispatch({
              type: 'login/getCaptcha',
              payload: values.mobile
            });
            resolve(!!success);
          } catch (error) {
            reject(error);
          }
        }
      });
    });

  renderMessage = content => (
    <Alert
      style={{
        marginBottom: 24
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const {userLogin, submitting} = this.props;
    const {status, type: loginType} = userLogin;
    const {type, autoLogin} = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          onCreate={form => {
            this.loginForm = form;
          }}
        >
          {status !== 200 &&
              loginType === 'account' &&
              !submitting &&
              this.renderMessage(formatMessage({
                id: 'user-login.login.message-invalid-credentials'
              }),)}
          <UserName
            name="number"
            placeholder={`${formatMessage({
              id: 'user-login.login.userName'
            })}: 请输入账号`}
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'user-login.userName.required'
                })
              }
            ]}
          />
          <Password
            name="password"
            placeholder={`${formatMessage({
              id: 'user-login.login.password'
            })}: 请输入密码`}
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'user-login.password.required'
                })
              }
            ]}
            onPressEnter={e => {
              e.preventDefault();
              if(this.loginForm) {
                this.loginForm.validateFields(this.handleSubmit);
              }
            }}
          />
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="user-login.login.remember-me" />
            </Checkbox>
            <a
              style={{
                float: 'right'
              }}
              href=""
            >
              <FormattedMessage id="user-login.login.forgot-password" />
            </a>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="user-login.login.login" />
          </Submit>
          <div className={styles.other}>
            <Link className={styles.register} to="/user/register">
              <FormattedMessage id="user-login.login.signup" />
            </Link>
          </div>
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
