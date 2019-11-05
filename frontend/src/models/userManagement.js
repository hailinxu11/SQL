import {message} from 'antd';
import {routerRedux} from 'dva/router';
import {queryUsers, save, update, deleteData, detailById} from '@/services/user';

const UserModel = {
  namespace: 'userManagement',
  state: {
    userList: [],
    detail: {
      id: '',
      name: '',
      number: ''
    }
  },
  effects: {
    *fetch({payload}, {call, put}) {
      const response = yield call(queryUsers, payload);
      yield put({
        type: 'initData',
        payload: response.detail
      });
    },
    *queryById({payload, callback}, {call, put}) { // 通过id查询
      const response = yield call(detailById, payload);
      yield put({
        type: 'datail',
        payload: response.detail
      });
    },
    *add({payload, callback}, {call, put}) { // 保存
      const response = yield call(save, payload);
      if(response.code === 200) {
        message.success(response.msg);
        yield put(routerRedux.push('/userManagement'));
      } else {
        message.error(response.msg);
      }
    },
    *updateData({payload, callback}, {call, put}) { // 保存
      const response = yield call(update, payload);
      if(response.code === 200) {
        message.success(response.msg);
        yield put(routerRedux.push('/userManagement'));
      } else {
        message.error(response.msg);
      }
    },
    *deleteData({payload, callback}, {call, put}) { // 删除
      const response = yield call(deleteData, payload);
      if(response.code === 200) {
        message.success(response.msg);
        const res = yield call(queryUsers, payload);
        yield put({
          type: 'initData',
          payload: res.detail
        });
      } else {
        message.error(response.msg);
      }
    },
    datail(state, result) {
      return {...state, detail: result.payload || {}};
    }
  },
  reducers: {
    initData(state, result) {
      return {...state, userList: result.payload || []};
    },
    datail(state, result) {
      return {...state, detail: result.payload || {}};
    }
  }
};
export default UserModel;
