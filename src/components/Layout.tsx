// Layout moderno com navegação inferior fixa
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import {
  Bell,
  MagnifyingGlass,
  Trophy,
  House,
  Users,
  Calendar,
  Megaphone,
  User,
  SignOut
} from 'phosphor-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const { usuario, logout } = useAuth();

  const menuAdministrador = [
    { id: 'dashboard', label: 'Início', icon: House },
    { id: 'jogadores', label: 'Elenco', icon: Users },
    { id: 'jogos', label: 'Jogos', icon: Calendar },
    { id: 'eventos', label: 'Eventos', icon: Trophy },
    { id: 'noticias', label: 'Notícias', icon: Megaphone },
  ];

  const menuJogador = [
    { id: 'dashboard', label: 'Início', icon: House },
    { id: 'jogos', label: 'Jogos', icon: Calendar },
    { id: 'eventos', label: 'Eventos', icon: Trophy },
    { id: 'noticias', label: 'Notícias', icon: Megaphone },
    { id: 'perfil', label: 'Perfil', icon: User },
  ];

  const menuItems = usuario?.tipo === 'administrador' ? menuAdministrador : menuJogador;

  return (
    <div className="min-h-screen bg-background">
      {/* Header Mobile-First */}
      <header className="sticky top-0 z-50 glass-morphism animate-slide-in-bottom">
        <div className="flex h-16 sm:h-20 items-center justify-between px-3 sm:px-6">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl gradient-primary flex items-center justify-center shadow-card">
                <Trophy className="w-4 h-4 sm:w-7 sm:h-7 text-white" />
              </div>
            </div>
            <div className="hidden xs:block">
              <h1 className="text-sm sm:text-2xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary-light bg-clip-text text-transparent">
                Jogo em Foco
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                {usuario?.tipo === 'administrador' ? '⚡ Admin' : '🎯 Pro'}
              </p>
            </div>
          </div>
          {/* Menu de navegação no desktop */}
          <div className="hidden sm:flex items-center space-x-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-primary hover:bg-primary/10'}`}
                  onClick={() => onTabChange(item.id)}
                >
                  <IconComponent className="w-5 h-5 mb-0.5" />
                  <span className="text-xs font-medium leading-tight">{item.label}</span>
                </Button>
              );
            })}
            {/* Botão de logout no desktop */}
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-300"
              onClick={logout}
            >
              <SignOut className="w-5 h-5 mb-0.5" />
              <span className="text-xs font-medium leading-tight">Sair</span>
            </Button>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" size="sm" className="hidden sm:flex p-3">
              <MagnifyingGlass className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <div className="relative">
              <Bell className="w-7 h-7 text-black" />
              <span className="absolute w-4 h-4 flex items-center justify-center rounded-full bg-[#EF4444] text-white text-xs font-bold border-2 border-[#F8FAFC]" style={{top: 0, right: 0, transform: 'translate(20%, -20%)'}}>3</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 p-1 sm:p-2 pl-2 sm:pl-4">
              <div className="hidden sm:block text-right">
                <p className="text-xs sm:text-sm font-semibold leading-none">{usuario?.nome}</p>
                <p className="text-xs text-primary font-medium capitalize">{usuario?.tipo}</p>
              </div>
              {usuario?.tipo === 'administrador' ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <img
                      src={usuario?.foto || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                      alt={usuario?.nome}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl object-cover border-2 cursor-pointer"
                      style={{ borderColor: '#1E293B' }}
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Perfil</DialogTitle>
                      <DialogDescription>Informações do perfil do administrador e opção para sair da conta.</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center gap-2 mt-2">
                      <img
                        src={usuario?.foto || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                        alt={usuario?.nome}
                        className="w-16 h-16 rounded-xl object-cover border-2"
                        style={{ borderColor: '#1E293B' }}
                      />
                      <span className="text-lg font-semibold text-[#1E293B]">{usuario?.nome}</span>
                      <span className="text-sm text-primary font-medium capitalize">{usuario?.tipo}</span>
                      <Button variant="destructive" className="mt-4 w-full" onClick={logout}>
                        <SignOut className="w-4 h-4 mr-2" /> Sair da Conta
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <img
                  src={usuario?.foto || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                  alt={usuario?.nome}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl object-cover border-2"
                  style={{ borderColor: '#1E293B' }}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal Mobile-First */}
      <main className="px-3 sm:px-6 py-4 sm:py-8 mb-0 sm:mb-24 pb-[56px] animate-fade-in">
        <div className="space-y-4 sm:space-y-8 max-w-full overflow-hidden">
          {children}
        </div>
      </main>

      {/* Barra de navegação inferior mobile recriada */}
      <nav className="fixed bottom-0 left-0 right-0 w-full z-50 bg-background border-t border-border h-16 flex items-center justify-around sm:hidden">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
              style={{ minWidth: 0 }}
            >
              <IconComponent className="w-6 h-6 mb-0.5" />
              <span className="text-xs font-medium leading-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;