# Architecture Decisions

In this project, I made several opinionated decisions about the architecture.

While I think they were the right choices, they're also just _one possible choice_, and other approaches would work just as well.


## Keep code as close to where its used as possible

In non-React projects, I generally prefer to keep like-code together: all of the CSS in one place, all of the JavaScript in another, and so on.

But in a React project, I find it's helpful from a code maintenance perspective to keep code as close to where it's used as possible.

- CSS and utility functions that are used for just one component sit in a subdirectory with that component's JSX.
- Subcomponents for one page sit in a subdirectory for that page rather than a global `/components` directory.
- Components or CSS that's shared _across_ various components or pages lives in global directories under the root.

The downside of this approach is that it can sometimes result in a bit more mental overhead about where to locate certain files. 

But the benefits you get in exchange are...

- You're less likely to end up with "orphan code." If you remove or modify a component, the stuff that's used with it is in the same directory and less likely to be forgotten.
- You're less likely to accidentally delete code that's shared across various components. If it lives in the root, you can generally assume it's used in multiple places and shouldn't just be deleted or modified without checking for downstream interactions.


## Call APIs in the first child component where they're used

The [PokeAPI](https://pokeapi.co) has many endpoints that return small subsets of data rather than a few endpoints that return complete sets of information.

As a result, getting all of the information you need for for any one Pokemon requires a handful of API calls.

In this project, I chose to put each API call in the first child component where it's needed rather than calling all of the required APIs from a parent component and passing them down as properties.

**The most noticeable side-effect of this choice could be considered a pro or con, depending on your perspective.**

Rather than waiting for all APIs to return data, then rendering a complete UI, different parts of the view may be rendered at different times.

I personally view this as a benefit, because it means that any one failed API call doesn't break the entire page. But some people may find it jarring as content loads in a bit of cascade.

**The other benefit of this approach is that it avoids the need for deep prop-drilling.**

This both makes the code easier to maintain, and helps prevent a cascade of re-rendered child components as each API returns its data.


## Global CSS + CSS Modules

For this project, I chose to use global, external CSS files for common and shared styles (CSS variables, typography, and layout), with CSS modules for individual components that have unique styles.

Importing global styles as CSS modules would have also been a valid approach. But in my opinion, it results in a lot more imports to maintain and manage.

Keeping shared styles as global, external files means every CSS module automatically has access to all CSS variables, and makes creating and maintaining a cohesive design system a lot easier.


## Testing Tools

This project uses [Playwright](https://playwright.dev) for both end-to-end _and_ unit tests.

I feel that keeping the overall build size smaller (with fewer dependencies to maintain) and having a consistent set of testing assertions makes using Playwright for everything a better option than having two separate testing libraries.

This project uses [Biome](https://biomejs.dev) for linting and formatting instead of ESLint and Prettier.

There's not "right" choice here. I simply prefer Biome because it runs fast and I think the out-of-the-box defaults are sensible. As a result, I can get up-and-running with it without having to fiddle with configuration files all that much.


## Dark Mode

This project toggles dark mode on-or-off automatically based on the user's operating system settings.

I view this as an accessibility feature that lets users who are sensitive to bright screens or having difficulty viewing dark text on a light background experience the app in a way that works for them.

As a future enhancement, I would like to build a component that lets users toggle between Light Mode, Dark Mode, and Automatic System Settings.

Not everyone who has Dark Mode enabled on their OS wants to see websites or apps in Dark Mode (and vice-versa), so providing more user choice would be preferable.
