import request from '@/utils/request';

export async function queryUsers(params) {
  return request('/api/user/list/', {
    method: 'get',
    data: params,
    getResponse: false
  });
}
export async function save(params) {
  return request('/api/user/list/', {
    method: 'post',
    data: params,
    getResponse: false
  });
}
export async function update(params) {
  return request(`/api/user/operation/${params.id}/`, {
    method: 'patch',
    data: params,
    getResponse: false
  });
}
export async function deleteData(params) {
  return request(`/api/user/operation/${params.id}/`, {
    method: 'delete',
    data: params,
    getResponse: false
  });
}

export async function detailById(params) {
  return request(`/api/user/operation/${params.id}/`, {
    method: 'get',
    getResponse: false
  });
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}
