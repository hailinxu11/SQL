
import {message} from 'antd';
import {routerRedux} from 'dva/router';
import {fileList, save, update, deleteData, detailById, download} from '@/services/file';

const fileModel = {
  namespace: 'files',
  state: {
    fileList: [],
    detail: {
      id: '',
      project: '',
      file_name: '',
      file_url: '',
      index: '',
      group: ''
    }
  },
  effects: {
    *fetch({payload}, {call, put}) {
      const response = yield call(fileList, payload);
      yield put({
        type: 'initData',
        payload: response.detail
      });
    },
    *add({payload}, {call, put}) { // 保存
      const response = yield call(save, payload);
      if(response.code === 200) {
        message.success(response.msg);
        yield put(routerRedux.push('/filesManagement'));
      } else {
        message.error(response.msg);
      }
    },
    *queryById({payload}, {call, put}) { // 通过id查询
      const response = yield call(detailById, payload);
      yield put({
        type: 'datail',
        payload: response.detail
      });
    },
    *download({payload}, {call, put}) { // 保存
      return yield call(download, payload);
    },
    *updateData({payload}, {call, put}) { // 保存
      const response = yield call(update, payload);
      if(response.code === 200) {
        message.success(response.msg);
        yield put(routerRedux.push('/filesManagement'));
      } else {
        message.error(response.msg);
      }
    },
    *deleteData({payload}, {call, put}) { // 删除
      const response = yield call(deleteData, payload);
      if(response.code === 200) {
        message.success(response.msg);
        const res = yield call(fileList, payload);
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
      return {...state, fileList: result.payload || []};
    },
    datail(state, result) {
      return {...state, detail: result.payload || {}};
    }
  }
};
export default fileModel;
