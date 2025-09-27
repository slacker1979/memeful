import { useState, useEffect } from "react";
// Animation imports removed due to build issues
import {
  Zap,
  Users,
  Building,
  Cpu,
  Battery,
  Sun,
  Wind,
  Factory,
  Mountain,
  Home,
  Server,
  Thermometer,
  Shield,
  DollarSign,
  Cloud,
  CloudRain,
  Snowflake,
  AlertTriangle,
  Settings,
  Info,
  Plus,
  Trash2,
  Eye,
  ArrowLeft,
  RotateCcw,
  Package,
  Lock,
  CheckCircle,
  XCircle,
  Warehouse,
  Fuel,
  Wrench,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";

// Game constants
const GRID_SIZE = 12;

// Weather effects
const WEATHER_EFFECTS = {
  sunny: {
    name: "Sunny",
    solarMultiplier: 1.3,
    windMultiplier: 0.8,
    damageChance: 0,
    icon: Sun,
  },
  cloudy: {
    name: "Cloudy",
    solarMultiplier: 0.7,
    windMultiplier: 1.0,
    damageChance: 0,
    icon: Cloud,
  },
  rainy: {
    name: "Rainy",
    solarMultiplier: 0.4,
    windMultiplier: 1.2,
    damageChance: 0.1,
    icon: CloudRain,
  },
  stormy: {
    name: "Stormy",
    solarMultiplier: 0.2,
    windMultiplier: 1.5,
    damageChance: 0.3,
    icon: CloudRain,
  },
  windy: {
    name: "Windy",
    solarMultiplier: 1.0,
    windMultiplier: 1.8,
    damageChance: 0.05,
    icon: Wind,
  },
};

// Enhanced asset definitions with prerequisites and detailed requirements
const ASSET_DEFINITIONS = {
  // LAND
  land: {
    name: "Land Plot",
    cost: 500,
    size: 1,
    category: "land",
    icon: Mountain,
    description: "Basic land plot for development",
    prerequisites: [],
    provides: ["land_plot"],
    powerType: null,
    powerConsumption: 0,
    powerGeneration: 0,
    spaceProvided: 0,
    coolingProvided: 0,
    maintenanceCost: 0,
  },

  // RESIDENTIAL / COMMERCIAL POWER
  residential_electric: {
    name: "Residential Electric",
    cost: 2000,
    size: 1,
    category: "power",
    icon: Zap,
    description: "Basic electrical hookup for small operations",
    prerequisites: ["land_plot"],
    provides: ["residential_power"],
    powerType: "residential",
    powerConsumption: 0,
    powerGeneration: 150,
    spaceProvided: 0,
    coolingProvided: 0,
    maintenanceCost: 30,
  },

  commercial_electric: {
    name: "Commercial Electric",
    cost: 8000,
    size: 1,
    category: "power",
    icon: Battery,
    description: "High-capacity commercial power connection",
    prerequisites: ["land_plot"],
    provides: ["commercial_power"],
    powerType: "commercial",
    powerConsumption: 0,
    powerGeneration: 500,
    spaceProvided: 0,
    coolingProvided: 0,
    maintenanceCost: 100,
  },

  // RENEWABLE POWER
  solar_panel: {
    name: "Solar Panel",
    cost: 5000,
    size: 1,
    category: "power",
    icon: Sun,
    description: "Clean solar energy affected by weather",
    prerequisites: ["land_plot"],
    provides: ["renewable_power"],
    powerType: "renewable",
    powerConsumption: 0,
    powerGeneration: 80,
    spaceProvided: 0,
    coolingProvided: 0,
    maintenanceCost: 25,
    weatherDependent: "solar",
  },

  wind_turbine: {
    name: "Wind Turbine",
    cost: 12000,
    size: 1,
    category: "power",
    icon: Wind,
    description: "Wind power generation with variable output",
    prerequisites: ["land_plot"],
    provides: ["renewable_power"],
    powerType: "renewable",
    powerConsumption: 0,
    powerGeneration: 120,
    spaceProvided: 0,
    coolingProvided: 0,
    maintenanceCost: 40,
    weatherDependent: "wind",
  },

  // POWER PLANTS
  coal_plant: {
    name: "Coal Plant",
    cost: 35000,
    size: 4,
    category: "power",
    icon: Factory,
    description: "Large industrial power plant",
    prerequisites: ["4_connected_land"],
    provides: ["industrial_power"],
    powerType: "industrial",
    powerConsumption: 0,
    powerGeneration: 1000,
    spaceProvided: 0,
    coolingProvided: 0,
    maintenanceCost: 200,
    fuelCost: 150,
  },

  nuclear_plant: {
    name: "Nuclear Plant",
    cost: 150000,
    size: 9,
    category: "power",
    icon: Zap,
    description: "Massive nuclear power facility",
    prerequisites: ["9_connected_land"],
    provides: ["mega_power"],
    powerType: "nuclear",
    powerConsumption: 0,
    powerGeneration: 5000,
    spaceProvided: 0,
    coolingProvided: 0,
    maintenanceCost: 800,
    fuelCost: 400,
  },

  // GENERATORS (BACKUP)
  diesel_generator: {
    name: "Diesel Generator",
    cost: 3000,
    size: 1,
    category: "power",
    icon: Fuel,
    description: "Backup power with insurance coverage",
    prerequisites: ["land_plot"],
    provides: ["backup_power"],
    powerType: "backup",
    powerConsumption: 0,
    powerGeneration: 100,
    spaceProvided: 0,
    coolingProvided: 0,
    maintenanceCost: 50,
    fuelCost: 80,
    isBackup: true,
  },

  // BUILDINGS - Small
  closet: {
    name: "Storage Closet",
    cost: 1500,
    size: 1,
    category: "building",
    icon: Home,
    description: "Tiny space for 1-2 small miners",
    prerequisites: ["land_plot", "residential_power"],
    provides: ["small_building"],
    powerType: null,
    powerConsumption: 20, // ventilation
    powerGeneration: 0,
    spaceProvided: 2,
    coolingProvided: 10,
    maintenanceCost: 10,
    maxMinerSize: "small",
  },

  garage: {
    name: "Garage",
    cost: 5000,
    size: 1,
    category: "building",
    icon: Home,
    description: "Residential garage converted for mining",
    prerequisites: ["land_plot", "residential_power"],
    provides: ["residential_building"],
    powerType: null,
    powerConsumption: 50,
    powerGeneration: 0,
    spaceProvided: 4,
    coolingProvided: 20,
    maintenanceCost: 25,
    maxMinerSize: "medium",
  },

  shed: {
    name: "Storage Shed",
    cost: 8000,
    size: 1,
    category: "building",
    icon: Building,
    description: "Outdoor shed with basic amenities",
    prerequisites: ["land_plot", "residential_power"],
    provides: ["outdoor_building"],
    powerType: null,
    powerConsumption: 30,
    powerGeneration: 0,
    spaceProvided: 6,
    coolingProvided: 30,
    maintenanceCost: 20,
    maxMinerSize: "medium",
  },

  // BUILDINGS - Large
  warehouse: {
    name: "Warehouse",
    cost: 25000,
    size: 4, // 2x2
    category: "building",
    icon: Warehouse,
    description:
      "Large warehouse requiring 4 connected land plots",
    prerequisites: ["4_connected_land", "commercial_power"],
    provides: ["industrial_building"],
    powerType: null,
    powerConsumption: 200, // AC and ventilation
    powerGeneration: 0,
    spaceProvided: 20,
    coolingProvided: 80,
    maintenanceCost: 150,
    maxMinerSize: "large",
  },

  datacenter: {
    name: "Data Center",
    cost: 75000,
    size: 9, // 3x3
    category: "building",
    icon: Server,
    description:
      "Professional data center with advanced cooling",
    prerequisites: ["9_connected_land", "commercial_power"],
    provides: ["datacenter_building"],
    powerType: null,
    powerConsumption: 500, // Advanced cooling
    powerGeneration: 0,
    spaceProvided: 50,
    coolingProvided: 200,
    maintenanceCost: 400,
    maxMinerSize: "any",
  },

  cave: {
    name: "Underground Cave",
    cost: 45000,
    size: 4,
    category: "building",
    icon: Mountain,
    description: "Natural underground space with free cooling",
    prerequisites: ["4_connected_land"],
    provides: ["natural_building"],
    powerType: null,
    powerConsumption: 50, // Minimal ventilation
    powerGeneration: 0,
    spaceProvided: 16,
    coolingProvided: 150, // Natural cooling
    maintenanceCost: 75,
    maxMinerSize: "large",
    stormResistance: 0.9,
  },

  // MINING EQUIPMENT
  raspberry_pi: {
    name: "Raspberry Pi Miner",
    cost: 200,
    size: 1,
    category: "miner",
    icon: Cpu,
    description: "Entry-level hobby miner",
    prerequisites: ["small_space", "residential_power"],
    provides: ["basic_mining"],
    powerType: null,
    powerConsumption: 15,
    powerGeneration: 0,
    spaceRequired: 1,
    coolingRequired: 5,
    hashRate: 25,
    heatGeneration: 5,
    maintenanceCost: 2,
    minerSize: "small",
    reliability: 0.95,
  },

  cpu_miner: {
    name: "CPU Miner",
    cost: 1000,
    size: 1,
    category: "miner",
    icon: Cpu,
    description: "Standard desktop computer mining",
    prerequisites: ["small_space", "residential_power"],
    provides: ["cpu_mining"],
    powerType: null,
    powerConsumption: 150,
    powerGeneration: 0,
    spaceRequired: 1,
    coolingRequired: 30,
    hashRate: 100,
    heatGeneration: 30,
    maintenanceCost: 10,
    minerSize: "small",
    reliability: 0.92,
  },

  gpu_miner: {
    name: "GPU Miner",
    cost: 3500,
    size: 1,
    category: "miner",
    icon: Cpu,
    description: "High-performance graphics card mining",
    prerequisites: ["residential_space", "residential_power"],
    provides: ["gpu_mining"],
    powerType: null,
    powerConsumption: 350,
    powerGeneration: 0,
    spaceRequired: 1,
    coolingRequired: 80,
    hashRate: 500,
    heatGeneration: 80,
    maintenanceCost: 30,
    minerSize: "medium",
    reliability: 0.88,
  },

  gpu_rig: {
    name: "6-GPU Mining Rig",
    cost: 15000,
    size: 1,
    category: "miner",
    icon: Cpu,
    description:
      "Multiple GPU setup requiring commercial power",
    prerequisites: ["residential_space", "commercial_power"],
    provides: ["rig_mining"],
    powerType: null,
    powerConsumption: 1800,
    powerGeneration: 0,
    spaceRequired: 2,
    coolingRequired: 400,
    hashRate: 2500,
    heatGeneration: 400,
    maintenanceCost: 120,
    minerSize: "large",
    reliability: 0.85,
  },

  asic_miner: {
    name: "ASIC Miner",
    cost: 8000,
    size: 1,
    category: "miner",
    icon: Cpu,
    description: "Professional ASIC mining hardware",
    prerequisites: ["commercial_space", "commercial_power"],
    provides: ["asic_mining"],
    powerType: null,
    powerConsumption: 1200,
    powerGeneration: 0,
    spaceRequired: 1,
    coolingRequired: 300,
    hashRate: 3000,
    heatGeneration: 300,
    maintenanceCost: 80,
    minerSize: "large",
    reliability: 0.9,
  },

  industrial_asic: {
    name: "Industrial ASIC",
    cost: 25000,
    size: 1,
    category: "miner",
    icon: Server,
    description: "Industrial-grade mining equipment",
    prerequisites: ["industrial_space", "commercial_power"],
    provides: ["industrial_mining"],
    powerType: null,
    powerConsumption: 3000,
    powerGeneration: 0,
    spaceRequired: 3,
    coolingRequired: 800,
    hashRate: 8000,
    heatGeneration: 800,
    maintenanceCost: 200,
    minerSize: "industrial",
    reliability: 0.93,
  },

  // WORKERS
  technician: {
    name: "Technician",
    cost: 0,
    salary: 200,
    category: "worker",
    icon: Users,
    description: "Improves efficiency and reduces downtime",
    prerequisites: ["any_building"],
    provides: ["basic_maintenance"],
    efficiencyBonus: 1.1,
    repairSpeed: 1.5,
    maintenanceCost: 0,
  },

  engineer: {
    name: "Senior Engineer",
    cost: 0,
    salary: 500,
    category: "worker",
    icon: Users,
    description: "Advanced maintenance and optimization",
    prerequisites: ["industrial_building"],
    provides: ["advanced_maintenance"],
    efficiencyBonus: 1.25,
    repairSpeed: 3.0,
    optimizationBonus: 1.15,
    maintenanceCost: 0,
  },
} as const;

type AssetKey = keyof typeof ASSET_DEFINITIONS;

interface LandPlot {
  x: number;
  y: number;
  owned: boolean;
  developed: boolean;
  asset: Asset | null;
}

interface Asset {
  id: string;
  type: AssetKey;
  x: number;
  y: number;
  health: number;
  isInsured: boolean;
  isActive: boolean;
  contents?: Asset[]; // For buildings containing miners
  fuelLevel?: number; // For generators
  lastMaintenance?: number;
}

interface InventoryItem {
  type: AssetKey;
  quantity: number;
  cost: number;
}

interface GameState {
  money: number;
  landGrid: LandPlot[][];
  inventory: InventoryItem[];
  placedAssets: Asset[];
  selectedCell: { x: number; y: number } | null;
  selectedAsset: Asset | null;
  weather: keyof typeof WEATHER_EFFECTS;
  weatherTimer: number;
  totalPower: number;
  totalConsumption: number;
  totalHashRate: number;
  workers: Asset[];
  viewMode: "grid" | "interior";
  interiorBuilding: Asset | null;
  gameTime: number;
}

interface MiningTycoonProps {
  userPoints: number;
  onPointsChange: (points: number) => void;
}

export function MiningTycoon({
  userPoints,
  onPointsChange,
}: MiningTycoonProps) {
  const [gameState, setGameState] = useState<GameState>({
    money: 50000,
    landGrid: Array(GRID_SIZE)
      .fill(null)
      .map((_, y) =>
        Array(GRID_SIZE)
          .fill(null)
          .map((_, x) => ({
            x,
            y,
            owned: false,
            developed: false,
            asset: null,
          })),
      ),
    inventory: [],
    placedAssets: [],
    selectedCell: null,
    selectedAsset: null,
    weather: "sunny",
    weatherTimer: 300,
    totalPower: 0,
    totalConsumption: 0,
    totalHashRate: 0,
    workers: [],
    viewMode: "grid",
    interiorBuilding: null,
    gameTime: 0,
  });

  const [showShop, setShowShop] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [selectedAssetType, setSelectedAssetType] =
    useState<AssetKey | null>(null);
  const [prereqErrors, setPrereqErrors] = useState<string[]>(
    [],
  );
  const [activeTab, setActiveTab] = useState<
    "shop" | "inventory" | "workers"
  >("shop");

  // Calculate total resources
  useEffect(() => {
    const calculateResources = () => {
      let totalPower = 0;
      let totalConsumption = 0;
      let totalHashRate = 0;

      gameState.placedAssets.forEach((asset) => {
        const assetDef = ASSET_DEFINITIONS[asset.type] as any;
        const healthMultiplier =
          Math.max(0, asset.health) / 100;

        // Power generation with weather effects
        if (assetDef.powerGeneration > 0) {
          let power = assetDef.powerGeneration;

          if ((assetDef as any).weatherDependent === "solar") {
            power *=
              WEATHER_EFFECTS[gameState.weather]
                .solarMultiplier;
          } else if (
            (assetDef as any).weatherDependent === "wind"
          ) {
            power *=
              WEATHER_EFFECTS[gameState.weather].windMultiplier;
          }

          totalPower += power * healthMultiplier;
        }

        // Power consumption
        if ((assetDef as any).powerConsumption > 0) {
          totalConsumption += (assetDef as any)
            .powerConsumption;
        }

        // Mining hash rate
        if ((assetDef as any).hashRate && asset.isActive) {
          totalHashRate +=
            (assetDef as any).hashRate * healthMultiplier;
        }

        // Building contents
        if (asset.contents) {
          asset.contents.forEach((content) => {
            const contentDef = ASSET_DEFINITIONS[
              content.type
            ] as any;
            if ((contentDef as any).powerConsumption) {
              totalConsumption += (contentDef as any)
                .powerConsumption;
            }
            if (
              (contentDef as any).hashRate &&
              content.isActive
            ) {
              totalHashRate +=
                (contentDef as any).hashRate *
                (Math.max(0, content.health) / 100);
            }
          });
        }
      });

      setGameState((prev) => ({
        ...prev,
        totalPower,
        totalConsumption,
        totalHashRate,
      }));
    };

    calculateResources();
  }, [gameState.placedAssets, gameState.weather]);

  // Game simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState((prev) => {
        const newState: GameState = {
          ...prev,
          gameTime: prev.gameTime + 1,
        };

        // Weather changes (keep integer timer)
        if (newState.weatherTimer <= 0) {
          const weathers = Object.keys(
            WEATHER_EFFECTS,
          ) as (keyof typeof WEATHER_EFFECTS)[];
          newState.weather =
            weathers[
              Math.floor(Math.random() * weathers.length)
            ];
          newState.weatherTimer = Math.floor(
            180 + Math.random() * 300,
          );
        } else {
          newState.weatherTimer = Math.max(
            0,
            Math.floor(newState.weatherTimer - 1),
          );
        }

        // Weather damage
        const damageChance =
          WEATHER_EFFECTS[newState.weather].damageChance;
        if (damageChance > 0) {
          newState.placedAssets = newState.placedAssets.map(
            (asset) => {
              if (Math.random() < damageChance * 0.01) {
                const assetDef = ASSET_DEFINITIONS[
                  asset.type
                ] as any;
                const resistance =
                  assetDef.stormResistance || 0;
                const damage =
                  (1 - resistance) * (5 + Math.random() * 15);
                return {
                  ...asset,
                  health: Math.max(0, asset.health - damage),
                };
              }
              return asset;
            },
          );
        }

        // Mining income (only if sufficient power)
        if (
          newState.totalHashRate > 0 &&
          newState.totalPower >= newState.totalConsumption
        ) {
          const income = Math.floor(
            newState.totalHashRate * 0.12,
          );
          newState.money += income;
          onPointsChange(
            userPoints + Math.floor(income * 0.15),
          );
        }

        // Operating costs (per minute)
        const operatingCosts =
          calculateOperatingCosts(newState);
        newState.money = Math.max(
          0,
          newState.money - operatingCosts,
        );

        return newState;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [userPoints, onPointsChange]);

  const calculateOperatingCosts = (state: GameState) => {
    let costs = 0;

    // Asset-related recurring costs
    state.placedAssets.forEach((asset) => {
      const assetDef = ASSET_DEFINITIONS[asset.type] as any;
      costs += (assetDef.maintenanceCost || 0) / 60;
      costs += (assetDef.fuelCost || 0) / 60;
    });

    // Worker salaries (per hour -> per minute)
    state.workers.forEach((worker) => {
      const def = ASSET_DEFINITIONS[worker.type] as any;
      costs += (def.salary || 0) / 60;
    });

    return Math.floor(costs);
  };

  // Land purchasing
  const purchaseLand = (x: number, y: number) => {
    const landCost = 500;
    if (gameState.money < landCost) return false;

    setGameState((prev) => ({
      ...prev,
      money: prev.money - landCost,
      landGrid: prev.landGrid.map((row, rowIndex) =>
        row.map((plot, colIndex) =>
          rowIndex === y && colIndex === x
            ? { ...plot, owned: true }
            : plot,
        ),
      ),
    }));

    return true;
  };

  // Helper checks
  const hasConnectedLand = (
    x: number,
    y: number,
    width: number,
    height: number,
  ): boolean => {
    for (let dx = 0; dx < width; dx++) {
      for (let dy = 0; dy < height; dy++) {
        const plot = gameState.landGrid[y + dy]?.[x + dx];
        if (!plot?.owned || plot.asset) {
          return false;
        }
      }
    }
    return true;
  };

  const hasPowerInRange = (
    x: number,
    y: number,
    powerTypes: string[],
  ): boolean => {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const checkX = x + dx;
        const checkY = y + dy;
        const asset = gameState.placedAssets.find(
          (a) => a.x === checkX && a.y === checkY,
        );
        if (asset) {
          const assetDef = ASSET_DEFINITIONS[asset.type] as any;
          if (
            assetDef.powerType &&
            powerTypes.includes(assetDef.powerType)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const hasBuildingSpace = (
    x: number,
    y: number,
    spaceRequired: number,
    minerSize: string,
  ): boolean => {
    const plot = gameState.landGrid[y]?.[x];
    const asset = plot?.asset;
    if (asset) {
      const assetDef = ASSET_DEFINITIONS[asset.type] as any;
      if (assetDef.spaceProvided >= spaceRequired) {
        const maxSize = assetDef.maxMinerSize;
        if (
          maxSize === "any" ||
          maxSize === minerSize ||
          (maxSize === "large" &&
            ["small", "medium", "large"].includes(minerSize)) ||
          (maxSize === "medium" &&
            ["small", "medium"].includes(minerSize))
        ) {
          return true;
        }
      }
    }
    return false;
  };

  // Check prerequisites for asset placement
  const checkPrerequisites = (
    assetType: AssetKey,
    x: number,
    y: number,
  ): string[] => {
    const assetDef = ASSET_DEFINITIONS[assetType] as any;
    const errors: string[] = [];

    // Check if land is owned
    const plot = gameState.landGrid[y]?.[x];
    if (!plot?.owned) {
      errors.push("Land must be purchased first");
      return errors;
    }

    // Check if space is free
    if (plot.asset) {
      errors.push("Space is already occupied");
      return errors;
    }

    // Check for multi-tile requirements
    if (assetDef.size > 1) {
      const size = Math.sqrt(assetDef.size);
      for (let dx = 0; dx < size; dx++) {
        for (let dy = 0; dy < size; dy++) {
          const checkPlot =
            gameState.landGrid[y + dy]?.[x + dx];
          if (!checkPlot?.owned || checkPlot.asset) {
            errors.push(
              `Requires ${size}x${size} connected owned land`,
            );
            return errors;
          }
        }
      }
    }

    // Check specific prerequisites
    assetDef.prerequisites.forEach((req: string) => {
      switch (req) {
        case "land_plot":
          break;
        case "4_connected_land":
          if (!hasConnectedLand(x, y, 2, 2)) {
            errors.push("Requires 4 connected land plots");
          }
          break;
        case "9_connected_land":
          if (!hasConnectedLand(x, y, 3, 3)) {
            errors.push("Requires 9 connected land plots");
          }
          break;
        case "residential_power":
          if (
            !hasPowerInRange(x, y, [
              "residential",
              "commercial",
              "industrial",
              "nuclear",
            ])
          ) {
            errors.push("Requires residential power or better");
          }
          break;
        case "commercial_power":
          if (
            !hasPowerInRange(x, y, [
              "commercial",
              "industrial",
              "nuclear",
            ])
          ) {
            errors.push("Requires commercial power or better");
          }
          break;
        case "small_space":
          if (!hasBuildingSpace(x, y, 1, "small")) {
            errors.push(
              "Requires space in small building or better",
            );
          }
          break;
        case "residential_space":
          if (!hasBuildingSpace(x, y, 1, "medium")) {
            errors.push(
              "Requires space in residential building or better",
            );
          }
          break;
        case "commercial_space":
          if (!hasBuildingSpace(x, y, 2, "large")) {
            errors.push(
              "Requires space in commercial building",
            );
          }
          break;
        case "industrial_space":
          if (!hasBuildingSpace(x, y, 3, "industrial")) {
            errors.push(
              "Requires space in industrial building",
            );
          }
          break;
        case "any_building": {
          const p = gameState.landGrid[y]?.[x];
          if (
            !p?.asset ||
            (ASSET_DEFINITIONS[p.asset.type] as any)
              .category !== "building"
          ) {
            errors.push("Requires a building");
          }
          break;
        }
      }
    });

    // Check if enough money
    if (gameState.money < (assetDef.cost || 0)) {
      errors.push(
        `Insufficient funds: $${(assetDef.cost || 0).toLocaleString()}`,
      );
    }

    return errors;
  };

  // Purchase asset for inventory (not workers)
  const purchaseAsset = (assetType: AssetKey, quantity = 1) => {
    const assetDef = ASSET_DEFINITIONS[assetType] as any;
    const totalCost = (assetDef.cost || 0) * quantity;
    if (gameState.money < totalCost) return false;

    setGameState((prev) => {
      const existingItem = prev.inventory.find(
        (item) => item.type === assetType,
      );
      const newInventory = existingItem
        ? prev.inventory.map((item) =>
            item.type === assetType
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [
            ...prev.inventory,
            {
              type: assetType,
              quantity,
              cost: assetDef.cost || 0,
            },
          ];

      return {
        ...prev,
        money: prev.money - totalCost,
        inventory: newInventory,
      };
    });
    return true;
  };

  // Place asset from inventory
  const placeAssetFromInventory = (
    assetType: AssetKey,
    x: number,
    y: number,
  ) => {
    const errors = checkPrerequisites(assetType, x, y);
    setPrereqErrors(errors);
    if (errors.length > 0) return false;

    const inventoryItem = gameState.inventory.find(
      (item) => item.type === assetType,
    );
    if (!inventoryItem || inventoryItem.quantity < 1)
      return false;

    const assetDef = ASSET_DEFINITIONS[assetType] as any;
    const newAsset: Asset = {
      id: `${assetType}_${Date.now()}`,
      type: assetType,
      x,
      y,
      health: 100,
      isInsured: false,
      isActive: true,
      contents:
        assetDef.category === "building" ? [] : undefined,
    };

    setGameState((prev) => {
      const newLandGrid = prev.landGrid.map((row, rowIndex) =>
        row.map((plot, colIndex) => {
          // Handle multi-tile assets
          if (assetDef.size > 1) {
            const size = Math.sqrt(assetDef.size);
            if (
              rowIndex >= y &&
              rowIndex < y + size &&
              colIndex >= x &&
              colIndex < x + size
            ) {
              return {
                ...plot,
                developed: true,
                asset: newAsset,
              };
            }
          }
          if (rowIndex === y && colIndex === x) {
            return {
              ...plot,
              developed: true,
              asset: newAsset,
            };
          }
          return plot;
        }),
      );

      const newInventory = prev.inventory
        .map((item) =>
          item.type === assetType
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);

      return {
        ...prev,
        landGrid: newLandGrid,
        placedAssets: [...prev.placedAssets, newAsset],
        inventory: newInventory,
        selectedAsset: newAsset,
      };
    });

    return true;
  };

  const removeAsset = (asset: Asset) => {
    setGameState((prev) => {
      const newLandGrid = prev.landGrid.map((row) =>
        row.map((plot) =>
          plot.asset?.id === asset.id
            ? { ...plot, developed: false, asset: null }
            : plot,
        ),
      );

      const assetDef = ASSET_DEFINITIONS[asset.type] as any;
      const existingItem = prev.inventory.find(
        (item) => item.type === asset.type,
      );
      const newInventory = existingItem
        ? prev.inventory.map((item) =>
            item.type === asset.type
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [
            ...prev.inventory,
            {
              type: asset.type,
              quantity: 1,
              cost: assetDef.cost || 0,
            },
          ];

      return {
        ...prev,
        landGrid: newLandGrid,
        placedAssets: prev.placedAssets.filter(
          (a) => a.id !== asset.id,
        ),
        inventory: newInventory,
        money:
          prev.money + Math.floor((assetDef.cost || 0) * 0.5),
        selectedAsset: null,
      };
    });
  };

  const hireWorker = (workerType: AssetKey) => {
    const def = ASSET_DEFINITIONS[workerType] as any;
    if (def?.category !== "worker") return;
    setGameState((prev) => ({
      ...prev,
      workers: [
        ...prev.workers,
        {
          id: `${workerType}_${Date.now()}`,
          type: workerType,
          x: -1,
          y: -1,
          health: 100,
          isInsured: false,
          isActive: true,
        },
      ],
    }));
  };

  const handleGridClick = (x: number, y: number) => {
    const plot = gameState.landGrid[y][x];
    // If trying to place from selectedAssetType, attempt placement
    if (selectedAssetType) {
      const ok = placeAssetFromInventory(
        selectedAssetType,
        x,
        y,
      );
      if (ok) setSelectedAssetType(null);
      return;
    }

    // Else select cell / asset
    setGameState((prev) => ({
      ...prev,
      selectedCell: { x, y },
      selectedAsset: plot.asset ?? null,
    }));
  };

  const efficiencyPct = Math.floor(
    Math.min(
      1,
      gameState.totalPower /
        Math.max(1, gameState.totalConsumption),
    ) * 100,
  );

  const WeatherIcon = WEATHER_EFFECTS[gameState.weather].icon;

  // ----------------- UI -----------------
  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6" />
          <h1 className="text-xl font-semibold">
            Mining Tycoon
          </h1>
          <Badge variant="secondary" className="ml-2">
            v0.2
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span className="font-semibold">
                ${gameState.money.toLocaleString()}
              </span>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <WeatherIcon className="w-4 h-4" />
              <span className="font-medium">
                {WEATHER_EFFECTS[gameState.weather].name}
              </span>
              <Badge variant="outline">
                T-{gameState.weatherTimer}s
              </Badge>
            </div>
          </Card>
          <Card className="p-3 w-56">
            <div className="text-xs text-muted-foreground mb-1">
              Power Efficiency
            </div>
            <Progress value={efficiencyPct} />
            <div className="text-xs mt-1">{efficiencyPct}%</div>
          </Card>
        </div>
      </div>

      {/* Main area */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left: Grid */}
        <Card className="col-span-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              Land Grid
            </CardTitle>
            <CardDescription>
              Purchase land, place buildings/power/miners, and
              expand.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                gap: "4px",
              }}
            >
              {gameState.landGrid.map((row, y) =>
                row.map((plot, x) => {
                  const isSelected =
                    gameState.selectedCell?.x === x &&
                    gameState.selectedCell?.y === y;
                  const classes =
                    "aspect-square rounded-sm border flex items-center justify-center text-[10px] cursor-pointer select-none " +
                    (plot.owned
                      ? "bg-zinc-900/30"
                      : "bg-zinc-900/10") +
                    (isSelected ? " ring-2 ring-blue-500" : "");
                  return (
                    <div
                      key={`${x}-${y}`}
                      className={classes}
                      onClick={() => handleGridClick(x, y)}
                      title={
                        plot.asset
                          ? ASSET_DEFINITIONS[plot.asset.type]
                              .name
                          : plot.owned
                            ? "Owned land"
                            : "Unowned land"
                      }
                    >
                      {plot.asset ? (
                        <div className="flex flex-col items-center gap-1">
                          {(() => {
                            const Icon =
                              (
                                ASSET_DEFINITIONS[
                                  plot.asset!.type
                                ] as any
                              ).icon || Package;
                            return <Icon className="w-4 h-4" />;
                          })()}
                          <span className="truncate max-w-[80%]">
                            {
                              (
                                ASSET_DEFINITIONS[
                                  plot.asset.type
                                ] as any
                              ).name
                            }
                          </span>
                        </div>
                      ) : plot.owned ? (
                        <span>•</span>
                      ) : (
                        <Button
                          size="xs"
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            purchaseLand(x, y);
                          }}
                        >
                          Buy
                        </Button>
                      )}
                    </div>
                  );
                }),
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right: Panel */}
        <div className="col-span-4 space-y-4">
          {/* Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                Operation Status
              </CardTitle>
              <CardDescription>
                Power, consumption, and hashrate overview.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Power
                </span>
                <span>
                  {Math.floor(gameState.totalPower)} kW
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Battery className="w-4 h-4" /> Consumption
                </span>
                <span>
                  {Math.floor(gameState.totalConsumption)} kW
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Server className="w-4 h-4" /> Hashrate
                </span>
                <span>
                  {Math.floor(gameState.totalHashRate)} H/s
                </span>
              </div>
              <Separator className="my-2" />
              <div className="text-xs text-muted-foreground">
                Efficiency reflects available power vs. total
                consumption. Income accrues when power ≥
                consumption.
              </div>
            </CardContent>
          </Card>

          {/* Selected asset details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                Selection
              </CardTitle>
              <CardDescription>
                Details and actions for selected cell/asset.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {gameState.selectedAsset ? (
                <>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">
                      {
                        (
                          ASSET_DEFINITIONS[
                            gameState.selectedAsset.type
                          ] as any
                        ).name
                      }
                    </div>
                    <Badge variant="outline">
                      {
                        (
                          ASSET_DEFINITIONS[
                            gameState.selectedAsset.type
                          ] as any
                        ).category
                      }
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {
                      (
                        ASSET_DEFINITIONS[
                          gameState.selectedAsset.type
                        ] as any
                      ).description
                    }
                  </div>
                  <div>
                    <div className="text-xs mb-1">Health</div>
                    <Progress
                      value={Math.max(
                        0,
                        Math.floor(
                          gameState.selectedAsset.health,
                        ),
                      )}
                    />
                    <div className="text-xs mt-1">
                      {Math.max(
                        0,
                        Math.floor(
                          gameState.selectedAsset.health,
                        ),
                      )}
                      %
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        // quick repair: +10 health (demo)
                        setGameState((prev) => ({
                          ...prev,
                          placedAssets: prev.placedAssets.map(
                            (a) =>
                              a.id === prev.selectedAsset!.id
                                ? {
                                    ...a,
                                    health: Math.min(
                                      100,
                                      a.health + 10,
                                    ),
                                  }
                                : a,
                          ),
                          selectedAsset: prev.selectedAsset
                            ? {
                                ...prev.selectedAsset,
                                health: Math.min(
                                  100,
                                  prev.selectedAsset.health +
                                    10,
                                ),
                              }
                            : prev.selectedAsset,
                        }));
                      }}
                    >
                      <Wrench className="w-4 h-4 mr-1" />
                      Repair +10
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        removeAsset(gameState.selectedAsset!)
                      }
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </>
              ) : gameState.selectedCell ? (
                <>
                  <div className="text-sm">
                    Cell: ({gameState.selectedCell.x + 1},{" "}
                    {gameState.selectedCell.y + 1})
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {gameState.landGrid[
                      gameState.selectedCell.y
                    ][gameState.selectedCell.x].owned
                      ? "Owned land. Place an asset from Inventory."
                      : "Unowned land. Purchase to build here."}
                  </div>
                </>
              ) : (
                <div className="text-xs text-muted-foreground">
                  Select a grid cell to view details.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Build / Inventory / Workers */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                Manage
              </CardTitle>
              <CardDescription>
                Shop, inventory, and staffing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as any)}
              >
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="shop">Shop</TabsTrigger>
                  <TabsTrigger value="inventory">
                    Inventory
                  </TabsTrigger>
                  <TabsTrigger value="workers">
                    Workers
                  </TabsTrigger>
                </TabsList>

                {/* Shop */}
                <TabsContent value="shop" className="pt-3">
                  <ShopView
                    onBuy={purchaseAsset}
                    money={gameState.money}
                  />
                </TabsContent>

                {/* Inventory */}
                <TabsContent value="inventory" className="pt-3">
                  <InventoryView
                    inventory={gameState.inventory}
                    selectedAssetType={selectedAssetType}
                    setSelectedAssetType={setSelectedAssetType}
                  />
                  {selectedAssetType && (
                    <div className="mt-2 text-xs text-blue-400">
                      Click a cell on the grid to place{" "}
                      <b>
                        {
                          (
                            ASSET_DEFINITIONS[
                              selectedAssetType
                            ] as any
                          ).name
                        }
                      </b>
                      .
                    </div>
                  )}
                  {prereqErrors.length > 0 && (
                    <div className="mt-2 text-xs text-red-400 space-y-1">
                      {prereqErrors.map((e, i) => (
                        <div key={i}>• {e}</div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* Workers */}
                <TabsContent value="workers" className="pt-3">
                  <WorkersView
                    workers={gameState.workers}
                    onHire={hireWorker}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------- Subviews ---------- */

function ShopView({
  onBuy,
  money,
}: {
  onBuy: (type: AssetKey, qty?: number) => boolean;
  money: number;
}) {
  const categories: Array<{
    key: string;
    title: string;
    filter: (k: AssetKey) => boolean;
  }> = [
    {
      key: "land",
      title: "Land",
      filter: (k) =>
        (ASSET_DEFINITIONS[k] as any).category === "land",
    },
    {
      key: "power",
      title: "Power",
      filter: (k) =>
        (ASSET_DEFINITIONS[k] as any).category === "power",
    },
    {
      key: "building",
      title: "Buildings",
      filter: (k) =>
        (ASSET_DEFINITIONS[k] as any).category === "building",
    },
    {
      key: "miner",
      title: "Miners",
      filter: (k) =>
        (ASSET_DEFINITIONS[k] as any).category === "miner",
    },
  ];

  return (
    <div className="space-y-4">
      {categories.map((cat) => (
        <div key={cat.key}>
          <div className="font-medium mb-2">{cat.title}</div>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(ASSET_DEFINITIONS) as AssetKey[])
              .filter(cat.filter)
              .map((key) => {
                const def = ASSET_DEFINITIONS[key] as any;
                const Icon = def.icon || Package;
                const affordable = money >= (def.cost || 0);
                return (
                  <Card key={key}>
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <div className="text-sm">
                            {def.name}
                          </div>
                        </div>
                        <Badge variant="outline">
                          {def.category}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground h-8 line-clamp-2">
                        {def.description}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">
                          ${(def.cost || 0).toLocaleString()}
                        </div>
                        <Button
                          size="sm"
                          disabled={!affordable}
                          onClick={() => onBuy(key, 1)}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Buy
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}

function InventoryView({
  inventory,
  selectedAssetType,
  setSelectedAssetType,
}: {
  inventory: InventoryItem[];
  selectedAssetType: AssetKey | null;
  setSelectedAssetType: (k: AssetKey | null) => void;
}) {
  const placeMode = !!selectedAssetType;

  return (
    <div className="space-y-2">
      {inventory.length === 0 && (
        <div className="text-xs text-muted-foreground">
          Your inventory is empty. Buy items in the Shop tab.
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {inventory.map((item) => {
          const def = ASSET_DEFINITIONS[item.type] as any;
          const Icon = def.icon || Package;
          const active = selectedAssetType === item.type;
          return (
            <Card
              key={item.type}
              className={active ? "ring-2 ring-blue-500" : ""}
            >
              <CardContent className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <div className="text-sm">{def.name}</div>
                  </div>
                  <Badge variant="outline">
                    x{item.quantity}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground h-8 line-clamp-2">
                  {def.description}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs">{def.category}</div>
                  <Button
                    size="sm"
                    variant={active ? "secondary" : "default"}
                    onClick={() =>
                      setSelectedAssetType(
                        active ? null : item.type,
                      )
                    }
                  >
                    {active ? "Cancel" : "Place"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {placeMode && (
        <div className="text-xs text-muted-foreground">
          Placement mode active. Click a grid cell to place the
          selected asset.
        </div>
      )}
    </div>
  );
}

function WorkersView({
  workers,
  onHire,
}: {
  workers: Asset[];
  onHire: (type: AssetKey) => void;
}) {
  const workerTypes = (
    Object.keys(ASSET_DEFINITIONS) as AssetKey[]
  ).filter(
    (k) => (ASSET_DEFINITIONS[k] as any).category === "worker",
  );
  return (
    <div className="space-y-3">
      <div>
        <div className="font-medium mb-2">Hire</div>
        <div className="grid grid-cols-2 gap-2">
          {workerTypes.map((k) => {
            const def = ASSET_DEFINITIONS[k] as any;
            const Icon = def.icon || Users;
            return (
              <Card key={k}>
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <div className="text-sm">{def.name}</div>
                    </div>
                    <Badge variant="outline">
                      Salary ${def.salary}/hr
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground h-8 line-clamp-2">
                    {def.description}
                  </div>
                  <div className="flex justify-end">
                    <Button size="sm" onClick={() => onHire(k)}>
                      Hire
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Separator />

      <div>
        <div className="font-medium mb-2">Staff</div>
        {workers.length === 0 ? (
          <div className="text-xs text-muted-foreground">
            No staff yet.
          </div>
        ) : (
          <div className="space-y-2">
            {workers.map((w) => {
              const def = ASSET_DEFINITIONS[w.type] as any;
              const Icon = def.icon || Users;
              return (
                <Card key={w.id}>
                  <CardContent className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <div className="text-sm">{def.name}</div>
                    </div>
                    <Badge variant="outline">
                      Salary ${def.salary}/hr
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MiningTycoon;