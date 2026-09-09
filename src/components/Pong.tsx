"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

interface Paddle {
  y: number;
  height: number;
}

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 80;
const PADDLE_SPEED = 5;
const BALL_SIZE = 10;
const BALL_SPEED = 4;

const Pong = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);

  const leftPaddleRef = useRef<Paddle>({ y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2, height: PADDLE_HEIGHT });
  const rightPaddleRef = useRef<Paddle>({ y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2, height: PADDLE_HEIGHT });
  const ballRef = useRef<Ball>({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    dx: BALL_SPEED,
    dy: BALL_SPEED,
  });

  const keysRef = useRef<{ [key: string]: boolean }>({});

  const resetBall = useCallback((direction: "left" | "right" = "right") => {
    ballRef.current = {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      dx: direction === "right" ? BALL_SPEED : -BALL_SPEED,
      dy: (Math.random() - 0.5) * BALL_SPEED,
    };
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    // Handle arrow keys specially
    if (e.key === "ArrowUp") {
      keysRef.current["arrowup"] = true;
    } else if (e.key === "ArrowDown") {
      keysRef.current["arrowdown"] = true;
    } else {
      keysRef.current[key] = true;
    }
    
    if (e.key === " ") {
      e.preventDefault();
      if (!gameStarted) {
        setGameStarted(true);
        resetBall();
      } else {
        setGamePaused((prev) => !prev);
      }
    }
  }, [gameStarted, resetBall]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    // Handle arrow keys specially
    if (e.key === "ArrowUp") {
      keysRef.current["arrowup"] = false;
    } else if (e.key === "ArrowDown") {
      keysRef.current["arrowdown"] = false;
    } else {
      keysRef.current[e.key.toLowerCase()] = false;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const updatePaddles = useCallback(() => {
    const leftPaddle = leftPaddleRef.current;
    const rightPaddle = rightPaddleRef.current;
    const keys = keysRef.current;

    // Left paddle (W/S keys)
    if (keys["w"] && leftPaddle.y > 0) {
      leftPaddle.y = Math.max(0, leftPaddle.y - PADDLE_SPEED);
    }
    if (keys["s"] && leftPaddle.y < CANVAS_HEIGHT - leftPaddle.height) {
      leftPaddle.y = Math.min(CANVAS_HEIGHT - leftPaddle.height, leftPaddle.y + PADDLE_SPEED);
    }

    // Right paddle (Arrow Up/Down keys)
    if (keys["arrowup"] && rightPaddle.y > 0) {
      rightPaddle.y = Math.max(0, rightPaddle.y - PADDLE_SPEED);
    }
    if (keys["arrowdown"] && rightPaddle.y < CANVAS_HEIGHT - rightPaddle.height) {
      rightPaddle.y = Math.min(CANVAS_HEIGHT - rightPaddle.height, rightPaddle.y + PADDLE_SPEED);
    }
  }, []);

  const updateBall = useCallback(() => {
    const ball = ballRef.current;
    const leftPaddle = leftPaddleRef.current;
    const rightPaddle = rightPaddleRef.current;

    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Top and bottom wall collision
    if (ball.y <= 0 || ball.y >= CANVAS_HEIGHT - BALL_SIZE) {
      ball.dy = -ball.dy;
      ball.y = Math.max(0, Math.min(CANVAS_HEIGHT - BALL_SIZE, ball.y));
    }

    // Left paddle collision
    if (
      ball.x <= PADDLE_WIDTH &&
      ball.y + BALL_SIZE >= leftPaddle.y &&
      ball.y <= leftPaddle.y + leftPaddle.height &&
      ball.dx < 0
    ) {
      const hitPos = (ball.y - leftPaddle.y) / leftPaddle.height;
      const angle = (hitPos - 0.5) * Math.PI * 0.5; // -PI/4 to PI/4
      ball.dx = Math.abs(ball.dx);
      ball.dy = Math.sin(angle) * BALL_SPEED;
      ball.x = PADDLE_WIDTH;
    }

    // Right paddle collision
    if (
      ball.x >= CANVAS_WIDTH - PADDLE_WIDTH - BALL_SIZE &&
      ball.y + BALL_SIZE >= rightPaddle.y &&
      ball.y <= rightPaddle.y + rightPaddle.height &&
      ball.dx > 0
    ) {
      const hitPos = (ball.y - rightPaddle.y) / rightPaddle.height;
      const angle = (hitPos - 0.5) * Math.PI * 0.5; // -PI/4 to PI/4
      ball.dx = -Math.abs(ball.dx);
      ball.dy = Math.sin(angle) * BALL_SPEED;
      ball.x = CANVAS_WIDTH - PADDLE_WIDTH - BALL_SIZE;
    }

    // Score points
    if (ball.x < 0) {
      setRightScore((prev) => prev + 1);
      resetBall("right");
    } else if (ball.x > CANVAS_WIDTH) {
      setLeftScore((prev) => prev + 1);
      resetBall("left");
    }
  }, [resetBall]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw center line
    ctx.strokeStyle = "#ffffff";
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH / 2, 0);
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw paddles
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, leftPaddleRef.current.y, PADDLE_WIDTH, leftPaddleRef.current.height);
    ctx.fillRect(
      CANVAS_WIDTH - PADDLE_WIDTH,
      rightPaddleRef.current.y,
      PADDLE_WIDTH,
      rightPaddleRef.current.height
    );

    // Draw ball
    ctx.fillRect(ballRef.current.x, ballRef.current.y, BALL_SIZE, BALL_SIZE);

    // Draw scores
    ctx.fillStyle = "#ffffff";
    ctx.font = "32px monospace";
    ctx.textAlign = "center";
    ctx.fillText(leftScore.toString(), CANVAS_WIDTH / 4, 50);
    ctx.fillText(rightScore.toString(), (3 * CANVAS_WIDTH) / 4, 50);

    // Draw instructions
    if (!gameStarted) {
      ctx.font = "16px monospace";
      ctx.fillText("Press SPACE to start", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      ctx.font = "12px monospace";
      ctx.fillText("Left: W/S | Right: ↑/↓", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);
    } else if (gamePaused) {
      ctx.font = "24px monospace";
      ctx.fillText("PAUSED", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      ctx.font = "12px monospace";
      ctx.fillText("Press SPACE to resume", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);
    }
  }, [leftScore, rightScore, gameStarted, gamePaused]);

  useEffect(() => {
    function gameLoop() {
      if (!gamePaused && gameStarted) {
        updatePaddles();
        updateBall();
      }
      draw();
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }
    animationFrameRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gamePaused, gameStarted, updatePaddles, updateBall, draw]);


  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{
          border: "2px solid #ffffff",
          backgroundColor: "#000000",
          cursor: "none",
        }}
        tabIndex={0}
      />
      <div style={{ color: "#ffffff", fontFamily: "monospace", fontSize: "12px", textAlign: "center" }}>
        <div>Left Player: W (up) / S (down)</div>
        <div>Right Player: ↑ (up) / ↓ (down)</div>
        <div>Space: {gameStarted ? (gamePaused ? "Resume" : "Pause") : "Start"}</div>
      </div>
    </div>
  );
};

export default Pong;
