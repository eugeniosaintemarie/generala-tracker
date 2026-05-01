export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-muted-foreground p-4 mt-auto">
      <div className="container mx-auto">
        <p className="text-center">
          <a
            data-repo="."
            data-query=""
            href="#"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors"
            title="Generala tracker"
          >
            ∃ugenio © {currentYear}
          </a>
        </p>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: [
            '(() => {',
            '  const siteBaseURL = "https://eugeniosaintemarie.github.io/".replace(/\\/$/, "");',
            '  const buildRepoURL = (repoName, query = "") => {',
            '    const url = new URL(repoName + "/", siteBaseURL + "/");',
            '    if (query) {',
            '      url.search = query.startsWith("?") ? query : "?" + query;',
            '    }',
            '    return url.toString();',
            '  };',
            '  document.querySelectorAll("[data-repo]").forEach((link) => {',
            '    const repoName = link.dataset.repo;',
            '    if (!repoName) {',
            '      return;',
            '    }',
            '    link.href = buildRepoURL(repoName, link.dataset.query || "");',
            '  });',
            '})();',
          ].join("\n"),
        }}
      />
    </footer>
  )
}