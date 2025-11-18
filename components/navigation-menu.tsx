"use client";

import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
    { id: "intro", label: "Introducción" },
    { id: "assets", label: "Activos" },
    { id: "risks", label: "Ciber-riesgos" },
    { id: "heatmap", label: "Mapa de Calor" },
    { id: "findings", label: "Hallazgos" },
    { id: "recommendations", label: "Recomendaciones" },
    { id: "charts", label: "Análisis" },
];

export function NavigationMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark");
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsOpen(false);
        }
    };

    return (
        <nav
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${
                scrolled
                    ? "bg-background/95 shadow-md backdrop-blur-sm"
                    : "bg-transparent"
            }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="text-lg font-bold text-primary">
                            MGSI
                        </div>
                        <span className="hidden text-sm text-muted-foreground sm:inline">
                            | Banco de Bogotá
                        </span>
                    </div>

                    <div className="hidden items-center gap-1 md:flex">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                {section.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                        >
                            {theme === "light" ? (
                                <Moon className="h-5 w-5" />
                            ) : (
                                <Sun className="h-5 w-5" />
                            )}
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden sm:inline-flex"
                            aria-label="Download PDF"
                            onClick={() => {
                                const link = document.createElement("a");
                                link.href = "/metodologia-gestion-riesgos.pdf";
                                link.download =
                                    "Metodología-Gestión-Riesgos-Banco-de-Bogotá.pdf";
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }}
                        >
                            <Download className="h-5 w-5" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </div>

                {isOpen && (
                    <div className="border-t border-border py-4 md:hidden">
                        <div className="flex flex-col gap-2">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className="rounded-md px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                    {section.label}
                                </button>
                            ))}
                            <button
                                onClick={() => {
                                    const link = document.createElement("a");
                                    link.href =
                                        "/metodologia-gestion-riesgos.pdf";
                                    link.download =
                                        "Metodología-Gestión-Riesgos-Banco-de-Bogotá.pdf";
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                    setIsOpen(false);
                                }}
                                className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                <Download className="h-4 w-4" />
                                Descargar PDF
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
