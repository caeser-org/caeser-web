import type { APIRoute } from "astro";
import { getOrderedDocs, sections } from "../lib/llms";

const SUMMARY =
  "Caeser is a Go CI investigation engine. It reads a failed CI run, traces the failure through the checked-out source, and updates one pull-request comment with the failure, the evidence, and the functions most worth inspecting. Go only; model analysis is optional.";

export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? "";
  const { ordered, link } = await getOrderedDocs(origin);

  const blocks = sections.map((section) => {
    const items = section.ids.map(link).filter(Boolean).join("\n");
    return `## ${section.title}\n${items}`;
  });

  const releases = ordered
    .filter((doc) => doc.id.startsWith("docs/releases/"))
    .map((doc) => link(doc.id))
    .filter(Boolean)
    .join("\n");
  if (releases) blocks.push(`## Releases\n${releases}`);

  blocks.push(
    `## Optional\n- [Full documentation](${origin}/llms-full.txt): Every documentation page in one plain-text file.`,
  );

  const body = `# Caeser\n\n> ${SUMMARY}\n\n${blocks.join("\n\n")}\n`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
