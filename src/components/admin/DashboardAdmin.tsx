// Dashboard do Administrador
import React from 'react';
import { Trophy, Calendar, Users, TrendUp, Megaphone } from 'phosphor-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
  
  const estatisticas = [
  { label: 'Total de Jogadores', valor: 4, icon: <Users className="w-6 h-6 text-[#4C1D95]" /> },
  { label: 'Próximos Jogos', valor: 1, icon: <Calendar className="w-6 h-6 text-[#4C1D95]" /> },
  { label: 'Eventos Ativos', valor: 2, icon: <Megaphone className="w-6 h-6 text-[#4C1D95]" /> },
  { label: 'Presença Média', valor: '88%', icon: <TrendUp className="w-6 h-6 text-[#4C1D95]" /> },
];

const DashboardAdmin: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      {/* Header */}
      <header className="w-full bg-[#F8FAFC] px-4 pt-4 pb-2 flex items-center justify-between">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold text-[#1E293B]">Dashboard Admin</h1>
          <span className="text-sm text-[#1E293B] font-medium">Gestão completa do time</span>
        </div>
      </header>

      {/* Cards de Resumo */}
      <section className="grid grid-cols-2 gap-4 px-4 mt-4">
        {estatisticas.map((stat) => (
          <div key={stat.label} className="bg-[#F8FAFC] rounded-xl shadow-md p-5 flex flex-col items-center gap-2">
            {stat.icon}
            <span className="text-xl font-medium text-[#4C1D95]">{stat.valor}</span>
            <span className="text-sm text-[#1E293B] text-center">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Próximos Jogos */}
      <section className="px-4 mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-[#1E293B]">Próximos Jogos</h2>
          <Button size="sm" variant="link" className="text-[#4C1D95] px-0">Ver todos</Button>
        </div>
        <div className="bg-[#F8FAFC] rounded-xl shadow-md p-5 flex flex-col items-center gap-1">
          <Trophy className="w-8 h-8 text-[#4C1D95] mb-1" />
          <span className="font-bold text-[#1E293B]">vs FC Rivais</span>
          <span className="text-xs text-[#1E293B] font-normal">24/07/2024 • 15:00</span>
          <span className="text-xs text-[#1E293B] font-normal">Estádio Municipal</span>
          <Badge className="bg-[#3B82F6] text-white mt-2 rounded-full px-3 py-0.5">Agendado</Badge>
        </div>
      </section>

      {/* Linha divisória */}
      <div className="border-t border-gray-200 my-6 mx-4" />

      {/* Próximos Eventos */}
      <section className="px-4 mb-24">
        <h2 className="text-lg font-semibold text-[#1E293B] mb-3">Próximos Eventos</h2>
        <div className="bg-[#F8FAFC] rounded-xl shadow-md p-5 flex flex-col items-center gap-1">
          <Megaphone className="w-8 h-8 text-[#4C1D95] mb-1" />
          <Badge className="bg-[#22C55E] text-white mb-1 rounded-full px-3 py-0.5">Treino</Badge>
          <span className="font-bold text-[#1E293B]">Treino Técnico</span>
          <span className="text-xs text-[#1E293B] font-normal">25/07/2024 • 19:00</span>
          <span className="text-xs text-[#1E293B] font-normal">Centro Esportivo</span>
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
          <span className="text-xs text-white">Jogadores</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <Calendar className="w-6 h-6 text-white" />
          <span className="text-xs text-white">Jogos</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <Megaphone className="w-6 h-6 text-white" />
          <span className="text-xs text-white">Eventos</span>
        </div>
      </nav>
    </div>
  );
};

export default DashboardAdmin;