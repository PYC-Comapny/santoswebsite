'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';

interface BlogTableProps {
    title: string;
    columns: string[];
    rows: string[][];
}

export default function BlogTable({ title, columns, rows }: BlogTableProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="my-12 relative rounded-[2rem] p-1 bg-gradient-to-b from-slate-200 to-slate-400/10 shadow-2xl overflow-hidden"
        >
            <div className="bg-white rounded-[1.9rem] overflow-hidden border border-slate-200">
                <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <DollarSign className="w-4 h-4 text-emerald-500" />
                        </div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                            {title}
                        </h4>
                    </div>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-slate-200" />
                        <div className="w-2 h-2 rounded-full bg-slate-200" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/30">
                                {columns.map((col, i) => (
                                    <th key={i} className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, i) => (
                                <tr key={i} className="group hover:bg-slate-50 transition-colors">
                                    {row.map((cell, j) => (
                                        <td key={j} className="px-8 py-5 border-b border-slate-100 last:border-b-0">
                                            <span className={`text-sm font-black italic tracking-tight ${j === 1 ? 'text-premiumAccent' : 'text-slate-900 group-hover:translate-x-1 transition-transform inline-block'}`}>
                                                {cell}
                                            </span>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
}
