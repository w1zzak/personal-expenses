import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser, registerUser } from '../services/api';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const data = await loginUser({ email, password });
        login(data.user, data.token);
      } else {
        await registerUser({ email, password, nombre });
        const data = await loginUser({ email, password });
        login(data.user, data.token);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Algo salió mal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-10 rounded-[3rem] shadow-2xl border border-white">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">
          {isLogin ? 'Bienvenido.' : 'Únete.'}
        </h2>
        <p className="text-slate-400 font-medium">
          {isLogin ? 'Ingresa tus credenciales para continuar.' : 'Crea tu cuenta de control financiero.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {!isLogin && (
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tu Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-4 pl-12 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary-500 focus:bg-white outline-none transition-all font-medium"
              required
            />
          </div>
        )}

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 pl-12 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary-500 focus:bg-white outline-none transition-all font-medium"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 pl-12 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary-500 focus:bg-white outline-none transition-all font-medium"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
            <>
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-primary-600 font-black hover:underline tracking-tight"
        >
          {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
