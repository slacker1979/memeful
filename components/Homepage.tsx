import { useState, useEffect } from 'react'
// Animation imports removed due to build issues
import { 
  TrendingUp, 
  TrendingDown, 
  Rocket,
  Star,
  Users,
  DollarSign,
  BarChart3,
  Zap,
  Crown,
  ArrowUpRight,
  Search,
  Filter,
  Grid,
  List,
  ExternalLink,
  Calendar,
  Timer,
  Coins,
  Eye,
  MessageSquare,
  Target,
  Shield,
  Activity
} from './ui/icons'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { ImageWithFallback } from './figma/ImageWithFallback'

const featuredTokens = [
  {
    id: '1',
    symbol: 'BONK',
    name: 'Bonk',
    price: 0.0000245,
    change24h: 15.7,
    volume24h: 12500000,
    marketCap: 1850000000,
    holders: 125000,
    image: '/api/placeholder/40/40',
    category: 'trending',
    rwaValue: 125000,
    aiScore: 87,
    promoted: true
  },
  {
    id: '2',
    symbol: 'PEPE',
    name: 'Pepe',
    price: 0.00000875,
    change24h: -8.3,
    volume24h: 8750000,
    marketCap: 945000000,
    holders: 89000,
    image: '/api/placeholder/40/40',
    category: 'meme',
    rwaValue: 87500,
    aiScore: 65,
    promoted: true
  },
  {
    id: '3',
    symbol: 'WIF',
    name: 'dogwifhat',
    price: 2.45,
    change24h: 23.4,
    volume24h: 25000000,
    marketCap: 2450000000,
    holders: 45000,
    image: '/api/placeholder/40/40',
    category: 'trending',
    rwaValue: 245000,
    aiScore: 92,
    promoted: true
  }
]

const recentlyLaunched = [
  {
    id: '4',
    symbol: 'MOON',
    name: 'MoonCoin',
    price: 0.0025,
    change24h: 145.8,
    volume24h: 1250000,
    marketCap: 125000000,
    holders: 25000,
    image: '/api/placeholder/40/40',
    category: 'new',
    rwaValue: 12500,
    aiScore: 78,
    launchedHours: 2
  },
  {
    id: '5',
    symbol: 'FIRE',
    name: 'FireToken',
    price: 0.000045,
    change24h: 89.2,
    volume24h: 850000,
    marketCap: 45000000,
    holders: 15000,
    image: '/api/placeholder/40/40',
    category: 'new',
    rwaValue: 8500,
    aiScore: 82,
    launchedHours: 6
  }
]

interface HomepageProps {
  onTokenSelect: (tokenId: string) => void
  onNavigateToTrading: () => void
  onAdminLogin?: () => void
}

export function Homepage({ onTokenSelect, onNavigateToTrading, onAdminLogin }: HomepageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const allTokens = [...featuredTokens, ...recentlyLaunched]
  
  const filteredTokens = allTokens.filter(token => {
    const matchesSearch = token.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || token.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + 'B'
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const formatPrice = (price: number) => {
    if (price < 0.01) {
      return price.toFixed(8)
    }
    return price.toFixed(4)
  }

  return (
    <div className="min-h-screen pt-32 lg:pt-24 pb-20 lg:pb-8 px-4 lg:px-8 bg-gradient-to-br from-background-solid via-primary/5 to-secondary/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Vaulted
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              From Meme To Meaningful
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The next generation memecoin platform with RWA backing, AI analysis, and sustainable tokenomics
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Button 
              onClick={onNavigateToTrading}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Start Trading
            </Button>
            <Button 
              variant="outline"
              onClick={() => onTokenSelect('launcher')}
            >
              <Zap className="w-4 h-4 mr-2" />
              Launch Token
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="material-card p-4">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold">$125M</p>
              <p className="text-xs text-muted-foreground">Total RWA Value</p>
            </div>
            <div className="material-card p-4">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <p className="text-2xl font-bold">45K+</p>
              <p className="text-xs text-muted-foreground">Active Traders</p>
            </div>
            <div className="material-card p-4">
              <div className="flex items-center justify-center mb-2">
                <Coins className="w-5 h-5 text-warning" />
              </div>
              <p className="text-2xl font-bold">1,247</p>
              <p className="text-xs text-muted-foreground">Tokens Launched</p>
            </div>
            <div className="material-card p-4">
              <div className="flex items-center justify-center mb-2">
                <BarChart3 className="w-5 h-5 text-success" />
              </div>
              <p className="text-2xl font-bold">$2.8B</p>
              <p className="text-xs text-muted-foreground">Total Volume</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <Card className="material-card">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tokens by name or symbol..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="trending">Trending</SelectItem>
                    <SelectItem value="meme">Meme Tokens</SelectItem>
                    <SelectItem value="new">Recently Launched</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Token Sections */}
        <Tabs defaultValue="featured" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="featured">Featured Tokens</TabsTrigger>
            <TabsTrigger value="recent">Recently Launched</TabsTrigger>
            <TabsTrigger value="all">All Tokens</TabsTrigger>
          </TabsList>

          <TabsContent value="featured">
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
            }>
              {featuredTokens.map((token) => (
                <Card 
                  key={token.id} 
                  className="material-card cursor-pointer"
                  onClick={() => onTokenSelect(token.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <ImageWithFallback
                          src={token.image}
                          alt={token.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold">{token.symbol}</h3>
                          <p className="text-sm text-muted-foreground">{token.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {token.promoted && (
                          <Crown className="w-4 h-4 text-warning mb-1" />
                        )}
                        <Badge variant="outline" className="text-xs">
                          AI: {token.aiScore}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">
                          ${formatPrice(token.price)}
                        </span>
                        <div className={`flex items-center space-x-1 ${
                          token.change24h > 0 ? 'text-success' : 'text-destructive'
                        }`}>
                          {token.change24h > 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span className="font-medium">
                            {token.change24h > 0 ? '+' : ''}{token.change24h.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">Market Cap</p>
                          <p className="font-medium">${formatNumber(token.marketCap)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">24h Volume</p>
                          <p className="font-medium">${formatNumber(token.volume24h)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Shield className="w-3 h-3 text-primary" />
                          <span className="text-primary">${formatNumber(token.rwaValue)} RWA</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3 text-muted-foreground" />
                          <span>{formatNumber(token.holders)} holders</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
            }>
              {recentlyLaunched.map((token) => (
                <Card 
                  key={token.id} 
                  className="material-card cursor-pointer"
                  onClick={() => onTokenSelect(token.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <ImageWithFallback
                          src={token.image}
                          alt={token.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold">{token.symbol}</h3>
                          <p className="text-sm text-muted-foreground">{token.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="text-xs mb-1">
                          <Timer className="w-3 h-3 mr-1" />
                          {token.launchedHours}h ago
                        </Badge>
                        <Badge variant="outline" className="text-xs block">
                          AI: {token.aiScore}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">
                          ${formatPrice(token.price)}
                        </span>
                        <div className="flex items-center space-x-1 text-success">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-medium">
                            +{token.change24h.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">Market Cap</p>
                          <p className="font-medium">${formatNumber(token.marketCap)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">24h Volume</p>
                          <p className="font-medium">${formatNumber(token.volume24h)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Shield className="w-3 h-3 text-primary" />
                          <span className="text-primary">${formatNumber(token.rwaValue)} RWA</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3 text-muted-foreground" />
                          <span>{formatNumber(token.holders)} holders</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all">
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
            }>
              {filteredTokens.length > 0 ? (
                filteredTokens.map((token) => (
                  <Card 
                    key={token.id} 
                    className="material-card cursor-pointer"
                    onClick={() => onTokenSelect(token.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <ImageWithFallback
                            src={token.image}
                            alt={token.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div>
                            <h3 className="font-semibold">{token.symbol}</h3>
                            <p className="text-sm text-muted-foreground">{token.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-xs">
                            AI: {token.aiScore}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">
                            ${formatPrice(token.price)}
                          </span>
                          <div className={`flex items-center space-x-1 ${
                            token.change24h > 0 ? 'text-success' : 'text-destructive'
                          }`}>
                            {token.change24h > 0 ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            <span className="font-medium">
                              {token.change24h > 0 ? '+' : ''}{token.change24h.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-muted-foreground">Market Cap</p>
                            <p className="font-medium">${formatNumber(token.marketCap)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">24h Volume</p>
                            <p className="font-medium">${formatNumber(token.volume24h)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1">
                            <Shield className="w-3 h-3 text-primary" />
                            <span className="text-primary">${formatNumber(token.rwaValue)} RWA</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3 text-muted-foreground" />
                            <span>{formatNumber(token.holders)} holders</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-muted-foreground mb-4">
                    No tokens found matching your criteria
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('all')
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="material-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Launch Your Token?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join the revolution with RWA-backed memecoins. Create sustainable value 
                with our AI-powered platform and community-driven tokenomics.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button 
                  onClick={() => onTokenSelect('launcher')}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Launch Token
                </Button>
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Homepage