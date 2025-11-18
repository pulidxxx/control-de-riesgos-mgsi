"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, AlertTriangle, Filter } from "lucide-react";

const risks = [
    {
        id: "CR-01",
        descripcion:
            "Token de automatización expuesto → creación/alteración masiva de repos",
        activo: "Credenciales privilegiadas",
        impacto: 5,
        probabilidad: 3,
        valor: 15,
        severidad: "Alto",
    },
    {
        id: "CR-02",
        descripcion:
            "Librería de terceros vulnerable → inyección de código (supply chain)",
        activo: "Controlador de versiones / Repos",
        impacto: 4,
        probabilidad: 4,
        valor: 16,
        severidad: "Alto",
    },
    {
        id: "CR-03",
        descripcion: "Secretos hardcodeados → acceso no autorizado",
        activo: "Código / Credenciales",
        impacto: 4,
        probabilidad: 3,
        valor: 12,
        severidad: "Alto",
    },
    {
        id: "CR-04",
        descripcion:
            "Gestión deficiente de roles (IAM) → elevación de privilegios",
        activo: "Servicio de autenticación",
        impacto: 4,
        probabilidad: 3,
        valor: 12,
        severidad: "Alto",
    },
    {
        id: "CR-05",
        descripcion: "Automatización sin hardening → repos públicos por error",
        activo: "Servicio de automatización",
        impacto: 4,
        probabilidad: 2,
        valor: 8,
        severidad: "Medio",
    },
    {
        id: "CR-06",
        descripcion: "Caída del VCS (DoS/infra) → interrupción del desarrollo",
        activo: "Controlador de versiones",
        impacto: 4,
        probabilidad: 2,
        valor: 8,
        severidad: "Medio",
    },
    {
        id: "CR-07",
        descripcion: "Ransomware en respaldo → sin restauración",
        activo: "Sistemas de respaldo",
        impacto: 5,
        probabilidad: 2,
        valor: 10,
        severidad: "Medio",
    },
    {
        id: "CR-08",
        descripcion: "Phishing a desarrollador → exfiltración de repos",
        activo: "Repositorio de código",
        impacto: 5,
        probabilidad: 3,
        valor: 15,
        severidad: "Alto",
    },
    {
        id: "CR-09",
        descripcion: "Cambios sin control formal → config errónea persistente",
        activo: "Automatización / Configuración",
        impacto: 3,
        probabilidad: 3,
        valor: 9,
        severidad: "Medio",
    },
    {
        id: "CR-10",
        descripcion: "MitM interno → robo de tokens/sesiones",
        activo: "Red interna",
        impacto: 4,
        probabilidad: 2,
        valor: 8,
        severidad: "Medio",
    },
    {
        id: "CR-11",
        descripcion:
            "Permisos excesivos → fuga de PI por exposición accidental",
        activo: "Repositorio de código",
        impacto: 4,
        probabilidad: 2,
        valor: 8,
        severidad: "Medio",
    },
    {
        id: "CR-12",
        descripcion: "Trazabilidad incompleta → incumplimientos en auditoría",
        activo: "Repos / Autenticación",
        impacto: 3,
        probabilidad: 3,
        valor: 9,
        severidad: "Medio",
    },
];

const severityColors: Record<string, string> = {
    Crítico: "bg-[var(--critical)] text-white",
    Alto: "bg-[var(--high)] text-white",
    Medio: "bg-[var(--medium)] text-foreground",
    Bajo: "bg-[var(--low)] text-foreground",
    "Muy Bajo": "bg-[var(--very-low)] text-foreground",
};

export function RisksSection() {
    const [searchTerm, setSearchTerm] = useState("");
    const [severityFilter, setSeverityFilter] = useState<string>("all");

    const filteredRisks = useMemo(() => {
        return risks.filter((risk) => {
            const matchesSearch =
                risk.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                risk.descripcion
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                risk.activo.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesSeverity =
                severityFilter === "all" || risk.severidad === severityFilter;

            return matchesSearch && matchesSeverity;
        });
    }, [searchTerm, severityFilter]);

    return (
        <section id="risks" className="bg-background py-20">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 flex items-start justify-between">
                        <div>
                            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
                                Listado de Ciber-riesgos
                            </h2>
                            <p className="text-pretty text-muted-foreground">
                                12 riesgos identificados mediante controles ISO
                                27001:2022 y entrevistas estructuradas
                            </p>
                        </div>
                        <div className="hidden items-center gap-2 rounded-lg bg-muted p-4 lg:flex">
                            <AlertTriangle className="h-5 w-5 text-primary" />
                            <div className="text-sm">
                                <div className="font-semibold">
                                    5 Riesgos Altos
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    7 Riesgos Medios
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Buscar por ID, descripción o activo..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select
                            value={severityFilter}
                            onValueChange={setSeverityFilter}
                        >
                            <SelectTrigger className="w-full sm:w-[200px]">
                                <Filter className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Filtrar por severidad" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Todas las severidades
                                </SelectItem>
                                <SelectItem value="Crítico">Crítico</SelectItem>
                                <SelectItem value="Alto">Alto</SelectItem>
                                <SelectItem value="Medio">Medio</SelectItem>
                                <SelectItem value="Bajo">Bajo</SelectItem>
                                <SelectItem value="Muy Bajo">
                                    Muy Bajo
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="mb-4 text-sm text-muted-foreground">
                        Mostrando {filteredRisks.length} de {risks.length}{" "}
                        ciber-riesgos
                    </div>

                    <div className="space-y-4">
                        {filteredRisks.map((risk) => (
                            <Card key={risk.id} className="p-6">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="flex-1">
                                        <div className="mb-2 flex flex-wrap items-center gap-2">
                                            <Badge
                                                variant="outline"
                                                className="font-mono"
                                            >
                                                {risk.id}
                                            </Badge>
                                            <Badge
                                                className={
                                                    severityColors[
                                                        risk.severidad
                                                    ]
                                                }
                                            >
                                                {risk.severidad}
                                            </Badge>
                                        </div>
                                        <p className="mb-2 text-pretty font-medium leading-relaxed">
                                            {risk.descripcion}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">
                                                Activo afectado:
                                            </span>{" "}
                                            {risk.activo}
                                        </p>
                                    </div>
                                    <div className="flex gap-6 lg:flex-col lg:gap-2">
                                        <div className="text-center">
                                            <div className="text-xs text-muted-foreground">
                                                Impacto
                                            </div>
                                            <div className="text-2xl font-bold text-primary">
                                                {risk.impacto}
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-xs text-muted-foreground">
                                                Probabilidad
                                            </div>
                                            <div className="text-2xl font-bold text-primary">
                                                {risk.probabilidad}
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-xs text-muted-foreground">
                                                Valor
                                            </div>
                                            <div className="text-2xl font-bold text-primary">
                                                {risk.valor}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {filteredRisks.length === 0 && (
                        <Card className="p-12 text-center">
                            <p className="text-muted-foreground">
                                No se encontraron riesgos con los filtros
                                aplicados
                            </p>
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => {
                                    setSearchTerm("");
                                    setSeverityFilter("all");
                                }}
                            >
                                Limpiar filtros
                            </Button>
                        </Card>
                    )}
                </div>
            </div>
        </section>
    );
}
