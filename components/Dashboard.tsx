import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Zap, 
  Brain,
  Target,
  Coins,
  BarChart3,
  Activity
} from './ui/icons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'

const mockTradingData = [
  { time: '00:00', volume: 1200, price: 0.045 },
  { time: '04:00', volume: 1800, price: 0.052 },
  { time: '08:00', volume: 2400, price: 0.048 },
  { time: '12:00', volume: 3200, price: 0.065 },
  { time: '16:00', volume: 2800, price: 0.071 },
  { time: '20:00', volume: 2100, price: 0.069 },
]

const mockPortfolio = [
  { name: 'BONK', value: 15420, change: +12.5, holdings: '1,250,000' },
  { name: 'PEPE', value: 8300, change: -3.2, holdings: '500,000' },
  { name: 'DOGE', value: 12100, change: +8.7, holdings: '75,000' },
  { name: 'SHIB', value: 6800, change: +15.3, holdings: '2,000,000' },
]

const mockAIInsights = [
  {
    token: 'BONK',
    confidence: 87,
    prediction: 'Strong Buy',
    reason: 'High social sentiment, increasing whale activity',
    risk: 'Medium'
  },
  {
    token: 'PEPE',
    confidence: 65,
    prediction: 'Hold',
    reason: 'Stable trading volume, mixed technical indicators',
    risk: 'Low'
  },
  {
    token: 'WIF',
    confidence: 92,
    prediction: 'Strong Buy',
    reason: 'New partnership announcement, bullish on-chain metrics',
    risk: 'High'
  }
]

interface DashboardProps {
  userPoints: number
}

export function Dashboard({ userPoints }: DashboardProps) {
  const totalPortfolioValue = mockPortfolio.reduce((sum, token) => sum + token.value, 0)
  const totalChange = ((totalPortfolioValue - 35000) / 35000) * 100

  return (
    <div className="min-h-screen pt-32 lg:pt-24 pb-20 lg:pb-8 px-4 lg:px-8 bg-background-solid">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Welcome Section */}
        <div className="text-center mb-8 fade-in">
          <h1 className="text-3xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome to Vaulted
          </h1>
          <p className="text-muted-foreground text-lg">
            From Meme To Meaningful - Your AI-powered trading companion
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="slide-in-up">
            <Card className="material-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Portfolio Value</p>
                    <p className="text-2xl font-bold">${totalPortfolioValue.toLocaleString()}</p>
                    <div className="flex items-center mt-1">
                      {totalChange > 0 ? (
                        <TrendingUp className="w-4 h-4 text-success mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-destructive mr-1" />
                      )}
                      <span className={`text-sm ${totalChange > 0 ? 'text-success' : 'text-destructive'}`}>
                        {totalChange > 0 ? '+' : ''}{totalChange.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <DollarSign className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="slide-in-up">
            <Card className="material-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Trades</p>
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-sm text-success">+3 today</p>
                  </div>
                  <Activity className="w-8 h-8 text-secondary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="slide-in-up">
            <Card className="material-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Mining Rate</p>
                    <p className="text-2xl font-bold">847</p>
                    <p className="text-sm text-primary">tokens/hour</p>
                  </div>
                  <Zap className="w-8 h-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="slide-in-up">
            <Card className="material-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">RWA Assets</p>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-success">$85.2K value</p>
                  </div>
                  <Coins className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="slide-in-left">
            <Card className="material-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                  24H Trading Volume
                </CardTitle>
                <CardDescription>Volume and price trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-border/50">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">Trading charts coming soon</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Volume:</span>
                        <span className="text-primary">2,400 SOL</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Price:</span>
                        <span className="text-secondary">$0.069</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="slide-in-right">
            <Card className="material-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-secondary" />
                  AI Trading Insights
                </CardTitle>
                <CardDescription>Real-time AI analysis and predictions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockAIInsights.map((insight, index) => (
                  <div key={index} className="border border-border/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-primary border-primary/50">
                          {insight.token}
                        </Badge>
                        <Badge 
                          variant={insight.prediction === 'Strong Buy' ? 'default' : 'secondary'}
                          className={insight.prediction === 'Strong Buy' ? 'bg-success text-success-foreground' : ''}
                        >
                          {insight.prediction}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{insight.confidence}%</p>
                        <p className="text-xs text-muted-foreground">Confidence</p>
                      </div>
                    </div>
                    <Progress value={insight.confidence} className="mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">{insight.reason}</p>
                    <p className="text-xs text-warning">Risk: {insight.risk}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="slide-in-up">
          <Card className="material-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary" />
                Portfolio Overview
              </CardTitle>
              <CardDescription>Your current token holdings and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {mockPortfolio.map((token, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                        <span className="font-bold text-sm">{token.name}</span>
                      </div>
                      <div>
                        <p className="font-medium">{token.name}</p>
                        <p className="text-sm text-muted-foreground">{token.holdings} tokens</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${token.value.toLocaleString()}</p>
                      <div className="flex items-center">
                        {token.change > 0 ? (
                          <TrendingUp className="w-4 h-4 text-success mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-destructive mr-1" />
                        )}
                        <span className={`text-sm ${token.change > 0 ? 'text-success' : 'text-destructive'}`}>
                          {token.change > 0 ? '+' : ''}{token.change}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}