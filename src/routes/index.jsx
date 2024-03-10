import { createFileRoute, redirect } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BaseLayout from '../components/BaseLayout.jsx';
import WatchList from '../components/watchList/WatchList.jsx';
import { Col, Row } from 'antd';
import SearchBar from '../components/searchBar/SearchBar.jsx';

export const Route = createFileRoute('/')({
  beforeLoad: ({ context, location }) => {
    console.log(context.isAuthenticated);
    if (!context.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: HomeComponent,
});

function HomeComponent() {
  const queryClient = new QueryClient({});

  return (
    <QueryClientProvider client={queryClient}>
      <BaseLayout>
        <Row style={{ marginBottom: '1rem' }}>
          <Col span={24}>
            <SearchBar />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <WatchList />
          </Col>
        </Row>
      </BaseLayout>
    </QueryClientProvider>
  );
}
