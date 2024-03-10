import MovieCard from './MovieCard.jsx';
import { List } from 'antd';

const MovieView = ({ movies }) => {
  return (
    <List
      grid={{
        justify: 'space-evenly',
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
      }}
      dataSource={movies}
      renderItem={movie => (
        <List.Item>
          <MovieCard title={movie['imdbID']} movie={movie} />
        </List.Item>
      )}
    />
  );
};

export default MovieView;
