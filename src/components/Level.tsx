import React from "react";

interface LevelProps {
  level: number;
}

const Level: React.FC<LevelProps> = ({ level }) => <div>Level: {level}</div>;

export default Level;
