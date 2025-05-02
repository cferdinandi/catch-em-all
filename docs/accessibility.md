# Accessibility

There are a few accessibility items of note in this project.


## Images

Google Lighthouse automated testing will note that most of the images are missing `alt` values.

Unfortunately, the Pokemon API does not return descriptions for any of the images, and using the Pokemon's name as the `alt` value would in most cases make the image redundant with information already provided.

While not ideal, the images use an empty string for the `alt` attribute so that they are not announced to screen readers.

The ideal situation would be to have `alt` that describes the content of the image, providing a comparable experience to what sighted users experience, but this is at least better than having the image path read aloud.


## Accessibility & CSS

The `accessibility.css` stylesheet includes several accessibility-related styles.

- The `.visually-hidden` class visually hides an element in the UI, but leaves it accessible to screen readers. In this project, it's primarily used for ARIA live regions that are redundant with visual indicators for sighted users.
- There's styling to only show focus rings on programmatically focusable elements (`[tabindex="-1"]`) when the user is navigating by keyboard or otherwise indicates they would benefit from that affordance. It achieves this by using the `:focus-visible` pseudo-class.
- It removes all animations when the user has `prefers-reduced-motion` enabled.


## Focus Management

One of the challenges with SPAs in general is focus management.

A best practice with SPA route changes is to shift focus to the top of the document and announce the page change to screen readers. User testing conducted by Marcy Sutton found that the most consistently effective way to do that is to shift focus to the `h1` heading.

This project includes a custom hook---`useFocusOnLocationChange()`---that automates this behavior.


## Prefers Reduced Motion

If the user has `prefers-reduced-motion` enabled, the `<LoadingRing>` component hides the animated loading ring and displays just static text (normally just in the DOM for screen readers).

The 404 page also features an animated GIF that's replaced with a static image when `prefers-reduced-motion` is enabled. The custom `usePrefersReduceMotion()` hook listens for and detects changes to this preference to dynamically update the behavior while the page is open.


## Button Behavior Statuses

The `<ButtonShare>` and `<ButtonCopy>` components have visually hidden ARIA live regions that announce when a link has been successfully shared or copied to screen reader users.


## Accessible Labels

The `<ButtonShare>` and `<ButtonCopy>` components include an `[aria-label]` attribute that provides more details about what the buttons do---information that would be apparent to sighted users from visual context clues but potentially less obvious when navigating with a screen reader.
