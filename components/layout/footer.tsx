import Link from "next/link";
import Image from "next/image";
import { GithubIcon } from "@/components/icons/github";
import { CONFIG } from "@/lib/config";

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-border/60 bg-background/30 py-8">
      {/* Glow sutil na borda superior */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent"
      />
      <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 px-4 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Image
            src="/logo-harness.png"
            alt="Logo Harness"
            width={20}
            height={20}
            className="opacity-90"
          />
          <p>
            <span className="text-foreground">{CONFIG.cursoNomeCompleto}</span>{" "}
            · {CONFIG.cursoSubtitulo}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/comecar"
            className="transition-colors hover:text-violet-300"
          >
            Começar
          </Link>
          <Link
            href="/glossario"
            className="transition-colors hover:text-violet-300"
          >
            Glossário
          </Link>
          <a
            href={CONFIG.learningHarnessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 transition-colors hover:text-violet-300"
            aria-label="Repositório no GitHub"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
