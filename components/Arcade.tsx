import { useState, useEffect } from 'react'
// Animation imports removed due to build issues
import { 
  Gamepad2, 
  Trophy, 
  Star, 
  Gift, 
  Zap,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Play,
  RotateCcw,
  Gem,
  Coins,
  Timer
} from './ui/icons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { ImageWithFallback } from './figma/ImageWithFallback'

const clawMachinePrizes = [
  { id: 1, name: 'Quantum Drill', rarity: 'Legendary', points: 500, image: '/api/placeholder/60/60' },
  { id: 2, name: 'Solar Miner', rarity: 'Epic', points: 300, image: '/api/placeholder/60/60' },
  { id: 3, name: 'Cyber Pick', rarity: 'Rare', points: 150, image: '/api/placeholder/60/60' },
  { id: 4, name: 'Basic Drill', rarity: 'Common', points: 50, image: '/api/placeholder/60/60' },
  { id: 5, name: 'Power Core', rarity: 'Epic', points: 250, image: '/api/placeholder/60/60' },
  { id: 6, name: 'Speed Boost', rarity: 'Rare', points: 100, image: '/api/placeholder/60/60' },
  { id: 7, name: 'Lucky Charm', rarity: 'Common', points: 75, image: '/api/placeholder/60/60' },
  { id: 8, name: 'Mega Hash', rarity: 'Legendary', points: 600, image: '/api/placeholder/60/60' },
  { id: 9, name: 'Efficiency Mod', rarity: 'Rare', points: 175, image: '/api/placeholder/60/60' }
]

const rarityColors = {
  'Legendary': 'from-yellow-400 to-orange-500',
  'Epic': 'from-purple-400 to-pink-500', 
  'Rare': 'from-blue-400 to-cyan-500',
  'Common': 'from-gray-400 to-gray-600'
}

const gameHistory = [
  { game: 'Claw Machine', prize: 'Solar Miner', time: '2 hours ago', points: 300 },
  { game: 'Lucky Spin', prize: '150 Points', time: '5 hours ago', points: 150 },
  { game: 'Claw Machine', prize: 'Cyber Pick', time: '1 day ago', points: 175 },
  { game: 'Memory Match', prize: 'Power Boost', time: '2 days ago', points: 100 }
]

interface ArcadeProps {
  userPoints: number
  onPointsChange: (points: number) => void
}

export function Arcade({ userPoints, onPointsChange }: ArcadeProps) {
  const [clawPosition, setClawPosition] = useState({ x: 4, y: 0 })
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameActive, setGameActive] = useState(false)
  const [selectedPrize, setSelectedPrize] = useState<number | null>(null)
  const [gameResult, setGameResult] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [weeklyScore, setWeeklyScore] = useState(2850)
  const [leaderboardRank, setLeaderboardRank] = useState(47)

  const GAME_COST = 50
  const GRID_SIZE = 3

  useEffect(() => {
    if (timeLeft > 0 && gameActive) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false)
      setIsPlaying(false)
      setGameResult('Time\'s up! Try again.')
    }
  }, [timeLeft, gameActive])

  const startGame = () => {
    if (userPoints < GAME_COST) {
      setGameResult('Not enough points! You need 50 points to play.')
      return
    }
    
    onPointsChange(userPoints - GAME_COST)
    setIsPlaying(true)
    setGameActive(true)
    setTimeLeft(30)
    setGameResult(null)
    setClawPosition({ x: 4, y: 0 })
  }

  const moveClaw = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (!gameActive || isPlaying) return

    setClawPosition(prev => {
      const newPos = { ...prev }
      switch (direction) {
        case 'up':
          newPos.y = Math.max(0, prev.y - 1)
          break
        case 'down':
          newPos.y = Math.min(2, prev.y + 1)
          break
        case 'left':
          newPos.x = Math.max(0, prev.x - 1)
          break
        case 'right':
          newPos.x = Math.min(8, prev.x + 1)
          break
      }
      return newPos
    })
  }

  const dropClaw = () => {
    if (!gameActive) return

    setIsPlaying(true)
    
    // Simulate claw drop and grab
    setTimeout(() => {
      const prizeIndex = clawPosition.y * 3 + Math.floor(clawPosition.x / 3)
      const targetPrize = clawMachinePrizes[prizeIndex]
      
      // Success rate based on rarity
      const successRates = {
        'Common': 0.8,
        'Rare': 0.6,
        'Epic': 0.4,
        'Legendary': 0.2
      }
      
      const success = Math.random() < successRates[targetPrize?.rarity || 'Common']
      
      if (success && targetPrize) {
        setSelectedPrize(targetPrize.id)
        setGameResult(`Congratulations! You won ${targetPrize.name}!`)
        onPointsChange(userPoints + targetPrize.points)
        setWeeklyScore(prev => prev + targetPrize.points)
      } else {
        setGameResult('Oh no! The claw missed. Better luck next time!')
      }
      
      setGameActive(false)
      setIsPlaying(false)
    }, 2000)
  }

  const resetGame = () => {
    setGameActive(false)
    setIsPlaying(false)
    setGameResult(null)
    setSelectedPrize(null)
    setTimeLeft(0)
    setClawPosition({ x: 4, y: 0 })
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-20 lg:pb-8 px-4 lg:px-8 bg-background-solid">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 fade-in">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Vaulted Arcade
          </h1>
          <p className="text-muted-foreground text-lg">
            Play games to win mining NFTs and earn extra points
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="slide-in-up">
            <Card className="material-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Available Points</p>
                    <p className="text-2xl font-bold">{userPoints.toLocaleString()}</p>
                    <p className="text-sm text-primary">Ready to play</p>
                  </div>
                  <Coins className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="slide-in-up">
            <Card className="material-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Weekly Score</p>
                    <p className="text-2xl font-bold">{weeklyScore.toLocaleString()}</p>
                    <p className="text-sm text-success">+450 today</p>
                  </div>
                  <Trophy className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="slide-in-up">
            <Card className="material-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Leaderboard Rank</p>
                    <p className="text-2xl font-bold">#{leaderboardRank}</p>
                    <p className="text-sm text-warning">↑12 this week</p>
                  </div>
                  <Star className="w-8 h-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="slide-in-up">
            <Card className="material-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">NFTs Won</p>
                    <p className="text-2xl font-bold">14</p>
                    <p className="text-sm text-secondary">This month</p>
                  </div>
                  <Gift className="w-8 h-8 text-secondary" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Claw Machine Game */}
          <div className="lg:col-span-2">
            <div className="slide-in-left">
              <Card className="material-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Gamepad2 className="w-5 h-5 mr-2 text-primary" />
                      NFT Claw Machine
                    </div>
                    <Badge variant="outline" className="text-primary border-primary/50">
                      Cost: {GAME_COST} Points
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Use the controls to position the claw and grab mining NFTs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Game Status */}
                  <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${gameActive ? 'bg-success animate-pulse' : 'bg-muted'}`}></div>
                      <span className="font-medium">
                        Status: {gameActive ? 'Playing' : 'Ready'}
                      </span>
                      {gameActive && (
                        <div className="flex items-center space-x-2">
                          <Timer className="w-4 h-4 text-warning" />
                          <span className="text-warning font-medium">{timeLeft}s</span>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {!gameActive && (
                        <Button 
                          onClick={startGame}
                          disabled={userPoints < GAME_COST}
                          className="bg-success hover:bg-success/90"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Start Game
                        </Button>
                      )}
                      <Button variant="outline" onClick={resetGame}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </div>

                  {/* Claw Machine Display */}
                  <div className="relative bg-gradient-to-b from-background-solid to-muted/20 border-2 border-primary/30 rounded-lg p-6 min-h-[400px]">
                    
                    {/* Claw */}
                    <div
                      className="absolute top-4 w-8 h-12 flex flex-col items-center z-10 transition-all duration-500"
                      style={{
                        left: `${(clawPosition.x / 8) * 90 + 5}%`,
                        top: `${(clawPosition.y / 2) * 50 + 10}px`,
                        transform: isPlaying ? 'translateY(100px)' : 'translateY(0)'
                      }}
                    >
                      <div className="w-1 h-8 bg-primary"></div>
                      <div className="w-8 h-4 bg-gradient-to-b from-primary to-secondary rounded-b-lg"></div>
                    </div>

                    {/* Prize Grid */}
                    <div className="grid grid-cols-3 gap-4 mt-16">
                      {clawMachinePrizes.map((prize, index) => (
                        <div
                          key={prize.id}
                          className={`relative p-4 border border-border/50 rounded-lg flex flex-col items-center hover:scale-105 transition-transform cursor-pointer ${
                            selectedPrize === prize.id ? 'ring-2 ring-success glow-effect' : ''
                          }`}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${rarityColors[prize.rarity]} opacity-20 rounded-lg`}></div>
                          <ImageWithFallback
                            src={prize.image}
                            alt={prize.name}
                            width={50}
                            height={50}
                            className="relative z-10 mb-2 rounded"
                          />
                          <p className="text-xs font-medium text-center relative z-10">{prize.name}</p>
                          <Badge 
                            variant="outline" 
                            className={`text-xs mt-1 bg-gradient-to-r ${rarityColors[prize.rarity]} text-white border-0 relative z-10`}
                          >
                            {prize.rarity}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Game Controls */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                      <div></div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveClaw('up')}
                        disabled={!gameActive || isPlaying}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      <div></div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveClaw('left')}
                        disabled={!gameActive || isPlaying}
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={dropClaw}
                        disabled={!gameActive || isPlaying}
                        className="bg-warning hover:bg-warning/90 text-warning-foreground"
                      >
                        <Zap className="w-4 h-4 mr-1" />
                        GRAB
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveClaw('right')}
                        disabled={!gameActive || isPlaying}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                      <div></div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveClaw('down')}
                        disabled={!gameActive || isPlaying}
                      >
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                      <div></div>
                    </div>
                  </div>

                  {/* Game Result */}
                  <div>
                    {gameResult && (
                      <div
                        className={`p-4 rounded-lg text-center slide-in-up ${
                          gameResult.includes('Congratulations') 
                            ? 'bg-success/20 border border-success/50' 
                            : 'bg-warning/20 border border-warning/50'
                        }`}
                      >
                        <p className="font-medium">{gameResult}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Recent Activity */}
            <div className="slide-in-right">
              <Card className="material-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-success" />
                    Recent Wins
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {gameHistory.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{entry.prize}</p>
                        <p className="text-xs text-muted-foreground">{entry.game} • {entry.time}</p>
                      </div>
                      <Badge variant="outline" className="text-primary border-primary/50">
                        +{entry.points}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Coming Soon Games */}
            <div className="slide-in-right">
              <Card className="material-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gem className="w-5 h-5 mr-2 text-secondary" />
                    More Games
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border border-border/50 rounded-lg opacity-60">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Lucky Spin</p>
                      <Badge variant="outline">Coming Soon</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Spin the wheel for random rewards</p>
                  </div>
                  <div className="p-3 border border-border/50 rounded-lg opacity-60">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Memory Match</p>
                      <Badge variant="outline">Coming Soon</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Match cards to win bonus points</p>
                  </div>
                  <div className="p-3 border border-border/50 rounded-lg opacity-60">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Treasure Hunt</p>
                      <Badge variant="outline">Coming Soon</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Find hidden rewards in the vault</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}