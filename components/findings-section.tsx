"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FileText, Users, Shield, Cog } from "lucide-react";

const findings = [
    {
        id: "E1",
        title: "Gestión de tokens y secretos",
        icon: Shield,
        date: "2025-09-12 10:34",
        source: "Auditoría de plataforma de repositorios",
        activos: ["Credenciales privilegiadas", "Repositorio de código"],
        controles: ["A.5.17", "A.5.18", "A.8.28"],
        riesgos: ["CR-01", "CR-03", "CR-04"],
        descripcion:
            "Se identificó el uso de un token de servicio (cuenta técnica svc-repo-bot) con permisos de creación y modificación de repositorios sin rotación por evento ni restricción por alcance de repositorio. Se observaron 27 invocaciones createRepository en el último mes desde el host interno 10.24.0.15. Además, el escaneo de secretos de los últimos 30 días reporta 2 hallazgos informativos de posibles claves embebidas en PRs cerrados.",
        conclusion:
            "Implementación parcial de controles: faltan rotación por uso/incidente, scopes mínimos y secret-scanning bloqueante en PR.",
    },
    {
        id: "E2",
        title: "Gestión de cambios y trazabilidad",
        icon: Cog,
        date: "2025-09-18 16:20",
        source: "Revisión de plantilla de repos (IaC) y logs de auditoría",
        activos: [
            "Servicio de automatización",
            "Controlador de versiones",
            "Registros de auditoría",
        ],
        controles: ["A.8.32", "A.8.16", "A.8.23"],
        riesgos: ["CR-02", "CR-05", "CR-12"],
        descripcion:
            "La plantilla usada por la automatización permite crear repositorios públicos por defecto si no se redefine un parámetro (visibility=private ausente). Se verificó un cambio de plantilla (commit tpl-9f2a) sin RFC ni aprobación formal (solo merge de PR). Los logs de acceso se conservan 60–90 días, sin alertas por clonado masivo o push fuera de horario.",
        conclusion:
            "Falta aprobación formal de cambios, retención de logs ≥180 días y detecciones de comportamiento anómalo.",
    },
    {
        id: "E3",
        title: "Entrevista: Administración de Sistemas",
        icon: FileText,
        date: "2025-09-09 09:15",
        source: "Entrevista estructurada - Líder de Infraestructura y Backups",
        activos: [
            "Sistemas de respaldo",
            "Controlador de versiones",
            "Repositorios",
        ],
        controles: ["A.8.16", "A.8.23", "A.8.32"],
        riesgos: ["CR-07", "CR-06"],
        descripcion:
            "Backups diarios de repos (snapshots incrementales) en el mismo datacenter; sin copia inmutable ni air-gap. Última prueba de restauración: 2025-06-20 (demoró 1 h 15 min). RTO/RPO declarados: 2 h / 24 h; no hay acuerdo formal con Desarrollo.",
        conclusion:
            "Respaldo no segregado e inmutable ausente → exposición a ransomware y fallas de recuperación.",
    },
    {
        id: "E4",
        title: "Entrevista: Desarrollo Senior",
        icon: Users,
        date: "2025-09-11 14:40",
        source: "Entrevista estructurada - Dev Sr. y AppSec",
        activos: [
            "Credenciales privilegiadas",
            "Código fuente",
            "Repositorios",
        ],
        controles: ["A.5.17", "A.5.18", "A.8.28", "A.8.32"],
        riesgos: ["CR-01", "CR-03", "CR-04", "CR-08"],
        descripcion:
            "MFA obligatorio para usuarios humanos; tokens de servicio sin MFA (no aplica) y expiración a 180 días. Branch protection activo en repos core, inconsistente en equipos satélite. Dos casos en 2025 con secretos en PR detectados por scanner; se revocaron y se hizo force-push, sin post-mortem formal.",
        conclusion:
            "Buenas prácticas parciales; faltan estandarización de protecciones, revocación/rotación por incidente y post-mortems para evitar recurrencia.",
    },
];

export function FindingsSection() {
    return (
        <section id="findings" className="bg-background py-20">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
                        Hallazgos y Evidencias
                    </h2>
                    <p className="mb-12 text-pretty text-muted-foreground">
                        Resultados de auditorías técnicas y entrevistas
                        estructuradas realizadas para identificar ciber-riesgos
                        en el proceso de automatización de repositorios.
                    </p>

                    <Accordion type="single" collapsible className="space-y-4">
                        {findings.map((finding) => {
                            const Icon = finding.icon;
                            return (
                                <AccordionItem
                                    key={finding.id}
                                    value={finding.id}
                                    className="rounded-lg border bg-card"
                                >
                                    <AccordionTrigger className="px-6 hover:no-underline">
                                        <div className="flex items-start gap-4 text-left">
                                            <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                                <Icon className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="mb-1 flex items-center gap-2">
                                                    <Badge variant="outline">
                                                        {finding.id}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground">
                                                        {finding.date}
                                                    </span>
                                                </div>
                                                <h3 className="font-semibold">
                                                    {finding.title}
                                                </h3>
                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    {finding.source}
                                                </p>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-6">
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="mb-2 text-sm font-semibold">
                                                    Descripción del hallazgo
                                                </h4>
                                                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                                                    {finding.descripcion}
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="mb-2 text-sm font-semibold">
                                                    Activos afectados
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {finding.activos.map(
                                                        (activo) => (
                                                            <Badge
                                                                key={activo}
                                                                variant="secondary"
                                                            >
                                                                {activo}
                                                            </Badge>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="mb-2 text-sm font-semibold">
                                                    Controles ISO 27001:2022
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {finding.controles.map(
                                                        (control) => (
                                                            <Badge
                                                                key={control}
                                                                variant="outline"
                                                                className="font-mono"
                                                            >
                                                                {control}
                                                            </Badge>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="mb-2 text-sm font-semibold">
                                                    Ciber-riesgos asociados
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {finding.riesgos.map(
                                                        (riesgo) => (
                                                            <Badge
                                                                key={riesgo}
                                                                className="bg-[var(--high)] font-mono text-white"
                                                            >
                                                                {riesgo}
                                                            </Badge>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            <Card className="bg-muted/50 p-4">
                                                <h4 className="mb-2 text-sm font-semibold">
                                                    Conclusión
                                                </h4>
                                                <p className="text-pretty text-sm leading-relaxed">
                                                    {finding.conclusion}
                                                </p>
                                            </Card>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
