// Gestão completa de jogos para administradores
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  Users,
  Trophy,
  Target,
  PencilSimple,
  Trash,
  CheckCircle,
  WarningCircle,
  Lightning
} from 'phosphor-react';
import { jogos } from '../../data/mockData';

const GestaoJogos: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('todos');
  
  const statusOptions = [
    { value: 'todos', label: 'Todos os Jogos' },
    { value: 'agendado', label: 'Agendados' },
    { value: 'finalizado', label: 'Finalizados' },
    { value: 'cancelado', label: 'Cancelados' }
  ];

  const jogosFiltrados = jogos.filter(jogo => 
    filterStatus === 'todos' || jogo.status === filterStatus
  );

  const estatisticas = {
    total: jogos.length,
    agendados: jogos.filter(j => j.status === 'agendado').length,
    finalizados: jogos.filter(j => j.status === 'finalizado').length,
    vitorias: jogos.filter(j => j.status === 'finalizado' && j.resultado && j.resultado.gols > j.resultado.golsAdversario).length
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'agendado': return <Clock className="w-4 h-4" />;
      case 'finalizado': return <CheckCircle className="w-4 h-4" />;
      case 'cancelado': return <WarningCircle className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendado': return 'text-info bg-info/10';
      case 'finalizado': return 'text-success bg-success/10';
      case 'cancelado': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-3 sm:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-3 sm:space-y-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold">Gestão de Jogos</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Agende jogos e registre resultados
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          <Card className="gradient-card shadow-card">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold">{estatisticas.total}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-info/10 rounded-lg">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-info" />
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold">{estatisticas.agendados}</p>
                  <p className="text-xs text-muted-foreground">Próximos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-success/10 rounded-lg">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold">{estatisticas.finalizados}</p>
                  <p className="text-xs text-muted-foreground">Finalizados</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-warning/10 rounded-lg">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-warning" />
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold">{estatisticas.vitorias}</p>
                  <p className="text-xs text-muted-foreground">Vitórias</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Controles */}
      <Card className="shadow-card">
        <CardContent className="p-3 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {statusOptions.map(option => (
                <Button
                  key={option.value}
                  variant={filterStatus === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(option.value)}
                  className={`text-xs sm:text-sm ${filterStatus === option.value ? "shadow-glow" : ""}`}
                >
                  {option.label}
                </Button>
              ))}
            </div>
            
            <Button className="gradient-primary shadow-glow w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              <span className="text-sm">Agendar Jogo</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Jogos */}
      <div className="grid gap-3 sm:gap-4">
        {jogosFiltrados.map((jogo, index) => (
          <Card key={jogo.id} className="bg-white rounded-xl border p-4 sm:shadow-card shadow-none card-hover animate-scale-in" style={{ animationDelay: `${index * 25}ms` }}>
            <CardContent className="p-3 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {/* Header do Jogo */}
                <div className="flex items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                    <div className={`p-2 rounded-lg shrink-0 ${getStatusColor(jogo.status)}`}>
                      {getStatusIcon(jogo.status)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-bold truncate">vs {jogo.adversario}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          {new Date(jogo.data).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          {jogo.horario}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          <span className="truncate">{jogo.local}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 shrink-0">
                    <Badge variant="outline" className="capitalize text-xs">
                      {jogo.status}
                    </Badge>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" className="p-1.5 sm:p-2">
                        <PencilSimple className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive p-1.5 sm:p-2">
                        <Trash className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Resultado (se finalizado) */}
                {jogo.status === 'finalizado' && jogo.resultado && (
                  <div className="bg-accent/30 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-sm sm:text-base">Resultado Final</h4>
                      <div className="text-xl sm:text-2xl font-bold">
                        <span className={jogo.resultado.gols > jogo.resultado.golsAdversario ? 'text-success' : 
                                       jogo.resultado.gols < jogo.resultado.golsAdversario ? 'text-destructive' : 'text-warning'}>
                          {jogo.resultado.gols} - {jogo.resultado.golsAdversario}
                        </span>
                      </div>
                    </div>
                    
                    {/* Estatísticas do jogo */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div>
                        <p className="font-medium mb-1">⚽ Gols marcados</p>
                        <p className="text-muted-foreground">{jogo.resultado.gols} gols</p>
                      </div>
                      <div>
                        <p className="font-medium mb-1">🟨 Cartões</p>
                        <p className="text-muted-foreground">
                          {jogo.resultado.cartoesAmarelos} amarelos, {jogo.resultado.cartoesVermelhos} vermelhos
                        </p>
                      </div>
                      <div>
                        <p className="font-medium mb-1">📊 Desempenho</p>
                        <Badge variant={jogo.resultado.gols > jogo.resultado.golsAdversario ? "default" : 
                                      jogo.resultado.gols < jogo.resultado.golsAdversario ? "destructive" : "secondary"} 
                               className="text-xs">
                          {jogo.resultado.gols > jogo.resultado.golsAdversario ? 'Vitória' : 
                           jogo.resultado.gols < jogo.resultado.golsAdversario ? 'Derrota' : 'Empate'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}

                {/* Confirmações de Presença */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-border">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        {jogo.presencas.filter(p => p.confirmou).length}/{jogo.presencas.length} confirmados
                      </span>
                    </div>
                    
                    <div className="w-20 sm:w-32 bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ 
                          width: `${(jogo.presencas.filter(p => p.confirmou).length / jogo.presencas.length) * 100}%` 
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    {jogo.status === 'agendado' && (
                      <>
                        <Button variant="outline" size="sm" className="text-xs w-full sm:w-auto">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                          Ver Confirmações
                        </Button>
                        <Button size="sm" className="gradient-success text-xs w-full sm:w-auto">
                          <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                          Registrar Resultado
                        </Button>
                      </>
                    )}
                    
                    {jogo.status === 'finalizado' && (
                      <Button variant="outline" size="sm" className="text-xs w-full sm:w-auto">
                        <Lightning className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {jogosFiltrados.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Nenhum jogo encontrado</h3>
                <p className="text-muted-foreground">
                  {filterStatus === 'todos' 
                    ? 'Agende o primeiro jogo do time'
                    : `Nenhum jogo ${filterStatus} encontrado`
                  }
                </p>
              </div>
              <Button className="gradient-primary shadow-glow">
                <Plus className="w-4 h-4 mr-2" />
                Agendar Primeiro Jogo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GestaoJogos;