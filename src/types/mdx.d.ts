// Augment MDX module types to include named frontmatter exports.
// MDX files in this project export `frontmatter` as a named const.

declare module "*.mdx" {
  import type { ComponentType } from "react";
  // The default export is the rendered MDX component
  const Component: ComponentType;
  export default Component;
  // Named export used by our regulation and glossary loaders
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const frontmatter: any;
}
