import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://astroship.web3templates.com",
  prefetch: { prefetchAll: true, defaultStrategy: "viewport" },
  integrations: [
    starlight({
      title: "caeser.",
      description:
        "Detailed documentation for Caeser, the Go CI investigation engine.",
      favicon: "/caeser-icon.svg",
      customCss: ["./src/styles/starlight-theme.css"],
      head: [
        {
          tag: "link",
          attrs: {
            rel: "alternate",
            type: "text/plain",
            href: "/llms.txt",
            title: "llms.txt",
          },
        },
      ],
      expressiveCode: {
        // Keep code styles with rendered Markdown so cached content cannot
        // reference a stylesheet hash that is absent after a rebuild.
        emitExternalStylesheet: false,
        themes: ["github-light"],
        defaultProps: { frame: "none" },
        styleOverrides: {
          borderColor: "#e3e3de",
          borderRadius: "6px",
          codeBackground: "#f4f4f1",
          codeFontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          codeFontSize: "0.875rem",
          codeLineHeight: "1.65",
          frames: { frameBoxShadowCssValue: "none" },
        },
      },
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/caeser-org/ceaser" },
      ],
      components: {
        SiteTitle: "./src/components/docs/SiteTitle.astro",
      },
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 2 },
      sidebar: [
        { label: "Start here", items: [
          { label: "Overview", slug: "docs" },
          "docs/installation", "docs/ci-integration", "docs/github-action",
        ] },
        { label: "Read the results", items: [
          "docs/reports", "docs/capabilities", "docs/external-validation",
        ] },
        { label: "Understand the engine", items: [
          "docs/runtime-architecture", "docs/sandbox-execution",
          "docs/supported-environments", "docs/environment-adapters",
          "docs/diagnosis-evaluation",
        ] },
        { label: "Releases", collapsed: true, items: [
          { label: "v0.2.0", slug: "docs/releases/v020" },
          { label: "v0.1.2", slug: "docs/releases/v012" },
          { label: "v0.1.1", slug: "docs/releases/v011" },
          { label: "v0.1.0", slug: "docs/releases/v010" },
        ] },
        { label: "Historical notes", collapsed: true, items: [
          "docs/gap-analysis-staged-investigation",
          { label: "B1 investigation build", slug: "docs/releases/b1" },
          { label: "v7", slug: "docs/releases/v7" },
          { label: "v8", slug: "docs/releases/v8" },
          { label: "v9", slug: "docs/releases/v9" },
          { label: "v9.1", slug: "docs/releases/v91" },
          { label: "v9.2 (proposed)", slug: "docs/releases/v92" },
        ] },
      ],
    }),
    mdx(),
    sitemap(),
    icon(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
