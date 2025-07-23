// Componente de Login para PWA de futebol
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { SpinnerGap, Shield, Envelope, Lock } from 'phosphor-react';
import { useToast } from '../hooks/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !senha) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha email e senha.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const sucesso = await login(email, senha);
    
    if (sucesso) {
      toast({
        title: "Login realizado!",
        description: "Bem-vindo ao sistema de gestão do time.",
      });
    } else {
      toast({
        title: "Erro no login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  const preencherCredenciais = (tipo: 'admin' | 'jogador') => {
    if (tipo === 'admin') {
      setEmail('admin@time.com');
      setSenha('123456');
    } else {
      setEmail('jogador@time.com');
      setSenha('123456');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-primary p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        {/* Logo e Header */}
        <div className="text-center text-white">
          <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 shadow-glow">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Time Manager</h1>
          <p className="text-white/80">Sistema de Gestão de Futebol</p>
        </div>

        {/* Card de Login */}
        <Card className="shadow-float border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl">Entrar no Sistema</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Envelope className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="senha"
                    type="password"
                    placeholder="Sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <SpinnerGap className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>

            {/* Credenciais de Demonstração */}
            <div className="border-t pt-6">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Credenciais para demonstração:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => preencherCredenciais('admin')}
                  disabled={isLoading}
                  className="text-xs"
                >
                  👨‍💼 Administrador
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => preencherCredenciais('jogador')}
                  disabled={isLoading}
                  className="text-xs"
                >
                  ⚽ Jogador
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Ou digite qualquer email e senha
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Rodapé */}
        <div className="text-center text-white/60 text-sm">
          <p>© 2024 Time Manager - PWA de Gestão Esportiva</p>
        </div>
      </div>
    </div>
  );
};

export default Login;