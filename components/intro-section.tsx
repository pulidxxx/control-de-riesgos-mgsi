import { Card } from '@/components/ui/card'
import { Shield, Target, TrendingUp } from 'lucide-react'

export function IntroSection() {
  return (
    <section id="intro" className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-balance text-3xl font-bold md:text-4xl">
            Introducción
          </h2>
          
          <div className="prose prose-lg max-w-none space-y-4 text-muted-foreground">
            <p className="text-pretty leading-relaxed">
              La seguridad de la información constituye un pilar fundamental en los procesos de 
              transformación digital, dado que las organizaciones deben garantizar la protección de sus 
              activos tecnológicos frente a posibles incidentes que comprometan su operación. Dentro de 
              este contexto, el <span className="font-semibold text-foreground">Banco de Bogotá</span> ha implementado un proyecto de automatización en la 
              creación de repositorios, con el fin de optimizar la gestión, mejorar la trazabilidad y asegurar 
              la gobernanza de sus desarrollos internos.
            </p>
            
            <p className="text-pretty leading-relaxed">
              Sin embargo, la centralización y automatización de este proceso agrega también algunos 
              riesgos, en especial los relacionados al manejo de credenciales y accesos privilegiados 
              junto con la protección de información confidencial. En este trabajo, se aplicará una 
              metodología de gestión de riesgos con el propósito de identificar, analizar y evaluar dichas 
              amenazas, proponiendo controles que fortalezcan la protección de los activos de 
              información y la continuidad de los servicios de la organización.
            </p>
          </div>
          
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Metodología MAGERIT v3</h3>
              <p className="text-sm text-muted-foreground">
                Análisis y gestión de riesgos según la metodología española MAGERIT versión 3.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Controles ISO 27001:2022</h3>
              <p className="text-sm text-muted-foreground">
                Aplicación de controles del Anexo A de la norma ISO/IEC 27001:2022.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Valoración Cualitativa</h3>
              <p className="text-sm text-muted-foreground">
                Evaluación de impacto y probabilidad con matriz de calor interactiva.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
