
import {message} from 'antd';
import {newfileList, download, deleteData} from '@/services/newFile';
import {saveFile} from '@/utils/file';

const fileModel = {
  namespace: 'newfiles',
  state: {
    newfileList: [],
    detail: {
      id: '',
      name: '',
      path: ''
    }
  },
  effects: {
    *fetch({payload}, {call, put}) {
      const response = yield call(newfileList, payload);
      yield put({
        type: 'initData',
        payload: response.detail
      });
    },

    *download({payload}, {call, put}) { // 下载
      const response = yield call(download, payload);
      console.log(response);
      if(window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(response, payload.name);
      } else {
        saveFile(response, payload.name);
      }
    },
    *deleteData({payload}, {call, put}) { // 删除
      return yield call(deleteData, payload);
    }
  },

  reducers: {
    initData(state, result) {
      return {...state, newfileList: result.payload || []};
    }

  }
};
export default fileModel;
