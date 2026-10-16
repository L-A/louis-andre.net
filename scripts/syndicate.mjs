import path from "path";
import fs from "fs/promises";
import { AtpAgent, RichText } from "@atproto/api";
import matter from "gray-matter";
const { read } = matter;

const seg = new Intl.Segmenter("en", { granularity: "grapheme" });
const graphemes = (s) => [...seg.segment(s)].length;

// Should anything actually be committed?
const shouldPost = process.argv.includes("--post");

// --- Load posts

const notesPath = path.join("content", "notes");
const filesList = await fs.readdir(notesPath);

const posts = filesList
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const id = file.slice(0, file.lastIndexOf("."));
    return {
      ...read(path.join(notesPath, file)),
      id,
    };
  })
  .filter((post) => post.data.syndicate !== false && post.data.draft !== true);

// --- Syndication data

const statePath = path.join("content", "notes", ".syndication.json");

const loadState = async () => {
  try {
    return JSON.parse(await fs.readFile(statePath, "utf8"));
  } catch {
    return {};
  }
};

const record = async (state, id, platform, data) => {
  state[id] ??= {};
  state[id][platform] = { ...data, postedAt: new Date().toISOString() };
  await fs.writeFile(statePath, JSON.stringify(state, null, 2) + "\n");
};

// --- Atproto Agent

const { BSKY_API_URL, BSKY_APP_PASSWORD, BSKY_HANDLE } = process.env;
const atAgent = new AtpAgent({
  service: BSKY_API_URL,
});

if (shouldPost) {
  await atAgent.login({
    identifier: BSKY_HANDLE,
    password: BSKY_APP_PASSWORD,
  });
}

const postToBsky = async (text) => {
  const rt = new RichText({ text });
  await rt.detectFacets(atAgent);

  const response = await atAgent.post({
    text: rt.text,
    facets: rt.facets,
    createdAt: new Date().toISOString(),
  }); // {uri} in response
  console.log("Bluesky ✓");
  return response;
};

// --- Mastodon posting (plain request)

let mastodonCharLimit = 500;

const updateMastodonCharLimit = async () => {
  try {
    const response = await fetch(
      `${process.env.MASTODON_INSTANCE_URL}/api/v1/instance`,
    );
    const result = await response.json();
    mastodonCharLimit = result.configuration.statuses.max_characters ?? 500;
  } catch {}
};

const postToMastodon = async (text, lang) => {
  const response = await fetch(
    `${process.env.MASTODON_INSTANCE_URL}/api/v1/statuses`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MASTODON_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: text,
        visibility: "public",
        language: lang,
      }),
    },
  );
  if (response.ok) {
    const data = await response.json(); // {id, url} in response
    console.log("Mastodon ✓");
    return data;
  } else {
    throw new Error(`Mastodon ${response.status}: ${await response.text()}`);
  }
};

// Actual posting

const simulateOrPost = async () => {
  await updateMastodonCharLimit();
  const limit = Math.min(300, mastodonCharLimit);

  const state = await loadState();
  const now = new Date();
  const queue = posts
    .filter((p) => p.data.draft !== true && p.data.syndicate !== false)
    .filter((p) => !(state[p.id]?.bluesky && state[p.id]?.mastodon))
    .filter((p) => p.data.date <= now)
    .sort((a, b) => a.data.date - b.data.date);

  console.log(
    `--- Poasting ${queue.length} ${queue.length > 1 ? "notes" : "note"} ---`,
  );

  for (const note of queue) {
    try {
      const text = note.content.trim();
      const length = graphemes(text);

      if (!shouldPost) {
        console.log(
          note.content,
          `\n--- [dry] (${length}/${limit} characters) - ${note.id}\n`,
        );
        continue;
      }

      // Post length guard (bsky is 300, social.lol is usually 10k)
      if (length > limit) {
        console.warn(`skip ${note.id}: too long`);
        continue;
      } else {
        // Actually post, only if --post is present
        const { uri } = await postToBsky(text);
        await record(state, note.id, "bluesky", {
          uri,
          url:
            "https://bsky.app/profile/louis-andre.net/post/" +
            uri.split("/").pop(),
        });

        const { id, url } = await postToMastodon(text, note.data.lang);
        await record(state, note.id, "mastodon", {
          id,
          url,
        });
      }
    } catch (err) {
      console.error(`${note.id}: ${err.message}`);
    }
  }
};

await simulateOrPost();
