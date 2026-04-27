import React from 'react';

interface Props {
  percentualAtiv: number;
  horasPrevistas: number;
  horasRealizadas: number;
}

export default function IndicadorProgresso({ percentualAtiv, horasPrevistas, horasRealizadas }: Props) {
  
  const obterCor = (valor: number) => {
    if (valor > 100) return 'text-error';
    if (valor > 75) return 'text-warning';
    return 'text-success';
  };

  const classeCor = obterCor(percentualAtiv);

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`radial-progress bg-base-200 font-bold ${classeCor}`}
        style={{
          "--value": percentualAtiv > 100 ? 100 : percentualAtiv,
          "--size": "6rem",
          "--thickness": "8px"
        } as React.CSSProperties}
        role="progressbar"
        aria-valuenow={percentualAtiv}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span className="text-base-content">
          {percentualAtiv}%
        </span>
      </div>
      <div 
        className="tooltip tooltip-bottom cursor-help" 
        data-tip={`Realizadas: ${horasRealizadas}h | Previstas: ${horasPrevistas}h `}
      >
        <span className="text-sm opacity-60 font-mono hover:opacity-100 transition-opacity">
          {horasRealizadas}h / {horasPrevistas}h
        </span>
      </div>

    </div>
  );
}