import { Layout } from 'antd';

const BaseLayout = ({ children }) => {
  return (
    <Layout>
      <Layout.Header className="header"></Layout.Header>
      <Layout.Content className="content">{children}</Layout.Content>
      <Layout.Footer className="footer">Powered by MovingUp</Layout.Footer>
    </Layout>
  );
};

export default BaseLayout;
