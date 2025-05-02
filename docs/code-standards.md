# Code Standards

The code base follows some rough guidelines.

The most polarizing choice is likely the use of tabs over spaces, [for accessibility reasons](https://www.reddit.com/r/javascript/comments/c8drjo/nobody_talks_about_the_real_reason_to_use_tabs/).


## JavaScript

- Use spaces between function names and parentheses, and parentheses and curly brackets. (`function hell () {}`, _not_ `function hello() {}`)
- Use function declarations most of the time. Use arrow functions for callback functions or when the context of `this` should be preserved.
- Avoid `default` exports. [Don't make me think.](https://en.wikipedia.org/wiki/Don't_Make_Me_Think)
- Use trailing commas to avoid future issues when adding more items.
- Favor clear and verbose function and variables names over short but less obvious ones.
- Avoid nesting ternary operators. They get very confusing, very quickly.

The project does _not_ currently have an ESLint styles defined, though it would benefit from some in the long term.


## CSS

- Use global CSS for common, share styles: colors and CSS variables, typography, general layout, a reusable grid, and utility classes.
- Use CSS imports for styles that only affect one view or component.
- Where appropriate, use CSS variables to let developer easily extend or modify behavior.
- When possible, style HTML elements rather than writing classes.
- Classes follow a `.base`/`.base-modifier` pattern (think of it as a massively simplified BEM).
- For clarity, favor verbose selectors over short and clever ones.
- Use data attributes or ARIA attributes to target state rather than classes.

Rather than one concatenated global CSS file, the app loads a handful of smaller files.

The makes maintenance a lot easier, and [from my own testing](https://gomakethings.com/modular-css-and-different-ways-to-structure-your-stylesheets/), has no meaningful performance impact.

Similarly, files are not minified. With HTTP/2 and server-enabled gzipping, unminified files are nearly as small as their minified counterparts.


## HTML

Several components include elements with the `data-testid` attribute.

These are used as [a selector for more accurate testing](https://playwright.dev/docs/locators#locate-by-test-id). They should not be removed, nor should they be used for styling.
