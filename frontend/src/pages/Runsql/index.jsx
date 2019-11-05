import React from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Card, Form, Select, Button, message} from 'antd';
import {connect} from 'dva';

const {Option} = Select;

@connect(({servers, groups, loading}) => ({
  serverList: servers.serverList,
  groupList: groups.groupList,
  submitting: loading.effects['servers/run']
}))
class RunsqlPage extends React.Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'servers/fetch'
    });
    dispatch({
      type: 'groups/fetch'
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const {dispatch} = this.props;
    this.props.form.validateFields((err, values) => {
      if(!err) {
        dispatch({
          type: 'servers/run',
          payload: {...values}
        });
      }
    });
  };

  renderOptions = values => values.map(element =>
    <Option key={element.id} value={element.id}> {element.name}</Option>);

  render() {
    const {getFieldDecorator} = this.props.form;
    const {submitting} = this.props;
    return (
      <PageHeaderWrapper>
        <Card>
          <Form labelCol={{span: 5}} wrapperCol={{span: 12}} onSubmit={this.handleSubmit}>
            <Form.Item label="服务器">
              {getFieldDecorator('s_id', {
                rules: [{required: true, message: '请选择执行服务器!'}]
              })(<Select
                placeholder="请选择执行服务器"
              >
                {this.renderOptions(this.props.serverList)}
              </Select>,)}
            </Form.Item>
            <Form.Item label="sprint文件组">
              {getFieldDecorator('g_id', {
                rules: [{required: true, message: '请选择需要执行的sprint文件组!'}]
              })(<Select
                placeholder="请选择需要执行的sprint文件组"
              >
                {this.renderOptions(this.props.groupList)}
              </Select>,)}
            </Form.Item>
            <Form.Item wrapperCol={{span: 12, offset: 5}}>
              <Button type="primary" htmlType="submit" loading={submitting}>
               执行
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

const RunsqlForm = Form.create()(RunsqlPage);
export default RunsqlForm;
