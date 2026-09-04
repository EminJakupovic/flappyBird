import { Image } from 'react-native';

type BirdProps = {
  birdBottom: number;
  birdLeft: number;
};

const Bird = ({ birdBottom, birdLeft }: BirdProps) => {
  const birdWidth = 50;
  const birdHeight = 60;

  return (
    <Image
      source={require('../assets/images/bird1.png')}
      resizeMode="contain"
      style={{
        position: 'absolute',
        width: birdWidth,
        height: birdHeight,
        left: birdLeft - birdWidth / 2,
        bottom: birdBottom - birdHeight / 2,
      }}
    />
  );
};

export default Bird;