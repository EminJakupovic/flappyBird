import { View } from 'react-native';

type ObstacleProps = {
  color: string;
  obstacleWidth: number;
  obstacleHeight: number;
  randomBottom: number;
  gap: number;
  obstaclesLeft: number;
};

const Obstacle = ({
  color,
  obstacleWidth,
  obstacleHeight,
  randomBottom,
  gap,
  obstaclesLeft,
}: ObstacleProps) => {
  return (
    <>
      <View
        style={{
          position: 'absolute',
          backgroundColor: color,
          width: obstacleWidth,
          height: 500,
          left: obstaclesLeft,
          bottom: randomBottom + obstacleHeight + gap,
        }}
      />

      <View
        style={{
          position: 'absolute',
          backgroundColor: color,
          width: obstacleWidth,
          height: obstacleHeight,
          left: obstaclesLeft,
          bottom: randomBottom,
        }}
      />
    </>
  );
};

export default Obstacle;