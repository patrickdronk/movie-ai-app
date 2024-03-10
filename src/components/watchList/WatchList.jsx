import { getMovieByIds } from './queries.js';
import { useQuery } from '@tanstack/react-query';
import MovieView from '../movieView/MovieView.jsx';
import './WatchList.css';

const WatchList = () => {
  const movieIds = ['tt7286456', 'tt5001754', 'tt0371746', 'tt27687527'];

  const { data } = useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      return await getMovieByIds(movieIds)
    },
  });

  console.log(data);
  return data && <MovieView movies={data.data} />;
};

export default WatchList;
