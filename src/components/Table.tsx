import React from "react";

type TableRow = Record<string, unknown>;

interface TableProps {
  columns: string[];
  data: TableRow[];
  onRowClick?: (row: TableRow) => void;
}

export default function Table({ columns, data, onRowClick }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-[1.5rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
      <table className="w-full text-left">
        <thead className="bg-slate-50/50 border-b border-slate-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row, idx) => (
            <tr
              key={idx}
              onClick={() => onRowClick?.(row)}
              className="group hover:bg-slate-50 transition-all duration-300 cursor-pointer"
            >
              {Object.values(row).map((value, vIdx) => (
                <td key={vIdx} className="px-8 py-5 text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
                  {value as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No entries found</p>
        </div>
      )}
    </div>
  );
}
