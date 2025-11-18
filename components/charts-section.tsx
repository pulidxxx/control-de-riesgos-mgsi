"use client";

import { Card } from "@/components/ui/card";
import { BarChart3, PieChart } from "lucide-react";

export function ChartsSection() {
    const severityData = [
        { label: "Crítico", value: 0, color: "var(--critical)", percentage: 0 },
        { label: "Alto", value: 5, color: "var(--high)", percentage: 41.7 },
        { label: "Medio", value: 7, color: "var(--medium)", percentage: 58.3 },
        { label: "Bajo", value: 0, color: "var(--low)", percentage: 0 },
    ];

    const impactData = [
        { label: "5 (Muy Alto)", value: 3, color: "var(--critical)" },
        { label: "4 (Alto)", value: 7, color: "var(--high)" },
        { label: "3 (Medio)", value: 2, color: "var(--medium)" },
        { label: "2 (Bajo)", value: 0, color: "var(--low)" },
        { label: "1 (Muy Bajo)", value: 0, color: "var(--very-low)" },
    ];

    return (
        <section id="charts" className="bg-background py-20">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-6xl">
                    <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
                        Análisis de Riesgos
                    </h2>
                    <p className="mb-12 text-pretty text-muted-foreground">
                        Visualización estadística de la distribución de
                        ciber-riesgos identificados por severidad e impacto
                        potencial en la organización.
                    </p>

                    <div className="grid gap-8 lg:grid-cols-2">
                        <Card className="p-6">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                    <PieChart className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">
                                        Distribución por Severidad
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        12 ciber-riesgos totales
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {severityData.map((item) => (
                                    <div key={item.label}>
                                        <div className="mb-2 flex items-center justify-between text-sm">
                                            <span className="font-medium">
                                                {item.label}
                                            </span>
                                            <span className="text-muted-foreground">
                                                {item.value} (
                                                {item.percentage.toFixed(1)}%)
                                            </span>
                                        </div>
                                        <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                                            <div
                                                className="h-full rounded-full transition-all"
                                                style={{
                                                    width: `${item.percentage}%`,
                                                    backgroundColor: item.color,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 rounded-lg bg-muted p-4">
                                <p className="text-sm text-muted-foreground">
                                    <span className="font-medium text-foreground">
                                        Análisis:
                                    </span>{" "}
                                    No hay riesgos críticos, pero el 41.7% son
                                    de severidad Alta, requiriendo acción
                                    prioritaria inmediata.
                                </p>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                    <BarChart3 className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">
                                        Distribución por Impacto
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Escala de valoración 1-5
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {impactData.map((item) => (
                                    <div
                                        key={item.label}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="min-w-[140px] text-sm font-medium">
                                            {item.label}
                                        </div>
                                        <div className="flex flex-1 items-center gap-3">
                                            <div className="h-8 flex-1 overflow-hidden rounded-md bg-muted">
                                                <div
                                                    className="h-full transition-all"
                                                    style={{
                                                        width: `${
                                                            (item.value / 12) *
                                                            100
                                                        }%`,
                                                        backgroundColor:
                                                            item.color,
                                                    }}
                                                />
                                            </div>
                                            <span className="min-w-[30px] text-right text-sm font-semibold">
                                                {item.value}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 rounded-lg bg-muted p-4">
                                <p className="text-sm text-muted-foreground">
                                    <span className="font-medium text-foreground">
                                        Análisis:
                                    </span>{" "}
                                    La mayoría de riesgos (10/12) tienen impacto
                                    Alto o Muy Alto, indicando potencial de daño
                                    significativo a la organización.
                                </p>
                            </div>
                        </Card>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Card className="p-6">
                            <div className="text-sm text-muted-foreground">
                                Impacto Promedio
                            </div>
                            <div className="mt-1 text-3xl font-bold text-primary">
                                4.2
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground">
                                de 5.0 máximo
                            </div>
                        </Card>
                        <Card className="p-6">
                            <div className="text-sm text-muted-foreground">
                                Prob. Promedio
                            </div>
                            <div className="mt-1 text-3xl font-bold text-primary">
                                2.7
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground">
                                de 5.0 máximo
                            </div>
                        </Card>
                        <Card className="p-6">
                            <div className="text-sm text-muted-foreground">
                                Valor Promedio
                            </div>
                            <div className="mt-1 text-3xl font-bold text-primary">
                                10.8
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground">
                                Severidad Media
                            </div>
                        </Card>
                        <Card className="p-6">
                            <div className="text-sm text-muted-foreground">
                                Activos Afectados
                            </div>
                            <div className="mt-1 text-3xl font-bold text-primary">
                                10
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground">
                                activos totales
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
