"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/github";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SidebarNav } from "./sidebar-nav";
import { CONFIG } from "@/lib/config";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/60 backdrop-blur-xl">
      {/* Linha de glow no topo */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />

      <div className="mx-auto flex h-20 max-w-[1600px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-72 border-border bg-background p-0"
          >
            <SheetHeader className="border-b border-border p-4">
              <SheetTitle className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Sprints
              </SheetTitle>
            </SheetHeader>
            <div className="p-4">
              <SidebarNav />
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo + título do curso (2 linhas) */}
        <Link href="/" className="group flex items-center gap-3">
          {/* Logo PNG (rede neural dentro de chevrons) */}
          <span className="relative flex h-12 w-12 shrink-0 items-center justify-center transition-transform group-hover:scale-105">
            <Image
              src="/logo-harness.png"
              alt="Logo Harness"
              width={48}
              height={48}
              priority
              className="relative z-10 drop-shadow-[0_0_12px_rgba(167,139,250,0.5)]"
            />
            {/* Glow violeta ambiente */}
            <span
              aria-hidden
              className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-violet-500/40 via-fuchsia-500/30 to-rose-500/20 opacity-60 blur-xl transition-opacity group-hover:opacity-100"
            />
          </span>

          {/* Texto do curso */}
          <div className="hidden flex-col leading-none sm:flex">
            <span className="text-[15px] font-bold tracking-tight text-foreground">
              {CONFIG.cursoNomeCompleto}
            </span>
            <span className="mt-1 text-[11px] font-medium text-muted-foreground">
              {CONFIG.cursoSubtitulo}
            </span>
          </div>
          {/* Mobile fallback */}
          <span className="text-sm font-bold tracking-tight sm:hidden">
            Harness<span className="text-violet-400">.</span>
          </span>
        </Link>

        <div className="flex-1" />

        {/* Nav central */}
        <nav className="hidden items-center gap-1 text-sm md:flex">
          <Link
            href="/sprint/1"
            className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Sprints
          </Link>
          <Link
            href="/comecar"
            className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Começar
          </Link>
          <Link
            href="/glossario"
            className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Glossário
          </Link>
          <Link
            href="/sobre"
            className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Sobre
          </Link>
        </nav>

        {/* GitHub link */}
        <a
          href={CONFIG.learningHarnessUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Repositório no GitHub"
          className="hidden h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-all hover:bg-muted hover:text-foreground sm:inline-flex"
        >
          <GithubIcon className="h-4 w-4" />
        </a>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Alternar tema"
          className="text-muted-foreground"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        {/* CTA */}
        <Link
          href="/sprint/1"
          className="group hidden items-center gap-1.5 rounded-md gradient-bg px-4 py-2 text-xs font-semibold text-white shadow-md shadow-violet-500/30 transition-all hover:shadow-lg hover:shadow-violet-500/50 sm:inline-flex"
        >
          Começar Sprint 1
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </header>
  );
}
