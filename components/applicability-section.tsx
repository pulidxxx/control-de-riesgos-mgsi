"use client"
import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const controlsData = [
  {
    dominio: "A.5",
    nombre: "A.5.15 Control de Acceso",
    icon: "🔑",
    estadoActual: "Acceso privilegiado gestionado con tokens de larga duración (180 días) sin rotación por uso.",
    estadoEsperado: "Acceso Just-in-Time (JIT): Implementación de privilegios elevados temporales que se revocan automáticamente tras completar la tarea. Integración total con RBAC granular.",
    resumen: "Acceso JIT y RBAC granular.",
  },
  {
    dominio: "A.5",
    nombre: "A.5.17 Información de Autenticación",
    icon: "🔒",
    estadoActual: "Uso de tokens de servicio (svc-repo-bot) con permisos amplios y sin MFA para cuentas de servicio.",
    estadoEsperado: "Secretos Efímeros: Uso de bóvedas dinámicas (ej. Vault) donde las credenciales de servicio se generan al vuelo, son únicas por transacción y viven segundos (TTL corto).",
    resumen: "Secretos efímeros generados al vuelo, TTL corto.",
  },
  {
    dominio: "A.5",
    nombre: "A.5.18 Derechos de Acceso",
    icon: "🛡️",
    estadoActual: "Los tokens tienen permisos de creación/modificación sin restricción de alcance (scope) por repositorio.",
    estadoEsperado: "Least Privilege Automation: Los tokens de automatización tendrán un alcance (scope) limitado estricta y únicamente al repositorio que están creando en ese milisegundo.",
    resumen: "Automatización con alcance mínimo por repositorio.",
  },
  {
    dominio: "A.8",
    nombre: "A.8.12 Prevención de Fuga de Datos (Backups)",
    icon: "💾",
    estadoActual: "Backups diarios in situ (mismo datacenter), mutables y sin air-gap. RTO/RPO no formalizados.",
    estadoEsperado: "Resiliencia ante Ransomware: Estrategia 3-2-1-1-0 implementada. Copias inmutables (WORM), una copia fuera de línea (air-gapped) y pruebas de restauración automatizadas mensualmente con reporte de integridad.",
    resumen: "Backups inmutables (WORM), air-gapped, restauraciones automatizadas.",
  },
  {
    dominio: "A.8",
    nombre: "A.8.16 Actividades de Monitoreo",
    icon: "📊",
    estadoActual: "Retención de logs 60-90 días. Sin alertas para clonado masivo o comportamiento anómalo.",
    estadoEsperado: "Monitoreo Predictivo (UEBA): SIEM con análisis de comportamiento de usuarios/entidades. Detección automática de exfiltración (ej. clonado de >5 repos en 1 min) con respuesta automatizada (bloqueo de usuario). Retención de 1 año.",
    resumen: "Monitoreo predictivo (UEBA), retención de logs 1 año.",
  },
  {
    dominio: "A.8",
    nombre: "A.8.28 Codificación Segura (Secretos)",
    icon: "📝",
    estadoActual: "Escaneo de secretos informativo (no bloqueante). Secretos hardcodeados encontrados en PRs cerrados.",
    estadoEsperado: "Prevention-First (Shift Left): Pre-commit hooks obligatorios que impiden subir secretos. Si un secreto toca el repositorio, se revoca automáticamente en el proveedor de identidad en tiempo real.",
    resumen: "Pre-commit hooks obligatorios, revocación automática de secretos.",
  },
  {
    dominio: "A.8",
    nombre: "A.8.28 Codificación Segura (IaC)",
    icon: "⚙️",
    estadoActual: "Cambios en plantillas de automatización (IaC) sin aprobación formal (RFC) ni validación de seguridad previa.",
    estadoEsperado: "GitOps & Policy-as-Code: Todo cambio en la infraestructura de repositorios pasa por un pipeline con validación automática de políticas (ej. OPA) que impide configuraciones inseguras (como repos públicos) antes del merge.",
    resumen: "Policy-as-Code en cambios de infraestructura.",
  },
  {
    dominio: "A.8",
    nombre: "A.8.9 Gestión de la Configuración",
    icon: "🔍",
    estadoActual: "Plantillas permiten crear repositorios públicos por defecto si no se especifica lo contrario (error humano posible).",
    estadoEsperado: "Configuración Segura por Diseño: Las plantillas base tendrán 'Secure Defaults' forzados. La creación de un repositorio público requerirá una doble aprobación (principio de cuatro ojos) en la plataforma.",
    resumen: "Plantillas con 'Secure Defaults', doble aprobación para repos públicos.",
  },
]

const roadmapData = [
  {
    year: 1,
    title: "Año 1: Higiene Crítica y Remediación Inmediata",
    icon: "1️⃣",
    resumen: "Higiene crítica y remediación inmediata: tokens, rotación, Secret Scanning bloqueante, backups inmutables.",
    detalle: (
      <>
        <p className="mb-2">
          El primer año se centra en el establecimiento de la higiene fundamental para <strong>detener la sangría</strong> de los riesgos más críticos.
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>Resolver la vulnerabilidad de las credenciales privilegiadas (CR-01: Token expuesto, CR-04: Gestión deficiente de roles) reduciendo drásticamente la vida útil de los tokens de servicio e implementando rotación automatizada por uso o incidente.</li>
          <li>Endurecimiento de la seguridad del código mediante Secret Scanning bloqueante en Pull Requests, previniendo el riesgo CR-03 (Secretos hardcodeados).</li>
          <li>Fortalecimiento de la resiliencia ante ciberincidentes mediante la creación de copias de seguridad inmutables con segregación (air-gap), mitigando el riesgo CR-07 (backups mutables en el mismo datacenter).</li>
        </ul>
        <p className="text-xs text-muted-foreground">Enfoque en riesgos: CR-01, CR-03, CR-04, CR-07.</p>
      </>
    ),
  },
  {
    year: 2,
    title: "Año 2: Gobernanza, Cadena de Suministro y Visibilidad",
    icon: "2️⃣",
    resumen: "Gobernanza, cadena de suministro y visibilidad: SCA bloqueante, cambios formalizados, logs centralizados y correlación.",
    detalle: (
      <>
        <p className="mb-2">
          La segunda fase se enfoca en estandarizar procesos y establecer la trazabilidad necesaria para auditoría y gobernanza.
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>Mitigación del riesgo CR-02 (Librería de terceros vulnerable) implementando análisis de composición de software (SCA) bloqueante en el pipeline.</li>
          <li>Gestión de cambios formalizada para atajar el riesgo CR-09 (Cambios sin control formal), exigiendo aprobación formal (RFC) y Policy-as-Code para modificaciones críticas.</li>
          <li>Solución de la trazabilidad incompleta (CR-12) centralizando logs en un SIEM, extendiendo su retención y configurando reglas de correlación para detectar anomalías.</li>
        </ul>
        <p className="text-xs text-muted-foreground">Enfoque en riesgos: CR-02, CR-09, CR-12.</p>
      </>
    ),
  },
  {
    year: 3,
    title: "Año 3: Automatización Avanzada y Ciber-resiliencia Total",
    icon: "3️⃣",
    resumen: "Automatización avanzada y ciber-resiliencia total: identidades efímeras, JIT, UEBA, restauraciones automatizadas.",
    detalle: (
      <>
        <p className="mb-2">
          El año final se dedica a la optimización y la implementación de controles avanzados que eliminan las causas raíz de los riesgos.
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>Evolución de la gestión de identidades hacia credenciales efímeras y Just-in-Time (JIT), eliminando tokens estáticos y de larga duración (reduce CR-01, previene MitM interno CR-10).</li>
          <li>Prevención de exfiltración de información sensible (CR-08) mediante User and Entity Behavior Analytics (UEBA) para detección predictiva de patrones anómalos, incluso con credenciales legítimas.</li>
          <li>Capacidad de recuperación garantizada a través de pruebas de restauración trimestrales automatizadas, asegurando cumplimiento de RTO y RPO.</li>
        </ul>
        <p className="text-xs text-muted-foreground">Enfoque en riesgos: CR-01, CR-08, CR-10.</p>
      </>
    ),
  },
]

const badge = (text: string, color: string) => (
  <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold bg-${color}-100 text-${color}-700 dark:bg-${color}-900 dark:text-${color}-200 mr-2`}>
    {text}
  </span>
)

export function ApplicabilitySection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [selectedControl, setSelectedControl] = useState<typeof controlsData[0] | null>(null)
  const [selectedYear, setSelectedYear] = useState<typeof roadmapData[0] | null>(null)

  return (
    <section id="applicability" className="bg-muted/30 py-20 dark:bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
            Estado esperado a 3 años
          </h2>
          <p className="mb-3 text-pretty text-muted-foreground">
            Para el año 2028, el proceso de <strong>Automatización en la creación de repositorios</strong> evolucionará de un estado de protección reactiva y manual a una gobernanza automatizada, inmutable y predictiva.
          </p>
          <ul className="space-y-2 mb-8">
            <li className="flex items-center">
              <span className="inline-block w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
              <span className="text-sm text-gray-600 dark:text-gray-300">2025: Controles parciales, secretos manuales, backups in situ, monitoreo simple.</span>
            </li>
            <li className="flex items-center">
              <span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-2"></span>
              <span className="text-sm text-gray-600 dark:text-gray-300">2028: Identidades efímeras (Zero Trust), infraestructura inmutable, monitoreo UEBA.</span>
            </li>
          </ul>

          <div className="space-y-4">
            {/* Declaración de Aplicabilidad */}
            <div className="border rounded-lg shadow-sm bg-gray-50 dark:bg-card dark:border-border transition-all duration-300">
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-lg font-semibold focus:outline-none transition-colors hover:bg-gray-100 dark:hover:bg-muted"
                onClick={() => setOpenIndex(openIndex === 0 ? null : 0)}
                aria-expanded={openIndex === 0}
              >
                <span className="flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Declaración de Aplicabilidad: Estado Esperado (3 Años)
                </span>
                <span className="ml-4 text-2xl">{openIndex === 0 ? "−" : "+"}</span>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${openIndex === 0 ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                {openIndex === 0 && (
                  <div className="px-6 pb-6 pt-2 animate-fade-in">
                    <div className="mb-2">{badge("Dominio A.5", "green")}<span className="font-semibold">Controles Organizacionales</span></div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {controlsData.filter(c => c.dominio === "A.5").map((control, idx) => (
                        <li
                          key={control.nombre}
                          className="bg-green-50 dark:bg-green-900 rounded p-3 flex items-start shadow-sm cursor-pointer hover:bg-green-100 dark:hover:bg-green-800 transition"
                          onClick={() => setSelectedControl(control)}
                        >
                          <span className="mt-1 mr-2">{control.icon}</span>
                          <div>
                            <span className="font-bold">{control.nombre}:</span> {control.resumen}
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mb-2">{badge("Dominio A.8", "blue")}<span className="font-semibold">Controles Tecnológicos</span></div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {controlsData.filter(c => c.dominio === "A.8").map((control, idx) => (
                        <li
                          key={control.nombre}
                          className="bg-blue-50 dark:bg-blue-900 rounded p-3 flex items-start shadow-sm cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-800 transition"
                          onClick={() => setSelectedControl(control)}
                        >
                          <span className="mt-1 mr-2">{control.icon}</span>
                          <div>
                            <span className="font-bold">{control.nombre}:</span> {control.resumen}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            {/* Hoja de Ruta */}
            <div className="border rounded-lg shadow-sm bg-gray-50 dark:bg-card dark:border-border transition-all duration-300">
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-lg font-semibold focus:outline-none transition-colors hover:bg-gray-100 dark:hover:bg-muted"
                onClick={() => setOpenIndex(openIndex === 1 ? null : 1)}
                aria-expanded={openIndex === 1}
              >
                <span className="flex items-center">
                  <svg className="w-6 h-6 text-yellow-500 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3v4h6v-4c0-1.657-1.343-3-3-3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m6.364 1.636l-1.414 1.414M22 12h-2m-1.636 6.364l-1.414-1.414M12 22v-2m-6.364-1.636l1.414-1.414M2 12h2m1.636-6.364l1.414 1.414" />
                  </svg>
                  Hoja de Ruta de Implementación
                </span>
                <span className="ml-4 text-2xl">{openIndex === 1 ? "−" : "+"}</span>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${openIndex === 1 ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                {openIndex === 1 && (
                  <div className="px-6 pb-6 pt-2 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {roadmapData.map((year, idx) => (
                        <div
                          key={year.year}
                          className={`rounded-lg p-4 shadow flex flex-col items-center cursor-pointer transition hover:bg-yellow-100 dark:hover:bg-yellow-900 ${idx === 0 ? "bg-yellow-50 dark:bg-yellow-900" : idx === 1 ? "bg-yellow-100 dark:bg-yellow-800" : "bg-yellow-200 dark:bg-yellow-700"}`}
                          onClick={() => setSelectedYear(year)}
                        >
                          <span className={`text-3xl mb-2 ${idx === 0 ? "text-yellow-500" : idx === 1 ? "text-yellow-600" : "text-yellow-700"}`}>{year.icon}</span>
                          <span className="font-bold mb-1 text-center">{year.title}</span>
                          <span className="text-sm text-yellow-900 dark:text-yellow-200 text-center">{year.resumen}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Resumen de Valor */}
            <div className="border rounded-lg shadow-sm bg-gray-50 dark:bg-card dark:border-border transition-all duration-300">
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-lg font-semibold focus:outline-none transition-colors hover:bg-gray-100 dark:hover:bg-muted"
                onClick={() => setOpenIndex(openIndex === 2 ? null : 2)}
                aria-expanded={openIndex === 2}
              >
                <span className="flex items-center">
                  <svg className="w-6 h-6 text-purple-500 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3v4h6v-4c0-1.657-1.343-3-3-3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m6.364 1.636l-1.414 1.414M22 12h-2m-1.636 6.364l-1.414-1.414M12 22v-2m-6.364-1.636l1.414-1.414M2 12h2m1.636-6.364l1.414 1.414" />
                  </svg>
                  Resumen de Valor
                </span>
                <span className="ml-4 text-2xl">{openIndex === 2 ? "−" : "+"}</span>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${openIndex === 2 ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                {openIndex === 2 && (
                  <div className="px-6 pb-6 pt-2 animate-fade-in">
                    <div className="bg-purple-50 dark:bg-purple-900 border-l-4 border-purple-400 dark:border-purple-600 p-4 rounded shadow flex items-center">
                      <span className="text-purple-500 text-3xl mr-4">⭐</span>
                      <span>
                        Al completar este plan a 3 años, el <strong>Banco de Bogotá</strong> mitigará los riesgos de exposición de propiedad intelectual y credenciales privilegiadas, pasando de un nivel de riesgo <span className="font-bold text-purple-700 dark:text-purple-200">"Alto"</span> a <span className="font-bold text-purple-700 dark:text-purple-200">"Bajo"</span> o <span className="font-bold text-purple-700 dark:text-purple-200">"Muy Bajo"</span>, con controles preventivos y automatizados que garantizan la gobernanza en su transformación digital.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedControl} onOpenChange={() => setSelectedControl(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">{selectedControl?.icon}</span>
              <span>{selectedControl?.nombre}</span>
            </DialogTitle>
            <DialogDescription>
              <span className="font-semibold">Dominio:</span> {selectedControl?.dominio}
            </DialogDescription>
          </DialogHeader>
          {selectedControl && (
            <div className="space-y-4 mt-2">
              <div>
                <p className="font-semibold text-sm text-gray-700 dark:text-gray-200 mb-1">Estado Actual</p>
                <p className="text-sm text-muted-foreground">{selectedControl.estadoActual}</p>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-700 dark:text-gray-200 mb-1">Estado Esperado (Meta 3 años)</p>
                <p className="text-sm text-green-700 dark:text-green-300">{selectedControl.estadoEsperado}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedYear} onOpenChange={() => setSelectedYear(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">{selectedYear?.icon}</span>
              <span>{selectedYear?.title}</span>
            </DialogTitle>
          </DialogHeader>
          {selectedYear && (
            <div className="space-y-2 mt-2">
              {selectedYear.detalle}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}