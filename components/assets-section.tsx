'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Database, Key, Cog, GitBranch, HardDrive, Network, Server, Users, FileText, ShieldCheck } from 'lucide-react'

const assets = [
  {
    id: 1,
    name: 'Repositorio de código fuente',
    type: 'Datos',
    icon: Database,
    valoracion: {
      confidencialidad: 3,
      integridad: 3,
      disponibilidad: 2,
      autenticidad: 3,
      trazabilidad: 3,
    },
    valorFinal: 'Alto',
    descripcion:
      'Almacén centralizado donde se guarda el código fuente de las aplicaciones del banco.',
  },
  {
    id: 2,
    name: 'Credenciales privilegiadas',
    type: 'Datos',
    icon: Key,
    valoracion: {
      confidencialidad: 3,
      integridad: 3,
      disponibilidad: 3,
      autenticidad: 3,
      trazabilidad: 3,
    },
    valorFinal: 'Alto',
    descripcion:
      'Usuarios y contraseñas con acceso y permisos de administración de repositorios.',
  },
  {
    id: 3,
    name: 'Aplicación de automatización',
    type: 'Software',
    icon: Cog,
    valoracion: {
      confidencialidad: 2,
      integridad: 2,
      disponibilidad: 3,
      autenticidad: 3,
      trazabilidad: 3,
    },
    valorFinal: 'Alto',
    descripcion:
      'Plataforma que gestiona la creación estandarizada de repositorios.',
  },
  {
    id: 4,
    name: 'Controlador de versiones',
    type: 'Software',
    icon: GitBranch,
    valoracion: {
      confidencialidad: 2,
      integridad: 3,
      disponibilidad: 3,
      autenticidad: 3,
      trazabilidad: 3,
    },
    valorFinal: 'Alto',
    descripcion:
      'Software que permite almacenar, versionar y colaborar en el código fuente.',
  },
  {
    id: 5,
    name: 'Sistemas de respaldo',
    type: 'Equipamiento auxiliar',
    icon: HardDrive,
    valoracion: {
      confidencialidad: 2,
      integridad: 3,
      disponibilidad: 3,
      autenticidad: 3,
      trazabilidad: 2,
    },
    valorFinal: 'Alto',
    descripcion:
      'Solución para generar copias de seguridad de los repositorios y configuraciones.',
  },
  {
    id: 6,
    name: 'Red interna corporativa',
    type: 'Redes',
    icon: Network,
    valoracion: {
      confidencialidad: 3,
      integridad: 3,
      disponibilidad: 3,
      autenticidad: 3,
      trazabilidad: 2,
    },
    valorFinal: 'Alto',
    descripcion:
      'Infraestructura de comunicaciones que conecta equipos, aplicaciones y usuarios.',
  },
  {
    id: 7,
    name: 'Centro de datos',
    type: 'Instalaciones',
    icon: Server,
    valoracion: {
      confidencialidad: 2,
      integridad: 3,
      disponibilidad: 3,
      autenticidad: 3,
      trazabilidad: 2,
    },
    valorFinal: 'Alto',
    descripcion:
      'Instalaciones físicas que alojan servidores, redes y sistemas de almacenamiento.',
  },
  {
    id: 8,
    name: 'Desarrolladores',
    type: 'Personas',
    icon: Users,
    valoracion: {
      confidencialidad: 3,
      integridad: 2,
      disponibilidad: 2,
      autenticidad: 3,
      trazabilidad: 1,
    },
    valorFinal: 'Medio',
    descripcion:
      'Colaboradores que utilizan y mantienen los repositorios con proyectos de software.',
  },
  {
    id: 9,
    name: 'Documentación técnica',
    type: 'Datos',
    icon: FileText,
    valoracion: {
      confidencialidad: 1,
      integridad: 3,
      disponibilidad: 2,
      autenticidad: 2,
      trazabilidad: 1,
    },
    valorFinal: 'Medio',
    descripcion:
      'Manuales, guías y procedimientos asociados a la configuración y uso de los repositorios.',
  },
  {
    id: 10,
    name: 'Servicio de autenticación',
    type: 'Servicios',
    icon: ShieldCheck,
    valoracion: {
      confidencialidad: 3,
      integridad: 3,
      disponibilidad: 3,
      autenticidad: 3,
      trazabilidad: 3,
    },
    valorFinal: 'Alto',
    descripcion:
      'Servicio que valida credenciales y controla accesos a repositorios y sistemas asociados.',
  },
]

const criteriaLabels = {
  confidencialidad: 'Confidencialidad',
  integridad: 'Integridad',
  disponibilidad: 'Disponibilidad',
  autenticidad: 'Autenticidad',
  trazabilidad: 'Trazabilidad',
}

const valueLabels: Record<number, string> = {
  1: 'Bajo',
  2: 'Medio',
  3: 'Alto',
}

export function AssetsSection() {
  const [selectedAsset, setSelectedAsset] = useState<(typeof assets)[0] | null>(
    null
  )

  return (
    <section id="assets" className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
            Valoración de Activos
          </h2>
          <p className="mb-12 text-pretty text-muted-foreground">
            Según la metodología MAGERIT v3, cada activo se valora en cinco dimensiones de seguridad.
            Haga clic en cada tarjeta para ver los detalles de valoración.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {assets.map((asset) => {
              const Icon = asset.icon
              return (
                <Card
                  key={asset.id}
                  className="group cursor-pointer p-6 transition-all hover:shadow-lg"
                  onClick={() => setSelectedAsset(asset)}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge
                      variant={
                        asset.valorFinal === 'Alto' ? 'default' : 'secondary'
                      }
                    >
                      {asset.valorFinal}
                    </Badge>
                  </div>
                  <h3 className="mb-2 font-semibold leading-tight">
                    {asset.name}
                  </h3>
                  <p className="mb-3 text-xs text-muted-foreground">
                    Tipo: {asset.type}
                  </p>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {asset.descripcion}
                  </p>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      <Dialog
        open={selectedAsset !== null}
        onOpenChange={() => setSelectedAsset(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedAsset && (
                <>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <selectedAsset.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span>{selectedAsset.name}</span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedAsset && (
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Tipo de activo:</span>{' '}
                  {selectedAsset.type}
                </p>
                <p className="mt-2 text-sm">{selectedAsset.descripcion}</p>
              </div>

              <div>
                <h4 className="mb-4 font-semibold">
                  Criterios de Valoración (MAGERIT v3)
                </h4>
                <div className="space-y-3">
                  {Object.entries(selectedAsset.valoracion).map(
                    ([key, value]) => (
                      <div key={key} className="flex items-center gap-4">
                        <span className="min-w-[140px] text-sm capitalize">
                          {
                            criteriaLabels[
                              key as keyof typeof criteriaLabels
                            ]
                          }
                        </span>
                        <div className="flex flex-1 items-center gap-2">
                          <div className="flex flex-1 gap-1">
                            {[1, 2, 3].map((level) => (
                              <div
                                key={level}
                                className={`h-2 flex-1 rounded-full ${
                                  level <= value
                                    ? 'bg-primary'
                                    : 'bg-muted'
                                }`}
                              />
                            ))}
                          </div>
                          <Badge variant="outline" className="min-w-[60px]">
                            {valueLabels[value]}
                          </Badge>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm">
                  <span className="font-medium">Valor Final del Activo:</span>{' '}
                  <Badge
                    variant={
                      selectedAsset.valorFinal === 'Alto'
                        ? 'default'
                        : 'secondary'
                    }
                    className="ml-2"
                  >
                    {selectedAsset.valorFinal}
                  </Badge>
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
