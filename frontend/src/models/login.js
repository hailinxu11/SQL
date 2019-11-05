import {routerRedux} from 'dva/router';
import {stringify} from 'querystring';
import {fakeAccountLogin, getFakeCaptcha} from '@/services/login';
import {setAuthority} from '@/utils/authority';
import {getPageQuery} from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: undefined
  },
  effects: {
    *login({payload}, {call, put}) {
      const response = yield call(fakeAccountLogin, payload);
      // if (response.data == null) {
      //   response.data = { username: payload.username, token: '0000001' }
      // }
      response.type = payload.type;
      yield put({
        type: 'changeLoginStatus',
        payload: response
      }); // Login successfully
      if(response.code === 200) {
        const currentUser = {name: response.number, token: response.token};
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let {redirect} = params;
        if(redirect) {
          const redirectUrlParams = new URL(redirect);

          if(redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if(redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
          }
        }

        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({payload}, {call}) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, {put}) {
      const {redirect} = getPageQuery(); // redirect
      if(window.location.pathname !== '/user/login' && !redirect) {
        localStorage.clear();
        yield put(routerRedux.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href
          })
        }),);
      }
    }
  },
  reducers: {
    changeLoginStatus(state, {payload}) {
      setAuthority(payload.number);
      return {...state, status: payload.code, type: payload.type};
    }
  }
};
export default Model;
