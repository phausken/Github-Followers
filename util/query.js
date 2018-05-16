import gql from 'graphql-tag';



export const fetchFollowers =  gql`
  query FindFollowers($username: String!){
  user(login: $username){
		id,
    login,
    bio,
    followers(first: 20){
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
`;

export const fetchMoreFollowers =  gql`
  query FindFollowers($username: String!, $after: String!){
  user(login: $username){
		id,
    login,
    bio,
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
}`
;
