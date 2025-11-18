"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const heatmapData = [
    { probabilidad: 5, impacto: 1, riesgos: [], valor: 5 },
    { probabilidad: 5, impacto: 2, riesgos: [], valor: 10 },
    { probabilidad: 5, impacto: 3, riesgos: [], valor: 15 },
    { probabilidad: 5, impacto: 4, riesgos: [], valor: 20 },
    { probabilidad: 5, impacto: 5, riesgos: [], valor: 25 },

    { probabilidad: 4, impacto: 1, riesgos: [], valor: 4 },
    { probabilidad: 4, impacto: 2, riesgos: [], valor: 8 },
    { probabilidad: 4, impacto: 3, riesgos: [], valor: 12 },
    { probabilidad: 4, impacto: 4, riesgos: ["CR-02"], valor: 16 },
    { probabilidad: 4, impacto: 5, riesgos: [], valor: 20 },

    { probabilidad: 3, impacto: 1, riesgos: [], valor: 3 },
    { probabilidad: 3, impacto: 2, riesgos: [], valor: 6 },
    { probabilidad: 3, impacto: 3, riesgos: ["CR-09", "CR-12"], valor: 9 },
    { probabilidad: 3, impacto: 4, riesgos: ["CR-03", "CR-04"], valor: 12 },
    { probabilidad: 3, impacto: 5, riesgos: ["CR-01", "CR-08"], valor: 15 },

    { probabilidad: 2, impacto: 1, riesgos: [], valor: 2 },
    { probabilidad: 2, impacto: 2, riesgos: [], valor: 4 },
    { probabilidad: 2, impacto: 3, riesgos: [], valor: 6 },
    {
        probabilidad: 2,
        impacto: 4,
        riesgos: ["CR-05", "CR-06", "CR-10", "CR-11"],
        valor: 8,
    },
    { probabilidad: 2, impacto: 5, riesgos: ["CR-07"], valor: 10 },

    { probabilidad: 1, impacto: 1, riesgos: [], valor: 1 },
    { probabilidad: 1, impacto: 2, riesgos: [], valor: 2 },
    { probabilidad: 1, impacto: 3, riesgos: [], valor: 3 },
    { probabilidad: 1, impacto: 4, riesgos: [], valor: 4 },
    { probabilidad: 1, impacto: 5, riesgos: [], valor: 5 },
];

function getCellColor(valor: number): string {
    if (valor >= 20)
        return "bg-[var(--critical)] hover:bg-[var(--critical)]/80";
    if (valor >= 12) return "bg-[var(--high)] hover:bg-[var(--high)]/80";
    if (valor >= 6) return "bg-[var(--medium)] hover:bg-[var(--medium)]/80";
    if (valor >= 3) return "bg-[var(--low)] hover:bg-[var(--low)]/80";
    return "bg-[var(--very-low)] hover:bg-[var(--very-low)]/80";
}

function getSeverityLabel(valor: number): string {
    if (valor >= 20) return "Crítico";
    if (valor >= 12) return "Alto";
    if (valor >= 6) return "Medio";
    if (valor >= 3) return "Bajo";
    return "Muy Bajo";
}

export function HeatMapSection() {
    const [hoveredCell, setHoveredCell] = useState<number | null>(null);

    return (
        <section id="heatmap" className="bg-muted/30 py-20">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-7xl">
                    <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
                        Mapa de Calor
                    </h2>
                    <p className="mb-12 text-pretty text-muted-foreground">
                        Matriz de riesgo según metodología MAGERIT v3. Cada
                        celda muestra el valor resultante de Impacto ×
                        Probabilidad. Pase el cursor sobre las celdas para ver
                        los riesgos asociados.
                    </p>

                    <Card className="overflow-hidden p-6">
                        <div className="mb-6 overflow-x-auto">
                            <div className="min-w-[600px]">
                                <div className="mb-2 grid grid-cols-[100px_repeat(5,1fr)] gap-2">
                                    <div className="flex items-center justify-center text-sm font-medium text-muted-foreground">
                                        Prob. \ Imp.
                                    </div>
                                    {[1, 2, 3, 4, 5].map((impacto) => (
                                        <div
                                            key={impacto}
                                            className="flex items-center justify-center rounded-md bg-muted p-2 text-sm font-medium"
                                        >
                                            {impacto}
                                        </div>
                                    ))}
                                </div>

                                <TooltipProvider>
                                    {[5, 4, 3, 2, 1].map((probabilidad) => (
                                        <div
                                            key={probabilidad}
                                            className="mb-2 grid grid-cols-[100px_repeat(5,1fr)] gap-2"
                                        >
                                            <div className="flex items-center justify-center rounded-md bg-muted text-sm font-medium">
                                                {probabilidad}
                                            </div>
                                            {[1, 2, 3, 4, 5].map((impacto) => {
                                                const cell = heatmapData.find(
                                                    (d) =>
                                                        d.probabilidad ===
                                                            probabilidad &&
                                                        d.impacto === impacto
                                                );
                                                if (!cell) return null;

                                                const hasRisks =
                                                    cell.riesgos.length > 0;
                                                const cellColor = getCellColor(
                                                    cell.valor
                                                );

                                                return (
                                                    <Tooltip
                                                        key={`${probabilidad}-${impacto}`}
                                                    >
                                                        <TooltipTrigger asChild>
                                                            <button
                                                                className={`group relative h-20 rounded-md transition-all ${cellColor} ${
                                                                    hasRisks
                                                                        ? "ring-2 ring-offset-2 ring-primary/50"
                                                                        : ""
                                                                }`}
                                                                onMouseEnter={() =>
                                                                    setHoveredCell(
                                                                        cell.valor
                                                                    )
                                                                }
                                                                onMouseLeave={() =>
                                                                    setHoveredCell(
                                                                        null
                                                                    )
                                                                }
                                                            >
                                                                <div className="flex h-full flex-col items-center justify-center text-white">
                                                                    <div className="text-2xl font-bold">
                                                                        {
                                                                            cell.valor
                                                                        }
                                                                    </div>
                                                                    {hasRisks && (
                                                                        <div className="mt-1 text-xs font-medium">
                                                                            {
                                                                                cell
                                                                                    .riesgos
                                                                                    .length
                                                                            }{" "}
                                                                            riesgo
                                                                            {cell
                                                                                .riesgos
                                                                                .length >
                                                                            1
                                                                                ? "s"
                                                                                : ""}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </button>
                                                        </TooltipTrigger>
                                                        {hasRisks && (
                                                            <TooltipContent className="max-w-xs">
                                                                <div className="space-y-2">
                                                                    <div className="font-semibold">
                                                                        {getSeverityLabel(
                                                                            cell.valor
                                                                        )}{" "}
                                                                        (Valor:{" "}
                                                                        {
                                                                            cell.valor
                                                                        }
                                                                        )
                                                                    </div>
                                                                    <div className="text-sm">
                                                                        <span className="font-medium">
                                                                            Riesgos:
                                                                        </span>{" "}
                                                                        {cell.riesgos.join(
                                                                            ", "
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </TooltipContent>
                                                        )}
                                                    </Tooltip>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </TooltipProvider>
                            </div>
                        </div>

                        <div className="border-t border-border pt-6">
                            <h3 className="mb-4 font-semibold">
                                Leyenda de Severidad
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-12 rounded bg-[var(--critical)]" />
                                    <span className="text-sm">
                                        Crítico (20-25)
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-12 rounded bg-[var(--high)]" />
                                    <span className="text-sm">
                                        Alto (12-19)
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-12 rounded bg-[var(--medium)]" />
                                    <span className="text-sm">
                                        Medio (6-11)
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-12 rounded bg-[var(--low)]" />
                                    <span className="text-sm">Bajo (3-5)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-12 rounded bg-[var(--very-low)]" />
                                    <span className="text-sm">
                                        Muy Bajo (1-2)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        <Card className="p-6">
                            <div className="text-3xl font-bold text-[var(--critical)]">
                                0
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Riesgos Críticos
                            </div>
                        </Card>
                        <Card className="p-6">
                            <div className="text-3xl font-bold text-[var(--high)]">
                                5
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Riesgos Altos
                            </div>
                        </Card>
                        <Card className="p-6">
                            <div className="text-3xl font-bold text-[var(--medium)]">
                                7
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Riesgos Medios
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
