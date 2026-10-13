import raw from "../../content/notes/.syndication.json";

interface SyndicationTarget {
  url: string;
  postedAt: string;
}

export interface NoteSyndication {
  bluesky?: SyndicationTarget & { uri: string };
  mastodon?: SyndicationTarget & { id: string };
}

const state = raw as Record<string, NoteSyndication>;

export const getSyndication = (id: string): NoteSyndication => state[id] ?? {};
