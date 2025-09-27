import { useState, useEffect } from 'react'
// Animation imports removed due to build issues
import { 
  Star,
  Clock,
  TrendingUp,
  DollarSign,
  Coins,
  Timer,
  Crown,
  Trophy,
  Gavel,
  Target,
  AlertTriangle,
  Info,
  Search,
  Filter
} from './ui/icons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Alert, AlertDescription } from './ui/alert'
import { ImageWithFallback } from './figma/ImageWithFallback'

// Mock data for current auction
const currentAuction = {
  id: 'auction_001',
  startTime: Date.now() - (45 * 60 * 1000), // 45 minutes ago
  endTime: Date.now() + (15 * 60 * 1000), // 15 minutes from now
  spots: [
    {
      position: 1,
      token: {
        id: 'bonk',
        symbol: 'BONK',
        name: 'Bonk',
        image: '/api/placeholder/40/40'
      },
      currentBid: 5.2,
      bidder: '0x1234...5678',
      currency: 'SOL'
    },
    {
      position: 2,
      token: {
        id: 'wif',
        symbol: 'WIF', 
        name: 'dogwifhat',
        image: '/api/placeholder/40/40'
      },
      currentBid: 3.8,
      bidder: '0x9876...5432',
      currency: 'SOL'
    },
    {
      position: 3,
      token: {
        id: 'pepe',
        symbol: 'PEPE',
        name: 'Pepe',
        image: '/api/placeholder/40/40'
      },
      currentBid: 2.1,
      bidder: '0xabcd...efgh',
      currency: 'SOL'
    }
  ]
}

const availableTokens = [
  { id: 'bonk', symbol: 'BONK', name: 'Bonk', image: '/api/placeholder/40/40' },
  { id: 'wif', symbol: 'WIF', name: 'dogwifhat', image: '/api/placeholder/40/40' },
  { id: 'pepe', symbol: 'PEPE', name: 'Pepe', image: '/api/placeholder/40/40' },
  { id: 'myro', symbol: 'MYRO', name: 'Myro', image: '/api/placeholder/40/40' },
  { id: 'jup', symbol: 'JUP', name: 'Jupiter', image: '/api/placeholder/40/40' }
]

interface FeaturedAuctionProps {
  isCompact?: boolean
  showBidButton?: boolean
  onTokenSelect?: (tokenId: string) => void
}

export function FeaturedAuction({ isCompact = false, showBidButton = true, onTokenSelect }: FeaturedAuctionProps) {
  const [timeLeft, setTimeLeft] = useState(0)
  const [showBidModal, setShowBidModal] = useState(false)
  const [selectedToken, setSelectedToken] = useState('')
  const [bidAmount, setBidAmount] = useState('')
  const [bidCurrency, setBidCurrency] = useState<'SOL' | 'USDC'>('SOL')
  const [maxBid, setMaxBid] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // Calculate time remaining
  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now()
      const remaining = Math.max(0, currentAuction.endTime - now)
      setTimeLeft(remaining)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const getMinimumBid = (position: number) => {
    const currentBids = currentAuction.spots.map(spot => spot.currentBid).sort((a, b) => b - a)
    
    switch (position) {
      case 1:
        return currentBids[0] + 0.1
      case 2:
        return Math.max(currentBids[1] + 0.1, currentBids[0] * 0.8)
      case 3:
        return Math.max(currentBids[2] + 0.1, currentBids[1] * 0.8)
      default:
        return 0.1
    }
  }

  const handlePlaceBid = () => {
    if (!selectedToken || !bidAmount) return
    
    // Validate bid amount
    const bid = parseFloat(bidAmount)
    const minBid = Math.min(...currentAuction.spots.map(spot => getMinimumBid(spot.position)))
    
    if (bid < minBid) {
      alert(`Minimum bid is ${minBid} ${bidCurrency}`)
      return
    }
    
    // Simulate placing bid
    console.log(`Placing bid: ${bid} ${bidCurrency} for ${selectedToken}`)
    setShowBidModal(false)
    setBidAmount('')
    setSelectedToken('')
  }

  const filteredTokens = availableTokens.filter(token => 
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isCompact) {
    return (
      <Card className="material-card mx-[0px] my-[20px] p-[0px]">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center">
              <Star className="w-4 h-4 mr-2 text-warning" />
              Featured Spot Auction
            </CardTitle>
            <div className="flex items-center space-x-2 text-xs">
              <Clock className="w-3 h-3 text-muted-foreground" />
              <span className={`font-mono ${timeLeft < 300000 ? 'text-destructive' : 'text-muted-foreground'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {currentAuction.spots.map((spot) => (
              <div 
                key={spot.position} 
                className="flex items-center justify-between p-2 border border-border/50 rounded cursor-pointer hover:bg-card-hover transition-colors"
                onClick={() => onTokenSelect?.(spot.token.id)}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    spot.position === 1 ? 'bg-warning text-warning-foreground' :
                    spot.position === 2 ? 'bg-muted text-foreground' :
                    'bg-muted/50 text-muted-foreground'
                  }`}>
                    {spot.position}
                  </div>
                  <ImageWithFallback
                    src={spot.token.image}
                    alt={spot.token.symbol}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium">{spot.token.symbol}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">{spot.currentBid} {spot.currency}</div>
                </div>
              </div>
            ))}
          </div>
          
          {showBidButton && (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-3"
              onClick={() => setShowBidModal(true)}
            >
              <Gavel className="w-3 h-3 mr-2" />
              Place Bid
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Current Auction Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid lg:grid-cols-4 gap-6"
      >
        <Card className="material-card lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Trophy className="w-6 h-6 mr-3 text-warning" />
                Featured Spot Auction
              </CardTitle>
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className={timeLeft < 300000 ? 'border-destructive text-destructive' : ''}>
                  <Timer className="w-3 h-3 mr-1" />
                  {formatTime(timeLeft)} left
                </Badge>
                <Badge variant="default" className="bg-primary text-primary-foreground">
                  Hourly Auction
                </Badge>
              </div>
            </div>
            <CardDescription>
              Bid SOL or USDC to secure a featured spot in the ticker and carousel for 1 hour
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentAuction.spots.map((spot, index) => (
                <motion.div
                  key={spot.position}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                    spot.position === 1 ? 'border-warning bg-warning/5' :
                    spot.position === 2 ? 'border-muted bg-muted/5' :
                    'border-border bg-card/50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      spot.position === 1 ? 'bg-warning text-warning-foreground' :
                      spot.position === 2 ? 'bg-muted text-foreground' :
                      'bg-muted/50 text-muted-foreground'
                    }`}>
                      {spot.position === 1 ? (
                        <Crown className="w-6 h-6" />
                      ) : (
                        spot.position
                      )}
                    </div>
                    
                    <div 
                      className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => onTokenSelect?.(spot.token.id)}
                    >
                      <ImageWithFallback
                        src={spot.token.image}
                        alt={spot.token.symbol}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-bold text-lg">{spot.token.symbol}</h3>
                        <p className="text-muted-foreground text-sm">{spot.token.name}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <div>
                        <p className="text-2xl font-bold">{spot.currentBid}</p>
                        <p className="text-sm text-muted-foreground">{spot.currency}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <p>by {spot.bidder}</p>
                        <p className="text-success">Leading</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <Alert className="mt-6">
              <Info className="w-4 h-4" />
              <AlertDescription>
                <strong>Auction Rules:</strong> Top 3 bids win featured spots for 1 hour. 
                All bids are final and held in escrow until auction ends. New auction starts immediately after.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="material-card">
          <CardHeader>
            <CardTitle className="text-lg">Auction Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {currentAuction.spots.reduce((sum, spot) => sum + spot.currentBid, 0).toFixed(1)}
              </p>
              <p className="text-sm text-muted-foreground">Total Bids (SOL)</p>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">24</p>
              <p className="text-sm text-muted-foreground">Active Bidders</p>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">156</p>
              <p className="text-sm text-muted-foreground">Bids This Hour</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Next Auction</p>
              <div className="text-xs text-muted-foreground">
                <p>Starts automatically</p>
                <p>Duration: 1 hour</p>
                <p>Escrow released after</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Place Bid Button */}
      {showBidButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Button 
            size="lg" 
            onClick={() => setShowBidModal(true)}
            className="px-8"
          >
            <Gavel className="w-5 h-5 mr-2" />
            Place Your Bid
          </Button>
        </motion.div>
      )}

      {/* Bid Modal */}
      <Dialog open={showBidModal} onOpenChange={setShowBidModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Gavel className="w-5 h-5 mr-2 text-primary" />
              Place Featured Spot Bid
            </DialogTitle>
            <DialogDescription>
              Bid for a featured position in the ticker and carousel. Top 3 bids win 1-hour spots.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Current Winners Display */}
            <div className="grid grid-cols-3 gap-3">
              {currentAuction.spots.map((spot) => (
                <div key={spot.position} className="text-center p-3 bg-card/50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    spot.position === 1 ? 'bg-warning text-warning-foreground' :
                    spot.position === 2 ? 'bg-muted text-foreground' :
                    'bg-muted/50 text-muted-foreground'
                  }`}>
                    {spot.position}
                  </div>
                  <p className="text-sm font-medium">{spot.token.symbol}</p>
                  <p className="text-xs text-muted-foreground">{spot.currentBid} {spot.currency}</p>
                  <p className="text-xs text-success mt-1">Min: {getMinimumBid(spot.position).toFixed(1)}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Token Selection */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Token</label>
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search tokens..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="max-h-48 overflow-y-auto space-y-2 border border-border rounded-lg p-2">
                    {filteredTokens.map((token) => (
                      <div
                        key={token.id}
                        onClick={() => setSelectedToken(token.id)}
                        className={`flex items-center space-x-3 p-2 rounded cursor-pointer transition-colors ${
                          selectedToken === token.id 
                            ? 'bg-primary/20 border border-primary/50' 
                            : 'hover:bg-card-hover'
                        }`}
                      >
                        <ImageWithFallback
                          src={token.image}
                          alt={token.symbol}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-medium text-sm">{token.symbol}</p>
                          <p className="text-xs text-muted-foreground">{token.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bid Amount */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Bid Amount</label>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="0.0"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        step="0.1"
                        min="0.1"
                      />
                    </div>
                    <Select value={bidCurrency} onValueChange={(value: 'SOL' | 'USDC') => setBidCurrency(value)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SOL">SOL</SelectItem>
                        <SelectItem value="USDC">USDC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Max Bid (Optional)</label>
                  <Input
                    type="number"
                    placeholder="Set spending limit"
                    value={maxBid}
                    onChange={(e) => setMaxBid(e.target.value)}
                    step="0.1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Automatically increase bid up to this limit if outbid
                  </p>
                </div>

                {bidAmount && selectedToken && (
                  <div className="p-3 bg-warning/10 border border-warning/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-warning" />
                      <span className="text-sm font-medium text-warning">Final Bid Confirmation</span>
                    </div>
                    <div className="text-sm space-y-1">
                      <p>Token: <strong>{availableTokens.find(t => t.id === selectedToken)?.symbol}</strong></p>
                      <p>Amount: <strong>{bidAmount} {bidCurrency}</strong></p>
                      <p className="text-warning">This bid cannot be cancelled!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-3">
              <Button 
                onClick={handlePlaceBid}
                disabled={!selectedToken || !bidAmount}
                className="flex-1"
              >
                <Gavel className="w-4 h-4 mr-2" />
                Place Bid ({bidAmount || '0'} {bidCurrency})
              </Button>
              <Button variant="outline" onClick={() => setShowBidModal(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}