import { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Bird from '../../components/ui/Bird';
import Obstacle from '../../components/Obstacle';

export default function HomeScreen() {
  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;

  const birdLeft = screenWidth / 2;
  const birdWidth = 50;
  const birdHeight = 60;

  const [birdBottom, setBirdBottom] = useState(
    screenHeight / 2
  );

  const gravity = 3;

  const obstacleWidth = 60;
  const obstacleHeight = 300;

  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);

  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(
    screenWidth + screenWidth / 2
  );

  const [obstaclesHeight, setObstaclesHeight] = useState(200);

  const [obstaclesHeightTwo, setObstaclesHeightTwo] = useState(150);

  const gap = 150;

  const [isGameStarted, setIsGameStarted] = useState(false);

  const [isGameOver, setIsGameOver] = useState(false);

  const [score, setScore] = useState(0);

  // Bird falling
  useEffect(() => {
    let gameTimerId: ReturnType<typeof setInterval>;

    if (
      birdBottom > 0 &&
      isGameStarted &&
      !isGameOver
    ) {
      gameTimerId = setInterval(() => {
        setBirdBottom(
          (birdBottom) => birdBottom - gravity
        );
      }, 30);
    }

    return () => {
      clearInterval(gameTimerId);
    };
  }, [birdBottom, isGameStarted, isGameOver]);

  // First obstacle
  useEffect(() => {
    let obstaclesTimerId: ReturnType<typeof setInterval>;

    if (
      obstaclesLeft > -60 &&
      isGameStarted &&
      !isGameOver
    ) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft(
          (obstaclesLeft) => obstaclesLeft - 5
        );
      }, 30);
    } else if (
      obstaclesLeft <= -60 &&
      isGameStarted &&
      !isGameOver
    ) {
      setObstaclesLeft(screenWidth);

      setScore(
        (score) => score + 1
      );
    }

    return () => {
      clearInterval(obstaclesTimerId);
    };
  }, [
    obstaclesLeft,
    isGameStarted,
    isGameOver,
    screenWidth,
  ]);

  // Second obstacle
  useEffect(() => {
    let obstaclesTimerIdTwo: ReturnType<typeof setInterval>;

    if (
      obstaclesLeftTwo > -60 &&
      isGameStarted &&
      !isGameOver
    ) {
      obstaclesTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(
          (obstaclesLeftTwo) => obstaclesLeftTwo - 5
        );
      }, 30);
    } else if (
      obstaclesLeftTwo <= -60 &&
      isGameStarted &&
      !isGameOver
    ) {
      setObstaclesLeftTwo(screenWidth);

      setObstaclesHeightTwo(
        Math.random() * 100 + 100
      );

      setScore(
        (score) => score + 1
      );
    }

    return () => {
      clearInterval(obstaclesTimerIdTwo);
    };
  }, [
    obstaclesLeftTwo,
    isGameStarted,
    isGameOver,
    screenWidth,
  ]);

  // Jump behavior
  const jump = () => {
    if (isGameOver) {
      return;
    }

    if (!isGameStarted) {
      setIsGameStarted(true);
    }

    if (birdBottom < screenHeight) {
      setBirdBottom(
        (birdBottom) => birdBottom + 50
      );
    }
  };

  // Check collision
  useEffect(() => {
    if (!isGameStarted || isGameOver) {
      return;
    }

    const birdLeftEdge =
      birdLeft - birdWidth / 2;

    const birdRightEdge =
      birdLeft + birdWidth / 2;

    const birdBottomEdge =
      birdBottom - birdHeight / 2;

    const birdTopEdge =
      birdBottom + birdHeight / 2;

    const checkCollision = (
      obstacleLeft: number,
      obstacleBottom: number
    ) => {
      const obstacleRight =
        obstacleLeft + obstacleWidth;

      const gapBottom =
        obstacleBottom + obstacleHeight;

      const gapTop =
        gapBottom + gap;

      const isInsideObstacle =
        birdRightEdge > obstacleLeft &&
        birdLeftEdge < obstacleRight;

      const isOutsideGap =
        birdBottomEdge < gapBottom ||
        birdTopEdge > gapTop;

      return isInsideObstacle && isOutsideGap;
    };

    const hitFirstObstacle = checkCollision(
      obstaclesLeft,
      obstaclesHeight
    );

    const hitSecondObstacle = checkCollision(
      obstaclesLeftTwo,
      obstaclesHeightTwo
    );

    if (hitFirstObstacle || hitSecondObstacle) {
      setIsGameOver(true);
    }
  }, [
    birdBottom,
    obstaclesLeft,
    obstaclesLeftTwo,
    obstaclesHeight,
    obstaclesHeightTwo,
    isGameStarted,
    isGameOver,
    birdLeft,
    birdWidth,
    birdHeight,
    obstacleWidth,
    obstacleHeight,
    gap,
  ]);

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/images/background.png')}
          resizeMode="cover"
          style={styles.background}
        >
          <Text style={styles.score}>
            Score: {score}
          </Text>

          {!isGameStarted && (
            <Text style={styles.startText}>
              Tap to Start
            </Text>
          )}

          {isGameOver && (
            <Text style={styles.gameOver}>
              Game Over
            </Text>
          )}

          <Bird
            birdBottom={birdBottom}
            birdLeft={birdLeft}
          />

          <Obstacle
            color="green"
            obstacleWidth={obstacleWidth}
            obstacleHeight={obstacleHeight}
            randomBottom={obstaclesHeight}
            gap={gap}
            obstaclesLeft={obstaclesLeft}
          />

          <Obstacle
            color="yellow"
            obstacleWidth={obstacleWidth}
            obstacleHeight={obstacleHeight}
            randomBottom={obstaclesHeightTwo}
            gap={gap}
            obstaclesLeft={obstaclesLeftTwo}
          />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  score: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    fontSize: 30,
    zIndex: 1,
  },

  startText: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    fontSize: 30,
    zIndex: 1,
  },

  gameOver: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    fontSize: 30,
    zIndex: 1,
  },
});