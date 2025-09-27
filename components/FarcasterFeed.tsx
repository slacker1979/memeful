import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { 
  ExternalLink, 
  User, 
  Heart, 
  MessageCircle, 
  Repeat2, 
  TrendingUp,
  Calendar,
  RefreshCw
} from './ui/icons'

interface FarcasterPost {
  id: string
  author: {
    username: string
    displayName: string
    avatar: string
    verified: boolean
  }
  content: string
  timestamp: string
  metrics: {
    likes: number
    comments: number
    recasts: number
  }
  mentions?: string[]
  tags?: string[]
}

interface FarcasterFeedProps {
  tokenSymbol: string
  tokenName: string
  farcasterHandle: string
  className?: string
}

export function FarcasterFeed({ tokenSymbol, tokenName, farcasterHandle, className = '' }: FarcasterFeedProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [posts] = useState<FarcasterPost[]>([
    {
      id: '1',
      author: {
        username: farcasterHandle.replace('@', ''),
        displayName: `${tokenName} Official`,
        avatar: '/api/placeholder/32/32',
        verified: true
      },
      content: `🚀 Big announcement coming this week! The RWA backing for $${tokenSymbol} just increased by 15%. Community governance vote results are in! #${tokenSymbol} #DeFi #RWA`,
      timestamp: '2 hours ago',
      metrics: {
        likes: 284,
        comments: 42,
        recasts: 156
      },
      mentions: [`@${tokenSymbol.toLowerCase()}`],
      tags: [tokenSymbol, 'DeFi', 'RWA']
    },
    {
      id: '2',
      author: {
        username: 'cryptowhale88',
        displayName: 'Crypto Whale 🐋',
        avatar: '/api/placeholder/32/32',
        verified: false
      },
      content: `Just analyzed the on-chain metrics for $${tokenSymbol}. The AI score of 87 is looking extremely bullish. Perfect entry point right now! 📈 #${tokenSymbol}`,
      timestamp: '4 hours ago',
      metrics: {
        likes: 156,
        comments: 28,
        recasts: 89
      },
      mentions: [`@${tokenSymbol.toLowerCase()}`],
      tags: [tokenSymbol]
    },
    {
      id: '3',
      author: {
        username: 'memecoin_analyst',
        displayName: 'Memecoin Analyst',
        avatar: '/api/placeholder/32/32',
        verified: true
      },
      content: `Breaking: $${tokenSymbol} holders now at ${Math.floor(Math.random() * 50 + 100)}K+! The community is growing rapidly. RWA vault accumulation continues. This is not financial advice. DYOR! 🔍`,
      timestamp: '6 hours ago',
      metrics: {
        likes: 97,
        comments: 15,
        recasts: 43
      },
      mentions: [`@${tokenSymbol.toLowerCase()}`],
      tags: [tokenSymbol, 'DYOR']
    },
    {
      id: '4',
      author: {
        username: 'defi_researcher',
        displayName: 'DeFi Researcher',
        avatar: '/api/placeholder/32/32',
        verified: true
      },
      content: `The tokenomics of $${tokenSymbol} are revolutionary. Trading fees buying RWA for the vault creates a real price floor. This is the future of sustainable memecoins! 🏗️`,
      timestamp: '8 hours ago',
      metrics: {
        likes: 203,
        comments: 67,
        recasts: 124
      },
      mentions: [`@${tokenSymbol.toLowerCase()}`],
      tags: [tokenSymbol, 'tokenomics']
    },
    {
      id: '5',
      author: {
        username: 'solana_news',
        displayName: 'Solana News',
        avatar: '/api/placeholder/32/32',
        verified: true
      },
      content: `$${tokenSymbol} volume up 300% today! The Vaulted platform is seeing unprecedented adoption. Mobile trading is the future! 📱✨`,
      timestamp: '12 hours ago',
      metrics: {
        likes: 445,
        comments: 89,
        recasts: 267
      },
      mentions: [`@${tokenSymbol.toLowerCase()}`],
      tags: [tokenSymbol, 'Solana', 'mobile']
    }
  ])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <Card className="material-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <ExternalLink className="w-5 h-5 mr-2 text-primary" />
              <span>Farcaster Feed - ${tokenSymbol}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                Live
              </Badge>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="h-8 w-8 p-0"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {posts.map((post) => (
              <div key={post.id} className="p-4 border border-border/50 rounded-lg hover:bg-card-hover transition-colors">
                <div className="flex items-start space-x-3">
                  <ImageWithFallback
                    src={post.author.avatar}
                    alt={post.author.displayName}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-sm truncate">{post.author.displayName}</h4>
                      <span className="text-muted-foreground text-sm">@{post.author.username}</span>
                      {post.author.verified && (
                        <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                        </div>
                      )}
                      <span className="text-muted-foreground text-xs flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.timestamp}
                      </span>
                    </div>
                    
                    <p className="text-sm leading-relaxed mb-3">{post.content}</p>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-muted-foreground hover:text-destructive transition-colors">
                          <Heart className="w-4 h-4" />
                          <span className="text-xs">{formatNumber(post.metrics.likes)}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-xs">{formatNumber(post.metrics.comments)}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-muted-foreground hover:text-secondary transition-colors">
                          <Repeat2 className="w-4 h-4" />
                          <span className="text-xs">{formatNumber(post.metrics.recasts)}</span>
                        </button>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-4 pt-4 border-t border-border/30">
            <Button variant="outline" size="sm" className="w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Full Feed on Farcaster
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}