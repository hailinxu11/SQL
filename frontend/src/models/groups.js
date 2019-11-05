
import _ from 'lodash';
import {message} from 'antd';
import {routerRedux} from 'dva/router';
import {groupList, save, update, deleteData, detailById} from '@/services/group';

const groupModel = {
  namespace: 'groups',
  state: {
    groupList: [],
    detail: {
      id: '',
      name: ''
    }
  },
  effects: {
    *fetch({payload, callback}, {call, put}) {
      const response = yield call(groupList, payload);
      yield put({
        type: 'initData',
        payload: response.detail
      });
      if(callback && _.isFunction(callback)) {
        callback();
      }
    },
    *queryById({payload}, {call, put}) { // 通过id查询
      const response = yield call(detailById, payload);
      yield put({
        type: 'datail',
        payload: response.detail
      });
    },
    *add({payload}, {call, put}) { // 保存
      const response = yield call(save, payload);
      if(response.code === 200) {
        message.success(response.msg);
        yield put(routerRedux.push('/groupsManagement'));
      } else {
        message.error(response.msg);
      }
    },
    *updateData({payload}, {call, put}) { // 保存
      const response = yield call(update, payload);
      if(response.code === 200) {
        message.success(response.msg);
        yield put(routerRedux.push('/groupsManagement'));
      } else {
        message.error(response.msg);
      }
    },
    *deleteData({payload}, {call, put}) { // 删除
      const response = yield call(deleteData, payload);
      if(response.code === 200) {
        message.success(response.msg);
        const res = yield call(groupList, payload);
        yield put({
          type: 'initData',
          payload: res.detail
        });
      } else {
        message.error(response.msg);
      }
    }
  },

  reducers: {
    initData(state, result) {
      return {...state, groupList: result.payload || []};
    },
    datail(state, result) {
      return {...state, detail: result.payload || {}};
    }
  }
};
export default groupModel;
