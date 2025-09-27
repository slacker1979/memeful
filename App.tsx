import { useState } from 'react'
import { GlobalHeader } from './components/GlobalHeader'
import { Homepage } from './components/Homepage'
import { Dashboard } from './components/Dashboard'
import { MemecoinLauncher } from './components/MemecoinLauncher'
import { Trading } from './components/Trading'
import { AIStrategyVault } from './components/AIStrategyVault'
import { MiningTycoon } from './components/MiningTycoon'
import { Arcade } from './components/Arcade'
import { Profile } from './components/Profile'
import { AdminPanel } from './components/AdminPanel'

export default function App() {
  const [activeTab, setActiveTab] = useState('homepage')
  const [userPoints, setUserPoints] = useState(1247)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [selectedTokenId, setSelectedTokenId] = useState<string | null>(null)

  const renderActiveComponent = () => {
    const baseProps = {
      userPoints,
      onPointsChange: setUserPoints
    }

    // Show admin panel if requested
    if (showAdminPanel) {
      return (
        <AdminPanel 
          isAdmin={true} 
          onLogout={() => setShowAdminPanel(false)} 
        />
      )
    }

    switch (activeTab) {
      case 'homepage':
        return (
          <Homepage 
            onTokenSelect={(tokenId) => {
              if (tokenId === 'launcher') {
                setActiveTab('launcher')
              } else {
                setSelectedTokenId(tokenId)
                setActiveTab('trading')
              }
            }}
            onNavigateToTrading={() => setActiveTab('trading')}
            onAdminLogin={() => setShowAdminPanel(true)}
          />
        )
      case 'dashboard':
        return <Dashboard userPoints={userPoints} />
      case 'launcher':
        return <MemecoinLauncher {...baseProps} />
      case 'trading':
        return <Trading {...baseProps} />
      case 'vault':
        return <AIStrategyVault userPoints={userPoints} />
      case 'mining':
        return <MiningTycoon {...baseProps} />
      case 'arcade':
        return <Arcade {...baseProps} />
      case 'profile':
        return <Profile userPoints={userPoints} />
      default:
        return (
          <Homepage 
            onTokenSelect={(tokenId) => {
              if (tokenId === 'launcher') {
                setActiveTab('launcher')
              } else {
                setSelectedTokenId(tokenId)
                setActiveTab('trading')
              }
            }}
            onNavigateToTrading={() => setActiveTab('trading')}
            onAdminLogin={() => setShowAdminPanel(true)}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-background-solid">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,241,149,0.1),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(153,69,255,0.1),transparent_50%)] pointer-events-none" />
      
      {/* Global Header - Show on all pages except admin panel */}
      {!showAdminPanel && (
        <GlobalHeader 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          userPoints={userPoints}
          showAnnouncementBanner={activeTab === 'homepage'}
          onTokenSelect={(tokenId) => {
            if (tokenId === 'launcher') {
              setActiveTab('launcher')
            } else {
              setSelectedTokenId(tokenId)
              setActiveTab('trading')
            }
          }}
          onNavigateToTrading={() => setActiveTab('trading')}
          tickerTokens={[
            { id: '1', symbol: 'BONK', price: 0.0000245, change24h: 15.7, promoted: false },
            { id: '2', symbol: 'PEPE', price: 0.00000875, change24h: -8.3, promoted: true },
            { id: '3', symbol: 'WIF', price: 2.45, change24h: 23.4, promoted: true },
            { id: '4', symbol: 'MYRO', price: 0.125, change24h: 5.8, promoted: true },
            { id: '5', symbol: 'BASIC', price: 0.000001, change24h: 2.1, promoted: false },
            { id: '6', symbol: 'DOGE', price: 0.075, change24h: 8.4, promoted: false },
            { id: '7', symbol: 'SHIB', price: 0.0000125, change24h: 12.6, promoted: false },
            { id: '8', symbol: 'FLOKI', price: 0.00015, change24h: -3.2, promoted: false },
            { id: '9', symbol: 'MOON', price: 0.0025, change24h: 45.8, promoted: false },
            { id: '10', symbol: 'ROCKET', price: 0.000045, change24h: 18.9, promoted: false }
          ]}
        />
      )}

      {/* Main Content */}
      <main className="relative z-10">
        <div
          key={activeTab}
          className="slide-in-up"
        >
          {renderActiveComponent()}
        </div>
      </main>

      {/* Floating Action Elements */}
      <div className="fixed bottom-24 lg:bottom-8 right-4 lg:right-8 z-40">
        {activeTab === 'trading' && (
          <div className="material-card p-4 backdrop-blur-xl border border-primary/30 fade-in">
            <div className="text-center">
              <div className="w-3 h-3 bg-success rounded-full mx-auto mb-2 animate-pulse"></div>
              <p className="text-xs text-success font-medium">AI Active</p>
            </div>
          </div>
        )}

        {activeTab === 'mining' && (
          <div className="material-card p-4 backdrop-blur-xl border border-warning/30 fade-in">
            <div className="text-center">
              <div className="w-3 h-3 bg-warning rounded-full mx-auto mb-2 animate-pulse"></div>
              <p className="text-xs text-warning font-medium">Mining</p>
            </div>
          </div>
        )}
      </div>

      {/* Global Loading Overlay (for future use) */}
      <div>
        {/* Could be used for wallet connection, transaction confirmations, etc. */}
      </div>

      {/* Toast Container */}
      <div id="toast-container" className="fixed top-20 lg:top-24 right-4 z-50 space-y-2">
        {/* Toast notifications would appear here */}
      </div>
    </div>
  )
}