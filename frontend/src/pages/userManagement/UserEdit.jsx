import React from 'react';
import {Card, Form, Input, Button, message} from 'antd';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect} from 'dva';
import Link from 'umi/link';
import {routerRedux} from 'dva/router';

@connect(({userManagement}) => ({
  userList: userManagement.userList,
  detail: userManagement.detail
}))
class UserAd extends React.Component {
  componentDidMount() {
    const {dispatch} = this.props;
    if(this.props.location.query.id) {
      dispatch({
        type: 'userManagement/queryById',
        payload: {
          id: this.props.location.query.id
        }
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err) {
        const {dispatch} = this.props;
        dispatch({
          type: 'userManagement/updateData',
          payload: {...values}
        });
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <PageHeaderWrapper>
        <Card>
          <Form labelCol={{span: 5}} wrapperCol={{span: 12}} onSubmit={this.handleSubmit}>
            <Form.Item label="用户id" style={{display: 'none'}}>
              {getFieldDecorator('id', {
                rules: [{required: false}],
                initialValue: `${this.props.detail.id}`
              })(<Input />)}
            </Form.Item>
            <Form.Item label="昵称">
              {getFieldDecorator('name', {
                rules: [{required: true, message: '昵称!'}],
                initialValue: `${this.props.detail.name}`
              })(<Input />)}
            </Form.Item>
            <Form.Item label="账号名">
              {getFieldDecorator('number', {
                rules: [{required: true, message: '账号名!'}],
                initialValue: `${this.props.detail.number}`
              })(<Input />)}
            </Form.Item>
            <Form.Item label="密码">
              {getFieldDecorator('password', {
                rules: [{required: true, message: '请填写密码!'}]
              })(<Input />)}
            </Form.Item>
            <Form.Item wrapperCol={{span: 12, offset: 5}}>
              <Button key="submit" type="primary" htmlType="submit" >
              提交
              </Button>
              <Link to="/userManagement">
                <Button key="cancel"
                  style={{
                    marginLeft: 80
                  }}>
                取消
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(UserAd);
