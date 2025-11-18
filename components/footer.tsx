"use client";

import { Shield, Github, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="border-t border-border bg-muted/30">
            <div className="container mx-auto px-4 py-12">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-8 md:grid-cols-3">
                        <div>
                            <div className="mb-4 flex items-center gap-2">
                                <Shield className="h-6 w-6 text-primary" />
                                <span className="text-lg font-bold">MGSI</span>
                            </div>
                            <p className="text-pretty text-sm text-muted-foreground">
                                Proyecto de Metodología de Gestión de Riesgos de
                                Seguridad de la Información para el Banco de
                                Bogotá.
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-4 font-semibold">Universidad</h3>
                            <p className="text-sm text-muted-foreground">
                                Universidad Distrital
                                <br />
                                Francisco José de Caldas
                                <br />
                                Facultad de Ingeniería
                                <br />
                                Maestría en Gestión y Seguridad
                                <br />
                                de la Información
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-4 font-semibold">Recursos</h3>
                            <div className="space-y-2">
                                <Button
                                    variant="ghost"
                                    className="h-auto w-full justify-start p-0 text-sm font-normal text-muted-foreground hover:text-foreground"
                                    onClick={() => {
                                        const link =
                                            document.createElement("a");
                                        link.href =
                                            "/metodologia-gestion-riesgos.pdf";
                                        link.download =
                                            "Metodología-Gestión-Riesgos-Banco-de-Bogotá.pdf";
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }}
                                >
                                    <FileDown className="mr-2 h-4 w-4" />
                                    Descargar documento PDF
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="h-auto w-full justify-start p-0 text-sm font-normal text-muted-foreground hover:text-foreground"
                                    onClick={() => {
                                        window.open(
                                            "https://github.com/pulidxxx/control-de-riesgos-mgsi",
                                            "_blank"
                                        );
                                    }}
                                >
                                    <Github className="mr-2 h-4 w-4" />
                                    Ver en GitHub
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 border-t border-border pt-8">
                        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
                            <p>
                                © 2025 Universidad Distrital Francisco José de
                                Caldas. Todos los derechos reservados.
                            </p>
                            <p>
                                Profesor: Miguel Ángel Leguizamón Páez |
                                Diciembre 2025
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
