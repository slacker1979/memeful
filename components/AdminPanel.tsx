import { useState } from 'react'
// Animation imports removed due to build issues
import { 
  Shield,
  Users,
  Coins,
  TrendingUp,
  AlertTriangle,
  Settings,
  Eye,
  EyeOff,
  Ban,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  BarChart3,
  DollarSign,
  Activity,
  Star,
  MessageSquare,
  Flag,
  Search,
  Filter,
  Calendar,
  RefreshCw
} from './ui/icons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Switch } from './ui/switch'
import { Progress } from './ui/progress'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Alert, AlertDescription } from './ui/alert'
import { Separator } from './ui/separator'
import { ImageWithFallback } from './figma/ImageWithFallback'

// Mock data for admin operations
const platformStats = {
  totalUsers: 89247,
  activeUsers: 12580,
  totalTokens: 2847,
  premiumTokens: 1234,
  basicTokens: 1613,
  totalVolume: 125000000,
  totalFees: 1250000,
  rwaSecured: 12450000,
  pendingReviews: 23,
  flaggedContent: 8,
  systemHealth: 98.5
}

const recentTokens = [
  {
    id: '1',
    symbol: 'NEWTOKEN',
    name: 'New Token',
    creator: '0x1234...5678',
    tier: 'premium',
    status: 'pending',
    createdAt: '2024-03-15T10:30:00Z',
    image: '/api/placeholder/40/40',
    flags: ['suspicious-activity']
  },
  {
    id: '2', 
    symbol: 'BASICMEME',
    name: 'Basic Meme',
    creator: '0x9876...5432',
    tier: 'basic',
    status: 'approved',
    createdAt: '2024-03-15T09:15:00Z',
    image: '/api/placeholder/40/40',
    flags: []
  }
]

const flaggedUsers = [
  {
    id: '1',
    address: '0xabcd...efgh',
    farcasterHandle: '@sususer',
    violations: 3,
    lastViolation: '2024-03-14T15:20:00Z',
    status: 'warned',
    flags: ['market-manipulation', 'spam']
  }
]

const systemLogs = [
  {
    id: '1',
    timestamp: '2024-03-15T11:45:00Z',
    level: 'info',
    message: 'Token BONK price updated: $0.0000245',
    category: 'price-update'
  },
  {
    id: '2',
    timestamp: '2024-03-15T11:40:00Z', 
    level: 'warning',
    message: 'High trading volume detected for WIF',
    category: 'trading-alert'
  },
  {
    id: '3',
    timestamp: '2024-03-15T11:35:00Z',
    level: 'error',
    message: 'RWA goal verification failed for token ID 1234',
    category: 'rwa-error'
  }
]

interface AdminPanelProps {
  isAdmin?: boolean
  onLogout?: () => void
}

export function AdminPanel({ isAdmin = true, onLogout }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedToken, setSelectedToken] = useState(null)
  const [showTokenDialog, setShowTokenDialog] = useState(false)

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-20 lg:pt-24 pb-20 lg:pb-8 px-4 lg:px-8 bg-background-solid flex items-center justify-center">
        <Card className="material-card max-w-md w-full">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-destructive" />
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access the admin panel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleTokenAction = (tokenId: string, action: 'approve' | 'reject' | 'flag') => {
    console.log(`${action} token ${tokenId}`)
    // Implement token moderation logic
  }

  const handleUserAction = (userId: string, action: 'warn' | 'suspend' | 'ban') => {
    console.log(`${action} user ${userId}`)
    // Implement user moderation logic
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-20 lg:pb-8 px-4 lg:px-8 bg-background-solid">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 fade-in">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-muted-foreground text-lg">
              Platform management and oversight
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-success border-success/50">
              <Activity className="w-3 h-3 mr-1" />
              System Online
            </Badge>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 slide-in-up">
              <Card className="material-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold">{platformStats.totalUsers.toLocaleString()}</p>
                      <p className="text-xs text-success">+12.5% this month</p>
                    </div>
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="material-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Tokens</p>
                      <p className="text-2xl font-bold">{platformStats.totalTokens.toLocaleString()}</p>
                      <p className="text-xs text-success">+8.2% this month</p>
                    </div>
                    <Coins className="w-8 h-8 text-warning" />
                  </div>
                </CardContent>
              </Card>

              <Card className="material-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">24h Volume</p>
                      <p className="text-2xl font-bold">${(platformStats.totalVolume / 1e6).toFixed(1)}M</p>
                      <p className="text-xs text-success">+23.1% from yesterday</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-success" />
                  </div>
                </CardContent>
              </Card>

              <Card className="material-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">RWA Secured</p>
                      <p className="text-2xl font-bold">${(platformStats.rwaSecured / 1e6).toFixed(1)}M</p>
                      <p className="text-xs text-success">+15.7% this month</p>
                    </div>
                    <Shield className="w-8 h-8 text-secondary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* System Health */}
              <Card className="material-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-success" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Health</span>
                      <span className="text-success font-medium">{platformStats.systemHealth}%</span>
                    </div>
                    <Progress value={platformStats.systemHealth} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span>API Response</span>
                      <Badge variant="outline" className="text-success border-success/50">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Good
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Database</span>
                      <Badge variant="outline" className="text-success border-success/50">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Optimal
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Blockchain</span>
                      <Badge variant="outline" className="text-warning border-warning/50">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Slow
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Storage</span>
                      <Badge variant="outline" className="text-success border-success/50">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Normal
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="material-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {systemLogs.slice(0, 5).map((log) => (
                      <div key={log.id} className="flex items-start space-x-3 p-3 border border-border/50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          log.level === 'error' ? 'bg-destructive' :
                          log.level === 'warning' ? 'bg-warning' : 'bg-success'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{log.message}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(log.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tokens Tab */}
          <TabsContent value="tokens" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Token Management</h2>
                <p className="text-muted-foreground">Review and moderate token submissions</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search tokens..." className="pl-10 w-64" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tokens</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {recentTokens.map((token) => (
                <Card key={token.id} className="material-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <ImageWithFallback
                          src={token.image}
                          alt={token.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-bold">{token.symbol}</h3>
                            <Badge variant={token.tier === 'premium' ? 'default' : 'secondary'}>
                              {token.tier}
                            </Badge>
                            <Badge 
                              variant="outline"
                              className={
                                token.status === 'approved' ? 'text-success border-success/50' :
                                token.status === 'pending' ? 'text-warning border-warning/50' :
                                'text-destructive border-destructive/50'
                              }
                            >
                              {token.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{token.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Created by {token.creator} • {new Date(token.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {token.flags.length > 0 && (
                          <Badge variant="destructive">
                            <Flag className="w-3 h-3 mr-1" />
                            {token.flags.length} flags
                          </Badge>
                        )}
                        
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedToken(token)
                              setShowTokenDialog(true)
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          
                          {token.status === 'pending' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleTokenAction(token.id, 'approve')}
                                className="text-success hover:text-success"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleTokenAction(token.id, 'reject')}
                                className="text-destructive hover:text-destructive"
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTokenAction(token.id, 'flag')}
                            className="text-warning hover:text-warning"
                          >
                            <Flag className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {token.flags.length > 0 && (
                      <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <div className="flex items-center space-x-2 text-sm text-destructive">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Flags: {token.flags.join(', ')}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">User Management</h2>
                <p className="text-muted-foreground">Monitor user activity and violations</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search users..." className="pl-10 w-64" />
                </div>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              <Card className="material-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Users</p>
                      <p className="text-2xl font-bold text-success">{platformStats.activeUsers.toLocaleString()}</p>
                    </div>
                    <Users className="w-6 h-6 text-success" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="material-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Flagged Users</p>
                      <p className="text-2xl font-bold text-warning">{flaggedUsers.length}</p>
                    </div>
                    <Flag className="w-6 h-6 text-warning" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="material-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Banned Users</p>
                      <p className="text-2xl font-bold text-destructive">45</p>
                    </div>
                    <Ban className="w-6 h-6 text-destructive" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="material-card">
              <CardHeader>
                <CardTitle>Flagged Users</CardTitle>
                <CardDescription>Users requiring attention or moderation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {flaggedUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{user.farcasterHandle || 'Anonymous'}</span>
                          <Badge variant="outline" className="text-xs">
                            {user.address.slice(0, 8)}...{user.address.slice(-4)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {user.violations} violations • Last: {new Date(user.lastViolation).toLocaleDateString()}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          {user.flags.map((flag, index) => (
                            <Badge key={index} variant="destructive" className="text-xs">
                              {flag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUserAction(user.id, 'warn')}
                          className="text-warning"
                        >
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          Warn
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUserAction(user.id, 'suspend')}
                          className="text-destructive"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Suspend
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleUserAction(user.id, 'ban')}
                        >
                          <Ban className="w-4 h-4 mr-1" />
                          Ban
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Moderation Tab */}
          <TabsContent value="moderation" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Content Moderation</h2>
                <p className="text-muted-foreground">Review flagged content and reports</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-warning border-warning/50">
                  {platformStats.pendingReviews} pending reviews
                </Badge>
                <Badge variant="outline" className="text-destructive border-destructive/50">
                  {platformStats.flaggedContent} flagged items
                </Badge>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="material-card">
                <CardHeader>
                  <CardTitle>Moderation Queue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <AlertTriangle className="w-4 h-4" />
                      <AlertDescription>
                        You have {platformStats.pendingReviews} items pending review
                      </AlertDescription>
                    </Alert>
                    
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No pending moderation items</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="material-card">
                <CardHeader>
                  <CardTitle>Automated Filters</CardTitle>
                  <CardDescription>Configure automatic content moderation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Spam Detection</p>
                      <p className="text-sm text-muted-foreground">Filter repetitive content</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Profanity Filter</p>
                      <p className="text-sm text-muted-foreground">Block inappropriate language</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Scam Detection</p>
                      <p className="text-sm text-muted-foreground">Identify potential scam tokens</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Volume Manipulation</p>
                      <p className="text-sm text-muted-foreground">Detect artificial volume</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Platform Analytics</h2>
                <p className="text-muted-foreground">Detailed insights and metrics</p>
              </div>
              <div className="flex items-center space-x-2">
                <Select defaultValue="7d">
                  <SelectTrigger className="w-32">
                    <Calendar className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">Last 24h</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="material-card">
                <CardHeader>
                  <CardTitle>Revenue Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Trading Fees</span>
                      <span className="font-bold text-success">$45,230</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Launch Fees</span>
                      <span className="font-bold text-primary">$28,470</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Premium Features</span>
                      <span className="font-bold text-warning">$12,180</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-bold">Total Revenue</span>
                      <span className="font-bold text-success">$85,880</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="material-card">
                <CardHeader>
                  <CardTitle>Token Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Premium Tokens</span>
                        <span className="font-medium">{platformStats.premiumTokens} (43%)</span>
                      </div>
                      <Progress value={43} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Basic Tokens</span>
                        <span className="font-medium">{platformStats.basicTokens} (57%)</span>
                      </div>
                      <Progress value={57} className="h-2" />
                    </div>

                    <div className="pt-2 text-sm text-muted-foreground">
                      Premium tokens generate 73% of platform revenue
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">System Management</h2>
                <p className="text-muted-foreground">System configuration and maintenance</p>
              </div>
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Status
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="material-card">
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Maintenance Mode</p>
                      <p className="text-sm text-muted-foreground">Disable platform access</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Token Submissions</p>
                      <p className="text-sm text-muted-foreground">Allow new token launches</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-approve Basic Tokens</p>
                      <p className="text-sm text-muted-foreground">Skip manual review for basic tier</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <Button variant="destructive" className="w-full">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Emergency Stop
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Settings className="w-4 h-4 mr-2" />
                      Advanced Configuration
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="material-card">
                <CardHeader>
                  <CardTitle>System Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {systemLogs.slice(0, 8).map((log) => (
                      <div key={log.id} className="flex items-start space-x-3 p-2 rounded text-sm">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          log.level === 'error' ? 'bg-destructive' :
                          log.level === 'warning' ? 'bg-warning' : 'bg-success'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="truncate">{log.message}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download Logs
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear Logs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Token Detail Dialog */}
        <Dialog open={showTokenDialog} onOpenChange={setShowTokenDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Token Details</DialogTitle>
            </DialogHeader>
            {selectedToken && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <ImageWithFallback
                    src={selectedToken.image}
                    alt={selectedToken.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{selectedToken.symbol}</h3>
                    <p className="text-muted-foreground">{selectedToken.name}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Creator:</span>
                    <p className="font-medium">{selectedToken.creator}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tier:</span>
                    <Badge variant={selectedToken.tier === 'premium' ? 'default' : 'secondary'}>
                      {selectedToken.tier}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="outline">{selectedToken.status}</Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Created:</span>
                    <p className="font-medium">{new Date(selectedToken.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => handleTokenAction(selectedToken.id, 'approve')}
                    className="flex-1"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => handleTokenAction(selectedToken.id, 'reject')}
                    className="flex-1"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}