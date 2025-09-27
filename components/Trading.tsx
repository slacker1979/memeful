import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Brain, 
  Target,
  Zap,
  DollarSign,
  Volume2,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  ChevronDown,
  ChevronUp,
  Activity,
  Layers,
  Eye,
  EyeOff,
  Calendar,
  RefreshCw,
  Info,
  Gauge,
  Fuel,
  Route,
  MessageSquare,
  ExternalLink,
  User,
  Repeat
} from './ui/icons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Slider } from './ui/slider'
import { Switch } from './ui/switch'
import { Separator } from './ui/separator'
import { Progress } from './ui/progress'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ReferenceLine, Brush } from 'recharts'
import { TokenSearchModal } from './TokenSearchModal'

const mockTokens = [
  {
    symbol: 'BONK',
    name: 'Bonk',
    price: 0.0000245,
    change24h: +15.7,
    volume24h: 12500000,
    marketCap: 1850000000,
    holders: 125000,
    image: '/api/placeholder/40/40',
    rwaValue: 125000,
    aiScore: 87,
    aiPrediction: 'Strong Buy',
    risk: 'Medium',
    nextResistance: 0.0000275,
    nextSupport: 0.0000220,
    liquidity: 2500000,
    graduated: true,
    lpPool: 'Raydium',
    contractAddress: '0x1234567890abcdef...',
    farcasterCast: '@bonktoken',
    premium: true,
    aiFactors: {
      technicalAnalysis: 92,
      onChainMetrics: 85,
      socialSentiment: 78,
      rwaBackingRatio: 95,
      liquidityHealth: 88,
      holderDistribution: 82
    }
  },
  {
    symbol: 'PEPE',
    name: 'Pepe',
    price: 0.00000875,
    change24h: -8.3,
    volume24h: 8750000,
    marketCap: 945000000,
    holders: 89000,
    image: '/api/placeholder/40/40',
    rwaValue: 87500,
    aiScore: 65,
    aiPrediction: 'Hold',
    risk: 'Low',
    nextResistance: 0.00000920,
    nextSupport: 0.00000810,
    liquidity: 1200000,
    graduated: false,
    lpPool: null,
    contractAddress: '0xabcdef1234567890...',
    farcasterCast: '@pepetoken',
    premium: false,
    aiFactors: {
      technicalAnalysis: 58,
      onChainMetrics: 72,
      socialSentiment: 85,
      rwaBackingRatio: 45,
      liquidityHealth: 62,
      holderDistribution: 68
    }
  },
  {
    symbol: 'WIF',
    name: 'dogwifhat',
    price: 2.45,
    change24h: +23.4,
    volume24h: 25000000,
    marketCap: 2450000000,
    holders: 45000,
    image: '/api/placeholder/40/40',
    rwaValue: 245000,
    aiScore: 92,
    aiPrediction: 'Strong Buy',
    risk: 'High',
    nextResistance: 2.75,
    nextSupport: 2.20,
    liquidity: 8500000,
    graduated: true,
    lpPool: 'Orca',
    contractAddress: '0x9876543210fedcba...',
    farcasterCast: '@dogwifhat',
    premium: true,
    aiFactors: {
      technicalAnalysis: 95,
      onChainMetrics: 88,
      socialSentiment: 92,
      rwaBackingRatio: 87,
      liquidityHealth: 94,
      holderDistribution: 96
    }
  }
]

// Extended token database for search
const allTokens = [
  ...mockTokens,
  {
    symbol: 'DOGE',
    name: 'Dogecoin',
    price: 0.075,
    change24h: 8.4,
    volume24h: 45000000,
    marketCap: 10500000000,
    holders: 450000,
    image: '/api/placeholder/40/40',
    rwaValue: 0,
    aiScore: 72,
    aiPrediction: 'Hold',
    risk: 'Medium',
    nextResistance: 0.082,
    nextSupport: 0.068,
    liquidity: 15000000,
    graduated: true,
    lpPool: 'Raydium',
    contractAddress: '0xdoge123456789...',
    farcasterCast: '@dogecoin',
    premium: true,
    aiFactors: {
      technicalAnalysis: 70,
      onChainMetrics: 75,
      socialSentiment: 88,
      rwaBackingRatio: 0,
      liquidityHealth: 85,
      holderDistribution: 90
    }
  },
  {
    symbol: 'SHIB',
    name: 'Shiba Inu',
    price: 0.0000125,
    change24h: 12.6,
    volume24h: 32000000,
    marketCap: 7350000000,
    holders: 320000,
    image: '/api/placeholder/40/40',
    rwaValue: 0,
    aiScore: 68,
    aiPrediction: 'Hold',
    risk: 'High',
    nextResistance: 0.0000140,
    nextSupport: 0.0000110,
    liquidity: 12000000,
    graduated: true,
    lpPool: 'Orca',
    contractAddress: '0xshib987654321...',
    farcasterCast: '@shibainu',
    premium: true,
    aiFactors: {
      technicalAnalysis: 65,
      onChainMetrics: 70,
      socialSentiment: 82,
      rwaBackingRatio: 0,
      liquidityHealth: 75,
      holderDistribution: 85
    }
  },
  {
    symbol: 'FLOKI',
    name: 'Floki Inu',
    price: 0.00015,
    change24h: -3.2,
    volume24h: 18500000,
    marketCap: 1450000000,
    holders: 78000,
    image: '/api/placeholder/40/40',
    rwaValue: 0,
    aiScore: 58,
    aiPrediction: 'Caution',
    risk: 'High',
    nextResistance: 0.00018,
    nextSupport: 0.00012,
    liquidity: 5500000,
    graduated: false,
    lpPool: null,
    contractAddress: '0xfloki456789123...',
    farcasterCast: '@flokiinu',
    premium: false,
    aiFactors: {
      technicalAnalysis: 55,
      onChainMetrics: 60,
      socialSentiment: 70,
      rwaBackingRatio: 0,
      liquidityHealth: 65,
      holderDistribution: 55
    }
  },
  {
    symbol: 'MYRO',
    name: 'Myro',
    price: 0.125,
    change24h: 5.8,
    volume24h: 8900000,
    marketCap: 125000000,
    holders: 25000,
    image: '/api/placeholder/40/40',
    rwaValue: 25000,
    aiScore: 78,
    aiPrediction: 'Buy',
    risk: 'Medium',
    nextResistance: 0.140,
    nextSupport: 0.110,
    liquidity: 3500000,
    graduated: true,
    lpPool: 'Raydium',
    contractAddress: '0xmyro789123456...',
    farcasterCast: '@myrotoken',
    premium: true,
    aiFactors: {
      technicalAnalysis: 80,
      onChainMetrics: 75,
      socialSentiment: 72,
      rwaBackingRatio: 20,
      liquidityHealth: 78,
      holderDistribution: 85
    }
  },
  {
    symbol: 'BASIC',
    name: 'Basic Attention Token',
    price: 0.000001,
    change24h: 2.1,
    volume24h: 1200000,
    marketCap: 1500000,
    holders: 5000,
    image: '/api/placeholder/40/40',
    rwaValue: 0,
    aiScore: 45,
    aiPrediction: 'Caution',
    risk: 'High',
    nextResistance: 0.0000012,
    nextSupport: 0.0000008,
    liquidity: 150000,
    graduated: false,
    lpPool: null,
    contractAddress: '0xbasic123456789...',
    farcasterCast: '@basictoken',
    premium: false,
    aiFactors: {
      technicalAnalysis: 40,
      onChainMetrics: 45,
      socialSentiment: 50,
      rwaBackingRatio: 0,
      liquidityHealth: 35,
      holderDistribution: 60
    }
  }
]

const timeframes = [
  { label: '1m', value: '1m', dataPoints: 60 },
  { label: '5m', value: '5m', dataPoints: 288 },
  { label: '15m', value: '15m', dataPoints: 96 },
  { label: '1H', value: '1h', dataPoints: 168 },
  { label: '4H', value: '4h', dataPoints: 42 },
  { label: '1D', value: '1d', dataPoints: 30 },
  { label: '1W', value: '1w', dataPoints: 52 }
]

const chartStyles = [
  { label: 'Line', value: 'line', icon: TrendingUp },
  { label: 'Area', value: 'area', icon: Activity },
  { label: 'Candles', value: 'candles', icon: BarChart3 }
]

const indicators = [
  { label: 'Moving Average', value: 'ma', description: 'Simple/Exponential MA' },
  { label: 'RSI', value: 'rsi', description: 'Relative Strength Index' },
  { label: 'MACD', value: 'macd', description: 'Moving Average Convergence Divergence' },
  { label: 'Bollinger Bands', value: 'bb', description: 'Price volatility bands' },
  { label: 'Volume', value: 'volume', description: 'Trading volume overlay' }
]

const currencies = [
  { label: 'USD', value: 'usd', symbol: '$' },
  { label: 'SOL', value: 'sol', symbol: 'S' },
  { label: 'USDC', value: 'usdc', symbol: '$' },
  { label: 'ETH', value: 'eth', symbol: 'E' }
]

// Generate more realistic price data
const generatePriceData = (token: any, timeframe: string, points: number) => {
  const data = []
  const basePrice = token.price
  const volatility = token.risk === 'High' ? 0.05 : token.risk === 'Medium' ? 0.03 : 0.015
  
  for (let i = 0; i < points; i++) {
    const randomChange = (Math.random() - 0.5) * volatility
    const price = basePrice * (1 + randomChange + (token.change24h / 100) * (i / points))
    const volume = token.volume24h * (0.5 + Math.random() * 0.8) / 24 // Daily volume distributed
    
    data.push({
      time: new Date(Date.now() - (points - i) * getTimeframeMs(timeframe)).toLocaleTimeString(),
      price: Math.max(price, basePrice * 0.5), // Prevent negative prices
      volume,
      high: price * (1 + Math.random() * 0.02),
      low: price * (1 - Math.random() * 0.02),
      open: i === 0 ? basePrice : data[i - 1]?.price || basePrice,
      close: price
    })
  }
  
  return data
}

const getTimeframeMs = (timeframe: string) => {
  const map: Record<string, number> = {
    '1m': 60 * 1000,
    '5m': 5 * 60 * 1000,
    '15m': 15 * 60 * 1000,
    '1h': 60 * 60 * 1000,
    '4h': 4 * 60 * 60 * 1000,
    '1d': 24 * 60 * 60 * 1000,
    '1w': 7 * 24 * 60 * 60 * 1000
  }
  return map[timeframe] || 60 * 1000
}

const mockOrders = [
  { 
    id: 1, 
    type: 'Buy', 
    token: 'BONK', 
    amount: '1,000,000', 
    price: 0.0000243, 
    total: 24.3, 
    status: 'Filled', 
    time: '2 min ago',
    gasUsed: '0.002 SOL',
    slippage: '0.5%',
    route: 'Direct'
  }
]

interface TradingProps {
  userPoints: number
  onPointsChange: (points: number) => void
}

export function Trading({ userPoints, onPointsChange }: TradingProps) {
  const [selectedToken, setSelectedToken] = useState(mockTokens[0])
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy')
  const [orderAmount, setOrderAmount] = useState('')
  const [orderPrice, setOrderPrice] = useState('')
  const [slippageTolerance, setSlippageTolerance] = useState([0.5])
  const [gasPrice, setGasPrice] = useState([2])
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h')
  const [chartStyle, setChartStyle] = useState('line')
  const [selectedCurrency, setSelectedCurrency] = useState('usd')
  const [enabledIndicators, setEnabledIndicators] = useState<string[]>(['volume'])
  const [priceData, setPriceData] = useState(generatePriceData(selectedToken, selectedTimeframe, 168))
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false)
  const [showTokenPage, setShowTokenPage] = useState(false)
  const [activeChartTab, setActiveChartTab] = useState<'graph' | 'chat'>('graph')
  const [newChatMessages, setNewChatMessages] = useState(0)
  const [chatMessage, setChatMessage] = useState('')
  const [showTokenSearch, setShowTokenSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const timeframe = timeframes.find(t => t.value === selectedTimeframe)
    if (timeframe) {
      setPriceData(generatePriceData(selectedToken, selectedTimeframe, timeframe.dataPoints))
    }
  }, [selectedToken, selectedTimeframe])

  // Simulate new chat messages when on graph tab
  useEffect(() => {
    if (activeChartTab === 'graph') {
      const interval = setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance every interval
          setNewChatMessages(prev => prev + 1)
        }
      }, 8000) // Check every 8 seconds

      return () => clearInterval(interval)
    }
  }, [activeChartTab])

  const calculateTradeDetails = () => {
    const amount = parseFloat(orderAmount) || 0
    const price = parseFloat(orderPrice) || selectedToken.price
    const total = amount * price
    
    // Trading fees
    const tradeFee = total * 0.003 // 0.3%
    const remittanceFee = total * 0.001 // 0.1%
    const gasFee = gasPrice[0] * 0.001 // Estimated gas
    
    // Slippage calculation
    const slippageAmount = total * (slippageTolerance[0] / 100)
    const expectedReceived = orderType === 'buy' 
      ? amount * (1 - slippageTolerance[0] / 100)
      : total * (1 - slippageTolerance[0] / 100)
    
    // Route calculation for graduated tokens
    const route = selectedToken.graduated 
      ? `Vaulted → ${selectedToken.lpPool} → Token`
      : 'Vaulted Bonding Curve'
    
    return {
      subtotal: total,
      tradeFee,
      remittanceFee,
      gasFee,
      slippageAmount,
      totalFees: tradeFee + remittanceFee + gasFee,
      expectedReceived,
      finalTotal: total + tradeFee + remittanceFee + gasFee,
      route
    }
  }

  const executeOrder = () => {
    if (!orderAmount || !orderPrice) return
    
    const points = Math.floor(Math.random() * 50) + 10
    onPointsChange(userPoints + points)
    
    // Reset form
    setOrderAmount('')
    setOrderPrice('')
  }

  const toggleIndicator = (indicator: string) => {
    setEnabledIndicators(prev => 
      prev.includes(indicator) 
        ? prev.filter(i => i !== indicator)
        : [...prev, indicator]
    )
  }

  // Search and ranking logic
  const searchTokens = (query: string) => {
    if (!query.trim()) return []
    
    const lowerQuery = query.toLowerCase()
    
    return allTokens
      .filter(token => {
        const symbolMatch = token.symbol.toLowerCase().includes(lowerQuery)
        const nameMatch = token.name.toLowerCase().includes(lowerQuery)
        
        // For non-premium tokens, require exact match
        if (!token.premium && !token.graduated) {
          return token.symbol.toLowerCase() === lowerQuery || token.name.toLowerCase() === lowerQuery
        }
        
        // For premium/graduated tokens, partial match is fine
        return symbolMatch || nameMatch
      })
      .map(token => {
        // Calculate match score
        let score = 0
        const symbolLower = token.symbol.toLowerCase()
        const nameLower = token.name.toLowerCase()
        
        // Exact matches get highest score
        if (symbolLower === lowerQuery || nameLower === lowerQuery) {
          score = 1000000
        }
        // Starts with gets high score
        else if (symbolLower.startsWith(lowerQuery) || nameLower.startsWith(lowerQuery)) {
          score = 100000
        }
        // Contains gets medium score
        else if (symbolLower.includes(lowerQuery) || nameLower.includes(lowerQuery)) {
          score = 10000
        }
        
        // Add market cap as tiebreaker (normalized)
        score += token.marketCap / 1000000
        
        return { ...token, matchScore: score }
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10) // Limit to top 10 results
  }

  const handleTokenSelect = (token: any) => {
    setSelectedToken(token)
    setShowTokenSearch(false)
    setSearchQuery('')
  }

  const getAIScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-500'
    if (score >= 70) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getAIScoreDescription = (token: any) => {
    const factors = token.aiFactors
    let description = `AI Score of ${token.aiScore} based on comprehensive analysis. `
    
    // Technical analysis
    if (factors.technicalAnalysis > 85) {
      description += 'Strong technical indicators show bullish momentum. '
    } else if (factors.technicalAnalysis > 70) {
      description += 'Technical indicators show neutral to positive signals. '
    } else {
      description += 'Technical indicators suggest caution. '
    }
    
    // On-chain metrics
    if (factors.onChainMetrics > 80) {
      description += 'Excellent on-chain activity with healthy transaction patterns. '
    } else if (factors.onChainMetrics > 60) {
      description += 'Moderate on-chain activity levels. '
    } else {
      description += 'Limited on-chain activity detected. '
    }
    
    // Social sentiment
    if (factors.socialSentiment > 85) {
      description += 'Strong positive community sentiment across social platforms. '
    } else if (factors.socialSentiment > 70) {
      description += 'Generally positive community engagement. '
    } else {
      description += 'Mixed to negative social sentiment. '
    }
    
    // RWA backing
    if (factors.rwaBackingRatio > 80) {
      description += 'Strong RWA backing provides solid price floor protection. '
    } else if (factors.rwaBackingRatio > 50) {
      description += 'Moderate RWA backing with some downside protection. '
    } else {
      description += 'Limited RWA backing - higher volatility risk. '
    }
    
    return description
  }

  const renderChart = () => {
    const currency = currencies.find(c => c.value === selectedCurrency)
    
    if (chartStyle === 'area') {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={priceData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14F195" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#14F195" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(13, 20, 33, 0.95)', 
                border: '1px solid rgba(20, 241, 149, 0.2)',
                borderRadius: '8px'
              }} 
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#14F195"
              fillOpacity={1}
              fill="url(#colorPrice)"
              strokeWidth={2}
            />
            {enabledIndicators.includes('volume') && (
              <Area
                type="monotone"
                dataKey="volume"
                stroke="#9945FF"
                fillOpacity={0.2}
                fill="#9945FF"
                yAxisId="volume"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      )
    }

    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={priceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="time" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(13, 20, 33, 0.95)', 
              border: '1px solid rgba(20, 241, 149, 0.2)',
              borderRadius: '8px'
            }} 
          />
          
          {/* Price Line */}
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#14F195" 
            strokeWidth={2}
            dot={false}
          />
          
          {/* Support/Resistance Lines */}
          <ReferenceLine 
            y={selectedToken.nextResistance} 
            stroke="#FF6B6B" 
            strokeDasharray="5 5"
            label="Resistance"
          />
          <ReferenceLine 
            y={selectedToken.nextSupport} 
            stroke="#14F195" 
            strokeDasharray="5 5"
            label="Support"
          />
          
          {/* Volume bars if enabled */}
          {enabledIndicators.includes('volume') && (
            <Line
              type="monotone"
              dataKey="volume"
              stroke="#9945FF"
              strokeWidth={1}
              dot={false}
              yAxisId="volume"
            />
          )}
          
          <Brush dataKey="time" height={30} stroke="#14F195" />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  const tradeDetails = calculateTradeDetails()
  const searchResults = searchTokens(searchQuery)

  return (
    <div className="min-h-screen pt-32 lg:pt-24 pb-20 lg:pb-8 px-4 lg:px-8 bg-background-solid">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Advanced Trading Platform
          </h1>
          <p className="text-muted-foreground text-lg">
            Professional-grade trading with AI insights and RWA backing
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* Token List */}
          <div>
            <Card className="material-card overflow-hidden">
              {/* Hero Section with Background Image */}
              <div 
                className="relative h-32 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${selectedToken.backgroundImage || 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800'})`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                  <img
                    src={selectedToken.image}
                    alt={selectedToken.name}
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-white/20"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-white">${selectedToken.symbol}</h3>
                    <p className="text-white/80 text-sm">{selectedToken.name}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge 
                    variant={selectedToken.aiScore > 85 ? "default" : selectedToken.aiScore > 70 ? "secondary" : "outline"}
                    className={`${selectedToken.aiScore > 85 ? 'bg-success text-success-foreground' : ''}`}
                  >
                    AI: {selectedToken.aiScore}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4 space-y-4">
                {/* Token Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">Price</span>
                      <span className="font-medium">
                        ${selectedToken.price < 0.01 ? selectedToken.price.toFixed(8) : selectedToken.price.toFixed(4)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">24h Change</span>
                      <div className="flex items-center space-x-1">
                        {selectedToken.change24h > 0 ? (
                          <ArrowUpRight className="w-3 h-3 text-success" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 text-destructive" />
                        )}
                        <span className={`text-sm ${selectedToken.change24h > 0 ? 'text-success' : 'text-destructive'}`}>
                          {selectedToken.change24h > 0 ? '+' : ''}{selectedToken.change24h.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">Volume 24h</span>
                      <span className="font-medium">${(selectedToken.volume24h / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">RWA Value</span>
                      <span className="font-medium text-primary">${(selectedToken.rwaValue / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">Holders</span>
                      <span className="font-medium">{(selectedToken.holders / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">Status</span>
                      {selectedToken.graduated ? (
                        <Badge variant="outline" className="text-xs">
                          Graduated
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          Active
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Social Links */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm flex items-center">
                    <ExternalLink className="w-4 h-4 mr-2 text-primary" />
                    Social Links
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Website
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Telegram
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      <User className="w-3 h-3 mr-1" />
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Discord
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Farcaster Feed */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2 text-primary" />
                    Community Feed
                  </h4>
                  
                  {/* Feed Posts */}
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {[
                      {
                        id: '1',
                        author: { username: `${selectedToken.symbol.toLowerCase()}official`, displayName: `${selectedToken.name} Official`, avatar: selectedToken.image, verified: true },
                        content: `🚀 Big announcement coming this week! The RWA backing for ${selectedToken.symbol} just increased by 15%. Community governance vote results are in!`,
                        timestamp: '2 hours ago',
                        metrics: { likes: 284, comments: 42, recasts: 156 }
                      },
                      {
                        id: '2',
                        author: { username: 'cryptowhale88', displayName: 'Crypto Whale 🐋', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32', verified: false },
                        content: `Just analyzed the on-chain metrics for ${selectedToken.symbol}. The AI score of ${selectedToken.aiScore} is looking extremely bullish. Perfect entry point right now! 📈`,
                        timestamp: '4 hours ago',
                        metrics: { likes: 156, comments: 28, recasts: 89 }
                      },
                      {
                        id: '3',
                        author: { username: 'defi_researcher', displayName: 'DeFi Researcher', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32', verified: true },
                        content: `The tokenomics of ${selectedToken.symbol} are revolutionary. Trading fees buying RWA for the vault creates a real price floor. This is the future!`,
                        timestamp: '6 hours ago',
                        metrics: { likes: 203, comments: 67, recasts: 124 }
                      }
                    ].map((post) => (
                      <div key={post.id} className="material-card p-3">
                        <div className="flex items-start space-x-2">

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-1 mb-1">
                              <span className="font-medium text-xs truncate">{post.author.displayName}</span>
                              <span className="text-muted-foreground text-xs">@{post.author.username}</span>
                              {post.author.verified && (
                                <div className="w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                                  <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full"></div>
                                </div>
                              )}
                              <span className="text-muted-foreground text-xs">{post.timestamp}</span>
                            </div>
                            <p className="text-xs leading-relaxed mb-2">{post.content}</p>
                            <div className="flex items-center space-x-3">
                              <button className="flex items-center space-x-1 text-muted-foreground hover:text-destructive transition-colors">
                                <ArrowUpRight className="w-3 h-3" />
                                <span className="text-xs">{post.metrics.likes}</span>
                              </button>
                              <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
                                <MessageSquare className="w-3 h-3" />
                                <span className="text-xs">{post.metrics.comments}</span>
                              </button>
                              <button className="flex items-center space-x-1 text-muted-foreground hover:text-secondary transition-colors">
                                <Repeat className="w-3 h-3" />
                                <span className="text-xs">{post.metrics.recasts}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full h-8 text-xs">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View Full Feed
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Trading Interface */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Advanced Price Chart */}
            <Card className="material-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={selectedToken.image}
                      alt={selectedToken.name}
                      width={32}
                      height={32}
                      className="rounded-full mr-3"
                    />
                    <div 
                      className="cursor-pointer group transition-all duration-200 hover:bg-card-hover rounded-lg px-2 py-1 -ml-2"
                      onClick={() => setShowTokenSearch(true)}
                    >
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {selectedToken.symbol}/{selectedCurrency.toUpperCase()}
                        </h3>
                        <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {selectedToken.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      {currencies.find(c => c.value === selectedCurrency)?.symbol}
                      {selectedToken.price < 0.01 ? selectedToken.price.toFixed(8) : selectedToken.price.toFixed(4)}
                    </p>
                    <div className="flex items-center space-x-1">
                      {selectedToken.change24h > 0 ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      )}
                      <span className={`text-sm ${selectedToken.change24h > 0 ? 'text-success' : 'text-destructive'}`}>
                        {selectedToken.change24h > 0 ? '+' : ''}{selectedToken.change24h.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </CardTitle>
                
                {/* Chart Controls */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  {/* Timeframe Selector */}
                  <div className="flex items-center space-x-1">
                    {timeframes.map((tf) => (
                      <Button
                        key={tf.value}
                        variant={selectedTimeframe === tf.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTimeframe(tf.value)}
                        className="h-8 px-2 text-xs"
                      >
                        {tf.label}
                      </Button>
                    ))}
                  </div>
                  
                  <Separator orientation="vertical" className="h-8" />
                  
                  {/* Chart Style */}
                  <Select value={chartStyle} onValueChange={setChartStyle}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {chartStyles.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          <div className="flex items-center">
                            <style.icon className="w-4 h-4 mr-2" />
                            {style.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {/* Currency Selector */}
                  <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Separator orientation="vertical" className="h-8" />
                  
                  {/* Indicators Toggle */}
                  <div className="flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Indicators:</span>
                    {indicators.slice(0, 3).map((indicator) => (
                      <Button
                        key={indicator.value}
                        variant={enabledIndicators.includes(indicator.value) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleIndicator(indicator.value)}
                        className="h-8 px-2 text-xs"
                      >
                        {indicator.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* Tab Navigation */}
                <div className="flex border-b border-border/30 bg-card/50 backdrop-blur-sm">
                  <button
                    onClick={() => setActiveChartTab('graph')}
                    className={`flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      activeChartTab === 'graph'
                        ? 'bg-primary/10 text-primary border-b-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-card-hover'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Chart
                  </button>
                  <button
                    onClick={() => {
                      setActiveChartTab('chat')
                      setNewChatMessages(0)
                    }}
                    className={`flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium transition-all duration-200 relative ${
                      activeChartTab === 'chat'
                        ? 'bg-primary/10 text-primary border-b-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-card-hover'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat
                    {newChatMessages > 0 && activeChartTab === 'graph' && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs animate-pulse"
                      >
                        {newChatMessages > 9 ? '9+' : newChatMessages}
                      </Badge>
                    )}
                  </button>
                </div>

                {/* Content Container - Layered */}
                <div className="relative h-[600px] overflow-hidden">
                  {/* Graph Container */}
                  <div 
                    className={`absolute inset-0 p-4 transition-all duration-300 ease-in-out ${
                      activeChartTab === 'graph' 
                        ? 'opacity-100 translate-x-0 z-10' 
                        : 'opacity-0 translate-x-4 z-0 pointer-events-none'
                    }`}
                  >
                    <div className="h-full flex flex-col">
                      <div className="flex-1 mb-4">
                        {renderChart()}
                      </div>
                      
                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                        <div className="material-card p-3">
                          <p className="text-muted-foreground mb-1">Market Cap</p>
                          <p className="font-medium">${(selectedToken.marketCap / 1000000000).toFixed(2)}B</p>
                        </div>
                        <div className="material-card p-3">
                          <p className="text-muted-foreground mb-1">24h Volume</p>
                          <p className="font-medium">${(selectedToken.volume24h / 1000000).toFixed(1)}M</p>
                        </div>
                        <div className="material-card p-3">
                          <p className="text-muted-foreground mb-1">Liquidity</p>
                          <p className="font-medium">${(selectedToken.liquidity / 1000000).toFixed(1)}M</p>
                        </div>
                        <div className="material-card p-3">
                          <p className="text-muted-foreground mb-1">Holders</p>
                          <p className="font-medium">{(selectedToken.holders / 1000).toFixed(0)}K</p>
                        </div>
                        <div className="material-card p-3">
                          <p className="text-muted-foreground mb-1">RWA Value</p>
                          <p className="font-medium text-primary">${(selectedToken.rwaValue / 1000).toFixed(0)}K</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Container */}
                  <div 
                    className={`absolute inset-0 p-4 transition-all duration-300 ease-in-out ${
                      activeChartTab === 'chat' 
                        ? 'opacity-100 translate-x-0 z-10' 
                        : 'opacity-0 -translate-x-4 z-0 pointer-events-none'
                    }`}
                  >
                    <div className="h-full">
                      {/* Chat Messages */}
                      <div className="flex flex-col h-full">
                        <div className="flex-1 space-y-3 overflow-y-auto pr-2 mb-4">
                          {[
                            {
                              id: '1',
                              user: { username: 'whaletrader', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32', level: 'whale', verified: true },
                              content: `Just scooped up another bag of ${selectedToken.symbol}! 🚀 The RWA backing is solid`,
                              timestamp: '2 min ago',
                              type: 'message'
                            },
                            {
                              id: '2',
                              user: { username: 'system', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32', level: 'mod', verified: true },
                              content: `🎯 Large buy order: 500K ${selectedToken.symbol} @ ${selectedToken.price.toFixed(8)}`,
                              timestamp: '3 min ago',
                              type: 'trade'
                            },
                            {
                              id: '3',
                              user: { username: 'cryptonewbie', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c1c2?w=32', level: 'newbie', verified: false },
                              content: 'Can someone explain what RWA backing means? New to this!',
                              timestamp: '5 min ago',
                              type: 'message'
                            },
                            {
                              id: '4',
                              user: { username: 'aianalyst', avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=32', level: 'trader', verified: true },
                              content: `AI score just hit ${selectedToken.aiScore} for ${selectedToken.symbol}! Technical indicators looking extremely bullish 📈`,
                              timestamp: '7 min ago',
                              type: 'message'
                            },
                            {
                              id: '5',
                              user: { username: 'moonrider', avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=32', level: 'trader', verified: false },
                              content: 'HODL strong! 💎🙌 This token has the best tokenomics in the space',
                              timestamp: '8 min ago',
                              type: 'message'
                            },
                            {
                              id: '6',
                              user: { username: 'system', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32', level: 'mod', verified: true },
                              content: `💰 RWA vault value increased to ${(selectedToken.rwaValue / 1000).toFixed(0)}K`,
                              timestamp: '10 min ago',
                              type: 'system'
                            }
                          ].map((message) => (
                            <div key={message.id} className={`flex space-x-2 ${message.type === 'system' ? 'justify-center' : ''}`}>
                              {message.type === 'system' ? (
                                <div className="text-center">
                                  <div className="material-card py-2 px-3 inline-block">
                                    <Badge variant="outline" className="text-xs bg-primary/10 border-primary/30">
                                      {message.content}
                                    </Badge>
                                    <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
                                  </div>
                                </div>
                              ) : (
                                <>

                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className={`font-medium text-sm ${
                                        message.user.level === 'whale' ? 'text-primary' :
                                        message.user.level === 'trader' ? 'text-secondary' :
                                        message.user.level === 'mod' ? 'text-warning' :
                                        'text-muted-foreground'
                                      }`}>
                                        {message.user.username}
                                      </span>
                                      {message.user.level === 'whale' && <Zap className="w-3 h-3 text-primary" />}
                                      {message.user.level === 'trader' && <TrendingUp className="w-3 h-3 text-secondary" />}
                                      {message.user.level === 'mod' && <AlertTriangle className="w-3 h-3 text-warning" />}
                                      {message.user.verified && (
                                        <div className="w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                                          <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full"></div>
                                        </div>
                                      )}
                                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                                    </div>
                                    <p className="text-sm leading-relaxed">{message.content}</p>
                                  </div>
                                </>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Chat Input */}
                        <div className="border-t border-border/30 pt-4">
                          <div className="flex space-x-2">
                            <Input
                              placeholder={`Chat about ${selectedToken.symbol}...`}
                              value={chatMessage}
                              onChange={(e) => setChatMessage(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter' && chatMessage.trim()) {
                                  setChatMessage('')
                                  // Simulate new message when on graph tab
                                  if (activeChartTab === 'graph') {
                                    setNewChatMessages(prev => prev + 1)
                                  }
                                }
                              }}
                              className="flex-1"
                            />
                            <Button 
                              disabled={!chatMessage.trim()}
                              size="sm"
                              className="px-3"
                              onClick={() => {
                                if (chatMessage.trim()) {
                                  setChatMessage('')
                                  if (activeChartTab === 'graph') {
                                    setNewChatMessages(prev => prev + 1)
                                  }
                                }
                              }}
                            >
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          {/* Chat Status */}
                          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                              <span>156 online</span>
                            </div>
                            <span>Press Enter to send</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced AI Analysis */}
            <Card className="material-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-secondary" />
                    AI Analysis for {selectedToken.symbol}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Experimental
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="material-card text-center p-4">
                    <p className="text-sm text-muted-foreground mb-2">AI Score</p>
                    <p className={`text-3xl font-bold ${getAIScoreColor(selectedToken.aiScore)}`}>
                      {selectedToken.aiScore}
                    </p>
                    <Progress value={selectedToken.aiScore} className="mt-2" />
                  </div>
                  <div className="material-card text-center p-4">
                    <p className="text-sm text-muted-foreground mb-2">Prediction</p>
                    <Badge 
                      variant={selectedToken.aiPrediction === 'Strong Buy' ? 'default' : 'secondary'}
                      className={`${selectedToken.aiPrediction === 'Strong Buy' ? 'bg-success text-success-foreground' : ''}`}
                    >
                      {selectedToken.aiPrediction}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-2">Next 24h</p>
                  </div>
                  <div className="material-card text-center p-4">
                    <p className="text-sm text-muted-foreground mb-2">Risk Level</p>
                    <Badge 
                      variant="outline"
                      className={`${
                        selectedToken.risk === 'Low' ? 'text-success border-success' :
                        selectedToken.risk === 'Medium' ? 'text-warning border-warning' :
                        'text-destructive border-destructive'
                      }`}
                    >
                      {selectedToken.risk}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-2">Volatility</p>
                  </div>
                  <div className="material-card text-center p-4">
                    <p className="text-sm text-muted-foreground mb-2">Confidence</p>
                    <p className="text-2xl font-bold">{Math.floor(selectedToken.aiScore * 0.9)}%</p>
                    <p className="text-xs text-muted-foreground mt-2">Model Certainty</p>
                  </div>
                </div>

                {/* Detailed Factor Analysis */}
                <div className="space-y-3 mb-4">
                  <h4 className="font-medium text-sm">Analysis Factors:</h4>
                  {Object.entries(selectedToken.aiFactors).map(([factor, score]) => (
                    <div key={factor} className="flex items-center justify-between">
                      <span className="text-sm capitalize">
                        {factor.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <div className="flex items-center space-x-2">
                        <Progress value={score} className="w-20" />
                        <span className="text-sm font-medium w-8">{score}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Analysis Description */}
                <div className="material-card p-4">
                  <p className="text-sm leading-relaxed">{getAIScoreDescription(selectedToken)}</p>
                </div>

                {/* Disclaimer */}
                <div className="mt-4 material-card p-3 bg-warning/10 border border-warning/30">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-warning">
                      <p className="font-medium mb-1">Experimental AI Analysis</p>
                      <p>This AI analysis is experimental and may contain inaccuracies. The model is continuously learning and improving. Always conduct your own research and consider multiple factors before making investment decisions. Past performance does not guarantee future results.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="material-card p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Next Resistance:</span>
                      <span className="font-medium text-destructive">
                        ${selectedToken.nextResistance < 0.01 ? selectedToken.nextResistance.toFixed(8) : selectedToken.nextResistance.toFixed(4)}
                      </span>
                    </div>
                  </div>
                  <div className="material-card p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Next Support:</span>
                      <span className="font-medium text-success">
                        ${selectedToken.nextSupport < 0.01 ? selectedToken.nextSupport.toFixed(8) : selectedToken.nextSupport.toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Trading Panel */}
          <div className="space-y-6">
            
            {/* Advanced Order Form */}
            <Card className="material-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  Advanced Trading
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs value={orderType} onValueChange={(value) => setOrderType(value as 'buy' | 'sell')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="buy" className="text-green-500">Buy</TabsTrigger>
                    <TabsTrigger value="sell" className="text-red-500">Sell</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={orderType} className="space-y-4 mt-4">
                    
                    {/* Token Selection */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Token</label>
                      <Select value={selectedToken.symbol} onValueChange={(symbol) => {
                        const token = mockTokens.find(t => t.symbol === symbol)
                        if (token) setSelectedToken(token)
                      }}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {mockTokens.map((token) => (
                            <SelectItem key={token.symbol} value={token.symbol}>
                              <div className="flex items-center">
                                <img
                                  src={token.image}
                                  alt={token.name}
                                  width={16}
                                  height={16}
                                  className="rounded-full mr-2"
                                />
                                {token.symbol} - {token.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Amount */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Amount ({selectedToken.symbol})
                      </label>
                      <Input
                        placeholder="0.00"
                        value={orderAmount}
                        onChange={(e) => setOrderAmount(e.target.value)}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Min: 1 {selectedToken.symbol}</span>
                        <span>Available: 1,000 SOL</span>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Price (USD)</label>
                      <div className="relative">
                        <Input
                          placeholder={selectedToken.price.toString()}
                          value={orderPrice}
                          onChange={(e) => setOrderPrice(e.target.value)}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-8 px-2 text-xs"
                          onClick={() => setOrderPrice(selectedToken.price.toString())}
                        >
                          Market
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    {/* Advanced Settings Toggle */}
                    <div>
                      <Button
                        variant="ghost"
                        onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                        className="w-full justify-between p-2 h-auto"
                      >
                        <span className="text-sm font-medium">Advanced Settings</span>
                        {showAdvancedSettings ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>

                      {showAdvancedSettings && (
                        <div className="space-y-4 mt-4">
                          {/* Gas Controls */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="text-sm font-medium">Gas Price</label>
                              <span className="text-xs text-gray-400">{gasPrice[0]} Gwei</span>
                            </div>
                            <Slider
                              value={gasPrice}
                              onValueChange={setGasPrice}
                              max={10}
                              min={1}
                              step={0.1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>Slow (1 Gwei)</span>
                              <span>Fast (10 Gwei)</span>
                            </div>
                          </div>

                          {/* Slippage Controls */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="text-sm font-medium">Slippage Tolerance</label>
                              <span className="text-xs text-gray-400">{slippageTolerance[0]}%</span>
                            </div>
                            <Slider
                              value={slippageTolerance}
                              onValueChange={setSlippageTolerance}
                              max={5}
                              min={0.1}
                              step={0.1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>0.1%</span>
                              <span>5%</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <Separator />

                    {/* Trade Route Information */}
                    <div className="material-card p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Route className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">Trade Route</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {selectedToken.graduated ? 'LP Route' : 'Bonding Curve'}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{tradeDetails.route}</p>
                    </div>

                    {/* Fee Breakdown */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Fee Breakdown</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span className="font-medium">${tradeDetails.subtotal.toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Trade Fee (0.3%):</span>
                          <span className="text-muted-foreground">${tradeDetails.tradeFee.toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Remittance Fee (0.1%):</span>
                          <span className="text-muted-foreground">${tradeDetails.remittanceFee.toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Gas Fee:</span>
                          <span className="text-muted-foreground">${tradeDetails.gasFee.toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Max Slippage:</span>
                          <span className="text-warning">${tradeDetails.slippageAmount.toFixed(4)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-medium">
                          <span>Expected Received:</span>
                          <span className="text-primary">
                            {orderType === 'buy' 
                              ? `${tradeDetails.expectedReceived.toFixed(2)} ${selectedToken.symbol}`
                              : `${tradeDetails.expectedReceived.toFixed(4)}`
                            }
                          </span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span>Total Cost:</span>
                          <span className="font-bold">${tradeDetails.finalTotal.toFixed(4)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={executeOrder}
                      disabled={!orderAmount || !orderPrice}
                      className={`w-full ${
                        orderType === 'buy' ? 'bg-success hover:bg-success/90' : 'bg-destructive hover:bg-destructive/90'
                      }`}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {orderType === 'buy' ? 'Buy' : 'Sell'} {selectedToken.symbol}
                    </Button>

                    <div className="text-xs text-muted-foreground text-center mt-2">
                      <Info className="w-3 h-3 inline mr-1" />
                      Estimated execution time: ~3-5 seconds
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Enhanced Order History */}
            <Card className="material-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-secondary" />
                    Order History
                  </div>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockOrders.map((order) => (
                  <div key={order.id} className="material-card p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={order.type === 'Buy' ? 'default' : 'destructive'}
                          className={`text-xs ${order.type === 'Buy' ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'}`}
                        >
                          {order.type}
                        </Badge>
                        <span className="font-medium text-sm">{order.token}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {order.status === 'Filled' ? (
                          <CheckCircle className="w-3 h-3 text-success" />
                        ) : order.status === 'Partial' ? (
                          <AlertTriangle className="w-3 h-3 text-warning" />
                        ) : (
                          <Clock className="w-3 h-3 text-muted-foreground" />
                        )}
                        <Badge variant="outline" className="text-xs">
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex justify-between">
                          <span>Amount:</span>
                          <span>{order.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Price:</span>
                          <span>${order.price < 0.01 ? order.price.toFixed(8) : order.price.toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total:</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time:</span>
                          <span>{order.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Gas Used:</span>
                          <span className="text-warning">{order.gasUsed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Slippage:</span>
                          <span className="text-primary">{order.slippage}</span>
                        </div>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-border">
                        <span>Route:</span>
                        <span className="text-primary">{order.route}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Token Page Modal */}
        {showTokenPage && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
               onClick={() => setShowTokenPage(false)}>
            <div className="material-card max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                 onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedToken.image}
                      alt={selectedToken.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <h2 className="text-2xl font-bold">{selectedToken.name} ({selectedToken.symbol})</h2>
                      <p className="text-muted-foreground">{selectedToken.farcasterCast}</p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setShowTokenPage(false)}>
                    Close
                  </Button>
                </div>
              </div>
              
              <div className="p-6 grid lg:grid-cols-2 gap-6">
                {/* Token Info */}
                <div className="space-y-6">
                  <Card className="material-card">
                    <CardHeader>
                      <CardTitle>Token Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Contract</p>
                          <p className="font-mono text-xs">{selectedToken.contractAddress}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          <Badge variant={selectedToken.graduated ? "default" : "secondary"}>
                            {selectedToken.graduated ? 'Graduated' : 'Bonding Curve'}
                          </Badge>
                        </div>
                        {selectedToken.graduated && (
                          <div>
                            <p className="text-muted-foreground">LP Pool</p>
                            <p className="font-medium">{selectedToken.lpPool}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-muted-foreground">RWA Backing</p>
                          <p className="font-medium text-primary">${(selectedToken.rwaValue / 1000).toFixed(0)}K</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Farcaster Feed Placeholder */}
                  <Card className="material-card">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Farcaster Feed
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="material-card p-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{selectedToken.farcasterCast}</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                Big announcement coming this week! The RWA backing just increased by 15%. 
                                Community vote results are in! #BONK #DeFi
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Full Feed
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Token Chat */}
                <div>
                  <Card className="material-card h-96">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Token Chat
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col h-full">
                      <div className="flex-1 space-y-3 overflow-y-auto">
                        <div className="flex space-x-2">
                          <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-3 h-3" />
                          </div>
                          <div>
                            <p className="text-sm">Just bought the dip!</p>
                            <p className="text-xs text-muted-foreground">5 min ago</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-3 h-3" />
                          </div>
                          <div>
                            <p className="text-sm">AI score looking bullish</p>
                            <p className="text-xs text-muted-foreground">8 min ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Input placeholder="Type a message..." className="flex-1" />
                        <Button size="sm">
                          Send
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Token Search Modal */}
        <TokenSearchModal
          isOpen={showTokenSearch}
          onClose={() => setShowTokenSearch(false)}
          onTokenSelect={handleTokenSelect}
          allTokens={allTokens}
          searchTokens={searchTokens}
        />
      </div>
    </div>
  )
}