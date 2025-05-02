# File Structure

All of the app code is located in the `/app` directory, which should be considered the root directory for purposes of this section.

- **`/api`** - functions and variables related to calling the PokeAPI.
- **`/components`** - React components that are reused across different views.
- **`/css`** - Global stylesheets loaded as external files.
- **`/img`** - Image assets used across the site.
- **`/pages`** - Components for individual views.
- **`/utilities`** - Hooks and helper functions.
- **`root.tsx`** - The entry point for the React app.
- **`routes.ts`** - Where routes for the app are defined.

Each component is in its own file.

Child components, stylesheets, and assets that are only used for one view are located in the directory with that view. This makes them easier to locate, and reduces the likelihood of phantom assets that are no longer used but remain in the code base.
