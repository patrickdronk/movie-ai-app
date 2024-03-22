import MovieCard from './MovieCard.jsx';
import { List } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getMovieByIds } from '../watchList/queries.js';

const MovieView = (props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: () => getMovieByIds(props.movieIds)
  })

  if(isLoading) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <List
      grid={{ justify: 'space-evenly', gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, }}
      dataSource={data.data}
      renderItem={movie => (
        <List.Item>
          <MovieCard movie={movie} />
        </List.Item>
      )}
    />
  );
};

export default MovieView;
