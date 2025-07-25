import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Lock, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    setLocation('/admin/dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate async login
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (login(password)) {
      toast.success('Login realizado com sucesso!');
      setLocation('/admin/dashboard');
    } else {
      toast.error('Senha incorreta!');
      setPassword('');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-gold/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-8 right-0 w-72 h-72 bg-gold/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Back to home button */}
      <Button
        variant="ghost"
        onClick={() => setLocation('/')}
        className="absolute top-6 left-6 text-white hover:text-gold"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar ao site
      </Button>

      <Card className="w-full max-w-md relative z-10 border-0 shadow-2xl">
        <CardHeader className="space-y-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <ShieldCheck className="w-8 h-8 text-rich-black" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Área Administrativa
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Digite a senha de administrador para acessar o painel
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-white rounded-b-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Senha de Acesso
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite a senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                  className="pl-10 h-12 border-gray-300 focus:border-gold focus:ring-gold"
                  disabled={isLoading}
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-rich-black font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-rich-black mr-2"></div>
                  Entrando...
                </div>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Problemas para acessar?{' '}
              <button
                onClick={() => toast.info('Entre em contato com o administrador do site.')}
                className="text-gold hover:text-gold-dark font-medium transition-colors"
              >
                Obter ajuda
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 