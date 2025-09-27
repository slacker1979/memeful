import { useState } from 'react'
import { 
  Vault, 
  TrendingUp, 
  Users, 
  Vote, 
  Gavel,
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Eye,
  ExternalLink,
  ChevronRight
} from './ui/icons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { ImageWithFallback } from './figma/ImageWithFallback'

const mockRWAAssets = [
  {
    id: 1,
    name: 'Miami Beach Apartment',
    type: 'Real Estate',
    value: '$450,000',
    tokenSymbol: 'BONK',
    location: 'Miami, FL',
    description: '2BR/2BA oceanfront condo generating rental income',
    image: 'https://images.unsplash.com/photo-1683275147274-50526d63bb1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidWlsZGluZyUyMGludmVzdG1lbnR8ZW58MXx8fHwxNzU3MDAxMzA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    nftId: '#RWA-001',
    acquisition: '2024-02-15',
    yield: '8.5%',
    shares: 1000,
    ownedShares: 250,
    status: 'Active',
    lastValuation: '$465,000',
    monthlyIncome: '$3,200'
  },
  {
    id: 2,
    name: 'Tesla Model S',
    type: 'Vehicle',
    value: '$85,000',
    tokenSymbol: 'PEPE',
    location: 'Los Angeles, CA',
    description: 'Luxury vehicle for ride-sharing revenue',
    image: '/api/placeholder/300/200',
    nftId: '#RWA-002',
    acquisition: '2024-03-01',
    yield: '12.3%',
    shares: 850,
    ownedShares: 170,
    status: 'Active',
    lastValuation: '$82,000',
    monthlyIncome: '$875'
  },
  {
    id: 3,
    name: 'Art Collection NFT',
    type: 'Digital Art',
    value: '$125,000',
    tokenSymbol: 'WIF',
    location: 'Digital',
    description: 'Curated collection of blue-chip NFTs',
    image: '/api/placeholder/300/200',
    nftId: '#RWA-003',
    acquisition: '2024-01-20',
    yield: '15.7%',
    shares: 500,
    ownedShares: 100,
    status: 'Appreciation',
    lastValuation: '$142,000',
    monthlyIncome: '$1,640'
  }
]

const mockProposals = [
  {
    id: 1,
    title: 'Acquire Downtown Office Space',
    description: 'Proposal to acquire a 5,000 sq ft office space in downtown Austin for $2.8M',
    tokenSymbol: 'BONK',
    requestedAmount: '$2,800,000',
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
    title: 'Sell Miami Beach Property',
    description: 'Motion to sell the Miami Beach apartment at current market value of $465K',
    tokenSymbol: 'BONK',
    requestedAmount: '$465,000',
    currentVotes: 8900,
    totalVotes: 25000,    
    status: 'Active',
    timeLeft: '2 days',
    proposer: '4k2s...x7f9',
    support: 45,
    against: 55
  },
  {
    id: 3,
    title: 'Dividend Distribution',
    description: 'Distribute Q1 earnings of $15,000 to token holders',
    tokenSymbol: 'PEPE',
    requestedAmount: '$15,000',
    currentVotes: 12000,
    totalVotes: 18000,
    status: 'Passed',
    timeLeft: 'Executed',
    proposer: '9m1x...k5t2',
    support: 89,
    against: 11
  }
]

interface RWAVaultProps {
  userPoints: number
}

export function RWAVault({ userPoints }: RWAVaultProps) {
  const [selectedAsset, setSelectedAsset] = useState<number | null>(null)
  const [votingTab, setVotingTab] = useState('active')

  const totalVaultValue = mockRWAAssets.reduce((sum, asset) => 
    sum + parseInt(asset.value.replace(/[$,]/g, '')), 0
  )

  const userOwnedValue = mockRWAAssets.reduce((sum, asset) => 
    sum + (parseInt(asset.value.replace(/[$,]/g, '')) * (asset.ownedShares / asset.shares)), 0
  )

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-20 lg:pb-8 px-4 lg:px-8 bg-background-solid">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 fade-in">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            RWA Vault
          </h1>
          <p className="text-muted-foreground text-lg">
            Real World Assets backing your memecoins with meaningful value
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
                    <p className="text-sm text-success">+12.5% this quarter</p>
                  </div>
                  <Vault className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="slide-in-up">
            <Card className="material-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Your Holdings</p>
                    <p className="text-2xl font-bold">${userOwnedValue.toLocaleString()}</p>
                    <p className="text-sm text-primary">3 assets owned</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="slide-in-up">
            <Card className="material-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Yield</p>
                    <p className="text-2xl font-bold">$5,715</p>
                    <p className="text-sm text-warning">11.2% APY</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="slide-in-up">
            <Card className="material-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Proposals</p>
                    <p className="text-2xl font-bold">7</p>
                    <p className="text-sm text-secondary">2 require votes</p>
                  </div>
                  <Vote className="w-8 h-8 text-secondary" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="assets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3 material-card">
            <TabsTrigger value="assets">RWA Assets</TabsTrigger>
            <TabsTrigger value="governance">DAO Governance</TabsTrigger>
            <TabsTrigger value="marketplace">NFT Marketplace</TabsTrigger>
          </TabsList>

          <TabsContent value="assets" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {mockRWAAssets.map((asset, index) => (
                <div
                  key={asset.id}
                  className="slide-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card 
                    className="material-card cursor-pointer"
                    onClick={() => setSelectedAsset(selectedAsset === asset.id ? null : asset.id)}
                  >
                    <div className="relative">
                      <ImageWithFallback
                        src={asset.image}
                        alt={asset.name}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge 
                          variant={asset.status === 'Active' ? 'default' : 'secondary'}
                          className={asset.status === 'Active' ? 'bg-success text-success-foreground' : ''}
                        >
                          {asset.status}
                        </Badge>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                          {asset.tokenSymbol}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold mb-1">{asset.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {asset.location}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {asset.type}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{asset.value}</p>
                          <p className="text-sm text-success">+{asset.yield} yield</p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">
                        {asset.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Your Ownership</span>
                          <span>{((asset.ownedShares / asset.shares) * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={(asset.ownedShares / asset.shares) * 100} />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{asset.ownedShares} / {asset.shares} shares</span>
                          <span>{asset.monthlyIncome}/month</span>
                        </div>
                      </div>

                      {selectedAsset === asset.id && (
                        <div className="border-t border-border/50 pt-4 space-y-3 slide-in-up">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">NFT ID</p>
                              <p className="font-medium">{asset.nftId}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Acquired</p>
                              <p className="font-medium">{asset.acquisition}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Last Valuation</p>
                              <p className="font-medium text-success">{asset.lastValuation}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Monthly Income</p>
                              <p className="font-medium text-primary">{asset.monthlyIncome}</p>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Trade NFT
                            </Button>
                          </div>
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
                    DAO Governance Proposals
                  </CardTitle>
                  <CardDescription>
                    Vote on important decisions for the RWA vault management
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
                                Amount: {proposal.requestedAmount}
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
                              <span className="text-sm text-success">Proposal passed and executed</span>
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

          <TabsContent value="marketplace" className="space-y-6">
            <div className="slide-in-up">
              <Card className="material-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="w-5 h-5 mr-2 text-primary" />
                    RWA NFT Marketplace
                  </CardTitle>
                  <CardDescription>
                    Trade fractionalized ownership of real-world assets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Building2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">NFT Marketplace Coming Soon</h3>
                    <p className="text-muted-foreground mb-4">
                      Trade your RWA NFT shares, participate in auctions, and discover new investment opportunities.
                    </p>
                    <Button variant="outline">
                      Get Notified
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