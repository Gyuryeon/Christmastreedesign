import { useState } from "react";
import { ChristmasTree } from "./components/christmas-tree";
import { SnowEffect } from "./components/snow-effect";

export default function App() {
  const [ornaments, setOrnaments] = useState<
    {
      id: number;
      text: string;
      x: number;
      y: number;
      color: string;
    }[]
  >(() => generateOrnaments());

  function generateOrnaments() {
    const ornamentColors = [
      "#ef4444", // red
      "#f59e0b", // amber
      "#eab308", // yellow
      "#3b82f6", // blue
      "#8b5cf6", // purple
      "#ec4899", // pink
      "#06b6d4", // cyan
      "#10b981", // emerald
    ];

    const ornaments = [];

    // Helper function to check if a point is inside the tree triangles
    const isInsideTree = (x: number, y: number) => {
      // Top triangle: (50,8) at top, (28,38) and (72,38) at bottom
      if (y >= 19 && y <= 40) {
        const triangleHeight = 31; // 38 - 8
        const currentHeight = y - 14;
        const widthAtCurrentHeight =
          (currentHeight / triangleHeight) * 53; // base width at bottom is 44 (72-28)
        const leftBound = 51 - widthAtCurrentHeight / 2;
        const rightBound = 47 + widthAtCurrentHeight / 2;
        return x >= leftBound && x <= rightBound;
      }

      // Middle triangle: (50,25) at top, (18,60) and (82,60) at bottom
      if (y >= 23 && y <= 57) {
        const triangleHeight = 35; // 60 - 25
        const currentHeight = y - 27;
        const widthAtCurrentHeight =
          (currentHeight / triangleHeight) * 75; // base width at bottom is 64 (82-18)
        const leftBound = 52 - widthAtCurrentHeight / 2;
        const rightBound = 48 + widthAtCurrentHeight / 2;
        return x >= leftBound && x <= rightBound;
      }

      // Bottom triangle: (50,45) at top, (10,88) and (90,88) at bottom
      if (y >= 29 && y <= 88) {
        const triangleHeight = 43; // 88 - 45
        const currentHeight = y - 45;
        const widthAtCurrentHeight =
          (currentHeight / triangleHeight) * 103; // base width at bottom is 80 (90-10)
        const leftBound = 50 - widthAtCurrentHeight / 2;
        const rightBound = 50 + widthAtCurrentHeight / 2;
        return x >= leftBound && x <= rightBound;
      }

      return false;
    };

    const hasCollision = (x: number, y: number) => {
      return ornaments.some((ornament) => {
        const dx = x - ornament.x;
        const dy = y - ornament.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < 2.3;
      });
    };

    // Generate 200 ornaments within the tree shape
    let attempts = 0;
    while (ornaments.length < 250 && attempts < 800) {
      const x = 2 + Math.random() * 90; // Random x between 10-90
      const y = 16 + Math.random() * 61; // Random y between 8-77

      if (isInsideTree(x, y) && !hasCollision(x, y)) {
        const color =
          ornamentColors[
            Math.floor(Math.random() * ornamentColors.length)
          ];
        ornaments.push({
          id: ornaments.length,
          text: "",
          x,
          y,
          color,
        });
      }
      attempts++;
    }

    return ornaments;
  }

  const updateOrnamentText = (id: number, text: string) => {
    setOrnaments((prev) =>
      prev.map((ornament) =>
        ornament.id === id ? { ...ornament, text } : ornament,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#334155] relative overflow-hidden">
      <SnowEffect />

      <div className="relative z-1- container mx-auto px-4 py-20">
        <div className="relative mx-auto max-w-3xl mb-0">
          <div className="bg-gradient-to-r from-[#dc2626] via-[#16a34a] to-[#dc2626] p-1 rounded-2xl shadow-2xl">
            <div className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-xl py-4 px-6 border-2 border-[#fbbf24]">
              <h1 className="text-center text-[#fef3c7] mb-2 tracking-wide drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] animate-pulse" style={{ 
                textShadow: '2px 2px 4px rgba(220, 38, 38, 0.3), -2px -2px 4px rgba(34, 197, 94, 0.3)',
                fontFamily: 'HEINEKEN core, bold',
                fontStyle: 'bold',
                fontSize: '23px'
              }}>
                🎄 Transformation Compliment Tree 🎄
              </h1>
              <p className="text-center text-[#fde68a] mb-0 max-w-2xl mx-auto drop-shadow-lg" style={{
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                fontFamily: 'HEINEKEN core'
              }}>
                Click an ornament to compliment someone. Optionally, write your name.
              </p>
            </div>
          </div>
        </div>

        <ChristmasTree
          ornaments={ornaments}
          onUpdateOrnament={updateOrnamentText}
        />
      </div>
    </div>
  );
}