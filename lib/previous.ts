// Earlier projects that Prima's current partners were associated with.
// TODO: replace these placeholders with the projects from the client's PDF brochures.
// Keep each entry short — the page is an overview, not a project showcase.

export type PreviousProject = {
  name: string | null; // null = not yet supplied (shown as "Details to be updated")
  type?: string; // e.g. "Residential", "Commercial"
  location?: string;
  image?: string; // optional, e.g. "/previous/<slug>.jpg"
};

export const previousProjects: PreviousProject[] = [
  { name: null },
  { name: null },
  { name: null },
  { name: null },
];
