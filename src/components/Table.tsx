import React from "react";

type TableRow = Record<string, unknown>;

interface TableProps {
  columns: string[];
  data: TableRow[];
  onRowClick?: (row: TableRow) => void;
}

export default function Table({ columns, data, onRowClick }: TableProps) {
  return (
    <div
      className="overflow-x-auto rounded-[var(--radius-card)]"
      style={{
        border: "1px solid var(--color-border-light)",
        boxShadow: "var(--shadow-card)",
        background: "var(--color-card)",
      }}
    >
      <table className="w-full text-left">
        {/* Dark header per spec */}
        <thead style={{ background: "var(--color-dark)" }}>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em]"
                style={{ color: "var(--color-text-on-dark)" }}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              onClick={() => onRowClick?.(row)}
              className="group transition-all duration-200 cursor-pointer"
              style={{
                background:
                  idx % 2 === 0
                    ? "var(--color-card)"
                    : "var(--color-surface-secondary)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLTableRowElement).style.background =
                  "rgba(61, 190, 122, 0.07)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLTableRowElement).style.background =
                  idx % 2 === 0
                    ? "var(--color-card)"
                    : "var(--color-surface-secondary)";
              }}
            >
              {Object.values(row).map((value, vIdx) => (
                <td
                  key={vIdx}
                  className="px-8 py-5 text-sm font-medium transition-colors"
                  style={{ color: "var(--color-text-secondary)", borderBottom: "1px solid var(--color-border-light)" }}
                >
                  {value as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="p-12 text-center">
          <p
            className="font-bold uppercase tracking-widest text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            No entries found
          </p>
        </div>
      )}
    </div>
  );
}
