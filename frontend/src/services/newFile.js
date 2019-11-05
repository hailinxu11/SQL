import request from '@/utils/request';

export async function newfileList(params) {
  return request('/api/jira/file/', {
    method: 'get',
    data: params,
    getResponse: false
  });
}

// 下载
export async function download(params) {
  return request(`/api/jira/file/${params.id}/`, {
    method: 'put',
    data: params,
    getResponse: false
  });
}

export async function deleteData(params) {
  return request(`/api/jira/file/${params.id}/`, {
    method: 'delete',
    data: params,
    getResponse: false
  });
}
