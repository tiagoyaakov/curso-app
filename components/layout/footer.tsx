import Link from "next/link";
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
          <span className="flex h-5 w-5 items-center justify-center rounded-sm gradient-bg">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-2.5 w-2.5 text-white"
            >
              <path
                d="M12 3 L20 7 L20 12 C20 16 16 19 12 21 C8 19 4 16 4 12 L4 7 Z"
                fill="currentColor"
              />
            </svg>
          </span>
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
