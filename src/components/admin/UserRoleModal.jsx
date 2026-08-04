import React, { useState } from 'react';
import { X, ShieldCheck, UserCheck, Calendar, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const UserRoleModal = ({ isOpen, onClose, user }) => {
  const { updateUserRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState(user?.role || 'customer');

  if (!isOpen || !user) return null;

  const handleSave = () => {
    updateUserRole(user.id, selectedRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">User Details & Authorization</h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <div className="w-12 h-12 rounded-xl bg-brand-600 text-white font-extrabold flex items-center justify-center text-lg">
              {user.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{user.name}</h4>
              <p className="text-slate-500 dark:text-slate-400 flex items-center space-x-1 mt-0.5">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>{user.email}</span>
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-slate-500">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Registration Date: <strong className="text-slate-700 dark:text-slate-300">{new Date(user.createdAt).toLocaleDateString()}</strong></span>
            </div>
          </div>

          <div className="pt-2">
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-2">
              Select User Authorization Role:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole('customer')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                  selectedRole === 'customer'
                    ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <UserCheck className="w-5 h-5" />
                <span>Customer</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                  selectedRole === 'admin'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Administrator</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow-md"
            >
              Update Authorization
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
