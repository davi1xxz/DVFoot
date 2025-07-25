// Gestão completa de eventos para administradores
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Trophy,
  CheckCircle,
  XCircle,
  Clock,
  WarningCircle,
  Lightning
} from 'phosphor-react';
import { eventos } from '../../data/mockData';

const GestaoEventos: React.FC = () => {
  const [filterType, setFilterType] = useState('todos');
  
  const tiposEventos = [
    { value: 'todos', label: 'Todos os Eventos', icon: Calendar },
    { value: 'social', label: 'Sociais', icon: Lightning },
    { value: 'treino', label: 'Treinos', icon: Lightning },
    { value: 'reuniao', label: 'Reuniões', icon: Lightning },
    { value: 'comemoracao', label: 'Comemorações', icon: Trophy }
  ];

  const eventosFiltrados = eventos.filter(evento => 
    filterType === 'todos' || evento.tipo === filterType
  );

  const estatisticas = {
    total: eventos.length,
    proximosEventos: eventos.filter(e => new Date(e.data) > new Date()).length,
    mediaConfirmacoes: Math.round(
      eventos.reduce((acc, e) => acc + (e.presencas.filter(p => p.confirmou).length / e.presencas.length * 100), 0) / eventos.length
    )
  };

  const getEventIcon = (tipo: string) => {
    switch (tipo) {
      case 'social': return <Lightning className="w-5 h-5" />;
      case 'treino': return <Lightning className="w-5 h-5" />;
      case 'reuniao': return <Lightning className="w-5 h-5" />;
      case 'comemoracao': return <Trophy className="w-5 h-5" />;
      default: return <Calendar className="w-5 h-5" />;
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

  const isEventoPendente = (data: string) => new Date(data) > new Date();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Eventos</h1>
          <p className="text-muted-foreground">
            Crie e gerencie eventos do time
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
          <Card className="gradient-card shadow-card overflow-hidden">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                <div className="p-2 sm:p-2.5 md:p-3 bg-primary/10 rounded-lg sm:rounded-xl">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold">{estatisticas.total}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total de Eventos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card overflow-hidden">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                <div className="p-2 sm:p-2.5 md:p-3 bg-success/10 rounded-lg sm:rounded-xl">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-success" />
                </div>
                <div>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold">{estatisticas.proximosEventos}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Próximos Eventos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card overflow-hidden">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                <div className="p-2 sm:p-2.5 md:p-3 bg-info/10 rounded-lg sm:rounded-xl">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-info" />
                </div>
                <div>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold">{estatisticas.mediaConfirmacoes}%</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Média de Confirmações</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Controles */}
      <Card className="shadow-card overflow-hidden">
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 justify-between">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {tiposEventos.map(tipo => {
                const IconComponent = tipo.icon;
                return (
                  <Button
                    key={tipo.value}
                    variant={filterType === tipo.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType(tipo.value)}
                    className={`${filterType === tipo.value ? "shadow-glow" : ""} flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-1 sm:py-2 h-auto`}
                  >
                    <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {tipo.label}
                  </Button>
                );
              })}
            </div>
            
            <Button className="gradient-primary shadow-glow text-xs sm:text-sm h-8 sm:h-9 mt-1 lg:mt-0">
              <Lightning className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Criar Evento
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Eventos */}
      <div className="grid gap-4">
        {eventosFiltrados.map((evento, index) => {
          const confirmacoes = evento.presencas.filter(p => p.confirmou).length;
          const totalJogadores = evento.presencas.length;
          const percentualConfirmacoes = (confirmacoes / totalJogadores) * 100;
          const isPendente = isEventoPendente(evento.data);

          return (
            <Card key={evento.id} className="bg-white rounded-xl border sm:shadow-card shadow-none card-hover animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
              <CardContent className="p-3 sm:p-6">
                <div className="space-y-4">
                  {/* Header do Evento */}
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-0">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className={`p-2 sm:p-3 rounded-xl ${getEventColor(evento.tipo)}`}>
                        {getEventIcon(evento.tipo)}
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <h3 className="text-lg sm:text-xl font-bold">{evento.nome}</h3>
                          {isPendente && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              <Clock className="w-3 h-3 mr-1" />
                              Próximo
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{evento.descricao}</p>
                        
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            {new Date(evento.data).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            {evento.horario}
                          </span>
                          {evento.local && (
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              {evento.local}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-start">
                      <Badge variant="secondary" className="capitalize text-xs">
                        {evento.tipo}
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Lightning className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Estatísticas de Confirmação */}
                  <div className="bg-accent/30 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-3">
                      <h4 className="text-sm sm:text-base font-semibold flex items-center">
                        <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Confirmações de Presença
                      </h4>
                      <span className="text-xs sm:text-sm font-medium">
                        {confirmacoes}/{totalJogadores} ({Math.round(percentualConfirmacoes)}%)
                      </span>
                    </div>
                    
                    <div className="w-full bg-secondary rounded-full h-2 sm:h-3 mb-3">
                      <div 
                        className="bg-gradient-primary h-2 sm:h-3 rounded-full transition-all duration-500 shadow-glow"
                        style={{ width: `${percentualConfirmacoes}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm">
                      <div className="text-center hover:bg-accent/30 rounded-md p-1.5 transition-colors cursor-pointer">
                        <p className="font-medium text-success">{confirmacoes}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">Confirmados</p>
                      </div>
                      <div className="text-center hover:bg-accent/30 rounded-md p-1.5 transition-colors cursor-pointer">
                        <p className="font-medium text-warning">{totalJogadores - confirmacoes}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">Pendentes</p>
                      </div>
                      <div className="text-center hover:bg-accent/30 rounded-md p-1.5 transition-colors cursor-pointer">
                        <p className="font-medium text-primary">{Math.round(percentualConfirmacoes)}%</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">Taxa</p>
                      </div>
                      <div className="text-center hover:bg-accent/30 rounded-md p-1.5 transition-colors cursor-pointer">
                        <Badge variant={percentualConfirmacoes >= 80 ? "default" : percentualConfirmacoes >= 60 ? "secondary" : "destructive"} className="text-xs">
                          {percentualConfirmacoes >= 80 ? 'Excelente' : percentualConfirmacoes >= 60 ? 'Bom' : 'Baixo'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 pt-2 border-t border-border">
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      <Button variant="outline" size="sm" className="text-xs h-8 flex-1 sm:flex-initial">
                        <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Ver Confirmações
                      </Button>
                      {isPendente && (
                        <Button variant="outline" size="sm" className="text-xs h-8 flex-1 sm:flex-initial">
                          <WarningCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          Enviar Lembrete
                        </Button>
                      )}
                    </div>

                    <div className="text-xs text-muted-foreground mt-2 sm:mt-0">
                      Criado em {new Date(evento.data).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {eventosFiltrados.length === 0 && (
        <Card className="shadow-card overflow-hidden">
          <CardContent className="p-6 sm:p-8 md:p-12 text-center">
            <div className="space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Lightning className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold">Nenhum evento encontrado</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {filterType === 'todos' 
                    ? 'Crie o primeiro evento do time'
                    : `Nenhum evento do tipo "${filterType}" encontrado`
                  }
                </p>
              </div>
              <Button className="gradient-primary shadow-glow text-xs sm:text-sm h-8 sm:h-9">
                <Lightning className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Criar Primeiro Evento
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GestaoEventos;