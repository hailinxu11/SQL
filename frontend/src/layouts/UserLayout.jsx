import {DefaultFooter, getMenuData, getPageTitle} from '@ant-design/pro-layout';
import DocumentTitle from 'react-document-title';
import Link from 'umi/link';
import React from 'react';
import {connect} from 'dva';
import {formatMessage} from 'umi-plugin-react/locale';
import SelectLang from '@/components/SelectLang';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

const UserLayout = props => {
  const links = [{
    key: '技术支持',
    title: '成都酷网天地',
    blankTarget: true
  }];
  const {
    route = {
      routes: []
    }
  } = props;
  const {routes = []} = route;
  const {
    children,
    location = {
      pathname: ''
    }
  } = props;
  const {breadcrumb} = getMenuData(routes);
  return (
    <DocumentTitle
      title={getPageTitle({
        pathname: location.pathname,
        breadcrumb,
        formatMessage,
        ...props
      })}
    >
      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <span className={styles.title}>Welcome to SQL</span>
            </div>
          </div>
          {children}
        </div>
        <DefaultFooter links={links} copyright="项目管理sql自动化工具"/>
      </div>
    </DocumentTitle>
  );
};

export default connect(({settings}) => ({...settings}))(UserLayout);
