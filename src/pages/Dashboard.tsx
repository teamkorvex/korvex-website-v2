import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  LogOutIcon, 
  SearchIcon, 
  SettingsIcon, 
  HomeIcon,
  BanIcon,
  UserCogIcon,
  DiscordIcon
} from '@/components/icons/OrbIcons';

type DashboardSection = 'overview' | 'lookup' | 'config' | 'account';

export function Dashboard() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-pulse-soft">
          <div className="w-12 h-12 border-2 border-cobalt border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full orb-gradient flex items-center justify-center border border-white/10 mx-auto mb-6">
            <DiscordIcon size={40} className="text-cobalt" />
          </div>
          <h1 className="font-heading font-semibold text-3xl text-primary-light mb-4">
            Authentication Required
          </h1>
          <p className="text-secondary-light mb-8">
            Please log in with your Discord account to access the Korvex dashboard.
          </p>
          <Button
            onClick={login}
            className="bg-cobalt hover:bg-cobalt-dark text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-all hover:-translate-y-0.5"
          >
            <DiscordIcon size={20} />
            Login with Discord
          </Button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="font-heading font-semibold text-2xl text-primary-light">
              Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-dark-light border border-white/10 rounded-lg p-6">
                <p className="text-sm text-secondary-light mb-2">Protected Servers</p>
                <p className="font-heading font-semibold text-3xl text-cobalt">0</p>
              </div>
              <div className="bg-dark-light border border-white/10 rounded-lg p-6">
                <p className="text-sm text-secondary-light mb-2">Threats Blocked</p>
                <p className="font-heading font-semibold text-3xl text-cobalt">0</p>
              </div>
              <div className="bg-dark-light border border-white/10 rounded-lg p-6">
                <p className="text-sm text-secondary-light mb-2">Account Status</p>
                <p className="font-heading font-semibold text-lg text-green-400">Active</p>
              </div>
            </div>
            <div className="bg-dark-light border border-white/10 rounded-lg p-6">
              <h3 className="font-medium text-primary-light mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => window.open('https://discord.com/oauth2/authorize?client_id=1474463953886122167&permissions=4504976164457700&integration_type=0&scope=bot', '_blank')}
                  className="bg-cobalt hover:bg-cobalt-dark text-white text-sm"
                >
                  <DiscordIcon size={16} className="mr-2" />
                  Add to Server
                </Button>
                <Button
                  onClick={() => setActiveSection('lookup')}
                  variant="outline"
                  className="border-white/20 text-primary-light hover:bg-white/5 text-sm"
                >
                  <SearchIcon size={16} className="mr-2" />
                  Lookup User
                </Button>
              </div>
            </div>
          </div>
        );
      case 'lookup':
        return (
          <div className="space-y-6">
            <h2 className="font-heading font-semibold text-2xl text-primary-light">
              Blacklist Lookup
            </h2>
            <div className="bg-dark-light border border-white/10 rounded-lg p-6">
              <p className="text-secondary-light mb-4">
                Search for a user by Discord ID to check their blacklist status.
              </p>
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Enter Discord User ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-dark border-white/10 text-primary-light placeholder:text-secondary-light/50 flex-1"
                />
                <Button className="bg-cobalt hover:bg-cobalt-dark text-white">
                  <SearchIcon size={18} className="mr-2" />
                  Search
                </Button>
              </div>
            </div>
            <div className="bg-dark-light border border-white/10 rounded-lg p-6">
              <p className="text-secondary-light text-center py-8">
                Enter a Discord User ID above to search the global blacklist.
              </p>
            </div>
          </div>
        );
      case 'config':
        return (
          <div className="space-y-6">
            <h2 className="font-heading font-semibold text-2xl text-primary-light">
              Bot Configuration
            </h2>
            <div className="bg-dark-light border border-white/10 rounded-lg p-6">
              <h3 className="font-medium text-primary-light mb-4">Server Settings</h3>
              <p className="text-secondary-light mb-4">
                Configure Korvex settings for your Discord servers. Use the /setup command in your server to get started.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <div>
                    <p className="text-primary-light">Log Channel</p>
                    <p className="text-sm text-secondary-light">Where ban notifications are sent</p>
                  </div>
                  <Button variant="outline" className="border-white/20 text-primary-light hover:bg-white/5 text-sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <div>
                    <p className="text-primary-light">Auto-Ban</p>
                    <p className="text-sm text-secondary-light">Automatically ban blacklisted users</p>
                  </div>
                  <Button variant="outline" className="border-white/20 text-primary-light hover:bg-white/5 text-sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-primary-light">Alert Types</p>
                    <p className="text-sm text-secondary-light">Choose which events to log</p>
                  </div>
                  <Button variant="outline" className="border-white/20 text-primary-light hover:bg-white/5 text-sm">
                    Configure
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'account':
        return (
          <div className="space-y-6">
            <h2 className="font-heading font-semibold text-2xl text-primary-light">
              Account Settings
            </h2>
            <div className="bg-dark-light border border-white/10 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                {user?.avatar ? (
                  <img
                    src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                    alt={user.username}
                    className="w-16 h-16 rounded-full"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-cobalt/20 flex items-center justify-center">
                    <span className="text-2xl font-semibold text-cobalt">
                      {user?.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-medium text-primary-light text-lg">{user?.username}</p>
                  <p className="text-sm text-secondary-light">Discord ID: {user?.id}</p>
                </div>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={logout}
                  variant="outline"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10 w-full justify-center"
                >
                  <LogOutIcon size={18} className="mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-light border-r border-white/5 flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6">
          <a
            href="/"
            className="font-heading font-bold text-xl text-primary-light hover:text-cobalt transition-colors"
          >
            Korvex
          </a>
        </div>
        
        <nav className="flex-1 px-4 py-4">
          <div className="space-y-1">
            <button
              onClick={() => setActiveSection('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                activeSection === 'overview'
                  ? 'bg-cobalt/20 text-cobalt'
                  : 'text-secondary-light hover:text-primary-light hover:bg-white/5'
              }`}
            >
              <HomeIcon size={18} />
              Overview
            </button>
            <button
              onClick={() => setActiveSection('lookup')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                activeSection === 'lookup'
                  ? 'bg-cobalt/20 text-cobalt'
                  : 'text-secondary-light hover:text-primary-light hover:bg-white/5'
              }`}
            >
              <BanIcon size={18} />
              Blacklist Lookup
            </button>
            <button
              onClick={() => setActiveSection('config')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                activeSection === 'config'
                  ? 'bg-cobalt/20 text-cobalt'
                  : 'text-secondary-light hover:text-primary-light hover:bg-white/5'
              }`}
            >
              <SettingsIcon size={18} />
              Configuration
            </button>
            <button
              onClick={() => setActiveSection('account')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                activeSection === 'account'
                  ? 'bg-cobalt/20 text-cobalt'
                  : 'text-secondary-light hover:text-primary-light hover:bg-white/5'
              }`}
            >
              <UserCogIcon size={18} />
              Account
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-secondary-light hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOutIcon size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-dark-light border-t border-white/5 z-50">
        <div className="flex justify-around py-2">
          <button
            onClick={() => setActiveSection('overview')}
            className={`flex flex-col items-center gap-1 p-2 ${
              activeSection === 'overview' ? 'text-cobalt' : 'text-secondary-light'
            }`}
          >
            <HomeIcon size={20} />
            <span className="text-xs">Overview</span>
          </button>
          <button
            onClick={() => setActiveSection('lookup')}
            className={`flex flex-col items-center gap-1 p-2 ${
              activeSection === 'lookup' ? 'text-cobalt' : 'text-secondary-light'
            }`}
          >
            <BanIcon size={20} />
            <span className="text-xs">Lookup</span>
          </button>
          <button
            onClick={() => setActiveSection('config')}
            className={`flex flex-col items-center gap-1 p-2 ${
              activeSection === 'config' ? 'text-cobalt' : 'text-secondary-light'
            }`}
          >
            <SettingsIcon size={20} />
            <span className="text-xs">Config</span>
          </button>
          <button
            onClick={() => setActiveSection('account')}
            className={`flex flex-col items-center gap-1 p-2 ${
              activeSection === 'account' ? 'text-cobalt' : 'text-secondary-light'
            }`}
          >
            <UserCogIcon size={20} />
            <span className="text-xs">Account</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="h-16 bg-dark-light/50 border-b border-white/5 flex items-center justify-between px-6">
          <h1 className="font-heading font-medium text-primary-light capitalize">
            {activeSection}
          </h1>
          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-secondary-light hidden sm:inline">
                  {user.username}
                </span>
                {user.avatar ? (
                  <img
                    src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                    alt={user.username}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-cobalt/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-cobalt">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 pb-24 md:pb-6">
          <div className="max-w-4xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
