import gql from 'graphql-tag';



client.query({
  query: gql`
  query FindFollowers($username: String!){
  user(login: $username){
		id,
    followers(first: 20, after: "Y3Vyc29yOnYyOpHOATl3dw=="){
      totalCount
      nodes{
        avatarUrl
        login
        id
      }
      pageInfo{
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
}
`
});
