
import {message} from 'antd';
import {routerRedux} from 'dva/router';
import {sourceList, save, update, deleteData, detailById, download, html, word} from '@/services/source';
import {saveFile} from '@/utils/file';

const sourceModel = {
  namespace: 'sources',
  state: {
    sourceList: [],
    detail: {
      id: '',
      name: '',
      path: ''
    }
  },
  effects: {
    *fetch({payload}, {call, put}) {
      const response = yield call(sourceList, payload);
      yield put({
        type: 'initData',
        payload: response.detail
      });
    },
    *add({payload}, {call, put}) { // 保存
      console.log(payload);
      const response = yield call(save, payload);
      if(response.code === 200) {
        message.success(response.msg);
        yield put(routerRedux.push('/sources'));
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
    // *download({payload}, {call, put}) { // 下载
    //   const response = yield call(download, payload);
    //   if(response.code === 200) {
    //     message.success(response.msg);
    //   } else {
    //     message.error(response.msg);
    //   }
    // },
    *html({payload}, {call, put}) { // 下载
      const response = yield call(html, payload);
      if(response.code === 200) {
        message.success(response.msg);
      } else {
        message.error(response.msg);
      }
    },
    *word({payload}, {call, put}) { // 下载
      const response = yield call(word, payload);
      if(response.code === 200) {
        message.success(response.msg);
      } else {
        message.error(response.msg);
      }
    },

    *updateData({payload}, {call, put}) { // 保存
      const response = yield call(update, payload);
      if(response.code === 200) {
        message.success(response.msg);
        yield put(routerRedux.push('/sources'));
      } else {
        message.error(response.msg);
      }
    },
    *deleteData({payload}, {call, put}) { // 删除
      return yield call(deleteData, payload);
    },
    *download({payload}, {call, put}) {
      const response = yield call(download, payload);
      if(window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(response, payload.name);
      } else {
        saveFile(response, payload.name);
      }
      //   return response;
      // yield put({
      //   type: 'saveFile',
      //   payload: {blob: response, fileName: payload.name}
      // });
    }
    // *saveFile({payload: {blob, fileName}}, {call}) {
    //   if(window.navigator.msSaveOrOpenBlob) {
    //     navigator.msSaveBlob(blob, fileName);
    //   } else {
    //     const link = document.createElement('a');
    //     link.href = window.URL.createObjectURL(blob);
    //     link.download = fileName;
    //     // 此写法兼容可火狐浏览器
    //     document.body.appendChild(link);
    //     const evt = document.createEvent('MouseEvents');
    //     evt.initEvent('click', false, false);
    //     link.dispatchEvent(evt);
    //     document.body.removeChild(link);
    //   }
    // }
  },

  reducers: {
    initData(state, result) {
      return {...state, sourceList: result.payload || []};
    },
    datail(state, result) {
      return {...state, detail: result.payload || {}};
    }
    // saveFile(state, result) {
    // const saveData =


    // const blobdata = new Blob([blob]);// 创建blob对象
    // console.log(blob);
    // const aLink = document.createElement('a');// 创建a链接
    // aLink.style.display = 'none';
    // aLink.href = blobdata;
    // aLink.download = fileName;
    // document.body.appendChild(aLink);
    // aLink.click();
    // document.body.removeChild(aLink);// 点击完成后记得删除创建的链接
    // const aLink = document.createElement('a');// 创建a链接
    // aLink.style.display = 'none';
    // aLink.href = blob;
    // console.log(blob);
    // aLink.download = fileName;
    // document.body.appendChild(aLink);
    // aLink.click();
    // document.body.removeChild(aLink);// 点击完成后记得删除创建的链接
    // const link = document.createElement('a');
    // link.href = window.URL.createObjectURL(blob);
    // link.download = fileName;
    // // 此写法兼容可火狐浏览器
    // document.body.appendChild(link);
    // const evt = document.createEvent('MouseEvents');
    // evt.initEvent('click', false, false);
    // link.dispatchEvent(evt);
    // document.body.removeChild(link);
    // }
    // return {...state, detail: result.payload || {}};
    // }
  }
};
export default sourceModel;
