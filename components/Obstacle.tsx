import { Image } from 'react-native';

type ObstacleProps = {
  color: string;
  obstacleWidth: number;
  obstacleHeight: number;
  randomBottom: number;
  gap: number;
  obstaclesLeft: number;
};

const Obstacle = ({
  obstacleWidth,
  obstacleHeight,
  randomBottom,
  gap,
  obstaclesLeft,
}: ObstacleProps) => {
  return (
    <>
      {/* Top pipe */}
      <Image
        source={require('../assets/images/pipe.png')}
        resizeMode="stretch"
        style={{
          position: 'absolute',
          width: obstacleWidth,
          height: 500,
          left: obstaclesLeft,
          bottom:
            randomBottom +
            obstacleHeight +
            gap,
          transform: [{ rotate: '180deg' }],
        }}
      />

      {/* Bottom pipe */}
      <Image
        source={require('../assets/images/pipe.png')}
        resizeMode="stretch"
        style={{
          position: 'absolute',
          width: obstacleWidth,
          height:
            randomBottom +
            obstacleHeight,
          left: obstaclesLeft,
          bottom: 0,
        }}
      />
    </>
  );
};

export default Obstacle;