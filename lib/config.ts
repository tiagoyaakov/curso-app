/**
 * Configuração pública do curso.
 *
 * Estas variáveis devem ser definidas no `.env.local` (desenvolvimento) ou nas
 * variáveis de ambiente do Vercel (produção). O placeholder aparece se a env
 * não estiver definida — útil para você notar que precisa configurar.
 */

export const CONFIG = {
  /** URL do repositório learning-harness no GitHub. */
  learningHarnessUrl:
    process.env.NEXT_PUBLIC_LEARNING_HARNESS_URL ||
    "https://github.com/tiagoyaakov/learning-harness",

  /** Identificador "SEU-USUARIO/learning-harness" para mostrar no comando git clone. */
  get learningHarnessSlug() {
    const url = this.learningHarnessUrl;
    return url.replace(/^https?:\/\/github\.com\//, "").replace(/\.git$/, "");
  },

  /** Comando git clone completo. */
  get gitCloneCommand() {
    return `git clone ${this.learningHarnessUrl}.git`;
  },

  /** Comando de setup inicial (clone + cd + npm install). */
  get setupCommands() {
    const slug = this.learningHarnessSlug.split("/")[1];
    return [
      this.gitCloneCommand,
      `cd ${slug}`,
      `npm install`,
    ];
  },

  /** Nome do curso (completo). */
  cursoNomeCompleto: "Curso Engenharia e Arquitetura de Harness",

  /** Subtítulo / domínio. */
  cursoSubtitulo: "Desenvolvimento de Sistemas Driven A.I.",

  /** Autor do curso. */
  autor: {
    nome: "Tiago Yaakov",
    github: "https://github.com/tiagoyaakov",
  },
};
