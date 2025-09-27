import { useState, useRef } from 'react'
import { 
  Rocket,
  Star,
  Shield,
  Brain,
  MessageSquare,
  Coins,
  Upload,
  Link as LinkIcon,
  Twitter,
  Globe,
  Trash2,
  Plus,
  AlertTriangle,
  CheckCircle,
  Crown,
  Zap,
  Calendar,
  Users,
  Lock,
  Flame,
  Eye,
  EyeOff,
  Settings,
  Gift,
  Target,
  Timer,
  Wallet,
  ExternalLink,
  Info,
  TrendingUp,
  Camera,
  BarChart3,
  Activity,
  ChevronLeft
} from './ui/icons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Switch } from './ui/switch'
import { Slider } from './ui/slider'
import { Separator } from './ui/separator'
import { Progress } from './ui/progress'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Alert, AlertDescription } from './ui/alert'
import { ImageWithFallback } from './figma/ImageWithFallback'

// AI Strategy Categories with descriptions
const AI_STRATEGY_CATEGORIES = [
  {
    id: 'crypto-momentum',
    name: 'Crypto Momentum Hunter',
    description: 'AI identifies trending crypto assets with strong momentum patterns',
    riskLevel: 'High',
    expectedReturn: '8-15%',
    icon: '₿',
    color: 'text-warning',
    examples: ['SOL', 'ETH', 'BTC momentum plays', 'Altcoin breakouts']
  },
  {
    id: 'defi-yield',
    name: 'DeFi Yield Optimizer',
    description: 'Automated LP position management and yield farming optimization',
    riskLevel: 'Medium',
    expectedReturn: '5-12%',
    icon: '🌊',
    color: 'text-primary',
    examples: ['Liquidity pools', 'Yield farming', 'Staking rewards', 'Protocol rewards']
  },
  {
    id: 'stocks-fundamental',
    name: 'Blue Chip Stocks Analyzer',
    description: 'AI-driven fundamental analysis of S&P 500 and large-cap stocks',
    riskLevel: 'Medium',
    expectedReturn: '4-8%',
    icon: '📈',
    color: 'text-success',
    examples: ['FAANG stocks', 'Dividend aristocrats', 'Growth stocks', 'Value plays']
  },
  {
    id: 'nft-curator',
    name: 'NFT Collection Curator',
    description: 'AI analyzes floor prices and rarity to trade blue-chip NFTs',
    riskLevel: 'High',
    expectedReturn: '10-25%',
    icon: '🖼️',
    color: 'text-secondary',
    examples: ['BAYC', 'CryptoPunks', 'Azuki', 'Art Blocks']
  },
  {
    id: 'rwa-income',
    name: 'RWA Dividend Hunter',
    description: 'Tokenized real estate and commodity investments for steady yields',
    riskLevel: 'Low',
    expectedReturn: '3-6%',
    icon: '🏠',
    color: 'text-chart-3',
    examples: ['Real estate tokens', 'Commodity funds', 'REITs', 'Infrastructure']
  },
  {
    id: 'arbitrage',
    name: 'Cross-Chain Arbitrage Bot',
    description: 'Exploits price differences across multiple blockchain networks',
    riskLevel: 'Low',
    expectedReturn: '2-5%',
    icon: '⚡',
    color: 'text-chart-5',
    examples: ['DEX arbitrage', 'Cross-chain swaps', 'MEV opportunities', 'Price gaps']
  }
]

const SOCIAL_PLATFORMS = [
  { id: 'twitter', name: 'Twitter/X', icon: Twitter, placeholder: '@username' },
  { id: 'telegram', name: 'Telegram', icon: MessageSquare, placeholder: '@channel' },
  { id: 'discord', name: 'Discord', icon: MessageSquare, placeholder: 'Server invite' },
  { id: 'website', name: 'Website', icon: Globe, placeholder: 'https://...' }
]

interface TokenFormData {
  // Basic Info
  name: string
  symbol: string
  description: string
  supply: number
  
  // Media
  logo: File | null
  banner: File | null
  logoPreview: string
  bannerPreview: string
  
  // Social Links
  socialLinks: Record<string, string>
  
  // Token Economics
  devAllocation: number
  devAction: 'lock' | 'burn'
  lockDuration: number
  remittanceFee: number
  
  // Premium Features
  isPremium: boolean
  farcasterConnected: boolean
  farcasterProfile: any
  
  // Airdrops
  airdrops: Array<{ address: string, percentage: number }>
  
  // Mining Rewards
  rewardAllocation: number
  rewardDays: number
  
  // AI Strategy Selection
  aiStrategies: Array<{ 
    strategyId: string
    allocation: number
    riskTolerance: 'conservative' | 'moderate' | 'aggressive'
    autoRebalance: boolean
  }>
}

interface MemecoinLauncherProps {
  userPoints: number
  onPointsChange: (points: number) => void
}

export function MemecoinLauncher({ userPoints, onPointsChange }: MemecoinLauncherProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [tokenTier, setTokenTier] = useState<'basic' | 'premium' | null>(null)
  const [formData, setFormData] = useState<TokenFormData>({
    name: '',
    symbol: '',
    description: '',
    supply: 1000000000,
    logo: null,
    banner: null,
    logoPreview: '',
    bannerPreview: '',
    socialLinks: {},
    devAllocation: 5,
    devAction: 'lock',
    lockDuration: 365,
    remittanceFee: 1,
    isPremium: false,
    farcasterConnected: false,
    farcasterProfile: null,
    airdrops: [{ address: '', percentage: 0 }],
    rewardAllocation: 5,
    rewardDays: 5,
    aiStrategies: []
  })
  
  const [showPreview, setShowPreview] = useState(false)
  const [isLaunching, setIsLaunching] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const bannerInputRef = useRef<HTMLInputElement>(null)

  const handleTierSelection = (tier: 'basic' | 'premium') => {
    setTokenTier(tier)
    setFormData(prev => ({ ...prev, isPremium: tier === 'premium' }))
    setCurrentStep(2)
  }

  const handleFileUpload = (file: File, type: 'logo' | 'banner') => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const preview = e.target?.result as string
      setFormData(prev => ({
        ...prev,
        [type]: file,
        [`${type}Preview`]: preview
      }))
    }
    reader.readAsDataURL(file)
  }

  const connectFarcaster = async () => {
    // Mock Farcaster connection
    setFormData(prev => ({
      ...prev,
      farcasterConnected: true,
      farcasterProfile: {
        username: 'cryptobuilder',
        displayName: 'Crypto Builder',
        pfp: '/api/placeholder/80/80',
        verified: true
      }
    }))
  }

  const addAirdrop = () => {
    if (formData.airdrops.length < 10) {
      setFormData(prev => ({
        ...prev,
        airdrops: [...prev.airdrops, { address: '', percentage: 0 }]
      }))
    }
  }

  const removeAirdrop = (index: number) => {
    setFormData(prev => ({
      ...prev,
      airdrops: prev.airdrops.filter((_, i) => i !== index)
    }))
  }

  const addAIStrategy = () => {
    setFormData(prev => ({
      ...prev,
      aiStrategies: [...prev.aiStrategies, { 
        strategyId: '', 
        allocation: 20, 
        riskTolerance: 'moderate',
        autoRebalance: true
      }]
    }))
  }

  const removeAIStrategy = (index: number) => {
    setFormData(prev => ({
      ...prev,
      aiStrategies: prev.aiStrategies.filter((_, i) => i !== index)
    }))
  }

  const calculateCosts = () => {
    const baseCost = tokenTier === 'premium' ? 0.05 : 0 // SOL
    const tradingFee = tokenTier === 'premium' ? 0 : 0.0001 // 0% vs 0.01%
    
    return { baseCost, tradingFee }
  }

  const validateForm = () => {
    const errors = []
    
    if (!formData.name.trim()) errors.push('Token name is required')
    if (!formData.symbol.trim()) errors.push('Token symbol is required')
    if (!formData.description.trim()) errors.push('Description is required')
    if (tokenTier === 'premium' && !formData.logo) errors.push('Logo is required for premium tokens')
    
    // Validate airdrop total
    const totalAirdrop = formData.airdrops.reduce((sum, drop) => sum + drop.percentage, 0)
    if (totalAirdrop > 20) errors.push('Total airdrops cannot exceed 20% of supply')
    
    // Validate AI strategy allocations
    const totalAllocation = formData.aiStrategies.reduce((sum, strategy) => sum + strategy.allocation, 0)
    if (tokenTier === 'premium' && totalAllocation > 100) {
      errors.push('Total AI strategy allocation cannot exceed 100%')
    }
    
    return errors
  }

  const launchToken = async () => {
    const errors = validateForm()
    if (errors.length > 0) {
      alert('Please fix the following errors:\n' + errors.join('\n'))
      return
    }
    
    setIsLaunching(true)
    
    // Simulate token launch
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const points = tokenTier === 'premium' ? 500 : 100
    onPointsChange(userPoints + points)
    
    setIsLaunching(false)
    alert(`Token launched successfully! You earned ${points} points.`)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 slide-in-up">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Choose Your Token Tier</h2>
              <p className="text-muted-foreground">
                Select the tier that best fits your project's needs and budget
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Tier */}
              <Card 
                className={`material-card cursor-pointer transition-all ${
                  tokenTier === 'basic' ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleTierSelection('basic')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Rocket className="w-6 h-6 mr-3 text-primary" />
                    Basic Token
                  </CardTitle>
                  <CardDescription>Perfect for simple token launches</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-success mb-2">FREE</div>
                    <div className="text-sm text-muted-foreground">Launch Fee</div>
                    <div className="text-xs text-muted-foreground mt-1">+ 0.01% trading fees</div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Custom logo & description</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Social media links</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Dev token lock/burn</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Fixed 1B supply</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-warning" />
                      <span>Listed in basic category</span>
                    </div>
                  </div>

                  <div className="bg-muted/20 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Not Included:</div>
                    <div className="text-xs space-y-1">
                      <div>• AI trading strategies</div>
                      <div>• Farcaster integration</div>
                      <div>• Token chat system</div>
                      <div>• Automated treasury management</div>
                      <div>• Mining rewards</div>
                      <div>• Dedicated token page</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Premium Tier */}
              <Card 
                className={`material-card cursor-pointer transition-all border-warning/50 ${
                  tokenTier === 'premium' ? 'ring-2 ring-warning' : ''
                }`}
                onClick={() => handleTierSelection('premium')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Crown className="w-6 h-6 mr-3 text-warning" />
                    Premium Token
                  </CardTitle>
                  <CardDescription>Full-featured token with AI-powered treasury</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-warning mb-2">0.05 SOL</div>
                    <div className="text-sm text-muted-foreground">Launch Fee</div>
                    <div className="text-xs text-success mt-1">0% trading fees</div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Crown className="w-4 h-4 text-warning" />
                      <span>Everything in Basic +</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Brain className="w-4 h-4 text-secondary" />
                      <span>AI trading strategies</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      <span>Farcaster integration</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Brain className="w-4 h-4 text-success" />
                      <span>Automated treasury management</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span>Mining rewards system</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-warning" />
                      <span>Featured placement</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Gift className="w-4 h-4 text-secondary" />
                      <span>Token airdrops (up to 10 wallets)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-primary" />
                      <span>Dedicated token page @token.vaulted.fun</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Bot & bundle protection</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-secondary" />
                      <span>DAO governance after graduation</span>
                    </div>
                  </div>

                  <Badge variant="default" className="w-full justify-center bg-warning text-warning-foreground">
                    Most Popular Choice
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6 slide-in-up">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Token Information</h2>
              <Badge variant={tokenTier === 'premium' ? 'default' : 'secondary'} className={tokenTier === 'premium' ? 'bg-warning text-warning-foreground' : ''}>
                {tokenTier === 'premium' ? (
                  <Crown className="w-4 h-4 mr-1" />
                ) : (
                  <Rocket className="w-4 h-4 mr-1" />
                )}
                {tokenTier === 'premium' ? 'Premium' : 'Basic'} Tier
              </Badge>
            </div>

            <Tabs defaultValue="basic" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="economics">Economics</TabsTrigger>
                {tokenTier === 'premium' && <TabsTrigger value="ai-strategies">AI Strategies</TabsTrigger>}
                {tokenTier !== 'premium' && <TabsTrigger value="social">Social</TabsTrigger>}
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <Card className="material-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Token Name *</label>
                        <Input
                          placeholder="My Awesome Token"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Symbol *</label>
                        <Input
                          placeholder="MAT"
                          value={formData.symbol}
                          onChange={(e) => setFormData(prev => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
                          maxLength={10}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Description *</label>
                      <Textarea
                        placeholder="Describe your token, its purpose, and what makes it special..."
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Total Supply</label>
                      {tokenTier === 'premium' ? (
                        <>
                          <Input
                            type="number"
                            value={formData.supply}
                            onChange={(e) => setFormData(prev => ({ ...prev, supply: parseInt(e.target.value) || 0 }))}
                            min={1000000}
                            max={1000000000000}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Current: {formData.supply.toLocaleString()} tokens
                          </p>
                        </>
                      ) : (
                        <div className="relative">
                          <Input
                            type="text"
                            value="1,000,000,000"
                            disabled
                            className="pr-10"
                          />
                          <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground mt-1">
                            Supply is locked at 1 billion for basic tokens
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="media" className="space-y-6">
                <Card className="material-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Media Assets</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Logo {tokenTier === 'premium' ? '*' : ''}
                      </label>
                      <div className="border-2 border-dashed border-border/50 rounded-lg p-4">
                        {formData.logoPreview ? (
                          <div className="flex items-center space-x-4">
                            <img src={formData.logoPreview} alt="Logo preview" className="w-16 h-16 rounded-full object-cover" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{formData.logo?.name}</p>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => fileInputRef.current?.click()}
                                className="mt-2"
                              >
                                <Camera className="w-4 h-4 mr-2" />
                                Change Logo
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setFormData(prev => ({ ...prev, logo: null, logoPreview: '' }))}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground mb-2">
                              Upload your token logo
                            </p>
                            <Button 
                              variant="outline" 
                              onClick={() => fileInputRef.current?.click()}
                            >
                              Choose File
                            </Button>
                          </div>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload(file, 'logo')
                        }}
                      />
                    </div>

                    {tokenTier === 'premium' && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">Banner Image</label>
                        <div className="border-2 border-dashed border-border/50 rounded-lg p-4">
                          {formData.bannerPreview ? (
                            <div className="space-y-3">
                              <img src={formData.bannerPreview} alt="Banner preview" className="w-full h-32 rounded-lg object-cover" />
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => bannerInputRef.current?.click()}
                                  className="flex-1"
                                >
                                  <Camera className="w-4 h-4 mr-2" />
                                  Change Banner
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setFormData(prev => ({ ...prev, banner: null, bannerPreview: '' }))}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground mb-2">
                                Upload a banner image (recommended: 1200x400px)
                              </p>
                              <Button 
                                variant="outline" 
                                onClick={() => bannerInputRef.current?.click()}
                              >
                                Choose File
                              </Button>
                            </div>
                          )}
                        </div>
                        <input
                          ref={bannerInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleFileUpload(file, 'banner')
                          }}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="economics" className="space-y-6">
                <Card className="material-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Token Economics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-3 block">Developer Allocation: {formData.devAllocation}%</label>
                      <Slider
                        value={[formData.devAllocation]}
                        onValueChange={([value]) => setFormData(prev => ({ ...prev, devAllocation: value }))}
                        max={20}
                        step={1}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {(formData.supply * formData.devAllocation / 100).toLocaleString()} tokens
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Dev Action</label>
                        <Select value={formData.devAction} onValueChange={(value: 'lock' | 'burn') => setFormData(prev => ({ ...prev, devAction: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lock">Lock Tokens</SelectItem>
                            <SelectItem value="burn">Burn Tokens</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {formData.devAction === 'lock' && (
                        <div>
                          <label className="text-sm font-medium mb-2 block">Lock Duration (days)</label>
                          <Input
                            type="number"
                            value={formData.lockDuration}
                            onChange={(e) => setFormData(prev => ({ ...prev, lockDuration: parseInt(e.target.value) || 0 }))}
                            min={30}
                            max={3650}
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {tokenTier === 'premium' && (
                <TabsContent value="ai-strategies" className="space-y-6">
                  <Card className="material-card">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Brain className="w-5 h-5 mr-2 text-secondary" />
                        AI Trading Strategies
                      </CardTitle>
                      <CardDescription>
                        Choose AI strategies to manage your token's treasury automatically
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-4">
                        {AI_STRATEGY_CATEGORIES.map((strategy) => (
                          <Card key={strategy.id} className="material-card">
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-4">
                                <div className={`text-2xl ${strategy.color}`}>
                                  {strategy.icon}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold">{strategy.name}</h3>
                                    <div className="flex items-center space-x-2">
                                      <Badge variant="outline" className="text-xs">
                                        {strategy.riskLevel} Risk
                                      </Badge>
                                      <Badge variant="secondary" className="text-xs">
                                        {strategy.expectedReturn} APY
                                      </Badge>
                                    </div>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-3">
                                    {strategy.description}
                                  </p>
                                  <div className="text-xs text-muted-foreground">
                                    Examples: {strategy.examples.join(', ')}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Selected Strategies</h3>
                          <Button variant="outline" size="sm" onClick={addAIStrategy}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Strategy
                          </Button>
                        </div>

                        {formData.aiStrategies.length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground">
                            <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>No AI strategies selected yet</p>
                            <p className="text-sm">Add strategies to automate your treasury management</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {formData.aiStrategies.map((strategy, index) => (
                              <Card key={index} className="material-card border-primary/20">
                                <CardContent className="p-4">
                                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                                    <div>
                                      <label className="text-sm font-medium mb-2 block">Strategy</label>
                                      <Select 
                                        value={strategy.strategyId} 
                                        onValueChange={(value) => {
                                          const newStrategies = [...formData.aiStrategies]
                                          newStrategies[index].strategyId = value
                                          setFormData(prev => ({ ...prev, aiStrategies: newStrategies }))
                                        }}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select strategy" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {AI_STRATEGY_CATEGORIES.map(cat => (
                                            <SelectItem key={cat.id} value={cat.id}>
                                              {cat.icon} {cat.name}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium mb-2 block">Allocation (%)</label>
                                      <Input
                                        type="number"
                                        value={strategy.allocation}
                                        onChange={(e) => {
                                          const newStrategies = [...formData.aiStrategies]
                                          newStrategies[index].allocation = parseInt(e.target.value) || 0
                                          setFormData(prev => ({ ...prev, aiStrategies: newStrategies }))
                                        }}
                                        min={1}
                                        max={100}
                                      />
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium mb-2 block">Risk Tolerance</label>
                                      <Select 
                                        value={strategy.riskTolerance} 
                                        onValueChange={(value: 'conservative' | 'moderate' | 'aggressive') => {
                                          const newStrategies = [...formData.aiStrategies]
                                          newStrategies[index].riskTolerance = value
                                          setFormData(prev => ({ ...prev, aiStrategies: newStrategies }))
                                        }}
                                      >
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="conservative">Conservative</SelectItem>
                                          <SelectItem value="moderate">Moderate</SelectItem>
                                          <SelectItem value="aggressive">Aggressive</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="flex items-end space-x-2">
                                      <div className="flex-1">
                                        <label className="text-sm font-medium mb-2 block">Auto Rebalance</label>
                                        <Switch
                                          checked={strategy.autoRebalance}
                                          onCheckedChange={(checked) => {
                                            const newStrategies = [...formData.aiStrategies]
                                            newStrategies[index].autoRebalance = checked
                                            setFormData(prev => ({ ...prev, aiStrategies: newStrategies }))
                                          }}
                                        />
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeAIStrategy(index)}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                            
                            <div className="text-sm text-muted-foreground text-center">
                              Total Allocation: {formData.aiStrategies.reduce((sum, s) => sum + s.allocation, 0)}%
                              {formData.aiStrategies.reduce((sum, s) => sum + s.allocation, 0) > 100 && (
                                <span className="text-destructive ml-2">⚠️ Cannot exceed 100%</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {tokenTier !== 'premium' && (
                <TabsContent value="social" className="space-y-6">
                  <Card className="material-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Social Media Links</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {SOCIAL_PLATFORMS.map((platform) => (
                        <div key={platform.id}>
                          <label className="text-sm font-medium mb-2 block flex items-center">
                            <platform.icon className="w-4 h-4 mr-2" />
                            {platform.name}
                          </label>
                          <Input
                            placeholder={platform.placeholder}
                            value={formData.socialLinks[platform.id] || ''}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              socialLinks: { ...prev.socialLinks, [platform.id]: e.target.value }
                            }))}
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>

            <div className="flex justify-between pt-6 border-t border-border/50">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => setShowPreview(true)}>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button onClick={launchToken} disabled={isLaunching}>
                  {isLaunching ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-pulse" />
                      Launching...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4 mr-2" />
                      Launch Token
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-20 lg:pb-8 px-4 lg:px-8 bg-background-solid">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 fade-in">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Memecoin Launcher
          </h1>
          <p className="text-muted-foreground text-lg">
            From Meme To Meaningful - Launch your token with AI-powered treasury management
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 rounded ${currentStep >= 2 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              2
            </div>
          </div>
        </div>

        {/* Step Content */}
        {renderStepContent()}
      </div>
    </div>
  )
}