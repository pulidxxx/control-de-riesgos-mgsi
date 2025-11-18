import { Shield, FileCode2, Database } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/20">
              <Shield className="h-10 w-10 text-primary" />
            </div>
          </div>
          
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Universidad Distrital Francisco José de Caldas
          </div>
          
          <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Metodología de Gestión de Riesgos
          </h1>
          
          <p className="mb-6 text-balance text-xl text-muted-foreground sm:text-2xl md:text-3xl">
            Seguridad de la Información
          </p>
          
          <div className="mb-12 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>Banco de Bogotá</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-muted-foreground/50" />
            <div className="flex items-center gap-2">
              <FileCode2 className="h-4 w-4" />
              <span>Automatización de Repositorios</span>
            </div>
          </div>
          
          <div className="mb-8 space-y-2 text-sm text-muted-foreground">
            <p className="font-medium">Autores:</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
              <span>Juan David Mendoza Vargas - 20211020061</span>
              <span>Andrés Felipe Pulido Suárez - 20211020049</span>
              <span>Juan Sebastián Colorado Caro - 20202673001</span>
              <span>Laura Daniela Cubillos Escobar - 20211020045</span>
              <span>Hamilton Camilo Espitia Rozo - 20211020038</span>
            </div>
            <p className="mt-4">
              <span className="font-medium">Profesor:</span> Miguel Ángel Leguizamón Páez
            </p>
            <p className="text-xs">Diciembre de 2025</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#intro"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Explorar Proyecto
            </a>
            <a
              href="#risks"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Ver Ciber-riesgos
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-8 w-5 rounded-full border-2 border-primary/30">
          <div className="mx-auto mt-2 h-2 w-1 rounded-full bg-primary/50" />
        </div>
      </div>
    </section>
  )
}
