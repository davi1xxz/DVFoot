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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{estatisticas.total}</p>
                  <p className="text-sm text-muted-foreground">Total de Eventos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-success/10 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{estatisticas.proximosEventos}</p>
                  <p className="text-sm text-muted-foreground">Próximos Eventos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-info/10 rounded-xl">
                  <Users className="w-6 h-6 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{estatisticas.mediaConfirmacoes}%</p>
                  <p className="text-sm text-muted-foreground">Média de Confirmações</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Controles */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
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
            
            <Button className="gradient-primary shadow-glow">
              <Lightning className="w-4 h-4 mr-2" />
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
            <Card key={evento.id} className="bg-white rounded-xl border p-4 sm:shadow-card shadow-none card-hover animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header do Evento */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl ${getEventColor(evento.tipo)}`}>
                        {getEventIcon(evento.tipo)}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-bold">{evento.nome}</h3>
                          {isPendente && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              <Clock className="w-3 h-3 mr-1" />
                              Próximo
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

                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="capitalize">
                        {evento.tipo}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Lightning className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Estatísticas de Confirmação */}
                  <div className="bg-accent/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Confirmações de Presença
                      </h4>
                      <span className="text-sm font-medium">
                        {confirmacoes}/{totalJogadores} ({Math.round(percentualConfirmacoes)}%)
                      </span>
                    </div>
                    
                    <div className="w-full bg-secondary rounded-full h-3 mb-3">
                      <div 
                        className="bg-gradient-primary h-3 rounded-full transition-all duration-500 shadow-glow"
                        style={{ width: `${percentualConfirmacoes}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-center">
                        <p className="font-medium text-success">{confirmacoes}</p>
                        <p className="text-muted-foreground">Confirmados</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-warning">{totalJogadores - confirmacoes}</p>
                        <p className="text-muted-foreground">Pendentes</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-primary">{Math.round(percentualConfirmacoes)}%</p>
                        <p className="text-muted-foreground">Taxa</p>
                      </div>
                      <div className="text-center">
                        <Badge variant={percentualConfirmacoes >= 80 ? "default" : percentualConfirmacoes >= 60 ? "secondary" : "destructive"}>
                          {percentualConfirmacoes >= 80 ? 'Excelente' : percentualConfirmacoes >= 60 ? 'Bom' : 'Baixo'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Users className="w-4 h-4 mr-2" />
                        Ver Confirmações
                      </Button>
                      {isPendente && (
                        <Button variant="outline" size="sm">
                          <WarningCircle className="w-4 h-4 mr-2" />
                          Enviar Lembrete
                        </Button>
                      )}
                    </div>

                    <div className="text-xs text-muted-foreground">
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
        <Card className="shadow-card">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Lightning className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Nenhum evento encontrado</h3>
                <p className="text-muted-foreground">
                  {filterType === 'todos' 
                    ? 'Crie o primeiro evento do time'
                    : `Nenhum evento do tipo "${filterType}" encontrado`
                  }
                </p>
              </div>
              <Button className="gradient-primary shadow-glow">
                <Lightning className="w-4 h-4 mr-2" />
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