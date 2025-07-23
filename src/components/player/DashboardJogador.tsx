// Dashboard do Jogador
import React from 'react';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Calendar, 
  Trophy,
  TrendUp,
  Medal,
  CheckCircle,
  Users,
  Star,
  Bell
} from 'phosphor-react';
import { jogadores, jogos, eventos, noticias } from '../../data/mockData';


const DashboardJogador: React.FC = () => {
  // Encontrar dados do jogador (para demo, usar o primeiro jogador)
  const jogadorData = jogadores[0]; // Em uma aplicação real, seria baseado no ID do usuário
  
  const proximosJogos = jogos.filter(j => j.status === 'agendado').slice(0, 3);
  const proximosEventos = eventos.slice(0, 2);
  const ultimasNoticias = noticias.slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      {/* App Bar */}
      <header className="w-full bg-[#F8FAFC] px-4 pt-4 pb-2 flex items-center justify-between">
        {/* Removido foto de perfil duplicada do header */}
      </header>

      {/* Card de Perfil Principal */}
      <section className="flex flex-col items-center justify-center px-4 mt-4">
        <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-xl flex flex-col items-center py-5 px-3 sm:py-6 sm:px-6">
          {/* Foto removida para otimizar espaço mobile */}
          <h1 className="text-xl sm:text-2xl font-bold text-[#1E293B] font-inter mb-1 text-center">Olá, {jogadorData.nome}!</h1>
          <span className="text-[#1E293B] font-inter mb-1 text-center text-sm sm:text-base">{jogadorData.posicao}</span>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-1 mb-2">
            <span className="text-[#1E293B] font-medium font-inter flex items-center gap-1 text-xs sm:text-base"><TrendUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#4C1D95]" />{jogadorData.percentualPresenca}% de presença</span>
            <span className="text-[#1E293B] font-medium font-inter flex items-center gap-1 text-xs sm:text-base"><Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-[#4C1D95]" />{jogadorData.trofeus.length} troféus</span>
            <span className="text-[#1E293B] font-medium font-inter flex items-center gap-1 text-xs sm:text-base"><Medal className="w-4 h-4 sm:w-5 sm:h-5 text-[#4C1D95]" />{jogadorData.medalhas.length} medalhas</span>
          </div>
          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-2 gap-4 w-full mt-2">
            <div className="bg-[#F8FAFC] rounded-xl shadow-md p-4 flex flex-col items-center">
              <TrendUp className="w-6 h-6 text-[#4C1D95] mb-1" />
              <span className="text-lg font-medium text-[#4C1D95] font-inter">{jogadorData.percentualPresenca}%</span>
              <span className="text-sm text-[#1E293B] font-inter">Presença em Jogos</span>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl shadow-md p-4 flex flex-col items-center">
              <Trophy className="w-6 h-6 text-[#4C1D95] mb-1" />
              <span className="text-lg font-medium text-[#4C1D95] font-inter">{jogadorData.trofeus.length}</span>
              <span className="text-sm text-[#1E293B] font-inter">Troféus Conquistados</span>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl shadow-md p-4 flex flex-col items-center">
              <Medal className="w-6 h-6 text-[#4C1D95] mb-1" />
              <span className="text-lg font-medium text-[#4C1D95] font-inter">{jogadorData.medalhas.length}</span>
              <span className="text-sm text-[#1E293B] font-inter">Medalhas</span>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl shadow-md p-4 flex flex-col items-center">
              <Calendar className="w-6 h-6 text-[#4C1D95] mb-1" />
              <span className="text-lg font-medium text-[#4C1D95] font-inter">{proximosJogos.length}</span>
              <span className="text-sm text-[#1E293B] font-inter">Jogos Disponíveis</span>
            </div>
          </div>
        </div>
      </section>

      {/* Layout Mobile-First */}
      <div className="space-y-4 sm:space-y-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
        
        {/* Coluna Principal */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          
          {/* Próximos Jogos Mobile-First */}
          {/* Bloco duplicado de Próximos Jogos removido */}


        </div>

      </div>

      {/* Refatorar Próximos Jogos */}
      <section className="px-4 mt-8">
        <h2 className="text-lg font-bold text-[#1E293B] mb-1 text-left">Próximos Jogos</h2>
        <p className="text-[#1E293B] mb-4 text-left">Confirme sua presença</p>
        <div className="space-y-4">
          {proximosJogos.map((jogo) => {
            const minhaPresenca = jogo.presencas.find(p => p.jogadorId === jogadorData.id);
            const confirmou = minhaPresenca?.confirmou;
            return (
              <div key={jogo.id} className="bg-white rounded-xl shadow-lg p-5 flex flex-col gap-2">
                <CheckCircle className={`w-7 h-7 mb-2 ${confirmou ? 'text-[#22C55E]' : 'text-gray-300'}`} />
                <span className="font-bold text-[#1E293B] text-lg">vs {jogo.adversario}</span>
                <span className="text-xs text-[#1E293B]">{new Date(jogo.data).toLocaleDateString('pt-BR')} • {jogo.horario}</span>
                <span className="text-xs text-[#1E293B]">{jogo.local}</span>
                <div className="flex gap-2 mt-2">
                  <Button className="bg-[#4C1D95] text-white font-medium rounded-full px-4 py-1" size="sm">Confirmado</Button>
                  <Button variant="outline" className="text-[#4C1D95] border-[#4C1D95] font-medium rounded-full px-4 py-1 bg-white" size="sm">Alterar</Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Próximos Eventos */}
      <section className="px-4 mt-8">
        <h2 className="text-lg font-bold text-[#1E293B] mb-1 text-left">Próximos Eventos</h2>
        <p className="text-[#1E293B] mb-4 text-left">Treinos e atividades especiais</p>
        <div className="space-y-4">
          {proximosEventos.map((evento) => {
            return (
              <div key={evento.id} className="bg-white rounded-xl shadow-lg p-5 flex flex-col gap-2">
                <Trophy className="w-7 h-7 text-[#4C1D95] mb-2" />
                <span className="font-bold text-[#1E293B] text-lg">{evento.nome}</span>
                <span className="text-xs text-[#1E293B]">{evento.descricao}</span>
                <span className="text-xs text-[#1E293B]">{new Date(evento.data).toLocaleDateString('pt-BR')} • {evento.horario}</span>
                <div className="flex gap-2 mt-2">
                  <Button className="bg-[#4C1D95] text-white font-medium rounded-full px-4 py-1" size="sm">Confirmado</Button>
                  <Button variant="outline" className="text-[#4C1D95] border-[#4C1D95] font-medium rounded-full px-4 py-1 bg-white" size="sm">Alterar</Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Conquistas */}
      <section className="px-4 mt-8">
        <h2 className="text-lg font-bold text-[#1E293B] mb-1 text-left">Conquistas</h2>
        <p className="text-[#1E293B] mb-4 text-left">Troféus e medalhas</p>
        <h3 className="text-base font-bold text-[#1E293B] mb-2 text-left">Troféus Recentes</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {jogadorData.trofeus.slice(0, 4).map((trofeu) => (
            <div key={trofeu.id} className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center">
              <Star className="w-6 h-6 text-[#4C1D95] mb-1" />
              <span className="font-bold text-[#1E293B]">{trofeu.nome}</span>
              <span className="text-xs text-[#1E293B]">{new Date(trofeu.dataConquista).toLocaleDateString('pt-BR')}</span>
            </div>
          ))}
        </div>
        <h3 className="text-base font-bold text-[#1E293B] mb-2 text-left">Medalhas</h3>
        <div className="space-y-3 mb-4">
          {jogadorData.medalhas.slice(0, 3).map((medalha) => (
            <div key={medalha.id} className="bg-white rounded-xl shadow-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Medal className="w-6 h-6 text-[#4C1D95]" />
                <div>
                  <span className="font-bold text-[#1E293B]">{medalha.nome}</span>
                  <p className="text-xs text-[#1E293B]">{medalha.descricao}</p>
                </div>
              </div>
              <Badge className="bg-[#4C1D95] text-white rounded-full px-3 py-0.5">{medalha.tipo}</Badge>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full text-[#4C1D95] border-[#4C1D95] font-medium rounded-full bg-white">Ver Perfil Completo</Button>
      </section>

      {/* Últimas Notícias */}
      <section className="px-4 mt-8 mb-24">
        <h2 className="text-lg font-bold text-[#1E293B] mb-1 text-left flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#4C1D95]" /> Últimas Notícias
        </h2>
        <p className="text-[#1E293B] mb-4 text-left">Novidades do time</p>
        <div className="space-y-4">
          {ultimasNoticias.map((noticia) => (
            <div key={noticia.id} className="bg-white rounded-xl shadow-lg p-4 cursor-pointer">
              <span className="font-bold text-[#1E293B]">{noticia.titulo}</span>
              <p className="text-xs text-[#1E293B] mb-2">{noticia.conteudo.substring(0, 80)}...</p>
              <div className="flex items-center justify-between text-xs text-[#1E293B]">
                <span>{new Date(noticia.dataPublicacao).toLocaleDateString('pt-BR')}</span>
                <Button size="sm" variant="ghost" className="text-[#4C1D95]">Ler mais</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Navbar Inferior */}
      <nav className="fixed bottom-0 left-0 w-full bg-[#1E293B] flex justify-around items-center h-16 z-50">
        <div className="flex flex-col items-center justify-center gap-1 bg-purple-900/20 rounded-xl px-4 py-1">
          <Trophy className="w-6 h-6 text-[#4C1D95]" />
          <span className="text-xs text-[#4C1D95] font-medium">Início</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <Users className="w-6 h-6 text-white" />
          <span className="text-xs text-white">Jogos</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <Calendar className="w-6 h-6 text-white" />
          <span className="text-xs text-white">Eventos</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <Medal className="w-6 h-6 text-white" />
          <span className="text-xs text-white">Conquistas</span>
        </div>
      </nav>
    </div>
  );
};

export default DashboardJogador;