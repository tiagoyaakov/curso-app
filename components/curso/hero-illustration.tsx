"use client";

import { motion } from "framer-motion";

/**
 * Ilustração do hero: agente → harness → sistema.
 * SVG vetor estilizado com glow violeta e animações sutis.
 */
export function HeroIllustration() {
  return (
    <div className="relative aspect-square w-full max-w-md">
      {/* Glow ambiente atrás */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-3/4 w-3/4 rounded-full bg-gradient-to-br from-violet-500/30 via-fuchsia-500/30 to-rose-500/30 blur-3xl" />
      </div>

      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        role="img"
        aria-label="Diagrama: agente propõe ação, harness valida, sistema executa"
      >
        <defs>
          {/* Gradient violeta → fuchsia → rose */}
          <linearGradient id="grad-vfr" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="50%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>

          {/* Gradient violeta sólido */}
          <linearGradient id="grad-v" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>

          {/* Glow */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Glow forte */}
          <filter id="glow-strong" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Nó AGENTE (LLM, esquerda) */}
        <motion.g
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <circle
            cx="60"
            cy="200"
            r="36"
            fill="url(#grad-v)"
            filter="url(#glow)"
            opacity="0.9"
          />
          <circle cx="60" cy="200" r="36" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
          {/* "olho" do agente */}
          <circle cx="52" cy="195" r="3" fill="#fff" />
          <circle cx="68" cy="195" r="3" fill="#fff" />
          {/* Sorriso/mouth = barra de carga */}
          <rect x="48" y="208" width="24" height="2" rx="1" fill="#fff" opacity="0.6" />
          <text
            x="60"
            y="266"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="#a78bfa"
            fontFamily="var(--font-sans), system-ui"
          >
            AGENTE
          </text>
          <text
            x="60"
            y="280"
            textAnchor="middle"
            fontSize="9"
            fill="#71717a"
            fontFamily="var(--font-sans), system-ui"
          >
            propõe
          </text>
        </motion.g>

        {/* Seta agente → harness */}
        <motion.g
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.path
            d="M 100 200 L 160 200"
            stroke="url(#grad-vfr)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
          {/* Ponta */}
          <path
            d="M 156 195 L 162 200 L 156 205"
            stroke="url(#grad-vfr)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Tag "proposta" */}
          <rect
            x="105"
            y="180"
            width="50"
            height="14"
            rx="7"
            fill="#0f0f17"
            stroke="#a78bfa"
            strokeWidth="0.5"
          />
          <text
            x="130"
            y="190"
            textAnchor="middle"
            fontSize="8"
            fill="#c4b5fd"
            fontFamily="var(--font-mono), monospace"
          >
            proposta
          </text>
        </motion.g>

        {/* HARNESS — diamante central */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Pulse glow */}
          <motion.circle
            cx="200"
            cy="200"
            r="60"
            fill="url(#grad-vfr)"
            opacity="0.25"
            animate={{
              r: [60, 75, 60],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Diamante */}
          <polygon
            points="200,150 250,200 200,250 150,200"
            fill="url(#grad-vfr)"
            filter="url(#glow-strong)"
          />
          <polygon
            points="200,150 250,200 200,250 150,200"
            fill="none"
            stroke="#fff"
            strokeWidth="1.5"
            opacity="0.4"
          />
          {/* Ícone escudo */}
          <path
            d="M 200 178 L 215 185 L 215 200 C 215 210 208 218 200 222 C 192 218 185 210 185 200 L 185 185 Z"
            fill="#fff"
            opacity="0.95"
          />
          <text
            x="200"
            y="275"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#fff"
            fontFamily="var(--font-sans), system-ui"
          >
            HARNESS
          </text>
          <text
            x="200"
            y="289"
            textAnchor="middle"
            fontSize="9"
            fill="#71717a"
            fontFamily="var(--font-sans), system-ui"
          >
            valida
          </text>
        </motion.g>

        {/* Seta harness → sistema */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <motion.path
            d="M 250 200 L 310 200"
            stroke="url(#grad-vfr)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          />
          <path
            d="M 306 195 L 312 200 L 306 205"
            stroke="url(#grad-vfr)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Tag "ok" */}
          <rect
            x="262"
            y="180"
            width="36"
            height="14"
            rx="7"
            fill="#0f0f17"
            stroke="#34d399"
            strokeWidth="0.5"
          />
          <text
            x="280"
            y="190"
            textAnchor="middle"
            fontSize="8"
            fill="#34d399"
            fontFamily="var(--font-mono), monospace"
          >
            ✓ ok
          </text>
        </motion.g>

        {/* Sistema (direita) */}
        <motion.g
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {/* Servidor */}
          <rect
            x="320"
            y="170"
            width="60"
            height="60"
            rx="6"
            fill="#14141d"
            stroke="#27272a"
            strokeWidth="1.5"
          />
          <rect x="328" y="178" width="44" height="4" rx="2" fill="#a78bfa" opacity="0.5" />
          <rect x="328" y="186" width="32" height="4" rx="2" fill="#71717a" />
          <rect x="328" y="194" width="40" height="4" rx="2" fill="#71717a" />
          <circle cx="370" cy="220" r="3" fill="#34d399" />
          <circle cx="370" cy="220" r="3" fill="#34d399">
            <animate
              attributeName="opacity"
              values="1;0.3;1"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <text
            x="350"
            y="252"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="#a78bfa"
            fontFamily="var(--font-sans), system-ui"
          >
            SISTEMA
          </text>
          <text
            x="350"
            y="266"
            textAnchor="middle"
            fontSize="9"
            fill="#71717a"
            fontFamily="var(--font-sans), system-ui"
          >
            executa
          </text>
        </motion.g>

        {/* Seta de retorno (curva) — bloqueia */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <path
            d="M 200 140 Q 130 110 70 170"
            stroke="#f43f5e"
            strokeWidth="1.5"
            strokeDasharray="3,3"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />
          <text
            x="130"
            y="105"
            textAnchor="middle"
            fontSize="8"
            fill="#f43f5e"
            fontFamily="var(--font-mono), monospace"
            opacity="0.7"
          >
            ✗ bloqueado
          </text>
        </motion.g>

        {/* Pontos decorativos (estrelas/partículas) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <circle cx="40" cy="80" r="1.5" fill="#a78bfa" opacity="0.6" />
          <circle cx="370" cy="60" r="2" fill="#e879f9" opacity="0.5" />
          <circle cx="350" cy="320" r="1" fill="#fb7185" opacity="0.6" />
          <circle cx="100" cy="340" r="1.5" fill="#a78bfa" opacity="0.4" />
          <circle cx="50" cy="280" r="1" fill="#e879f9" opacity="0.5" />
        </motion.g>
      </svg>
    </div>
  );
}
