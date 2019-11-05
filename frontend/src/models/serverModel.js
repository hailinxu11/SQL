
import {message} from 'antd';
import {routerRedux} from 'dva/router';
import {serviceList, save, update, deleteData, detailById, run} from '@/services/server';

const ServerModel = {
  namespace: 'servers',
  state: {
    serverList: [],
    detail: {
      id: '',
      name: '',
      service_ip: '',
      port: '',
      username: '',
      password: '',
      database: ''
    }
  },
  effects: {
    *fetch({payload}, {call, put}) {
      const response = yield call(serviceList, payload);
      yield put({
        type: 'initData',
        payload: response.detail
      });
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
        yield put(routerRedux.push('/serverManagement'));
      } else {
        message.error(response.msg);
      }
    },
    *updateData({payload}, {call, put}) { // 保存
      const response = yield call(update, payload);
      if(response.code === 200) {
        message.success(response.msg);
        yield put(routerRedux.push('/serverManagement'));
      } else {
        message.error(response.msg);
      }
    },
    *deleteData({payload}, {call, put}) { // 删除
      const response = yield call(deleteData, payload);
      if(response.code === 200) {
        message.success(response.msg);
        const res = yield call(serviceList, payload);
        yield put({
          type: 'initData',
          payload: res.detail
        });
      } else {
        message.error(response.msg);
      }
    },
    *run({payload}, {call}) {
      const response = yield call(run, payload);
      if(response.code === 200) {
        message.success(response.msg);
      } else {
        message.error(response.msg);
      }
    }
  },

  reducers: {
    initData(state, result) {
      return {...state, serverList: result.payload || []};
    },
    datail(state, result) {
      return {...state, detail: result.payload || {}};
    }
  }
};
export default ServerModel;
