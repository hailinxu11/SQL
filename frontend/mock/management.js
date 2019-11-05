export default {
  // GET POST 可省略
  'GET /api/userList': [
    {
      id: '1',
      uname: 'John Brown',
      createDate: '2019-07-18 09:07:11',
    },
    {
      id: '2',
      uname: 'John Brown2',
      createDate: '2019-07-18 09:07:11',
    },
    {
      id: '3',
      uname: 'John Brown3',
      createDate: '2019-07-18 09:07:11',
    },
  ],
  'GET /api/sprintList': [
    {
      id: '1',
      name: 's1',
      createDate: '2019-07-18 09:07:11',
    },
    {
      id: '2',
      name: 's1-qa',
      createDate: '2019-07-18 09:07:11',
    },
    {
      id: '3',
      name: 's1-qrod',
      createDate: '2019-07-18 09:07:11',
    },
  ],
  'GET /api/ServerList': [
    {
      id: '1',
      name: 'int',
      sqlurl: 'mysql.int.kointernet.com',
      uname: 'dev',
      port: '3306',
      dname: 'tourai',
    },
    {
      id: '2',
      name: 'qa',
      sqlurl: 'mysql.qa.kointernet.com',
      uname: 'dev',
      port: '3306',
      dname: 'tourai',
    },
    {
      id: '3',
      name: 'dev',
      sqlurl: 'mysql.dev.kointernet.com',
      uname: 'dev',
      port: '3306',
      dname: 'tourai',
    },
    {
      id: '4',
      name: 'prod',
      sqlurl: 'rm-8vbgot6u4g7217fspbo.mysql.zhangbei.rds.aliyuncs.com',
      uname: 'tkyh',
      port: '3306',
      dname: 'tourai',
    },
  ],
}
