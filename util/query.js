import gql from 'graphql-tag';



export const fetchFollowers =  gql`
  query FindFollowers($username: String!){
  user(login: $username){
		id,
    login,
    bio,
    name,
    avatarUrl,
    followers(first: 20){
      totalCount
      nodes{
        avatarUrl
        login
        id
      }
      pageInfo{
        endCursor
        hasNextPage
      }
    }
  }
}
`;

export const fetchMoreFollowers =  gql`
  query FindFollowers($username: String!, $after: String!){
  user(login: $username){
    id,
    followers(first: 20, after: $after){
      totalCount
      nodes{
        avatarUrl
        login
        id
      }
      pageInfo{
        endCursor
        hasNextPage
      }
    }
  }
}`
;
