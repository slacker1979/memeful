import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { 
  MessageSquare, 
  User, 
  Send, 
  Settings,
  MoreVertical,
  Shield,
  AlertTriangle,
  TrendingUp,
  Zap
} from './ui/icons'

interface ChatMessage {
  id: string
  user: {
    username: string
    avatar: string
    level: 'newbie' | 'trader' | 'whale' | 'mod'
    verified: boolean
  }
  content: string
  timestamp: string
  type: 'message' | 'trade' | 'system'
  tradeData?: {
    action: 'buy' | 'sell'
    amount: string
    price: string
  }
}

interface TokenChatProps {
  tokenSymbol: string
  tokenName: string
  className?: string
}

export function TokenChat({ tokenSymbol, tokenName, className = '' }: TokenChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      user: {
        username: 'whaletrader',
        avatar: '/api/placeholder/24/24',
        level: 'whale',
        verified: true
      },
      content: `Just scooped up another bag of $${tokenSymbol}! 🚀 The RWA backing is solid`,
      timestamp: '2 min ago',
      type: 'message'
    },
    {
      id: '2',
      user: {
        username: 'system',
        avatar: '/api/placeholder/24/24',
        level: 'mod',
        verified: true
      },
      content: `🎯 Large buy order executed: 500K $${tokenSymbol} @ $0.0000245`,
      timestamp: '3 min ago',
      type: 'trade',
      tradeData: {
        action: 'buy',
        amount: '500,000',
        price: '0.0000245'
      }
    },
    {
      id: '3',
      user: {
        username: 'cryptonewbie',
        avatar: '/api/placeholder/24/24',
        level: 'newbie',
        verified: false
      },
      content: 'Can someone explain what RWA backing means? New to this!',
      timestamp: '5 min ago',
      type: 'message'
    },
    {
      id: '4',
      user: {
        username: 'aianalyst',
        avatar: '/api/placeholder/24/24',
        level: 'trader',
        verified: true
      },
      content: `AI score just hit 92 for $${tokenSymbol}! Technical indicators looking extremely bullish 📈`,
      timestamp: '7 min ago',
      type: 'message'
    },
    {
      id: '5',
      user: {
        username: 'moonrider',
        avatar: '/api/placeholder/24/24',
        level: 'trader',
        verified: false
      },
      content: 'HODL strong! 💎🙌 This token has the best tokenomics in the space',
      timestamp: '8 min ago',
      type: 'message'
    },
    {
      id: '6',
      user: {
        username: 'system',
        avatar: '/api/placeholder/24/24',
        level: 'mod',
        verified: true
      },
      content: `💰 RWA vault value increased to $${Math.floor(Math.random() * 200 + 100)}K`,
      timestamp: '10 min ago',
      type: 'system'
    }
  ])
  
  const [newMessage, setNewMessage] = useState('')
  const [isOnline, setIsOnline] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: (messages.length + 1).toString(),
      user: {
        username: 'you',
        avatar: '/api/placeholder/24/24',
        level: 'trader',
        verified: false
      },
      content: newMessage,
      timestamp: 'now',
      type: 'message'
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'whale': return 'text-primary'
      case 'trader': return 'text-secondary'
      case 'mod': return 'text-warning'
      default: return 'text-muted-foreground'
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'whale': return <Zap className="w-3 h-3" />
      case 'trader': return <TrendingUp className="w-3 h-3" />
      case 'mod': return <Shield className="w-3 h-3" />
      default: return <User className="w-3 h-3" />
    }
  }

  const formatTradeMessage = (message: ChatMessage) => {
    if (!message.tradeData) return message.content

    const { action, amount, price } = message.tradeData
    const actionColor = action === 'buy' ? 'text-success' : 'text-destructive'
    const actionIcon = action === 'buy' ? '📈' : '📉'
    
    return (
      <div className="flex items-center space-x-2">
        <span>{actionIcon}</span>
        <span className={actionColor}>
          {action.toUpperCase()} {amount} ${tokenSymbol}
        </span>
        <span className="text-muted-foreground">@</span>
        <span>${price}</span>
      </div>
    )
  }

  return (
    <div className={className}>
      <Card className="material-card h-[600px] flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-primary" />
              <span>${tokenSymbol} Chat</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success' : 'bg-destructive'}`}></div>
                <span className="text-xs text-muted-foreground">
                  {messages.length} online
                </span>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 space-y-3 overflow-y-auto pr-2 mb-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex space-x-2 ${
                  message.type === 'system' ? 'justify-center' : ''
                } ${
                  message.user.username === 'you' ? 'justify-end' : ''
                }`}
              >
                {message.type === 'system' ? (
                  <div className="text-center">
                    <Badge variant="outline" className="text-xs">
                      {message.content}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
                  </div>
                ) : (
                  <>
                    {message.user.username !== 'you' && (
                      <ImageWithFallback
                        src={message.user.avatar}
                        alt={message.user.username}
                        width={24}
                        height={24}
                        className="rounded-full flex-shrink-0 mt-1"
                      />
                    )}
                    <div className={`flex-1 min-w-0 ${message.user.username === 'you' ? 'text-right' : ''}`}>
                      <div className="flex items-center space-x-2 mb-1">
                        {message.user.username !== 'you' && (
                          <>
                            <span className={`text-sm font-medium ${getLevelColor(message.user.level)}`}>
                              {message.user.username}
                            </span>
                            <div className={getLevelColor(message.user.level)}>
                              {getLevelIcon(message.user.level)}
                            </div>
                            {message.user.verified && (
                              <div className="w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full"></div>
                              </div>
                            )}
                          </>
                        )}
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      </div>
                      
                      <div className={`text-sm ${
                        message.user.username === 'you' 
                          ? 'bg-primary text-primary-foreground p-2 rounded-lg inline-block max-w-xs' 
                          : ''
                      }`}>
                        {message.type === 'trade' ? formatTradeMessage(message) : message.content}
                      </div>
                    </div>
                    {message.user.username === 'you' && (
                      <ImageWithFallback
                        src={message.user.avatar}
                        alt={message.user.username}
                        width={24}
                        height={24}
                        className="rounded-full flex-shrink-0 mt-1"
                      />
                    )}
                  </>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Rules Notice */}
          <div className="bg-warning/10 border border-warning/30 rounded-lg p-2 mb-3">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-3 h-3 text-warning mt-0.5 flex-shrink-0" />
              <div className="text-xs text-warning">
                <p className="font-medium">Chat Rules</p>
                <p>No spam, no financial advice, respect others. Trades are auto-posted.</p>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="flex space-x-2">
            <Input
              placeholder={`Chat about ${tokenSymbol}...`}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              size="sm"
              className="px-3"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}