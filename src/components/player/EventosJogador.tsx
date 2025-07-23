// Visualização de eventos para jogadores
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Calendar, 
  WarningCircle,
  Heart,
  Clock,
  MapPin, 
  Users,
  CheckCircle,
  XCircle,
  Trophy,
  Lightning,
  Coffee,
  Target
} from 'phosphor-react';
import { eventos, jogadores } from '../../data/mockData';

const EventosJogador: React.FC = () => {

  const [filterType, setFilterType] = useState('todos');
  
  // Encontrar dados do jogador (para demo, usar o primeiro jogador)
  const jogadorData = jogadores[0];
  
  const tiposEventos = [
    { value: 'todos', label: 'Todos', icon: Calendar },
    { value: 'social', label: 'Sociais', icon: Lightning },
    { value: 'treino', label: 'Treinos', icon: Target },
    { value: 'reuniao', label: 'Reuniões', icon: Coffee },
    { value: 'comemoracao', label: 'Comemorações', icon: Trophy }
  ];

  const eventosFiltrados = eventos.filter(evento => 
    filterType === 'todos' || evento.tipo === filterType
  );

  const estatisticas = {
    totalEventos: eventos.length,
    eventosConfirmados: eventos.filter(e => e.presencas.find(p => p.jogadorId === jogadorData.id)?.confirmou).length,
    proximosEventos: eventos.filter(e => new Date(e.data) > new Date()).length,
    minhaPresenca: Math.round(
      (eventos.filter(e => e.presencas.find(p => p.jogadorId === jogadorData.id)?.confirmou).length / eventos.length) * 100
    )
  };

  const confirmarPresenca = (eventoId: string, confirmar: boolean) => {
    // Em uma aplicação real, isso seria uma chamada para API
    console.log(`${confirmar ? 'Confirmando' : 'Cancelando'} presença no evento ${eventoId}`);
  };

  const getEventIcon = (tipo: string) => {
    switch (tipo) {
      case 'social': return <Lightning className="w-6 h-6" />;
      case 'treino': return <Target className="w-6 h-6" />;
      case 'reuniao': return <Coffee className="w-6 h-6" />;
      case 'comemoracao': return <Trophy className="w-6 h-6" />;
      default: return <Calendar className="w-6 h-6" />;
    }
  };

  const getEventColor = (tipo: string) => {
    switch (tipo) {
      case 'social': return 'text-purple-600 bg-purple-100';
      case 'treino': return 'text-blue-600 bg-blue-100';
      case 'reuniao': return 'text-orange-600 bg-orange-100';
      case 'comemoracao': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const isEventoProximo = (data: string) => new Date(data) > new Date();

  const formatarData = (data: string) => {
    const hoje = new Date();
    const dataEvento = new Date(data);
    const diferenca = dataEvento.getTime() - hoje.getTime();
    const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
    
    if (dias === 0) return 'Hoje';
    if (dias === 1) return 'Amanhã';
    if (dias > 0 && dias <= 7) return `Em ${dias} dias`;
    if (dias < 0) {
      const diasPassados = Math.abs(dias);
      if (diasPassados === 1) return 'Ontem';
      if (diasPassados <= 7) return `${diasPassados} dias atrás`;
    }
    return dataEvento.toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Meus Eventos</h1>
          <p className="text-muted-foreground">
            Acompanhe os eventos do time e confirme sua presença
          </p>
        </div>

        {/* Estatísticas do Jogador */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="gradient-card sm:shadow-card shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{estatisticas.totalEventos}</p>
                  <p className="text-xs text-muted-foreground">Total de Eventos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card sm:shadow-card shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{estatisticas.eventosConfirmados}</p>
                  <p className="text-xs text-muted-foreground">Confirmados</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card sm:shadow-card shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-info/10 rounded-lg">
                  <WarningCircle className="w-5 h-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{estatisticas.proximosEventos}</p>
                  <p className="text-xs text-muted-foreground">Próximos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card sm:shadow-card shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Heart className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{estatisticas.minhaPresenca}%</p>
                  <p className="text-xs text-muted-foreground">Minha Presença</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filtros */}
      <Card className="sm:shadow-card shadow-none">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2">
            {tiposEventos.map(tipo => {
              const IconComponent = tipo.icon;
              return (
                <Button
                  key={tipo.value}
                  variant={filterType === tipo.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType(tipo.value)}
                  className={`${filterType === tipo.value ? "shadow-glow" : ""} flex items-center gap-2`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tipo.label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Eventos */}
      <div className="grid gap-4">
        {eventosFiltrados.map((evento, index) => {
          const minhaPresenca = evento.presencas.find(p => p.jogadorId === jogadorData.id);
          const confirmei = minhaPresenca?.confirmou;
          const isProximo = isEventoProximo(evento.data);
          const confirmacoes = evento.presencas.filter(p => p.confirmou).length;
          const totalJogadores = evento.presencas.length;
          const percentualConfirmacoes = (confirmacoes / totalJogadores) * 100;

          return (
            <Card key={evento.id} className="card-hover sm:shadow-card shadow-none animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header do Evento */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <div className={`p-3 rounded-xl ${getEventColor(evento.tipo)} shadow-card`}>
                          {getEventIcon(evento.tipo)}
                        </div>
                        {isProximo && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse-glow"></div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-bold">{evento.nome}</h3>
                          <Badge variant="outline" className="text-xs capitalize">
                            {evento.tipo}
                          </Badge>
                          {isProximo && (
                            <Badge className="text-xs bg-green-50 text-green-700 border-green-200">
                              {formatarData(evento.data)}
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-muted-foreground">{evento.descricao}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(evento.data).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {evento.horario}
                          </span>
                          {evento.local && (
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              {evento.local}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <Badge variant={confirmei ? "default" : "secondary"} className="flex items-center gap-1 w-fit ml-auto">
                        {confirmei ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        {confirmei ? 'Confirmado' : 'Pendente'}
                      </Badge>
                    </div>
                  </div>

                  {/* Estatísticas de Participação */}
                  <div className="bg-accent/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Participação do Time
                      </h4>
                      <span className="text-sm font-medium">
                        {confirmacoes}/{totalJogadores} confirmados ({Math.round(percentualConfirmacoes)}%)
                      </span>
                    </div>
                    
                    <div className="w-full bg-secondary rounded-full h-3 mb-3">
                      <div 
                        className="bg-gradient-primary h-3 rounded-full transition-all duration-500 shadow-glow"
                        style={{ width: `${percentualConfirmacoes}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <p className="font-medium text-success">{confirmacoes}</p>
                        <p className="text-muted-foreground">Confirmados</p>
                      </div>
                      <div>
                        <p className="font-medium text-warning">{totalJogadores - confirmacoes}</p>
                        <p className="text-muted-foreground">Pendentes</p>
                      </div>
                      <div>
                        <Badge variant={percentualConfirmacoes >= 80 ? "default" : percentualConfirmacoes >= 60 ? "secondary" : "destructive"}>
                          {percentualConfirmacoes >= 80 ? 'Excelente' : percentualConfirmacoes >= 60 ? 'Bom' : 'Baixo'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <div className="text-sm text-muted-foreground">
                      {confirmei 
                        ? `Você confirmou presença neste ${evento.tipo}` 
                        : `Confirme sua presença para este ${evento.tipo}`
                      }
                    </div>

                    <div className="flex space-x-2">
                      {confirmei ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => confirmarPresenca(evento.id, false)}
                          className="text-destructive hover:text-destructive"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Cancelar
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => confirmarPresenca(evento.id, true)}
                          className="gradient-success shadow-glow"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Confirmar Presença
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {eventosFiltrados.length === 0 && (
        <Card className="sm:shadow-card shadow-none">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Lightning className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Nenhum evento encontrado</h3>
                <p className="text-muted-foreground">
                  {filterType === 'todos' 
                    ? 'Não há eventos registrados no momento'
                    : `Nenhum evento do tipo "${filterType}" encontrado`
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EventosJogador;