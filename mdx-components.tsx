import type { MDXComponents } from "mdx/types";
import { Diagrama } from "@/components/curso/diagrama";
import { PedidoAoAgente } from "@/components/curso/pedido-ao-agente";
import { Checklist } from "@/components/curso/checklist";
import { Reflexao } from "@/components/curso/reflexao";
import { PTP } from "@/components/curso/ptp";
import { Terminal } from "@/components/curso/terminal";
import { TermoGlossario } from "@/components/curso/termo-glossario";
import { TermoInline } from "@/components/curso/termo-inline";
import { Aviso } from "@/components/curso/aviso";
import { InfoSprint } from "@/components/curso/info-sprint";
import { AvaliadorIA } from "@/components/curso/avaliador-ia";

/**
 * Componentes disponíveis automaticamente em qualquer arquivo MDX.
 * Você pode usar <Diagrama>, <Checklist>, etc. direto no .mdx sem importar.
 *
 * <Termo k="..."> abre definição INLINE (expansão no contexto).
 * <TermoTooltip k="..."> usa tooltip + link para página (versão antiga).
 */
const courseComponents: MDXComponents = {
  Diagrama,
  PedidoAoAgente,
  Checklist,
  Reflexao,
  PTP,
  Terminal,
  Termo: TermoInline,
  TermoTooltip: TermoGlossario,
  Aviso,
  InfoSprint,
  AvaliadorIA,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...courseComponents,
  };
}
