import { useState } from 'react'
// Animation imports removed due to build issues
import { 
  TrendingUp, 
  Rocket, 
  Coins, 
  Gamepad2, 
  BarChart3, 
  Wallet, 
  Settings,
  Menu,
  X,
  User
} from './ui/icons'
import { Button } from './ui/button'

const navigationItems = [
  { id: 'homepage', label: 'Home', icon: BarChart3 },
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'launcher', label: 'Launcher', icon: Rocket },
  { id: 'trading', label: 'Trading', icon: TrendingUp },
  { id: 'vault', label: 'RWA Vault', icon: Coins },
  { id: 'mining', label: 'Mining', icon: Coins },
  { id: 'arcade', label: 'Arcade', icon: Gamepad2 },
]

const secondaryItems = [
  { id: 'profile', label: 'Profile', icon: User }
]

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
  userPoints: number
}

export function Navigation({ activeTab, onTabChange, userPoints }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex fixed top-0 left-0 right-0 z-50 material-card border-b border-border/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => onTabChange('homepage')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Coins className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Vaulted
                </h1>
                <p className="text-xs text-muted-foreground">From Meme To Meaningful</p>
              </div>
            </motion.div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-2">
              {navigationItems.slice(1).map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
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
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          layoutId="activeTab"
                        />
                      )}
                    </Button>
                  </motion.div>
                )
              })}
            </div>

            {/* User Info */}
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <Button 
                  variant={activeTab === 'profile' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => onTabChange('profile')}
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button variant="outline" size="sm">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 material-card border-b border-border/50 backdrop-blur-xl">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Mobile Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Coins className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Vaulted
                </h1>
              </div>
            </div>

            {/* Points Display */}
            <div className="text-right">
              <p className="text-sm font-medium">{userPoints.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>

            {/* Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="border-t border-border/50 material-card"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="p-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      onTabChange(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                )
              })}
              {secondaryItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      onTabChange(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                )
              })}
              <div className="pt-2 border-t border-border/50">
                <Button variant="outline" className="w-full">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Bottom Navigation for Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 material-card border-t border-border/50 backdrop-blur-xl">
        <div className="grid grid-cols-5 p-2">
          {navigationItems.slice(0, 4).map((item) => {
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