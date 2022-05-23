
import { request, gql } from 'graphql-request'

export default async function getPosts() {

    const query = gql`
        query MyQuery {
            postsConnection {
            edges {
                node {
                author {
                    bio
                    id
                    name
                    photo {
                    url
                    }
                }
                createdAt
                slug
                title
                excerpt
                featuredImage {
                    url
                }
                categories {
                    name
                    slug
                }
                }
            }
            }
        }
    `

}