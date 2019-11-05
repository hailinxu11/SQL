import request from '@/utils/request';

export async function serviceList(params) {
  return request('/api/sql/service/', {
    method: 'get',
    data: params,
    getResponse: false
  });
}
export async function save(params) {
  return request('/api/sql/service/', {
    method: 'post',
    data: params,
    getResponse: false
  });
}
export async function update(params) {
  return request(`/api/sql/service/${params.id}/`, {
    method: 'patch',
    data: params,
    getResponse: false
  });
}
export async function deleteData(params) {
  return request(`/api/sql/service/${params.id}/`, {
    method: 'delete',
    data: params,
    getResponse: false
  });
}

export async function detailById(params) {
  return request(`/api/sql/service/${params.id}/`, {
    method: 'get',
    getResponse: false
  });
}
export async function run(params) {
  return request('/api/sql/file/execute/', {
    method: 'post',
    data: params,
    getResponse: false
  });
}
