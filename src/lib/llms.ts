import { getCollection, type CollectionEntry } from "astro:content";

// Curated reading order for the non-release docs, mirroring the Starlight sidebar.
export const sections = [
  {
    title: "Start here",
    ids: ["docs", "docs/installation", "docs/ci-integration", "docs/github-action"],
  },
  {
    title: "Read the results",
    ids: ["docs/reports", "docs/capabilities", "docs/external-validation"],
  },
  {
    title: "Understand the engine",
    ids: [
      "docs/runtime-architecture",
      "docs/sandbox-execution",
      "docs/supported-environments",
      "docs/environment-adapters",
      "docs/diagnosis-evaluation",
    ],
  },
];

export type Doc = CollectionEntry<"docs">;

export const docUrl = (origin: string, id: string) =>
  `${origin}/${id.replace(/\/index$/, "")}/`;

export const docTitle = (doc: Doc) => doc.data.title ?? doc.id;

const rank = new Map<string, number>();
sections.forEach((section, si) =>
  section.ids.forEach((id, i) => rank.set(id, si * 1000 + i)),
);

export async function getOrderedDocs(origin: string) {
  const docs = await getCollection("docs");
  const byId = new Map(docs.map((doc) => [doc.id, doc]));
  const weight = (id: string) => rank.get(id) ?? (id.startsWith("docs/releases/") ? 9000 : 5000);
  const ordered = [...docs].sort((a, b) => {
    const diff = weight(a.id) - weight(b.id);
    // Within the trailing group (releases) show the newest first.
    return diff !== 0 ? diff : b.id.localeCompare(a.id);
  });
  const link = (id: string) => {
    const doc = byId.get(id);
    if (!doc) return null;
    const description = doc.data.description ? `: ${doc.data.description}` : "";
    return `- [${docTitle(doc)}](${docUrl(origin, id)})${description}`;
  };
  return { byId, ordered, link };
}
