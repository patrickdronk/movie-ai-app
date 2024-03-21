import { createFileRoute, redirect } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import BaseLayout from '../components/BaseLayout.jsx';
import WatchList from '../components/watchList/WatchList.jsx';
import { Col, Row } from 'antd';
import SearchBar from '../components/searchBar/SearchBar.jsx';
import { getWatchListByUserId } from '../components/watchList/queries.js';

export const Route = createFileRoute('/')({
  beforeLoad: ({ context, location }) => {
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
  const { data, isLoading } = useQuery({
    queryKey: ['watchList'], queryFn: async () => {
      return getWatchListByUserId();
    },
  });

  if (isLoading) {
    return (<div>Loading</div>);
  }

  return (
    <BaseLayout>
      <Row style={{ marginBottom: '1rem' }}>
        <Col span={24}>
          <SearchBar watchListId={data?.data?.watchListId}/>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <WatchList data={data} />
        </Col>
      </Row>
    </BaseLayout>
  );
}
