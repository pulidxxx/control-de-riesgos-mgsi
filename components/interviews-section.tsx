import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, ShieldCheck, GitBranch, Briefcase } from "lucide-react";

const interviews = [
  {
    id: "R2-E1",
    role: "Administración de Sistemas",
    title: "Backups y Continuidad",
    date: "2025-09-09 09:15 (GMT-5)",
    duration: "35 min",
    participants: "Líder de Infra y Backups; Analista de Seguridad",
    assets: [
      "Sistemas de respaldo",
      "Controlador de versiones",
      "Repositorios",
    ],
    summary:
      "Respaldo no segregado, sin inmutabilidad ni air-gap; pruebas de restauración esporádicas.",
    questions: [
      {
        question: "Frecuencia y retención de copias de seguridad.",
        answer:
          "Hacemos copias diarias con incrementales. Retención 30 días en el mismo datacenter. No contamos con copia inmutable ni off-site.",
      },
      {
        question: "Pruebas de restauración (última/tiempos).",
        answer:
          "La última prueba fue el 2025-06-20; restaurar un repo de 8 GB tomó 1 h 15 min. No hay plan de pruebas trimestral.",
      },
      {
        question: "RTO/RPO acordados con desarrollo.",
        answer:
          "Operativamente apuntamos a RTO 2 h / RPO 24 h, pero no está formalizado en acuerdo.",
      },
    ],
  },
  {
    id: "R2-E2",
    role: "Desarrollo Senior",
    title: "Credenciales y Código Seguro",
    date: "2025-09-11 14:40 (GMT-5)",
    duration: "30 min",
    participants: "Dev Sr. Automatización; AppSec",
    assets: ["Credenciales privilegiadas", "Código fuente", "Repositorios"],
    summary:
      "Buenas prácticas parciales; faltan rotación por evento, scope mínimo de tokens, checks bloqueantes y estandarización de protecciones.",
    questions: [
      {
        question: "MFA y credenciales/tokens de servicio.",
        answer:
          "MFA es obligatorio para usuarios humanos. Los tokens de servicio expiran a 180 días; no se rotan por uso ni por incidente automáticamente.",
      },
      {
        question: "Protección de ramas y firmas.",
        answer:
          "main y develop están protegidas en repos core; en equipos satélite hay inconsistencias. Firmas de commits recomendadas, no obligatorias.",
      },
      {
        question: "Secret-scanning / SAST / SCA en PR.",
        answer:
          "Tenemos secret-scanning informativo y SAST/SCA no bloqueantes. En 2025 hubo 2 PR con secretos; se revocaron y se hizo force-push, sin post-mortem.",
      },
    ],
  },
  {
    id: "R2-E3",
    role: "Seguridad TI",
    title: "Monitoreo y Auditoría",
    date: "2025-09-12 10:34 (GMT-5)",
    duration: "28 min",
    participants: "Analista Blue Team; Responsable de Logs",
    assets: [
      "Registros de auditoría",
      "Servicio de autenticación",
      "Red interna",
    ],
    summary:
      "Cobertura y retención de logs insuficiente para comportamientos anómalos relevantes del proceso.",
    questions: [
      {
        question: "Retención y cobertura de logs.",
        answer:
          "Accesos a repos y autenticación se guardan 60–90 días. No tenemos correlación específica para 'clonado masivo' ni push fuera de horario.",
      },
      {
        question: "Alertas y casos de uso.",
        answer:
          "Existen alertas por múltiples fallos de login y uso de IPs atípicas; no por creación masiva de repos o cambios de visibilidad.",
      },
      {
        question: "Detección en red (MitM / exfiltración).",
        answer:
          "El tráfico hacia el VCS va por TLS. No hay inspección de payload; dependemos de telemetría del servidor y EDR en endpoints.",
      },
    ],
  },
  {
    id: "R2-E4",
    role: "Gestión de Cambios",
    title: "Plantilla de Repos y Configuración",
    date: "2025-09-18 16:20 (GMT-5)",
    duration: "25 min",
    participants: "Owner plantilla IaC; Líder de Configuración",
    assets: ["Servicio de automatización", "Configuración como código"],
    summary:
      "Falta control preventivo y gobierno de cambios formal para plantillas críticas.",
    questions: [
      {
        question: "Flujo de cambios y aprobaciones.",
        answer:
          "Los cambios a la plantilla van por PR; en un caso (commit tpl-9f2a) se fusionó sin RFC ni aprobación del CAB.",
      },
      {
        question: "Parámetros de seguridad por defecto.",
        answer:
          "El parámetro visibility no estaba fijado en private por defecto; se corrigió luego, pero la automatización no valida ese valor al crear.",
      },
      {
        question: "Controles preventivos.",
        answer:
          "No hay policy checks que bloqueen creación pública; confiamos en la revisión de PR y en que los equipos ajusten a mano.",
      },
    ],
  },
  {
    id: "R2-E5",
    role: "Dueño del Proceso (PO)",
    title: "Riesgo Operativo y Roadmap",
    date: "2025-09-19 11:05 (GMT-5)",
    duration: "20 min",
    participants: "Product Owner; Representante de Cumplimiento",
    assets: ["Repositorios", "Roadmap de automatización"],
    summary:
      "Riesgo operativo subvalorado en la etapa previa a creación; faltan gates y simulacros.",
    questions: [
      {
        question: "Criterios de aceptación y seguridad.",
        answer:
          "La automatización prioriza velocidad de onboarding; seguridad se revisa en el post-merge. No hay gates obligatorios previos.",
      },
      {
        question: "Conciencia de riesgos y comunicación.",
        answer:
          "Conocemos el riesgo de exposición accidental; tenemos un playbook de reversión rápida, pero no un ejercicio programado.",
      },
    ],
  },
];

export function InterviewsSection() {
  return (
    <section id="interviews" className="bg-muted/40 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
            Entrevistas
          </h2>
          <p className="mb-10 text-pretty text-muted-foreground">
            Síntesis de las entrevistas estructuradas realizadas con roles clave
            del proceso de automatización de repositorios. Estas conversaciones
            complementan la valoración de activos y ciber-riesgos con evidencias
            cualitativas desde la operación diaria.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {interviews.map((item) => {
              const Icon =
                item.role === "Administración de Sistemas"
                  ? Server
                  : item.role === "Desarrollo Senior"
                  ? GitBranch
                  : item.role === "Seguridad TI"
                  ? ShieldCheck
                  : item.role === "Gestión de Cambios"
                  ? GitBranch
                  : Briefcase;

              return (
                <Card
                  key={item.id}
                  className="flex h-full flex-col justify-between p-6"
                >
                  <div>
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold">
                            {item.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {item.role}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[0.7rem]">
                        {item.id}
                      </Badge>
                    </div>

                    <div className="mb-3 space-y-1 text-xs text-muted-foreground">
                      <p>
                        <span className="font-medium">Fecha:</span>{" "}
                        {item.date}
                      </p>
                      <p>
                        <span className="font-medium">Duración:</span>{" "}
                        {item.duration}
                      </p>
                      <p>
                        <span className="font-medium">Participantes:</span>{" "}
                        {item.participants}
                      </p>
                    </div>

                    <div className="mb-3 flex flex-wrap gap-1">
                      {item.assets.map((asset) => (
                        <Badge
                          key={asset}
                          variant="secondary"
                          className="text-[0.7rem]"
                        >
                          {asset}
                        </Badge>
                      ))}
                    </div>

                    <p className="mb-4 text-sm text-muted-foreground">
                      {item.summary}
                    </p>

                    <div className="space-y-3">
                      {item.questions.map((q, index) => (
                        <div key={index} className="rounded-md bg-muted p-3">
                          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            {q.question}
                          </p>
                          <p className="text-sm leading-snug">{q.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
