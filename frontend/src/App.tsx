import { useState, useEffect } from 'react';
import { Wallet, LogOut } from 'lucide-react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import AuthForm from './components/AuthForm';
import { AuthProvider, useAuth } from './context/AuthContext';
import { getExpenses, deleteExpense } from './services/api';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState<any>(null);
  const { user, logout } = useAuth();

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este gasto?')) {
      try {
        await deleteExpense(id);
        fetchExpenses();
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    }
  };

  const handleEdit = (expense: any) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const total = expenses.reduce((acc, curr: any) => acc + curr.monto, 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-12 lg:p-20 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-100/30 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-blue-100/20 blur-[100px] rounded-full"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-12 bg-primary-600"></span>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-primary-600">Hola, {user?.nombre}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tighter leading-none mb-4">
              Control <br/> <span className="text-primary-600">Inteligente.</span>
            </h1>
            <button 
              onClick={logout}
              className="mt-4 flex items-center gap-2 text-slate-400 hover:text-red-500 font-bold transition-colors"
            >
              <LogOut className="w-4 h-4" /> Cerrar Sesión
            </button>
          </div>
          
          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-white flex items-center gap-8 min-w-[300px]">
            <div className="bg-primary-600 p-4 rounded-2xl shadow-lg shadow-primary-200">
              <Wallet className="text-white w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Balance Total</p>
              <p className="text-4xl font-black text-slate-900 tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>
                ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <ExpenseForm 
              onExpenseAdded={fetchExpenses} 
              initialData={editingExpense} 
              onCancelEdit={handleCancelEdit} 
            />
          </div>

          <div className="lg:col-span-7">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Historial de Gastos</h2>
              <span className="text-xs font-black text-primary-600 bg-primary-50 px-4 py-2 rounded-full uppercase tracking-wider">
                {expenses.length} Registros
              </span>
            </div>
            <ExpenseList 
              expenses={expenses} 
              loading={loading} 
              onDelete={handleDelete} 
              onEdit={handleEdit} 
            />
          </div>
        </main>
      </div>
    </div>
  );
};

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
    </div>
  );

  return user ? <Dashboard /> : (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <AuthForm />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
