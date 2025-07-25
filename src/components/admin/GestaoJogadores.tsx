// Gestão completa de jogadores para administradores
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { 
  MagnifyingGlass, 
  Plus, 
  PencilSimple, 
  Trash, 
  DotsThreeVertical,
  Trophy,
  Calendar,
  Target,
  TrendUp
} from 'phosphor-react';
import { jogadores } from '../../data/mockData';

const GestaoJogadores: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPosition, setFilterPosition] = useState('todos');

  const posicoes = ['todos', 'goleiro', 'zagueiro', 'lateral', 'meio-campo', 'atacante'];
  
  const jogadoresFiltrados = jogadores.filter(jogador => {
    const matchSearch = jogador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       jogador.posicao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPosition = filterPosition === 'todos' || jogador.posicao.toLowerCase() === filterPosition;
    return matchSearch && matchPosition;
  });

  const estatisticasGerais = {
    totalJogadores: jogadores.length,
    presencaMedia: Math.round(jogadores.reduce((acc, j) => acc + j.percentualPresenca, 0) / jogadores.length),
    totalTrofeus: jogadores.reduce((acc, j) => acc + j.trofeus.length, 0),
    totalMedalhas: jogadores.reduce((acc, j) => acc + j.medalhas.length, 0)
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Gestão do Elenco</h1>
          <p className="text-muted-foreground">
            Gerencie jogadores e comissão técnica
          </p>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="gradient-card shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Trophy className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{estatisticasGerais.totalJogadores}</p>
                  <p className="text-xs text-muted-foreground">Jogadores</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <TrendUp className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{estatisticasGerais.presencaMedia}%</p>
                  <p className="text-xs text-muted-foreground">Presença Média</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Trophy className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{estatisticasGerais.totalTrofeus}</p>
                  <p className="text-xs text-muted-foreground">Troféus</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-info/10 rounded-lg">
                  <Target className="w-5 h-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{estatisticasGerais.totalMedalhas}</p>
                  <p className="text-xs text-muted-foreground">Medalhas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Controles */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar jogadores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <select 
                value={filterPosition}
                onChange={(e) => setFilterPosition(e.target.value)}
                className="px-3 py-2 border border-border rounded-md text-sm bg-background"
              >
                {posicoes.map(pos => (
                  <option key={pos} value={pos}>
                    {pos === 'todos' ? 'Todas Posições' : pos.charAt(0).toUpperCase() + pos.slice(1)}
                  </option>
                ))}
              </select>
              
              <Button className="gradient-primary shadow-glow">
                <Plus className="w-4 h-4 mr-2" />
                Novo Jogador
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Jogadores */}
      <div className="grid gap-4">
        {jogadoresFiltrados.map((jogador, index) => (
          <Card key={jogador.id} className="bg-white rounded-xl border p-4 sm:shadow-card shadow-none card-hover animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12 border-2 border-primary/20">
                    <AvatarImage src={jogador.foto} alt={jogador.nome} />
                    <AvatarFallback>{jogador.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-lg">{jogador.nome}</h3>
                      <Badge variant="secondary" className="text-xs capitalize">
                        {jogador.posicao}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {jogador.jogosCompareceu}/{jogador.totalJogos} jogos
                      </span>
                      <span className="flex items-center">
                        <TrendUp className="w-4 h-4 mr-1" />
                        {jogador.percentualPresenca}% presença
                      </span>
                      <span className="flex items-center">
                        <Trophy className="w-4 h-4 mr-1" />
                        {jogador.trofeus.length} troféus
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="text-right hidden sm:block">
                    <div className="flex space-x-1">
                      {jogador.trofeus.slice(0, 3).map((trofeu) => (
                        <span key={trofeu.id} className="text-lg" title={trofeu.nome}>
                          {trofeu.icone}
                        </span>
                      ))}
                      {jogador.trofeus.length > 3 && (
                        <span className="text-xs text-muted-foreground">+{jogador.trofeus.length - 3}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <PencilSimple className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <DotsThreeVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {jogadoresFiltrados.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <MagnifyingGlass className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Nenhum jogador encontrado</h3>
                <p className="text-muted-foreground">
                  Tente ajustar os filtros ou termos de busca
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GestaoJogadores;