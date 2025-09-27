import { useState, useEffect } from 'react'
// Animation imports removed due to build issues
import { 
  Zap, 
  Pickaxe, 
  Gem, 
  Settings, 
  TrendingUp,
  Timer,
  Battery,
  Cpu,
  HardDrive,
  Coins
} from './ui/icons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { ImageWithFallback } from './figma/ImageWithFallback'

const mockMiningNFTs = [
  {
    id: 1,
    name: 'Quantum Miner Pro',
    rarity: 'Legendary',
    hashRate: 2500,
    efficiency: 95,
    durability: 87,
    level: 15,
    image: 'https://images.unsplash.com/photo-1628158088803-4200c2be52f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbmclMjBlcXVpcG1lbnQlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NzAwMTMwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    isActive: true,
    powerConsumption: 250,
    baseRate: 850,
    bonusRate: 420,
    description: 'Top-tier mining equipment with quantum processing'
  },
  {
    id: 2,
    name: 'Solar Drill v3',
    rarity: 'Epic',
    hashRate: 1800,
    efficiency: 88,
    durability: 92,
    level: 12,
    image: '/api/placeholder/150/150',
    isActive: true,
    powerConsumption: 180,
    baseRate: 650,
    bonusRate: 280,
    description: 'Eco-friendly miner powered by solar energy'
  },
  {
    id: 3,
    name: 'Cyber Excavator',
    rarity: 'Rare',
    hashRate: 1200,
    efficiency: 82,
    durability: 78,
    level: 8,
    image: '/api/placeholder/150/150',
    isActive: false,
    powerConsumption: 200,
    baseRate: 420,
    bonusRate: 150,
    description: 'Cyberpunk-style mining rig with neon aesthetics'
  },
  {
    id: 4,
    name: 'Basic Pickaxe',
    rarity: 'Common',
    hashRate: 400,
    efficiency: 65,
    durability: 95,
    level: 3,
    image: '/api/placeholder/150/150',
    isActive: false,
    powerConsumption: 80,
    baseRate: 180,
    bonusRate: 45,
    description: 'Simple but reliable mining tool for beginners'
  }
]

const rarityColors = {
  'Legendary': 'from-yellow-400 to-orange-500',
  'Epic': 'from-purple-400 to-pink-500',
  'Rare': 'from-blue-400 to-cyan-500',
  'Common': 'from-gray-400 to-gray-600'
}

interface MiningSimulatorProps {
  userPoints: number
  onPointsChange: (points: number) => void
}

export function MiningSimulator({ userPoints, onPointsChange }: MiningSimulatorProps) {
  const [minedTokens, setMinedTokens] = useState(15847)
  const [miningActive, setMiningActive] = useState(true)
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null)
  const [powerLevel, setPowerLevel] = useState(78)
  
  const activeMiningNFTs = mockMiningNFTs.filter(nft => nft.isActive)
  const totalHashRate = activeMiningNFTs.reduce((sum, nft) => sum + nft.hashRate, 0)
  const averageEfficiency = activeMiningNFTs.reduce((sum, nft) => sum + nft.efficiency, 0) / activeMiningNFTs.length || 0
  const tokensPerHour = activeMiningNFTs.reduce((sum, nft) => sum + nft.baseRate + nft.bonusRate, 0)

  // Simulate mining progress
  useEffect(() => {
    if (!miningActive) return

    const interval = setInterval(() => {
      const increment = Math.floor(tokensPerHour / 3600) // tokens per second
      setMinedTokens(prev => prev + increment)
      
      // Occasionally award points for mining milestones
      if (Math.random() < 0.01) { // 1% chance per second
        onPointsChange(userPoints + Math.floor(Math.random() * 10) + 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [miningActive, tokensPerHour, userPoints, onPointsChange])

  const toggleMiningNFT = (id: number) => {
    const nft = mockMiningNFTs.find(n => n.id === id)
    if (nft) {
      nft.isActive = !nft.isActive
    }
  }

  const upgradeMiningNFT = (id: number) => {
    const nft = mockMiningNFTs.find(n => n.id === id)
    if (nft && userPoints >= 100) {
      nft.level += 1
      nft.hashRate = Math.floor(nft.hashRate * 1.1)
      nft.baseRate = Math.floor(nft.baseRate * 1.1)
      onPointsChange(userPoints - 100)
    }
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-20 lg:pb-8 px-4 lg:px-8 bg-background-solid">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Mining Simulator
          </h1>
          <p className="text-muted-foreground text-lg">
            Use your NFT miners to harvest VAULT tokens from the blockchain
          </p>
        </motion.div>

        {/* Mining Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="material-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Mined Tokens</p>
                    <p className="text-2xl font-bold">{minedTokens.toLocaleString()}</p>
                    <p className="text-sm text-primary">VAULT</p>
                  </div>
                  <Coins className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="material-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Hash Rate</p>
                    <p className="text-2xl font-bold">{totalHashRate.toLocaleString()}</p>
                    <p className="text-sm text-success">H/s</p>
                  </div>
                  <Cpu className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="material-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Mining Rate</p>
                    <p className="text-2xl font-bold">{tokensPerHour.toLocaleString()}</p>
                    <p className="text-sm text-warning">tokens/hour</p>
                  </div>
                  <Pickaxe className="w-8 h-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="material-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Efficiency</p>
                    <p className="text-2xl font-bold">{averageEfficiency.toFixed(1)}%</p>
                    <p className="text-sm text-secondary">Average</p>
                  </div>
                  <Battery className="w-8 h-8 text-secondary" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Mining Control */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8"
        >
          <Card className="material-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${miningActive ? 'bg-success animate-pulse' : 'bg-muted'}`}></div>
                    <span className="font-medium">
                      Mining Status: {miningActive ? 'Active' : 'Stopped'}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Power Level: {powerLevel}%
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Next reward in</p>
                    <p className="font-medium">00:45:23</p>
                  </div>
                  <Button
                    onClick={() => setMiningActive(!miningActive)}
                    variant={miningActive ? "destructive" : "default"}
                    className={miningActive ? "" : "bg-success hover:bg-success/90"}
                  >
                    {miningActive ? (
                      <>
                        <Timer className="w-4 h-4 mr-2" />
                        Stop Mining
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Start Mining
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Power Level</span>
                  <span>{powerLevel}%</span>
                </div>
                <Progress value={powerLevel} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="miners" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2 material-card">
            <TabsTrigger value="miners">Mining NFTs</TabsTrigger>
            <TabsTrigger value="upgrades">Upgrades & Shop</TabsTrigger>
          </TabsList>

          <TabsContent value="miners" className="space-y-6">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockMiningNFTs.map((nft, index) => (
                <motion.div
                  key={nft.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    className={`material-card cursor-pointer transition-all duration-300 ${
                      nft.isActive ? 'ring-2 ring-primary glow-effect' : ''
                    } ${selectedNFT === nft.id ? 'ring-2 ring-secondary' : ''}`}
                    onClick={() => setSelectedNFT(selectedNFT === nft.id ? null : nft.id)}
                  >
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${rarityColors[nft.rarity]} opacity-20 rounded-t-lg`}></div>
                      <div className="relative p-6 text-center">
                        <ImageWithFallback
                          src={nft.image}
                          alt={nft.name}
                          width={120}
                          height={120}
                          className="mx-auto mb-4 rounded-lg"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge 
                            variant="outline" 
                            className={`bg-gradient-to-r ${rarityColors[nft.rarity]} text-white border-0`}
                          >
                            {nft.rarity}
                          </Badge>
                        </div>
                        <div className="absolute top-4 left-4">
                          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                            Lv.{nft.level}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6 pt-0">
                      <h3 className="font-semibold mb-2 text-center">{nft.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 text-center">
                        {nft.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Hash Rate</p>
                          <p className="font-medium">{nft.hashRate.toLocaleString()} H/s</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Token Rate</p>
                          <p className="font-medium text-primary">
                            {(nft.baseRate + nft.bonusRate).toLocaleString()}/hr
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Efficiency</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={nft.efficiency} className="flex-1 h-2" />
                            <span className="text-xs">{nft.efficiency}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Durability</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={nft.durability} className="flex-1 h-2" />
                            <span className="text-xs">{nft.durability}%</span>
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {selectedNFT === nft.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-border/50 pt-4 space-y-3"
                          >
                            <div className="text-xs text-muted-foreground space-y-1">
                              <div className="flex justify-between">
                                <span>Base Rate:</span>
                                <span>{nft.baseRate} tokens/hr</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Bonus Rate:</span>
                                <span className="text-success">+{nft.bonusRate} tokens/hr</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Power Draw:</span>
                                <span>{nft.powerConsumption}W</span>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button
                                variant={nft.isActive ? "destructive" : "default"}
                                size="sm"
                                className={`flex-1 ${!nft.isActive ? 'bg-success hover:bg-success/90' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleMiningNFT(nft.id)
                                }}
                              >
                                {nft.isActive ? 'Deactivate' : 'Activate'}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  upgradeMiningNFT(nft.id)
                                }}
                                disabled={userPoints < 100}
                              >
                                <TrendingUp className="w-4 h-4 mr-1" />
                                Upgrade
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upgrades" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="material-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-primary" />
                    Mining Equipment Shop
                  </CardTitle>
                  <CardDescription>
                    Upgrade your mining operation with powerful NFT equipment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Gem className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">Equipment Shop Coming Soon</h3>
                    <p className="text-muted-foreground mb-4">
                      Purchase new mining NFTs, upgrade existing equipment, and unlock special boosters.
                    </p>
                    <p className="text-sm text-primary mb-4">
                      Play the arcade claw machine to win mining NFTs!
                    </p>
                    <Button variant="outline">
                      <Gem className="w-4 h-4 mr-2" />
                      Visit Arcade
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}