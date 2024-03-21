import './WatchList.css';
import { Button, Card, Col, Empty, Row } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWatchList } from './queries.js';
import MovieView from '../movieView/MovieView.jsx';

const WatchList = (data) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['create_watchlist'],
    mutationFn: createWatchList,
    onSuccess: () => {
      queryClient.invalidateQueries('watchList');
    },
  });

  return (<Row justify={'center'}>
    <Col span={20}>
      <Card>
        {data?.data === null && (<Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 60 }}
          description={<span>No watchlist found</span>}
        >
          <Button type="primary" onClick={() => mutate(crypto.randomUUID())}>Create one</Button>
        </Empty>)}
        {data?.data !== null && (<MovieView movieIds={data?.data.movieIds} />)}
      </Card>
    </Col>
  </Row>);
};

export default WatchList;
