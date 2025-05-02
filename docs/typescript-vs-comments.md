# Typescript vs. Comments

This code base uses Typescript to provide type safety. That provides some built-in documentation around the parameters you can pass into a function or component, and the values it returns.

But while Typescript can tell you _what_, it doesn't tell you _why_.

To address this, the code includes a lot of in-code documentation that explains why decisions were made, and what issues the code addresses or purpose it serves.

Where appropriate, [JSDoc](https://jsdoc.app) is used. The CSS uses a style [roughly based on the same DocBlocker style](https://timkadlec.com/2008/12/manageable-css-with-cssdoc/) that never gained mainstream popularity, but makes for a consistent comment style.


## API Type Definitions

API type definitions were provided by [Pokenode-TS](https://pokenode-ts.vercel.app).

While they also provide an API library, it was not used for this project.
