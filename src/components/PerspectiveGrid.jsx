import { Grid } from '@react-three/drei';

const PerspectiveGrid = ({ 
  position = [0, -7.5, 0],
  cellColor = '#363a4d',
  sectionColor = '#5a607a',
  fadeDistance = 70,
  fadeStrength = 1.0,
}) => {
  return (
    <Grid
      position={position}
      args={[100, 100]}
      cellSize={0.6}
      cellThickness={1.0}
      cellColor={cellColor}
      sectionSize={3.0}
      sectionThickness={1.6}
      sectionColor={sectionColor}
      fadeDistance={fadeDistance}
      fadeStrength={fadeStrength}
      followCamera={false}
      infiniteGrid
    />
  );
};

export default PerspectiveGrid;
