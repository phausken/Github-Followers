# Github Followers

[Live link here!](https://s3.us-east-2.amazonaws.com/ritani-challenge/index.html)

Inspired by a coding challenge I received, this is a simple static website built in React that takes advantage of Github's new GraphQL API.

I used Apollo as my GraphQL client, with Webpack handling the JavaScript bundling. And I couldn't resist using CSS Grid to make the lattice of follower avatars.

The `util` folder contains two files, `query.js` and `util.js`. `query.js` contains all the GraphQL queries, which are then imported into the `App` component. The new `<ApolloConsumer>` wrapper makes it very easy to control when a query is fired. `util.js` is not actually used in the app. It's "legacy code" from when the app used RESTful calls. I've kept it as a comparison.
