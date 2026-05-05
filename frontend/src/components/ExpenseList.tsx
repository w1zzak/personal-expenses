import React from 'react';
import { Calendar, Tag, CreditCard, Trash2, Pencil } from 'lucide-react';
export interface Gasto {
  id: number;
  titulo: string;
  monto: number;
  categoria: string;
  fecha: string;
  descripcion?: string;
}

interface ExpenseListProps {
  expenses: Gasto[];
  loading: boolean;
  onDelete: (id: number) => void;
  onEdit: (expense: Gasto) => void;
}

/**
 * Lista de gastos con diseño de tarjetas modernas.
 */
const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, loading, onDelete, onEdit }) => {
  if (loading) {
    return <div className="text-center p-8 text-slate-500 font-medium">Cargando tus finanzas...</div>;
  }

  if (expenses.length === 0) {
    return (
      <div className="text-center p-12 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 text-slate-400">
        <p className="text-lg font-bold">No hay gastos registrados</p>
        <p className="text-sm">¡Empieza a ahorrar hoy mismo!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {expenses.map((expense) => (
        <div 
          key={expense.id} 
          className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group relative overflow-hidden"
        >
          <div className="flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ${
              expense.categoria === 'Comida' ? 'bg-orange-50 text-orange-600' :
              expense.categoria === 'Transporte' ? 'bg-blue-50 text-blue-600' :
              expense.categoria === 'Ocio' ? 'bg-purple-50 text-purple-600' :
              expense.categoria === 'Hogar' ? 'bg-emerald-50 text-emerald-600' :
              'bg-slate-50 text-slate-600'
            }`}>
              <CreditCard className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-primary-600 transition-colors">{expense.titulo}</h3>
              <div className="flex items-center gap-4 text-sm font-semibold text-slate-400">
                <span className="flex items-center gap-1.5 py-1 px-3 bg-slate-50 rounded-full">
                  <Tag className="w-3.5 h-3.5" /> {expense.categoria}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {new Date(expense.fecha).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-2xl font-black text-slate-900 tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>
                ${expense.monto.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onEdit(expense)}
                className="p-3 text-slate-300 hover:text-primary-600 hover:bg-primary-50 transition-all rounded-xl"
                title="Editar"
              >
                <Pencil className="w-5 h-5" />
              </button>
              <button 
                onClick={() => onDelete(expense.id)}
                className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-xl"
                title="Eliminar"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
