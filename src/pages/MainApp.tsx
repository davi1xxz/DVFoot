// Componente principal da aplicação que gerencia o fluxo de autenticação
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Login from '../components/Login';
import SelecaoPerfil from '../components/SelecaoPerfil';
import Layout from '../components/Layout';
import DashboardAdmin from '../components/admin/DashboardAdmin';
import DashboardJogador from '../components/player/DashboardJogador';
import PerfilJogador from '../components/player/PerfilJogador';
import LoadingSpinner from '../components/ui/loading-spinner';

const MainApp: React.FC = () => {
  const { usuario, perfilSelecionado, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
        <LoadingSpinner size="lg" text="Inicializando..." className="text-white" />
      </div>
    );
  }

  // Não logado - mostrar tela de login
  if (!usuario) {
    return <Login />;
  }

  // Logado mas sem perfil selecionado
  if (!perfilSelecionado) {
    return <SelecaoPerfil />;
  }

  // Função para renderizar o conteúdo baseado na aba ativa
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return usuario.tipo === 'administrador' ? (
          <DashboardAdmin onNavigate={setActiveTab} />
        ) : (
          <DashboardJogador onNavigate={setActiveTab} />
        );
      
      case 'jogadores':
        if (usuario.tipo === 'administrador') {
          const GestaoJogadores = React.lazy(() => import('../components/admin/GestaoJogadores'));
          return (
            <React.Suspense fallback={<LoadingSpinner size="md" text="Carregando gestão..." className="py-12" />}>
              <GestaoJogadores />
            </React.Suspense>
          );
        }
        // Jogadores não têm acesso à gestão de jogadores
        return (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <p>Acesso restrito a administradores</p>
            </div>
          </div>
        );
        
      case 'jogos':
        if (usuario.tipo === 'administrador') {
          const GestaoJogos = React.lazy(() => import('../components/admin/GestaoJogos'));
          return (
            <React.Suspense fallback={<LoadingSpinner size="md" text="Carregando jogos..." className="py-12" />}>
              <GestaoJogos />
            </React.Suspense>
          );
        } else {
          const JogosJogador = React.lazy(() => import('../components/player/JogosJogador'));
          return (
            <React.Suspense fallback={<LoadingSpinner size="md" text="Carregando jogos..." className="py-12" />}>
              <JogosJogador />
            </React.Suspense>
          );
        }
        
      case 'eventos':
        if (usuario.tipo === 'administrador') {
          const GestaoEventos = React.lazy(() => import('../components/admin/GestaoEventos'));
          return (
            <React.Suspense fallback={<LoadingSpinner size="md" text="Carregando eventos..." className="py-12" />}>
              <GestaoEventos />
            </React.Suspense>
          );
        } else {
          const EventosJogador = React.lazy(() => import('../components/player/EventosJogador'));
          return (
            <React.Suspense fallback={<LoadingSpinner size="md" text="Carregando eventos..." className="py-12" />}>
              <EventosJogador />
            </React.Suspense>
          );
        }
        
      case 'noticias':
        if (usuario.tipo === 'administrador') {
          const GestaoNoticias = React.lazy(() => import('../components/admin/GestaoNoticias'));
          return (
            <React.Suspense fallback={<LoadingSpinner size="md" text="Carregando notícias..." className="py-12" />}>
              <GestaoNoticias />
            </React.Suspense>
          );
        } else {
          const NoticiasJogador = React.lazy(() => import('../components/player/NoticiasJogador'));
          return (
            <React.Suspense fallback={<LoadingSpinner size="md" text="Carregando notícias..." className="py-12" />}>
              <NoticiasJogador />
            </React.Suspense>
          );
        }
        
      case 'perfil':
        if (usuario.tipo === 'jogador') {
          return <PerfilJogador />;
        }
        // Administradores não têm perfil de jogador
        return (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <p>Perfil disponível apenas para jogadores</p>
            </div>
          </div>
        );
        
      default:
        return usuario.tipo === 'administrador' ? (
          <DashboardAdmin onNavigate={setActiveTab} />
        ) : (
          <DashboardJogador onNavigate={setActiveTab} />
        );
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
    >
      {renderContent()}
    </Layout>
  );
};

export default MainApp;