import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import maps from "../../../data/maps.json";
import { CLASSIC_ADJACENCY, EXTENSION_ADJACENCY } from "../../../data/adjacency";
import "./Generator.css";

type ResourceType = 'forest' | 'pasture' | 'field' | 'brick' | 'mountains' | 'desert' | 'water';

interface Tile {
  id: number;
  type: ResourceType;
  number: number | null;
  startPos: { x: number; y: number }; 
}

interface MapData {
  rows: number[];
  resources: Partial<Record<ResourceType, number>>;
  numbers: number[];
}

const MAPS_CONFIG = maps as Record<string, MapData>;

export default function GeneratorMap() {
  const { t } = useTranslation();
  const location = useLocation();
  const baseUrl = import.meta.env.BASE_URL;
  const locationState = location.state as { mapType?: string } | null;
  const mapType = locationState?.mapType || 'classic';

  const [board, setBoard] = useState<Tile[][]>([]);
  const [showNumbers, setShowNumbers] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const getResourceImage = (type: ResourceType): string => {
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const fileName = type === 'field' ? 'fields' : type;
    return `${cleanBase}assets/Cards/${fileName}.webp`;
  };

  const getRandomStart = () => {
    const dist = 1000;
    const angles = [0, 90, 180, 270]; 
    const angle = angles[Math.floor(Math.random() * angles.length)];
    return {
      x: angle === 0 ? -dist : angle === 180 ? dist : (Math.random() - 0.5) * dist,
      y: angle === 90 ? -dist : angle === 270 ? dist : (Math.random() - 0.5) * dist,
    };
  };

  const handleGenerate = useCallback(() => {
    const config = MAPS_CONFIG[mapType];
    if (!config) return;

    const totalTiles = config.rows.reduce((a: number, b: number) => a + b, 0);
    const currentAdjacency = totalTiles > 19 ? EXTENSION_ADJACENCY : CLASSIC_ADJACENCY;

    const solveResources = (index: number, currentTiles: (ResourceType | null)[], remPool: Partial<Record<ResourceType, number>>): ResourceType[] | null => {
      if (index === totalTiles) return currentTiles as ResourceType[];
      const neighbors = currentAdjacency[index] || [];
      const forbidden = neighbors.map(nIdx => currentTiles[nIdx]).filter((t): t is ResourceType => t !== null);
      const options = (Object.keys(remPool) as ResourceType[])
        .filter(type => (remPool[type] ?? 0) > 0 && !forbidden.includes(type))
        .sort(() => Math.random() - 0.5);

      for (const type of options) {
        currentTiles[index] = type;
        remPool[type]! -= 1;
        if (solveResources(index + 1, currentTiles, remPool)) return currentTiles as ResourceType[];
        remPool[type]! += 1;
        currentTiles[index] = null;
      }
      return null;
    };

    const resultList = solveResources(0, Array(totalTiles).fill(null), { ...config.resources });

    if (resultList) {
      const numsPool = [...config.numbers];
      const finalNumbers: (number | null)[] = Array(totalTiles).fill(null);

      const canPlaceNumber = (num: number, idx: number, currentNums: (number | null)[]) => {
        const neighbors = currentAdjacency[idx] || [];
        for (const nIdx of neighbors) {
          const neighborNum = currentNums[nIdx];
          if (!neighborNum) continue;
          if ((num === 6 || num === 8) && (neighborNum === 6 || neighborNum === 8)) return false;
          if ((num === 2 || num === 12) && (neighborNum === 2 || neighborNum === 12)) return false;
        }
        return true;
      };

      let success = false;
      let attempts = 0;

      while (!success && attempts < 100) {
        const tempPool = [...numsPool].sort(() => Math.random() - 0.5);
        const tempNums: (number | null)[] = Array(totalTiles).fill(null);
        let possible = true;

        for (let i = 0; i < totalTiles; i++) {
          if (resultList[i] === 'desert' || resultList[i] === 'water') continue;
          const validIdx = tempPool.findIndex(n => canPlaceNumber(n, i, tempNums));
          if (validIdx !== -1) {
            tempNums[i] = tempPool.splice(validIdx, 1)[0];
          } else {
            possible = false;
            break;
          }
        }
        if (possible) {
          finalNumbers.splice(0, totalTiles, ...tempNums);
          success = true;
        }
        attempts++;
      }

      let globalIdx = 0;
      const newBoard = config.rows.map((size: number) => {
        const row: Tile[] = [];
        for (let i = 0; i < size; i++) {
          const type = resultList[globalIdx];
          row.push({
            id: globalIdx,
            type,
            number: finalNumbers[globalIdx],
            startPos: getRandomStart()
          });
          globalIdx++;
        }
        return row;
      });

      setBoard(newBoard);
      setShowNumbers(false);
      setAnimKey(prev => prev + 1);
    }
  }, [mapType]);

  useEffect(() => { handleGenerate(); }, [handleGenerate]);

  return (
    <div className="GeneratorMap">
      <div className="board-grid" key={animKey}>
        {board.map((row, rIdx) => (
          <div key={rIdx} className={`hex-row ${rIdx % 2 !== 0 ? 'shifted' : ''}`}>
            {row.map((tile) => (
              <motion.div 
                key={tile.id} 
                className="hex-tile"
                initial={{ x: tile.startPos.x, y: tile.startPos.y, opacity: 0, scale: 8 }}
                animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 70, damping: 15, delay: tile.id * 0.1 }}
              >
                <img src={getResourceImage(tile.type)} className="resource-image" alt={tile.type} />
                <AnimatePresence>
                  {showNumbers && tile.number && (
                    <motion.div
                      className={`number-circle ${tile.number === 6 || tile.number === 8 ? 'red-number' : ''}`}
                      initial={{ scale: 0, rotate: -180, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      exit={{ scale: 0, rotate: 180, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: tile.id * 0.08 }}
                    >
                      {tile.number}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
      <div className="controls">
        <button className="btn" onClick={handleGenerate}>{t("generate.regenerateMap")}</button>
        <button className="btn" onClick={() => setShowNumbers(!showNumbers)}>
          {showNumbers ? t("generate.hideNumbers") : t("generate.showNumbers")}
        </button>
      </div>
    </div>
  );
}