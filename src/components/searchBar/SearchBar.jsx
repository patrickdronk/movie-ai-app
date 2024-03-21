import { AutoComplete, Row, Col, Avatar, Input, Button } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { addMovieToWatchList, searchMovies } from './queries.js';

const SearchBar = ({ watchListId }) => {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState('');

  const { data } = useQuery({
    queryKey: ['search_movies'],
    queryFn: () => searchMovies(query), enabled: !!query,
  });

  const { mutate } = useMutation({
    mutationKey: ['add_movie_to_watchlist'],
    mutationFn: ({ watchListId, imdbId }) => addMovieToWatchList(watchListId, imdbId),
    onSuccess: () => {
      queryClient.invalidateQueries('watchList');
    },
  });


  const handleSearch = value => {
    if (value.length >= 3) {
      setQuery(value);
    }
  };

  const renderOption = item => ({
    value: item.title, label: (<div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar src={item.poster} size={80} shape={'square'} style={{ marginRight: '8px' }} />
      <div>
        <div>{item.title}</div>
        <Button onClick={() => {
          mutate({ watchListId, imdbId: item.imdbID });
        }}>
          Add to Watchlist
        </Button>
      </div>
    </div>),
  });

  const options = data?.data.movies.map(result => renderOption(result));

  return (<div>
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
  </div>);
};

export default SearchBar;
