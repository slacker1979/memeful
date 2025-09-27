import { useState } from 'react'
import { 
  Brain, 
  TrendingUp, 
  Users, 
  Vote, 
  Settings,
  Target,
  DollarSign,
  Calendar,
  Eye,
  ExternalLink,
  ChevronRight,
  Zap,
  BarChart3,
  Activity,
  Coins,
  Gem,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Play,
  RotateCcw,
  X
} from './ui/icons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Switch } from './ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { ImageWithFallback } from './figma/ImageWithFallback'

const AI_STRATEGIES = [
  {
    id: 1,
    name: 'Crypto Momentum Hunter',
    category: 'Cryptocurrency',
    description: 'AI identifies trending crypto assets with strong momentum patterns',
    tokenSymbol: 'BONK',
    strategy: 'momentum',
    performance: '+45.8%',
    isPositive: true,
    monthlyReturn: '12.3%',
    riskLevel: 'High',
    allocation: '$125,000',
    totalValue: '$182,250',
    aiConfidence: 87,
    status: 'Active',
    trades: 156,
    winRate: '68%',
    lastAction: 'Bought SOL at $98.45',
    actionTime: '2 hours ago',
    icon: '₿',
    color: 'text-warning'
  },
  {
    id: 2,
    name: 'Blue Chip Stocks Analyzer',
    category: 'Traditional Stocks',
    description: 'Focuses on S&P 500 stocks with AI-driven fundamental analysis',
    tokenSymbol: 'PEPE',
    strategy: 'fundamental',
    performance: '+18.2%',
    isPositive: true,
    monthlyReturn: '4.8%',
    riskLevel: 'Medium',
    allocation: '$85,000',
    totalValue: '$100,470',
    aiConfidence: 92,
    status: 'Active',
    trades: 34,
    winRate: '78%',
    lastAction: 'Sold NVDA at $875.20',
    actionTime: '1 day ago',
    icon: '📈',
    color: 'text-success'
  },
  {
    id: 3,
    name: 'DeFi Yield Optimizer',
    category: 'DeFi Protocol',
    description: 'Automated LP position management and yield farming optimization',
    tokenSymbol: 'WIF',
    strategy: 'yield',
    performance: '+28.9%',
    isPositive: true,
    monthlyReturn: '8.7%',
    riskLevel: 'Medium',
    allocation: '$65,000',
    totalValue: '$83,785',
    aiConfidence: 81,
    status: 'Active',
    trades: 89,
    winRate: '72%',
    lastAction: 'Added to USDC-SOL LP',
    actionTime: '6 hours ago',
    icon: '🌊',
    color: 'text-primary'
  },
  {
    id: 4,
    name: 'NFT Collection Curator',
    category: 'Digital Assets',
    description: 'AI analyzes floor prices and rarity to trade blue-chip NFTs',
    tokenSymbol: 'MYRO',
    strategy: 'arbitrage',
    performance: '-5.2%',
    isPositive: false,
    monthlyReturn: '-1.8%',
    riskLevel: 'High',
    allocation: '$45,000',
    totalValue: '$42,660',
    aiConfidence: 64,
    status: 'Paused',
    trades: 23,
    winRate: '61%',
    lastAction: 'Listed Pudgy #4521',
    actionTime: '3 days ago',
    icon: '🖼️',
    color: 'text-secondary'
  },
  {
    id: 5,
    name: 'RWA Dividend Hunter',
    category: 'Real World Assets',
    description: 'Tokenized real estate and commodity investments for steady yields',
    tokenSymbol: 'BASIC',
    strategy: 'income',
    performance: '+12.1%',
    isPositive: true,
    monthlyReturn: '3.2%',
    riskLevel: 'Low',
    allocation: '$150,000',
    totalValue: '$168,150',
    aiConfidence: 95,
    status: 'Active',
    trades: 12,
    winRate: '92%',
    lastAction: 'Acquired REIT shares',
    actionTime: '1 week ago',
    icon: '🏠',
    color: 'text-chart-3'
  }
]

const mockProposals = [
  {
    id: 1,
    title: 'Enable Leverage Trading Strategy',
    description: 'Proposal to allow AI bots to use 2x leverage on crypto positions for increased returns',
    tokenSymbol: 'BONK',
    requestedAmount: 'Strategy Update',
    currentVotes: 15420,
    totalVotes: 25000,
    status: 'Active',
    timeLeft: '5 days',
    proposer: '7x9k...m3n2',
    support: 78,
    against: 22
  },
  {
    id: 2,
    title: 'Pause NFT Strategy',
    description: 'Motion to temporarily pause NFT trading due to market volatility',
    tokenSymbol: 'MYRO',
    requestedAmount: 'Risk Management',
    currentVotes: 8900,
    totalVotes: 18000,    
    status: 'Active',
    timeLeft: '2 days',
    proposer: '4k2s...x7f9',
    support: 85,
    against: 15
  },
  {
    id: 3,
    title: 'Distribute AI Trading Profits',
    description: 'Distribute Q1 AI trading profits of $45,000 to token holders',
    tokenSymbol: 'PEPE',
    requestedAmount: '$45,000',
    currentVotes: 12000,
    totalVaults: 18000,
    status: 'Passed',
    timeLeft: 'Executed',
    proposer: '9m1x...k5t2',
    support: 94,
    against: 6
  }
]

interface AIStrategyVaultProps {
  userPoints: number
}

export function AIStrategyVault({ userPoints }: AIStrategyVaultProps) {
  const [selectedStrategy, setSelectedStrategy] = useState<number | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('performance')

  const totalVaultValue = AI_STRATEGIES.reduce((sum, strategy) => 
    sum + parseInt(strategy.totalValue.replace(/[$,]/g, '')), 0
  )

  const totalProfit = AI_STRATEGIES.reduce((sum, strategy) => {
    const performance = parseFloat(strategy.performance.replace(/[+%]/g, ''))
    const allocation = parseInt(strategy.allocation.replace(/[$,]/g, ''))
    return sum + (allocation * performance / 100)
  }, 0)

  const activeStrategies = AI_STRATEGIES.filter(s => s.status === 'Active').length

  const filteredStrategies = AI_STRATEGIES.filter(strategy => 
    filterCategory === 'all' || strategy.category.toLowerCase().includes(filterCategory.toLowerCase())
  ).sort((a, b) => {
    switch (sortBy) {
      case 'performance':
        return parseFloat(b.performance.replace(/[+%\-]/g, '')) - parseFloat(a.performance.replace(/[+%\-]/g, ''))
      case 'confidence':
        return b.aiConfidence - a.aiConfidence
      case 'allocation':
        return parseInt(b.allocation.replace(/[$,]/g, '')) - parseInt(a.allocation.replace(/[$,]/g, ''))
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-20 lg:pb-8 px-4 lg:px-8 bg-background-solid">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 fade-in">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI Strategy Vaults
          </h1>
          <p className="text-muted-foreground text-lg">
            From Meme To Meaningful - AI-powered trading strategies managing your token's treasury
          </p>
        </div>

        {/* Vault Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="slide-in-up">
            <Card className="material-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Vault Value</p>
                    <p className="text-2xl font-bold">${totalVaultValue.toLocaleString()}</p>
                    <p className="text-sm text-success">+{((totalProfit / (totalVaultValue - totalProfit)) * 100).toFixed(1)}% Total Return</p>
                  </div>
                  <Brain className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="slide-in-up">
            <Card className="material-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">AI Strategies</p>
                    <p className="text-2xl font-bold">{AI_STRATEGIES.length}</p>
                    <p className="text-sm text-primary">{activeStrategies} active</p>
                  </div>
                  <Brain className="w-8 h-8 text-secondary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="slide-in-up">
            <Card className="material-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Profit</p>
                    <p className="text-2xl font-bold text-success">${totalProfit.toLocaleString()}</p>
                    <p className="text-sm text-warning">This quarter</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="slide-in-up">
            <Card className="material-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg AI Confidence</p>
                    <p className="text-2xl font-bold">84%</p>
                    <p className="text-sm text-secondary">High certainty</p>
                  </div>
                  <Target className="w-8 h-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="strategies" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3 material-card">
            <TabsTrigger value="strategies">AI Strategies</TabsTrigger>
            <TabsTrigger value="governance">Strategy Governance</TabsTrigger>
            <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="strategies" className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col lg:flex-row gap-4 slide-in-up">
              <div className="flex-1">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="material-card">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    <SelectItem value="stocks">Traditional Stocks</SelectItem>
                    <SelectItem value="defi">DeFi Protocol</SelectItem>
                    <SelectItem value="nft">Digital Assets</SelectItem>
                    <SelectItem value="rwa">Real World Assets</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="material-card">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="confidence">AI Confidence</SelectItem>
                    <SelectItem value="allocation">Allocation Size</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredStrategies.map((strategy, index) => (
                <div
                  key={strategy.id}
                  className="slide-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card 
                    className="material-card cursor-pointer"
                    onClick={() => setSelectedStrategy(selectedStrategy === strategy.id ? null : strategy.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`text-2xl ${strategy.color}`}>
                            {strategy.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{strategy.name}</h3>
                            <Badge variant="outline" className="text-xs mb-2">
                              {strategy.category}
                            </Badge>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {strategy.tokenSymbol}
                              </Badge>
                              <Badge 
                                variant={strategy.status === 'Active' ? 'default' : 'secondary'}
                                className={strategy.status === 'Active' ? 'bg-success text-success-foreground' : 'bg-muted'}
                              >
                                {strategy.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-bold ${strategy.isPositive ? 'text-success' : 'text-destructive'}`}>
                            {strategy.performance}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {strategy.monthlyReturn}/month
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">
                        {strategy.description}
                      </p>

                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>AI Confidence</span>
                          <span>{strategy.aiConfidence}%</span>
                        </div>
                        <Progress value={strategy.aiConfidence} className="h-2" />
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Allocation</p>
                            <p className="font-medium">{strategy.allocation}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Current Value</p>
                            <p className="font-medium">{strategy.totalValue}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Risk Level</p>
                            <p className="font-medium">{strategy.riskLevel}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Win Rate</p>
                            <p className="font-medium">{strategy.winRate}</p>
                          </div>
                        </div>
                      </div>

                      {selectedStrategy === strategy.id && (
                        <div className="border-t border-border/50 pt-4 space-y-4 slide-in-up">
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Recent Activity</p>
                            <div className="flex items-center space-x-2 text-sm">
                              <Activity className="w-4 h-4 text-primary" />
                              <span>{strategy.lastAction}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{strategy.actionTime}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Settings className="w-4 h-4 mr-1" />
                              Configure
                            </Button>
                          </div>

                          {strategy.status === 'Active' && (
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="flex-1 text-warning border-warning/50">
                                <X className="w-4 h-4 mr-1" />
                                Pause
                              </Button>
                              <Button variant="outline" size="sm" className="flex-1 text-secondary border-secondary/50">
                                <RotateCcw className="w-4 h-4 mr-1" />
                                Reset
                              </Button>
                            </div>
                          )}

                          {strategy.status === 'Paused' && (
                            <Button variant="outline" size="sm" className="w-full text-success border-success/50">
                              <Play className="w-4 h-4 mr-1" />
                              Resume Strategy
                            </Button>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="governance" className="space-y-6">
            <div className="slide-in-up">
              <Card className="material-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Vote className="w-5 h-5 mr-2 text-secondary" />
                    Strategy Governance Proposals
                  </CardTitle>
                  <CardDescription>
                    Vote on AI strategy modifications and risk management decisions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockProposals.map((proposal, index) => (
                      <div
                        key={proposal.id}
                        className="border border-border/50 rounded-lg p-6 slide-in-left"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold">{proposal.title}</h3>
                              <Badge variant="outline" className="text-xs">
                                {proposal.tokenSymbol}
                              </Badge>
                              <Badge 
                                variant={proposal.status === 'Active' ? 'default' : proposal.status === 'Passed' ? 'secondary' : 'destructive'}
                                className={
                                  proposal.status === 'Active' ? 'bg-primary text-primary-foreground' :
                                  proposal.status === 'Passed' ? 'bg-success text-success-foreground' : ''
                                }
                              >
                                {proposal.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {proposal.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm">
                              <span className="text-muted-foreground">
                                Proposed by: {proposal.proposer}
                              </span>
                              <span className="text-muted-foreground">
                                Type: {proposal.requestedAmount}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Time left</p>
                            <p className="font-medium">{proposal.timeLeft}</p>
                          </div>
                        </div>

                        {proposal.status === 'Active' && (
                          <>
                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between text-sm">
                                <span>Voting Progress</span>
                                <span>{proposal.currentVotes.toLocaleString()} / {proposal.totalVotes.toLocaleString()}</span>
                              </div>
                              <Progress value={(proposal.currentVotes / proposal.totalVotes) * 100} />
                            </div>

                            <div className="flex items-center space-x-4 mb-4">
                              <div className="flex-1">
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-success">Support</span>
                                  <span>{proposal.support}%</span>
                                </div>
                                <Progress value={proposal.support} className="h-2" />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-destructive">Against</span>
                                  <span>{proposal.against}%</span>
                                </div>
                                <Progress value={proposal.against} className="h-2" />
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              <Button variant="outline" className="flex-1 text-success border-success/50 hover:bg-success/10">
                                <Vote className="w-4 h-4 mr-2" />
                                Vote Yes
                              </Button>
                              <Button variant="outline" className="flex-1 text-destructive border-destructive/50 hover:bg-destructive/10">
                                <Vote className="w-4 h-4 mr-2" />
                                Vote No
                              </Button>
                            </div>
                          </>
                        )}

                        {proposal.status === 'Passed' && (
                          <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-success rounded-full"></div>
                              <span className="text-sm text-success">Proposal passed and implemented</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="slide-in-up">
              <Card className="material-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                    Performance Analytics Dashboard
                  </CardTitle>
                  <CardDescription>
                    Detailed analytics and performance metrics for all AI strategies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">Advanced Analytics Coming Soon</h3>
                    <p className="text-muted-foreground mb-4">
                      Real-time performance tracking, risk analysis, and AI decision explanations.
                    </p>
                    <Button variant="outline">
                      Get Early Access
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}