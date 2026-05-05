import React, { useState, useEffect } from 'react';
import { PlusCircle, Save, X } from 'lucide-react';
import { createExpense, updateExpense } from '../services/api';

interface ExpenseFormProps {
  onExpenseAdded: () => void;
  initialData?: any;
  onCancelEdit?: () => void;
}

/**
 * Formulario para agregar o editar gastos.
 */
const ExpenseForm: React.FC<ExpenseFormProps> = ({ onExpenseAdded, initialData, onCancelEdit }) => {
  const [titulo, setTitulo] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('Otros');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitulo(initialData.titulo);
      setMonto(initialData.monto.toString());
      setCategoria(initialData.categoria);
    } else {
      setTitulo('');
      setMonto('');
      setCategoria('Otros');
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !monto) return;

    setLoading(true);
    try {
      if (initialData) {
        await updateExpense(initialData.id, {
          titulo,
          monto: parseFloat(monto),
          categoria,
        });
        if (onCancelEdit) onCancelEdit();
      } else {
        await createExpense({
          titulo,
          monto: parseFloat(monto),
          categoria,
        });
        setTitulo('');
        setMonto('');
      }
      onExpenseAdded();
    } catch (error) {
      console.error('Error al procesar gasto:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`p-8 rounded-[2.5rem] shadow-2xl transition-all duration-500 border-2 ${initialData ? 'bg-white/80 backdrop-blur-xl border-primary-200 ring-4 ring-primary-50' : 'bg-white border-white shadow-slate-200/50'} mb-8`}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3 tracking-tight">
          <div className={`p-2 rounded-xl ${initialData ? 'bg-primary-600 text-white' : 'bg-slate-900 text-white'}`}>
            {initialData ? <Save className="w-6 h-6" /> : <PlusCircle className="w-6 h-6" />}
          </div>
          {initialData ? 'Editar Gasto' : 'Nuevo Registro'}
        </h2>
        {initialData && (
          <button 
            type="button" 
            onClick={onCancelEdit}
            className="text-slate-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-full transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">¿En qué se fue el dinero?</label>
          <input
            type="text"
            placeholder="Ej: Cena con amigos, Suscripción Netflix..."
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full p-4 text-lg rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary-500 focus:bg-white outline-none text-slate-800 transition-all shadow-inner font-medium"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Monto total</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl">$</span>
              <input
                type="number"
                placeholder="0.00"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                className="w-full p-4 pl-10 text-xl rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary-500 focus:bg-white outline-none text-slate-900 transition-all shadow-inner font-black"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Categoría</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full p-4 text-lg rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary-500 focus:bg-white outline-none text-slate-700 transition-all shadow-inner font-semibold appearance-none cursor-pointer"
            >
              <option value="Comida">🍕 Comida</option>
              <option value="Transporte">🚗 Transporte</option>
              <option value="Ocio">🎮 Ocio</option>
              <option value="Hogar">🏠 Hogar</option>
              <option value="Otros">✨ Otros</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-10">
        {initialData && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-2xl transition-all"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`flex-[2] py-4 rounded-2xl font-extrabold text-lg transition-all shadow-xl active:scale-[0.98] ${initialData ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-200' : 'bg-slate-900 hover:bg-black text-white shadow-slate-300'} flex items-center justify-center gap-3 disabled:opacity-50`}
        >
          {loading ? (
            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              {initialData ? <Save className="w-6 h-6" /> : <PlusCircle className="w-6 h-6" />}
              {initialData ? 'Actualizar Gasto' : 'Confirmar Gasto'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
