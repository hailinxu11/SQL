import request from '@/utils/request';

export async function fileList(params) {
  if(params.g_id === undefined) {
    params = {g_id: ''};
  }
  return request(`/api/sql/file/?g_id=${params.g_id}`, {
    method: 'get',
    data: params,
    getResponse: false
  });
}
export async function save(params) {
  return request('/api/sql/file/', {
    method: 'post',
    data: params,
    getResponse: false
  });
}
export async function download(params) {
  return request('/api/sql/file/download/', {
    method: 'post',
    data: params,
    getResponse: false
  });
}
export async function update(params) {
  return request(`/api/sql/file/${params.id}/`, {
    method: 'patch',
    data: params,
    getResponse: false
  });
}
export async function deleteData(params) {
  return request(`/api/sql/file/${params.id}/`, {
    method: 'delete',
    data: params,
    getResponse: false
  });
}

export async function detailById(params) {
  return request(`/api/sql/file/${params.id}/`, {
    method: 'get',
    getResponse: false
  });
}
