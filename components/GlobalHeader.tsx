import { useState, useEffect, useRef } from 'react'
import { 
  TrendingUp,
  TrendingDown,
  Rocket,
  Coins,
  BarChart3,
  Menu,
  X,
  User,
  Wallet,
  Search,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight
} from './ui/icons'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ImageWithFallback } from './figma/ImageWithFallback'

// Mock ticker data - this should be passed as props in a real app
const tickerTokens = [
  {
    id: '1',
    symbol: 'BONK',
    price: 0.0000245,
    change24h: 15.7,
    promoted: false
  },
  {
    id: '2', 
    symbol: 'PEPE',
    price: 0.00000875,
    change24h: -8.3,
    promoted: true
  },
  {
    id: '3',
    symbol: 'WIF',
    price: 2.45,
    change24h: 23.4,
    promoted: true
  },
  {
    id: '4',
    symbol: 'MYRO',
    price: 0.125,
    change24h: 5.8,
    promoted: true
  },
  {
    id: '5',
    symbol: 'BASIC',
    price: 0.000001,
    change24h: 2.1,
    promoted: false
  }
]

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'launcher', label: 'Launch', icon: Rocket },
  { id: 'trading', label: 'Trading', icon: TrendingUp },
  { id: 'vault', label: 'AI Vault', icon: Coins },
  { id: 'mining', label: 'Mining', icon: Coins },
  { id: 'arcade', label: 'Arcade', icon: Users },
]

interface GlobalHeaderProps {
  activeTab: string
  onTabChange: (tab: string) => void
  userPoints: number
  showAnnouncementBanner?: boolean
  onTokenSelect?: (tokenId: string) => void
  onNavigateToTrading?: () => void
  tickerTokens?: Array<{
    id: string
    symbol: string
    price: number
    change24h: number
    promoted: boolean
  }>
}

export function GlobalHeader({ 
  activeTab, 
  onTabChange, 
  userPoints, 
  showAnnouncementBanner = false,
  onTokenSelect,
  onNavigateToTrading,
  tickerTokens: propTickerTokens
}: GlobalHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const tickerRef = useRef<HTMLDivElement>(null)

  // Use passed ticker tokens or fallback to local data
  const displayTickerTokens = propTickerTokens || tickerTokens

  // Continuous scrolling ticker
  useEffect(() => {
    if (tickerRef.current) {
      const ticker = tickerRef.current
      let scrollAmount = 0
      
      const scroll = () => {
        scrollAmount += 0.5
        if (scrollAmount >= ticker.scrollWidth / 2) {
          scrollAmount = 0
        }
        ticker.scrollLeft = scrollAmount
      }

      const interval = setInterval(scroll, 30)
      return () => clearInterval(interval)
    }
  }, [])

  // Close mobile menu on scroll or resize
  useEffect(() => {
    const handleScroll = () => setMobileMenuOpen(false)
    const handleResize = () => setMobileMenuOpen(false)
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('scroll', handleScroll) 
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const formatPrice = (price: number) => {
    if (price < 0.01) return price.toFixed(8)
    if (price < 1) return price.toFixed(6)
    return price.toFixed(4)
  }

  return (
    <>
      {/* Continuous Ticker - Always at very top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background-solid/95 backdrop-blur-xl border-b border-border/30">
        <div 
          ref={tickerRef}
          className="flex items-center space-x-8 py-2 overflow-hidden whitespace-nowrap"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* Duplicate for seamless scroll */}
          {[...displayTickerTokens, ...displayTickerTokens, ...displayTickerTokens].map((token, index) => (
            <div 
              key={`${token.id}-${index}`}
              className="flex items-center space-x-2 text-sm font-medium cursor-pointer hover:text-primary transition-colors flex-shrink-0"
              onClick={() => onTokenSelect?.(token.id)}
            >
              {token.promoted && <span>💰</span>}
              <span>{token.symbol}</span>
              <span className="text-muted-foreground">${formatPrice(token.price)}</span>
              <span className={token.change24h > 0 ? 'text-success' : 'text-destructive'}>
                {token.change24h > 0 ? '+' : ''}{token.change24h.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Announcement Banner - Only on desktop and when enabled */}
      {showAnnouncementBanner && (
        <div className="fixed top-8 left-0 right-0 z-40 bg-gradient-to-r from-warning/20 to-secondary/20 backdrop-blur-sm border-b border-warning/30 hidden md:block fade-in">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                <span className="font-medium text-warning">New Feature:</span>
                <span className="text-muted-foreground">Featured Spot Auctions now live! Bid for premium ticker placement.</span>
              </div>
              <Button variant="ghost" size="sm" className="text-xs px-2 py-1 h-auto">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header className={`fixed ${showAnnouncementBanner ? 'top-16 md:top-20' : 'top-8'} left-0 right-0 z-40 bg-background-solid/95 backdrop-blur-xl border-b border-border/20 slide-in-up`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <div 
                className="flex items-center space-x-3 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => onTabChange('homepage')}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                  <Coins className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Vaulted
                  </h1>
                  <p className="text-xs text-muted-foreground hidden sm:block">From Meme To Meaningful</p>
                </div>
              </div>
            </div>

            {/* Navigation Links - Desktop */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navigationItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={item.id} className="slide-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
                    <Button
                      variant={activeTab === item.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => onTabChange(item.id)}
                      className={`relative ${
                        activeTab === item.id 
                          ? 'bg-primary text-primary-foreground shadow-lg' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                      {activeTab === item.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                      )}
                    </Button>
                  </div>
                )
              })}
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-3">
              {/* Profile Button - Desktop */}
              <div className="hidden lg:block">
                <Button 
                  variant={activeTab === 'profile' ? "default" : "ghost"} 
                  size="sm"
                  onClick={() => onTabChange('profile')}
                  className="hover:scale-105 transition-transform"
                >
                  <User className="w-4 h-4" />
                </Button>
              </div>

              {/* Profile Button - Mobile & Tablet */}
              <div className="lg:hidden">
                <Button 
                  variant={activeTab === 'profile' ? "default" : "ghost"} 
                  size="sm"
                  onClick={() => onTabChange('profile')}
                  className="hover:scale-105 transition-transform"
                >
                  <User className="w-4 h-4" />
                </Button>
              </div>

              {/* Wallet Connect Button */}
              <div className="hidden sm:block">
                <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-lg hover:scale-105">
                  <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
                  Connected
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="lg:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <div className={`transition-transform duration-200 ${mobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className={`fixed ${showAnnouncementBanner ? 'top-32 md:top-36' : 'top-24'} left-0 right-0 z-30 lg:hidden bg-background-solid/95 backdrop-blur-xl border-b border-border/30 slide-in-up`}>
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="space-y-3">
              {/* Mobile Search */}
              <div className="relative mb-4 md:hidden">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search tokens..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button 
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className="w-full justify-start text-left"
                    onClick={() => {
                      onTabChange(item.id)
                      setMobileMenuOpen(false)
                    }}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                )
              })}

              <Button 
                variant={activeTab === 'profile' ? "default" : "ghost"}
                className="w-full justify-start text-left"
                onClick={() => {
                  onTabChange('profile')
                  setMobileMenuOpen(false)
                }}
              >
                <User className="w-4 h-4 mr-3" />
                Profile
              </Button>

              {/* Mobile Points Display */}
              <div className="sm:hidden flex items-center justify-between p-3 bg-card/30 rounded-lg border border-border/30 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Points: {userPoints.toLocaleString()}</span>
                </div>
                <Button size="sm" variant="outline">
                  <DollarSign className="w-4 h-4 mr-1" />
                  Redeem
                </Button>
              </div>

              {/* Mobile Wallet Connect */}
              <div className="pt-2 border-t border-border/30 sm:hidden">
                <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                  <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
                  Connected
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Bottom Navigation for Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 material-card border-t border-border/50 backdrop-blur-xl">
        <div className="grid grid-cols-5 p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onTabChange('homepage')}
            className={`flex-col h-16 ${
              activeTab === 'homepage' 
                ? 'text-primary bg-primary/10' 
                : 'text-muted-foreground'
            }`}
          >
            <BarChart3 className="w-5 h-5 mb-1" />
            <span className="text-xs">Home</span>
          </Button>
          {navigationItems.slice(0, 3).map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => onTabChange(item.id)}
                className={`flex-col h-16 ${
                  activeTab === item.id 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{item.label}</span>
              </Button>
            )
          })}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onTabChange('profile')}
            className={`flex-col h-16 ${
              activeTab === 'profile' 
                ? 'text-primary bg-primary/10' 
                : 'text-muted-foreground'
            }`}
          >
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </nav>
    </>
  )
}