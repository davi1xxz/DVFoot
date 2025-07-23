// Visualização de notícias para jogadores
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import {
  Calendar,
  Eye,
  ThumbsUp,
  ChatCircle,
  Heart,
  BookmarkSimple,
  ShareNetwork,
  CaretDown
} from 'phosphor-react';
import { noticias } from '../../data/mockData';

const NoticiasJogador: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  
  const categorias = [
    'todas',
    ...Array.from(new Set(noticias.map(n => n.categoria)))
  ];
  
  const noticiasFiltradas = noticias.filter(noticia => {
    const matchSearch = noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       noticia.conteudo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'todas' || noticia.categoria === selectedCategory;
    return matchSearch && matchCategory;
  }).sort((a, b) => new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime());

  const formatarData = (data: string) => {
    const agora = new Date();
    const dataNoticia = new Date(data);
    const diferenca = agora.getTime() - dataNoticia.getTime();
    const horas = Math.floor(diferenca / (1000 * 60 * 60));
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    
    if (horas < 1) return 'Agora há pouco';
    if (horas < 24) return `${horas}h atrás`;
    if (dias === 1) return 'Ontem';
    if (dias < 7) return `${dias} dias atrás`;
    return dataNoticia.toLocaleDateString('pt-BR');
  };

  const handleLike = (noticiaId: string) => {
    console.log(`Curtindo notícia ${noticiaId}`);
    // Implementar lógica de curtida
  };

  const handleShare = (noticiaId: string) => {
    console.log(`Compartilhando notícia ${noticiaId}`);
    // Implementar lógica de compartilhamento
  };

  const handleBookmark = (noticiaId: string) => {
    console.log(`Salvando notícia ${noticiaId}`);
    // Implementar lógica de bookmark
  };

  const estatisticas = {
    totalNoticias: noticias.length,
    noticiasRecentes: noticias.filter(n => {
      const agora = new Date();
      const dataNoticia = new Date(n.dataPublicacao);
      const diferenca = agora.getTime() - dataNoticia.getTime();
      const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
      return dias <= 7;
    }).length,
    totalVisualizacoes: noticias.reduce((acc, n) => acc + n.visualizacoes, 0)
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Notícias do Time</h1>
          <p className="text-muted-foreground">
            Fique por dentro das últimas novidades
          </p>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="gradient-card sm:shadow-card shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{estatisticas.totalNoticias}</p>
                  <p className="text-xs text-muted-foreground">Total de Notícias</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card sm:shadow-card shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Calendar className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{estatisticas.noticiasRecentes}</p>
                  <p className="text-xs text-muted-foreground">Nesta Semana</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card sm:shadow-card shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-info/10 rounded-lg">
                  <Eye className="w-5 h-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{estatisticas.totalVisualizacoes.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total de Views</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Controles */}
      <Card className="sm:shadow-card shadow-none">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar notícias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-border rounded-md text-sm bg-background min-w-[120px]"
              >
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria}>
                    {categoria === 'todas' ? 'Todas as Categorias' : categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feed de Notícias */}
      <div className="space-y-6">
        {noticiasFiltradas.map((noticia, index) => (
          <Card key={noticia.id} className="card-hover sm:shadow-card shadow-none animate-scale-in overflow-hidden" style={{ animationDelay: `${index * 100}ms` }}>
            <CardContent className="p-0">
              {/* Imagem da Notícia */}
              {noticia.imagem && (
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <img 
                    src={noticia.imagem} 
                    alt={noticia.titulo}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badge de destaque */}
                  {noticia.destaque && (
                    <Badge className="absolute top-4 left-4 gradient-warning text-white shadow-glow">
                      Destaque
                    </Badge>
                  )}
                  
                  {/* Categoria */}
                  <Badge variant="secondary" className="absolute top-4 right-4 bg-white/90 text-black">
                    {noticia.categoria}
                  </Badge>
                </div>
              )}

              <div className="p-6 space-y-4">
                {/* Header da Notícia */}
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold leading-tight hover:text-primary transition-colors cursor-pointer">
                    {noticia.titulo}
                  </h2>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={noticia.autorFoto} alt={noticia.autorNome} />
                        <AvatarFallback className="text-xs">
                          {noticia.autorNome.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{noticia.autorNome}</span>
                    </div>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatarData(noticia.dataPublicacao)}
                    </span>
                  </div>
                </div>

                {/* Conteúdo da Notícia */}
                <div className="space-y-3">
                  <p className="text-muted-foreground leading-relaxed">
                    {noticia.conteudo.length > 300 
                      ? `${noticia.conteudo.substring(0, 300)}...` 
                      : noticia.conteudo
                    }
                  </p>
                  
                  {noticia.conteudo.length > 300 && (
                    <Button variant="link" className="p-0 h-auto text-primary">
                      Ler mais
                      <CaretDown className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </div>

                {/* Estatísticas e Ações */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{noticia.visualizacoes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{noticia.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ChatCircle className="w-4 h-4" />
                      <span>{noticia.comentarios}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(noticia.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleBookmark(noticia.id)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <BookmarkSimple className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(noticia.id)}
                      className="text-muted-foreground hover:text-info transition-colors"
                    >
                      <ShareNetwork className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Engajamento Visual */}
                <div className="bg-accent/20 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-primary">{noticia.visualizacoes}</p>
                      <p className="text-xs text-muted-foreground">Visualizações</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-destructive">{noticia.likes}</p>
                      <p className="text-xs text-muted-foreground">Curtidas</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-info">{noticia.comentarios}</p>
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
        <Card className="sm:shadow-card shadow-none">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Nenhuma notícia encontrada</h3>
                <p className="text-muted-foreground">
                  {searchTerm || selectedCategory !== 'todas'
                    ? 'Tente ajustar os filtros de busca'
                    : 'Não há notícias disponíveis no momento'
                  }
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('todas');
                }}
              >
                Limpar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NoticiasJogador;