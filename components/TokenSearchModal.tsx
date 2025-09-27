import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Separator } from './ui/separator'
import { 
  TrendingUp, 
  TrendingDown, 
  Search,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Star,
  Crown
} from './ui/icons'

interface Token {
  symbol: string
  name: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  holders: number
  image: string
  rwaValue: number
  aiScore: number
  aiPrediction: string
  risk: string
  nextResistance: number
  nextSupport: number
  liquidity: number
  graduated: boolean
  lpPool: string | null
  contractAddress: string
  farcasterCast: string
  premium: boolean
  matchScore?: number
  aiFactors: {
    technicalAnalysis: number
    onChainMetrics: number
    socialSentiment: number
    rwaBackingRatio: number
    liquidityHealth: number
    holderDistribution: number
  }
}

interface TokenSearchModalProps {
  isOpen: boolean
  onClose: () => void
  onTokenSelect: (token: Token) => void
  allTokens: Token[]
  searchTokens: (query: string) => Token[]
}

export function TokenSearchModal({ isOpen, onClose, onTokenSelect, allTokens, searchTokens }: TokenSearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const searchResults = searchTokens(searchQuery)

  if (!isOpen) return null

  const handleTokenSelect = (token: Token) => {
    onTokenSelect(token)
    setSearchQuery('')
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="material-card max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2 text-primary" />
              Search Tokens
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by token name or symbol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto space-y-2">
            {searchQuery.trim() ? (
              searchResults.length > 0 ? (
                searchResults.map((token) => (
                  <div
                    key={token.symbol}
                    className="material-card p-3 cursor-pointer hover:bg-card-hover transition-colors"
                    onClick={() => handleTokenSelect(token)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={token.image}
                          alt={token.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{token.symbol}</h4>
                            {token.premium && (
                              <Crown className="w-3 h-3 text-warning" />
                            )}
                            {token.graduated && (
                              <Badge variant="outline" className="text-xs">
                                Graduated
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{token.name}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-medium">
                          ${token.price < 0.01 ? token.price.toFixed(8) : token.price.toFixed(4)}
                        </p>
                        <div className="flex items-center space-x-1">
                          {token.change24h > 0 ? (
                            <ArrowUpRight className="w-3 h-3 text-success" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3 text-destructive" />
                          )}
                          <span className={`text-xs ${token.change24h > 0 ? 'text-success' : 'text-destructive'}`}>
                            {token.change24h > 0 ? '+' : ''}{token.change24h.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">Market Cap</p>
                        <p className="font-medium">
                          ${token.marketCap > 1000000000 
                            ? (token.marketCap / 1000000000).toFixed(2) + 'B'
                            : (token.marketCap / 1000000).toFixed(1) + 'M'
                          }
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Volume 24h</p>
                        <p className="font-medium">${(token.volume24h / 1000000).toFixed(1)}M</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">AI Score</p>
                        <p className={`font-medium ${
                          token.aiScore >= 85 ? 'text-success' :
                          token.aiScore >= 70 ? 'text-warning' :
                          'text-destructive'
                        }`}>
                          {token.aiScore}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No tokens found</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try searching for different keywords
                  </p>
                </div>
              )
            ) : (
              <div className="space-y-3">
                <h4 className="font-medium flex items-center">
                  <Star className="w-4 h-4 mr-2 text-primary" />
                  Popular Tokens
                </h4>
                {allTokens.filter(token => token.premium || token.graduated).slice(0, 6).map((token) => (
                  <div
                    key={token.symbol}
                    className="material-card p-3 cursor-pointer hover:bg-card-hover transition-colors"
                    onClick={() => handleTokenSelect(token)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={token.image}
                          alt={token.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{token.symbol}</h4>
                            {token.premium && (
                              <Crown className="w-3 h-3 text-warning" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{token.name}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          ${token.price < 0.01 ? token.price.toFixed(8) : token.price.toFixed(4)}
                        </p>
                        <div className="flex items-center space-x-1">
                          <span className={`text-xs ${token.change24h > 0 ? 'text-success' : 'text-destructive'}`}>
                            {token.change24h > 0 ? '+' : ''}{token.change24h.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />
          
          {/* Search Tips */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Premium and graduated tokens appear with partial matches</p>
            <p>• Non-premium tokens require exact name/symbol match</p>
            <p>• Results are ranked by relevance and market cap</p>
          </div>
        </CardContent>
      </div>
    </div>
  )
}