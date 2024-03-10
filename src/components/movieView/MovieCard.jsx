import { Card } from 'antd';

const { Meta } = Card;

const MovieCard = ({ movie }) => {
  const { title, year, poster } = movie;

  return (
    <Card hoverable style={{ width: 250 }} cover={<img alt="Movie Poster" src={poster} />}>
      <Meta style={{ textAlign: 'center' }} title={title} description={year} />
    </Card>
  );
};

export default MovieCard;
