import type { APIRoute } from "astro";
import { docTitle, docUrl, getOrderedDocs } from "../lib/llms";

export const GET: APIRoute = async ({ site }) => {
  const origin = site?.origin ?? "";
  const { ordered } = await getOrderedDocs(origin);

  const title = "# Caeser — full documentation";
  const body = ordered
    .map(
      (doc) =>
        `# ${docTitle(doc)}\n\nSource: ${docUrl(origin, doc.id)}\n\n${(doc.body ?? "").trim()}\n`,
    )
    .join("\n---\n\n");

  return new Response(`${title}\n\n${body}`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
