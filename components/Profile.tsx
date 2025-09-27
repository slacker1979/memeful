import { useState, useEffect } from 'react'
// Animation imports removed due to build issues
import { 
  User,
  Settings,
  Edit,
  Copy,
  ExternalLink,
  Bell,
  Shield,
  Palette,
  Globe,
  Wallet,
  Activity,
  TrendingUp,
  Award,
  Users,
  MessageSquare,
  Heart,
  Repeat,
  Share,
  Camera,
  Check,
  X,
  ChevronRight,
  Eye,
  EyeOff,
  LinkIcon,
  Twitter,
  Github,
  Instagram
} from './ui/icons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Switch } from './ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Separator } from './ui/separator'
import { Progress } from './ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { ImageWithFallback } from './figma/ImageWithFallback'

// Mock Farcaster profile data
const mockFarcasterProfile = {
  fid: 12345,
  username: 'cryptotrader.eth',
  displayName: 'Crypto Trader',
  bio: '🚀 Building the future of DeFi | 💎 Diamond hands since 2021 | 🌊 Riding the Solana wave',
  pfpUrl: '/api/placeholder/120/120',
  followerCount: 2847,
  followingCount: 1205,
  castCount: 892,
  isVerified: true,
  joinedAt: '2023-02-15',
  socialLinks: {
    twitter: '@cryptotrader_eth',
    github: 'cryptotrader',
    website: 'https://myportfolio.xyz'
  },
  badges: [
    { id: 1, name: 'Early Adopter', icon: '🏆', earned: '2023-02-15' },
    { id: 2, name: 'Diamond Hands', icon: '💎', earned: '2023-06-20' },
    { id: 3, name: 'High Volume Trader', icon: '📈', earned: '2023-09-10' },
    { id: 4, name: 'Community Builder', icon: '🤝', earned: '2023-11-05' }
  ],
  recentCasts: [
    {
      id: 1,
      text: 'Just tried the new AI analysis feature on @vaulted - incredibly bullish on the RWA backing model! 🚀',
      timestamp: '2 hours ago',
      likes: 24,
      recasts: 8,
      replies: 12
    },
    {
      id: 2,
      text: 'The mining tycoon game is addictive! Anyone else building a crypto empire? 🏭⚡',
      timestamp: '1 day ago',
      likes: 18,
      recasts: 5,
      replies: 7
    },
    {
      id: 3,
      text: 'Solana ecosystem keeps delivering. The innovation happening on-chain is incredible. 🌊',
      timestamp: '2 days ago',
      likes: 45,
      recasts: 15,
      replies: 23
    }
  ]
}

const mockTradingStats = {
  totalTrades: 247,
  totalVolume: 125847.32,
  winRate: 68.5,
  avgProfit: 14.2,
  bestTrade: 1247.85,
  worstTrade: -342.16,
  favoriteTokens: ['BONK', 'WIF', 'PEPE'],
  tradingStreak: 12,
  rank: 'Diamond',
  rankProgress: 85
}

interface ProfileProps {
  userPoints?: number
}

export function Profile({ userPoints = 1847 }: ProfileProps) {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(mockFarcasterProfile)
  const [settings, setSettings] = useState({
    notifications: {
      priceAlerts: true,
      tradeConfirmations: true,
      newTokens: false,
      socialMentions: true,
      gameUpdates: true
    },
    privacy: {
      showTradingHistory: true,
      showPortfolio: false,
      shareActivity: true,
      allowDirectMessages: true
    },
    trading: {
      defaultSlippage: 0.5,
      autoApprove: false,
      riskLevel: 'medium',
      preferredCurrency: 'usd',
      maxGasPrice: 5
    },
    appearance: {
      theme: 'dark',
      accentColor: 'primary',
      compactMode: false,
      animations: true
    }
  })

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Here you would save to backend/blockchain
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Show toast notification
  }

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }))
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-20 lg:pb-8 px-4 lg:px-8 bg-background-solid">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 fade-in">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your identity, settings, and Farcaster integration
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="stats">Trading Stats</TabsTrigger>
            <TabsTrigger value="social">Social Feed</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              
              {/* Profile Card */}
              <div className="lg:col-span-1 slide-in-left">
                <Card className="material-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Farcaster Profile</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="relative inline-block">
                        <Avatar className="w-24 h-24 mx-auto mb-4">
                          <AvatarImage src={profileData.pfpUrl} />
                          <AvatarFallback>{profileData.displayName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <Button
                            size="sm"
                            className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                          >
                            <Camera className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      {isEditing ? (
                        <div className="space-y-3">
                          <Input
                            value={profileData.displayName}
                            onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                            placeholder="Display Name"
                          />
                          <Input
                            value={profileData.username}
                            onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                            placeholder="Username"
                          />
                          <Textarea
                            value={profileData.bio}
                            onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                            placeholder="Bio"
                            rows={3}
                          />
                          <div className="flex space-x-2">
                            <Button onClick={handleSaveProfile} size="sm" className="flex-1">
                              <Check className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                            <Button onClick={() => setIsEditing(false)} variant="outline" size="sm" className="flex-1">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h3 className="font-bold text-lg">{profileData.displayName}</h3>
                          <p className="text-muted-foreground mb-2">@{profileData.username}</p>
                          {profileData.isVerified && (
                            <Badge variant="default" className="mb-3">
                              <Check className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          <p className="text-sm leading-relaxed">{profileData.bio}</p>
                        </div>
                      )}
                    </div>

                    <Separator />

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="font-bold text-lg">{profileData.followerCount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Followers</p>
                      </div>
                      <div>
                        <p className="font-bold text-lg">{profileData.followingCount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Following</p>
                      </div>
                      <div>
                        <p className="font-bold text-lg">{profileData.castCount}</p>
                        <p className="text-xs text-muted-foreground">Casts</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Social Links */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Social Links</h4>
                      <div className="space-y-2">
                        {profileData.socialLinks.twitter && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Twitter className="w-4 h-4 text-blue-400" />
                              <span className="text-sm">{profileData.socialLinks.twitter}</span>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(profileData.socialLinks.twitter)}>
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                        {profileData.socialLinks.github && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Github className="w-4 h-4" />
                              <span className="text-sm">{profileData.socialLinks.github}</span>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(profileData.socialLinks.github)}>
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                        {profileData.socialLinks.website && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Globe className="w-4 h-4 text-primary" />
                              <span className="text-sm">{profileData.socialLinks.website}</span>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(profileData.socialLinks.website)}>
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div className="text-xs text-muted-foreground text-center">
                      Joined {new Date(profileData.joinedAt).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Achievements & Points */}
              <div className="lg:col-span-2 space-y-6 slide-in-up">
                
                {/* Points & Rank */}
                <Card className="material-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2 text-warning" />
                      Vaulted Points & Rank
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-primary">{userPoints.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Total Points</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-warning">{mockTradingStats.rank}</p>
                        <p className="text-sm text-muted-foreground">Current Rank</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-secondary">#247</p>
                        <p className="text-sm text-muted-foreground">Leaderboard</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-success">{mockTradingStats.tradingStreak}</p>
                        <p className="text-sm text-muted-foreground">Day Streak</p>
                      </div>
                    </div>

                    {/* Point Breakdown */}
                    <div className="space-y-3 mb-6">
                      <h4 className="font-medium text-sm">Point Sources</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Creating Tokens</span>
                          <span className="font-medium text-primary">850</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Trading Activity</span>
                          <span className="font-medium text-success">692</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Referrals</span>
                          <span className="font-medium text-warning">305</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Progress to Master Rank</span>
                        <span className="text-sm text-muted-foreground">{mockTradingStats.rankProgress}%</span>
                      </div>
                      <Progress value={mockTradingStats.rankProgress} className="mb-2" />
                      <p className="text-xs text-muted-foreground">
                        {(100 - mockTradingStats.rankProgress) * 50} more points needed
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Referral System */}
                <Card className="material-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-secondary" />
                      Referral Program
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Your Referral Code</p>
                      <div className="flex items-center space-x-2">
                        <code className="px-3 py-1 bg-background text-primary font-mono text-sm rounded">
                          CRYPTO247
                        </code>
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard('CRYPTO247')}>
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-secondary">12</p>
                        <p className="text-xs text-muted-foreground">Referrals</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-warning">305</p>
                        <p className="text-xs text-muted-foreground">Points Earned</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Rewards</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Basic Token Launch</span>
                          <span>10 points</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Premium Token Launch</span>
                          <span>50 points</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">First Trade</span>
                          <span>25 points</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full" variant="outline">
                      <Share className="w-4 h-4 mr-2" />
                      Share Referral Link
                    </Button>
                  </CardContent>
                </Card>

                {/* Featured Spot Auctions */}
                <Card className="material-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                      Featured Spot Bids
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-success/5 border border-success/20 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">BONK</p>
                          <p className="text-xs text-muted-foreground">Position #1 • 45 mins left</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-success">5.2 SOL</p>
                          <p className="text-xs text-success">Winning</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">WIF</p>
                          <p className="text-xs text-muted-foreground">Outbid • 2 hours ago</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-muted-foreground">3.1 SOL</p>
                          <p className="text-xs text-destructive">Lost</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-warning/5 border border-warning/20 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">PEPE</p>
                          <p className="text-xs text-muted-foreground">Position #3 • 12 mins left</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-warning">1.8 SOL</p>
                          <p className="text-xs text-warning">At Risk</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">Total Bid Amount</p>
                      <p className="text-xl font-bold">10.1 SOL</p>
                      <p className="text-xs text-muted-foreground">3.8 SOL in escrow</p>
                    </div>

                    <Button className="w-full" variant="outline">
                      View All Auctions
                    </Button>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card className="material-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2 text-primary" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {profileData.badges.map((badge) => (
                        <div
                          key={badge.id}
                          className="p-4 border border-border/50 rounded-lg hover:bg-card-hover transition-colors slide-in-up"
                        >
                          <div className="text-center">
                            <div className="text-3xl mb-2">{badge.icon}</div>
                            <h4 className="font-medium text-sm">{badge.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              Earned {new Date(badge.earned).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="material-card">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      <Button variant="outline" className="flex items-center justify-center">
                        <Share className="w-4 h-4 mr-2" />
                        Share Profile
                      </Button>
                      <Button variant="outline" className="flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View on Farcaster
                      </Button>
                      <Button variant="outline" className="flex items-center justify-center">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Link
                      </Button>
                      <Button variant="outline" className="flex items-center justify-center">
                        <LinkIcon className="w-4 h-4 mr-2" />
                        Connect Wallet
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Trading Stats Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6 slide-in-up">
              <Card className="material-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-success" />
                    Trading Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Trades</p>
                      <p className="text-2xl font-bold">{mockTradingStats.totalTrades}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Volume</p>
                      <p className="text-2xl font-bold">${mockTradingStats.totalVolume.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Win Rate</p>
                      <p className="text-2xl font-bold text-success">{mockTradingStats.winRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Profit</p>
                      <p className="text-2xl font-bold text-primary">+{mockTradingStats.avgProfit}%</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Best Trade:</span>
                      <span className="font-medium text-success">+${mockTradingStats.bestTrade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Worst Trade:</span>
                      <span className="font-medium text-destructive">${mockTradingStats.worstTrade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Current Streak:</span>
                      <span className="font-medium text-warning">{mockTradingStats.tradingStreak} days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="material-card">
                <CardHeader>
                  <CardTitle>Favorite Tokens</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockTradingStats.favoriteTokens.map((token, index) => (
                      <div key={token} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium">#{index + 1}</span>
                          </div>
                          <span className="font-medium">{token}</span>
                        </div>
                        <Badge variant="outline">
                          {Math.floor(Math.random() * 50) + 10} trades
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Social Feed Tab */}
          <TabsContent value="social" className="space-y-6">
            <div className="slide-in-up">
              <Card className="material-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                      Recent Casts
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on Farcaster
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profileData.recentCasts.map((cast) => (
                    <div
                      key={cast.id}
                      className="p-4 border border-border/50 rounded-lg hover:bg-card-hover transition-colors slide-in-left"
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={profileData.pfpUrl} />
                          <AvatarFallback>{profileData.displayName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-sm">{profileData.displayName}</span>
                            <span className="text-xs text-muted-foreground">@{profileData.username}</span>
                            <span className="text-xs text-muted-foreground">·</span>
                            <span className="text-xs text-muted-foreground">{cast.timestamp}</span>
                          </div>
                          <p className="text-sm leading-relaxed mb-3">{cast.text}</p>
                          <div className="flex items-center space-x-6 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1 hover:text-destructive cursor-pointer">
                              <Heart className="w-4 h-4" />
                              <span>{cast.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1 hover:text-primary cursor-pointer">
                              <Repeat className="w-4 h-4" />
                              <span>{cast.recasts}</span>
                            </div>
                            <div className="flex items-center space-x-1 hover:text-secondary cursor-pointer">
                              <MessageSquare className="w-4 h-4" />
                              <span>{cast.replies}</span>
                            </div>
                            <div className="flex items-center space-x-1 hover:text-warning cursor-pointer">
                              <Share className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="slide-in-up grid lg:grid-cols-2 gap-6">
              
              {/* Notifications */}
              <Card className="material-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2 text-warning" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {key === 'priceAlerts' && 'Get notified about significant price changes'}
                          {key === 'tradeConfirmations' && 'Receive confirmation for completed trades'}
                          {key === 'newTokens' && 'Alerts for newly launched tokens'}
                          {key === 'socialMentions' && 'When someone mentions you on Farcaster'}
                          {key === 'gameUpdates' && 'Mining tycoon and arcade notifications'}
                        </p>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => handleSettingChange('notifications', key, checked)}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Privacy */}
              <Card className="material-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-primary" />
                    Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(settings.privacy).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {key === 'showTradingHistory' && 'Display your trading history publicly'}
                          {key === 'showPortfolio' && 'Show your current portfolio holdings'}
                          {key === 'shareActivity' && 'Share your activity on social feeds'}
                          {key === 'allowDirectMessages' && 'Allow others to message you directly'}
                        </p>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => handleSettingChange('privacy', key, checked)}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Trading Preferences */}
              <Card className="material-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-success" />
                    Trading Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Default Slippage</label>
                    <Select 
                      value={settings.trading.defaultSlippage.toString()} 
                      onValueChange={(value) => handleSettingChange('trading', 'defaultSlippage', parseFloat(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.1">0.1%</SelectItem>
                        <SelectItem value="0.5">0.5%</SelectItem>
                        <SelectItem value="1.0">1.0%</SelectItem>
                        <SelectItem value="2.0">2.0%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Risk Level</label>
                    <Select 
                      value={settings.trading.riskLevel} 
                      onValueChange={(value) => handleSettingChange('trading', 'riskLevel', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Conservative</SelectItem>
                        <SelectItem value="medium">Moderate</SelectItem>
                        <SelectItem value="high">Aggressive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Preferred Currency</label>
                    <Select 
                      value={settings.trading.preferredCurrency} 
                      onValueChange={(value) => handleSettingChange('trading', 'preferredCurrency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD</SelectItem>
                        <SelectItem value="sol">SOL</SelectItem>
                        <SelectItem value="usdc">USDC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Auto-approve Small Trades</p>
                      <p className="text-xs text-muted-foreground">Skip confirmation for trades under $100</p>
                    </div>
                    <Switch
                      checked={settings.trading.autoApprove}
                      onCheckedChange={(checked) => handleSettingChange('trading', 'autoApprove', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Appearance */}
              <Card className="material-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="w-5 h-5 mr-2 text-secondary" />
                    Appearance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Theme</label>
                    <Select 
                      value={settings.appearance.theme} 
                      onValueChange={(value) => handleSettingChange('appearance', 'theme', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Accent Color</label>
                    <Select 
                      value={settings.appearance.accentColor} 
                      onValueChange={(value) => handleSettingChange('appearance', 'accentColor', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primary">Solana Green</SelectItem>
                        <SelectItem value="secondary">Purple</SelectItem>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Compact Mode</p>
                      <p className="text-xs text-muted-foreground">Reduce spacing and padding</p>
                    </div>
                    <Switch
                      checked={settings.appearance.compactMode}
                      onCheckedChange={(checked) => handleSettingChange('appearance', 'compactMode', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Animations</p>
                      <p className="text-xs text-muted-foreground">Enable smooth transitions and effects</p>
                    </div>
                    <Switch
                      checked={settings.appearance.animations}
                      onCheckedChange={(checked) => handleSettingChange('appearance', 'animations', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Save Settings Button */}
            <div className="flex justify-center fade-in">
              <Button size="lg" className="px-8">
                <Check className="w-4 h-4 mr-2" />
                Save All Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}