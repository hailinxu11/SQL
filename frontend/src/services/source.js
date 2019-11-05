import request from '@/utils/request';

export async function sourceList(params) {
  return request('/api/jira/data/', {
    method: 'get',
    data: params,
    getResponse: false
  });
}
// 上传
export async function save(params) {
  return request('/api/jira/data/', {
    method: 'post',
    data: params,
    getResponse: false
  });
}
// 下载
export async function download(params) {
  return request(`/api/jira/data/${params.id}/`, {
    method: 'put',
    data: params,
    getResponse: false
  });
}
// 生成html文件
export async function html(params) {
  return request(`/api/jira/html/${params.id}/`, {
    method: 'get',
    data: params,
    getResponse: false
  });
}
// 生成word文件
export async function word(params) {
  return request(`/api/jira/word/${params.id}/`, {
    method: 'get',
    data: params,
    getResponse: false
  });
}
export async function deleteData(params) {
  return request(`/api/jira/data/${params.id}/`, {
    method: 'delete',
    data: params,
    getResponse: false
  });
}

export async function detailById(params) {
  return request(`/api/jira/data/${params.id}/`, {
    method: 'get',
    getResponse: false
  });
}
