// Gestão completa de notícias para administradores
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import {
  Megaphone,
  Calendar,
  Eye,
  ThumbsUp,
  ChatCircle,
  Heart,
  ShareNetwork,
  CaretDown,
  Users,
  MagnifyingGlass,
  Plus,
  PencilSimple,
  Trash
} from 'phosphor-react';
import { noticias } from '../../data/mockData';

const GestaoNoticias: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const noticiasFiltradas = noticias.filter(noticia => 
    noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    noticia.conteudo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    noticia.autorNome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const estatisticas = {
    totalNoticias: noticias.length,
    totalVisualizacoes: noticias.reduce((acc, n) => acc + n.visualizacoes, 0),
    mediaVisualizacoes: Math.round(noticias.reduce((acc, n) => acc + n.visualizacoes, 0) / noticias.length),
    noticiaRecente: noticias.length > 0 ? Math.max(...noticias.map(n => new Date(n.dataPublicacao).getTime())) : 0
  };

  const formatarData = (data: string) => {
    const agora = new Date();
    const dataNoticia = new Date(data);
    const diferenca = agora.getTime() - dataNoticia.getTime();
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    
    if (dias === 0) return 'Hoje';
    if (dias === 1) return 'Ontem';
    if (dias < 7) return `${dias} dias atrás`;
    return dataNoticia.toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Notícias</h1>
          <p className="text-muted-foreground">
            Publique e gerencie notícias do time
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="gradient-card shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Megaphone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{estatisticas.totalNoticias}</p>
                  <p className="text-xs text-muted-foreground">Notícias Publicadas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-info/10 rounded-lg">
                  <Eye className="w-5 h-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{estatisticas.totalVisualizacoes}</p>
                  <p className="text-xs text-muted-foreground">Total de Views</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <CaretDown className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{estatisticas.mediaVisualizacoes}</p>
                  <p className="text-xs text-muted-foreground">Média por Notícia</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Heart className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {noticias.reduce((acc, n) => acc + n.likes, 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Total de Likes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Controles */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar notícias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Button className="gradient-primary shadow-glow">
              <Plus className="w-4 h-4 mr-2" />
              Nova Notícia
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Notícias */}
      <div className="grid gap-6">
        {noticiasFiltradas.map((noticia, index) => (
          <Card key={noticia.id} className="bg-white rounded-xl border sm:shadow-card shadow-none card-hover animate-scale-in overflow-hidden" style={{ animationDelay: `${index * 50}ms` }}>
            <CardContent className="p-0">
              <div className="p-4 sm:p-6 space-y-4">
                {/* Header da Notícia */}
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-0">
                  <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                    <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-primary/20">
                      <AvatarImage src={noticia.autorFoto} alt={noticia.autorNome} />
                      <AvatarFallback>{noticia.autorNome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <h3 className="text-lg sm:text-xl font-bold line-clamp-2">{noticia.titulo}</h3>
                        {noticia.destaque && (
                          <Badge className="gradient-warning text-white shadow-glow">
                            Destaque
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          {noticia.autorNome}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          {formatarData(noticia.dataPublicacao)}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {noticia.categoria}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-start">
                    <Button variant="ghost" size="sm">
                      <PencilSimple className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Prévia do Conteúdo */}
                <div className="space-y-3">
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    {noticia.conteudo}
                  </p>
                  
                  {noticia.imagem && (
                    <div className="relative rounded-lg overflow-hidden bg-accent/30 h-48">
                      <img 
                        src={noticia.imagem} 
                        alt={noticia.titulo}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}
                </div>

                {/* Estatísticas e Ações */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{noticia.visualizacoes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{noticia.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ChatCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{noticia.comentarios}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none justify-center">
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none justify-center">
                      <ShareNetwork className="w-4 h-4 mr-2" />
                      Compartilhar
                    </Button>
                  </div>
                </div>

                {/* Métricas de Engajamento */}
                <div className="bg-accent/20 rounded-lg p-3 sm:p-4">
                  <h4 className="font-semibold text-xs sm:text-sm mb-3 flex items-center">
                    <CaretDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-primary" />
                    Engajamento
                  </h4>
                  
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                    <div className="p-2 rounded-md hover:bg-accent/30 transition-colors">
                      <p className="text-base sm:text-lg font-bold text-primary">{noticia.visualizacoes}</p>
                      <p className="text-xs text-muted-foreground">Visualizações</p>
                    </div>
                    <div className="p-2 rounded-md hover:bg-accent/30 transition-colors">
                      <p className="text-base sm:text-lg font-bold text-success">{noticia.likes}</p>
                      <p className="text-xs text-muted-foreground">Curtidas</p>
                    </div>
                    <div className="p-2 rounded-md hover:bg-accent/30 transition-colors">
                      <p className="text-base sm:text-lg font-bold text-info">{noticia.comentarios}</p>
                      <p className="text-xs text-muted-foreground">Comentários</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {noticiasFiltradas.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Megaphone className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Nenhuma notícia encontrada</h3>
                <p className="text-muted-foreground">
                  {searchTerm 
                    ? 'Tente ajustar o termo de busca'
                    : 'Publique a primeira notícia do time'
                  }
                </p>
              </div>
              <Button className="gradient-primary shadow-glow">
                <Plus className="w-4 h-4 mr-2" />
                {searchTerm ? 'Limpar Busca' : 'Publicar Primeira Notícia'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GestaoNoticias;