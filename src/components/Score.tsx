import React from "react";

interface ScoreProps {
  score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => <div>Score: {score}</div>;

export default Score;
