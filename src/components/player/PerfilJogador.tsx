import React from 'react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Trophy, Medal, User, Envelope, SignOut, PencilSimple } from 'phosphor-react';
import { useAuth } from '../../contexts/AuthContext';

const conquistas = [
  { tipo: 'Troféu', nome: 'Artilheiro', data: '14/06/2024', icone: <Trophy className="w-5 h-5 text-yellow-500" /> },
  { tipo: 'Medalha', nome: 'Presença VIP', data: '09/07/2024', icone: <Medal className="w-5 h-5 text-purple-500" /> },
];

const estatisticas = [
  { label: 'Jogos', valor: 32 },
  { label: 'Eventos', valor: 12 },
  { label: 'Conquistas', valor: 5 },
];

const PerfilJogador: React.FC = () => {
  const { usuario, logout } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in px-2 py-4">
      {/* Avatar, nome e tipo */}
      <div className="flex flex-col items-center gap-2">
            <img
          src={usuario?.foto || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face'}
          alt={usuario?.nome}
          className="w-24 h-24 rounded-full object-cover border-4 border-primary/20 shadow-none"
            />
        <h2 className="text-xl font-bold text-slate-900 mt-2">{usuario?.nome || 'Nome do Jogador'}</h2>
        <span className="text-sm text-primary font-semibold capitalize flex items-center gap-1">
          <User className="w-4 h-4" />
          {usuario?.tipo || 'Jogador'}
        </span>
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <Envelope className="w-4 h-4" />
          {usuario?.email || 'email@exemplo.com'}
        </span>
        <Button size="sm" variant="outline" className="mt-2 flex items-center gap-1">
          <PencilSimple className="w-4 h-4" /> Editar Perfil
        </Button>
          </div>
          
      {/* Estatísticas rápidas */}
      <div className="flex justify-around bg-white rounded-xl border p-4 sm:shadow-card shadow-none">
        {estatisticas.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center">
            <span className="text-lg font-bold text-primary">{stat.valor}</span>
            <span className="text-xs text-muted-foreground">{stat.label}</span>
          </div>
        ))}
        </div>
        
      {/* Conquistas */}
      <div className="bg-white rounded-xl border p-4 sm:shadow-card shadow-none">
        <h3 className="text-base font-semibold mb-2 text-slate-900 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" /> Conquistas Recentes
        </h3>
        <div className="flex flex-wrap gap-3">
          {conquistas.map((c, i) => (
            <Badge key={i} className="flex items-center gap-1 px-3 py-1 text-xs bg-primary/10 text-primary font-medium rounded-full">
              {c.icone} {c.nome} <span className="ml-1 text-muted-foreground">({c.data})</span>
            </Badge>
          ))}
        </div>
      </div>

      {/* Botão sair */}
      <div className="flex justify-center pt-2">
        <Button variant="outline" className="flex items-center gap-2 text-destructive border-destructive" onClick={logout}>
          <SignOut className="w-4 h-4" /> Sair
        </Button>
      </div>
    </div>
  );
};

export default PerfilJogador;