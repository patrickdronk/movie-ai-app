import { AutoComplete, Row, Col, Avatar, Input } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { searchMovies } from './queries.js';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const { data } = useQuery({
    queryKey: ['data', query],
    queryFn: () => searchMovies(query),
    enabled: !!query,
  });


  const handleSearch = value => {
    if (value.length >= 3) {
      setQuery(value);
    }
  };

  const renderOption = item => ({
    value: item.title,
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={item.poster} size={80} shape={'square'} style={{ marginRight: '8px' }} />
        <div>
          <div>{item.title}</div>
        </div>
      </div>
    ),
  });

  const options = data?.data.movies.map(result => renderOption(result));

  return (
    <div>
      <Row justify={'center'}>
        <Col span={20}>
          <AutoComplete
            options={options}
            style={{ width: '100%', marginBottom: '16px' }}
            onSelect={handleSearch}
            onSearch={handleSearch}
          >
            <Input.Search size="large" placeholder="Search" enterButton />
          </AutoComplete>
        </Col>
      </Row>
    </div>
  );
};

export default SearchBar;
