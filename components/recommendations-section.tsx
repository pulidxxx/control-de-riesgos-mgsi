import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react'

const recommendations = [
  {
    id: 1,
    title: 'Identidad y secretos',
    prioridad: 'Inmediata',
    plazo: 'Corto plazo (< 3 meses)',
    icon: AlertCircle,
    acciones: [
      'Implementar tokens scoped con permisos mínimos necesarios',
      'Configurar tokens efímeros con expiración automática',
      'Rotación automatizada por uso/incidente',
      'Revocación automatizada ante detección de anomalías',
      'Secret-scanning bloqueante en Pull Requests',
    ],
    riesgosRelacionados: ['CR-01', 'CR-03', 'CR-04', 'CR-08'],
  },
  {
    id: 2,
    title: 'Gestión de cambios y monitoreo',
    prioridad: 'Alta',
    plazo: 'Corto plazo (< 3 meses)',
    icon: AlertCircle,
    acciones: [
      'Estandarizar branch protection en todas las plantillas nuevas',
      'Aumentar retención de logs a ≥180 días',
      'Implementar alertas por clonado/push anómalo',
      'RFC obligatorio para cambios de plantilla',
      'Correlación de eventos para detección de amenazas',
    ],
    riesgosRelacionados: ['CR-02', 'CR-05', 'CR-09', 'CR-12'],
  },
  {
    id: 3,
    title: 'Respaldo y continuidad',
    prioridad: 'Alta',
    plazo: 'Mediano plazo (3-6 meses)',
    icon: Clock,
    acciones: [
      'Implementar backups inmutables (WORM)',
      'Configurar respaldos off-site/air-gapped',
      'Pruebas de restauración trimestrales programadas',
      'Formalizar acuerdos RTO/RPO con áreas de desarrollo',
      'Documentar y ejercitar plan de recuperación ante desastres',
    ],
    riesgosRelacionados: ['CR-06', 'CR-07'],
  },
  {
    id: 4,
    title: 'Monitoreo de red y sesiones',
    prioridad: 'Media',
    plazo: 'Mediano plazo (3-6 meses)',
    icon: Clock,
    acciones: [
      'Implementar inspección de tráfico TLS interno',
      'Configurar alertas de transferencia masiva de datos',
      'Monitoreo de sesiones concurrentes sospechosas',
      'Integración con EDR para correlación de eventos',
    ],
    riesgosRelacionados: ['CR-10', 'CR-11'],
  },
]

const priorityColors: Record<string, string> = {
  Inmediata: 'bg-[var(--critical)] text-white',
  Alta: 'bg-[var(--high)] text-white',
  Media: 'bg-[var(--medium)] text-foreground',
  Baja: 'bg-[var(--low)] text-foreground',
}

export function RecommendationsSection() {
  return (
    <section id="recommendations" className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
            Recomendaciones Priorizadas
          </h2>
          <p className="mb-12 text-pretty text-muted-foreground">
            Plan de acción derivado de los hallazgos identificados, organizado por prioridad y
            plazo de implementación para fortalecer la seguridad del proceso de automatización.
          </p>

          <div className="space-y-6">
            {recommendations.map((rec) => {
              const Icon = rec.icon
              return (
                <Card key={rec.id} className="p-6">
                  <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="mb-2 text-lg font-semibold">
                          {rec.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge className={priorityColors[rec.prioridad]}>
                            {rec.prioridad}
                          </Badge>
                          <Badge variant="outline">{rec.plazo}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 space-y-2">
                    <h4 className="text-sm font-semibold">
                      Acciones recomendadas:
                    </h4>
                    <ul className="space-y-2">
                      {rec.acciones.map((accion, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                          <span className="text-pretty text-sm leading-relaxed">
                            {accion}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-semibold">
                      Mitiga los siguientes riesgos:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {rec.riesgosRelacionados.map((riesgo) => (
                        <Badge
                          key={riesgo}
                          variant="secondary"
                          className="font-mono"
                        >
                          {riesgo}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
