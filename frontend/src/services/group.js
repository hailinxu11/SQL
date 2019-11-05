import request from '@/utils/request';

export async function groupList(params) {
  return request('/api/sql/group/', {
    method: 'get',
    data: params,
    getResponse: false
  });
}
export async function save(params) {
  return request('/api/sql/group/', {
    method: 'post',
    data: params,
    getResponse: false
  });
}
export async function update(params) {
  return request(`/api/sql/group/${params.id}/`, {
    method: 'patch',
    data: params,
    getResponse: false
  });
}
export async function deleteData(params) {
  return request(`/api/sql/group/${params.id}/`, {
    method: 'delete',
    data: params,
    getResponse: false
  });
}

export async function detailById(params) {
  return request(`/api/sql/group/${params.id}/`, {
    method: 'get',
    getResponse: false
  });
}
