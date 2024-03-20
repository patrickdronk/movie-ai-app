import './WatchList.css';
import { Button, Card, Col, Empty, Row } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getWatchListByUserId } from './queries.js';

const WatchList = () => {
  const { data, loading } = useQuery({
    queryKey: 'watchList',
    queryFn: async () => {
      return getWatchListByUserId();
    },
  });

  console.log(data, loading);
  return (
    <Row justify={'center'}>
      <Col span={20}>
        <Card>
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60 }}
            description={<span>No watchlist found</span>}
          >
            <Button type="primary">Create one</Button>
          </Empty>
        </Card>
      </Col>
    </Row>
  )
    ;
};

export default WatchList;
