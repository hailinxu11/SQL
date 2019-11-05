import {queryCurrent, query as queryUsers} from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {}
  },
  effects: {
    *fetch(_, {call, put}) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response
      });
    },

    *fetchCurrent(_, {call, put}) {
      // const response = yield call(queryCurrent);
      // console.log(response);
      const response = JSON.parse(localStorage.getItem('currentUser'));
      yield put({
        type: 'saveCurrentUser',
        payload: response
      });
    }
  },
  reducers: {
    saveCurrentUser(state, action) {
      const currentUser = action.payload;
      currentUser.avatar = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
      return {...state, currentUser: action.payload || {}};
    },

    changeNotifyCount(state = {
      currentUser: {}
    },
                      action,) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount
        }
      };
    }
  }
};
export default UserModel;
