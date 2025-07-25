// Context de autenticação para a PWA de futebol
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Usuario } from '../types';
import { usuarios } from '../data/mockData';

interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
  selecionarPerfil: (tipo: 'jogador' | 'administrador') => void;
  perfilSelecionado: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [perfilSelecionado, setPerfilSelecionado] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se existe usuário logado no localStorage
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario_logado');
    const perfilSalvo = localStorage.getItem('perfil_selecionado');
    
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
      setPerfilSelecionado(perfilSalvo === 'true');
    }
    
    setIsLoading(false);
  }, []);

  // Login fictício - qualquer credencial funciona
  const login = async (email: string, senha: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Para demo, usar sempre o admin se não especificado
      let usuarioLogin = usuarios.find(u => u.email === email);
      
      // Se não encontrar o email, criar um usuário temporário baseado no tipo
      if (!usuarioLogin) {
        usuarioLogin = {
          id: Date.now().toString(),
          nome: email.split('@')[0] || 'Usuário',
          email: email,
          tipo: email.includes('admin') ? 'administrador' : 'jogador',
          foto: email.includes('admin') 
            ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
            : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        };
      }
      
      setUsuario(usuarioLogin);
      localStorage.setItem('usuario_logado', JSON.stringify(usuarioLogin));
      setIsLoading(false);
      return true;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUsuario(null);
    setPerfilSelecionado(false);
    localStorage.removeItem('usuario_logado');
    localStorage.removeItem('perfil_selecionado');
  };

  const selecionarPerfil = (tipo: 'jogador' | 'administrador') => {
    if (usuario) {
      const usuarioAtualizado = { ...usuario, tipo };
      setUsuario(usuarioAtualizado);
      setPerfilSelecionado(true);
      localStorage.setItem('usuario_logado', JSON.stringify(usuarioAtualizado));
      localStorage.setItem('perfil_selecionado', 'true');
    }
  };

  const value: AuthContextType = {
    usuario,
    login,
    logout,
    selecionarPerfil,
    perfilSelecionado,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};