# Post Widget Component

In the `PostWidget` component import:

moment from moment.

Link from next/link.

Create a new fetch at the bottom of the `index.jsx` under `services` file.

`export const getRecentPosts` 

It's going to be async with a query inside of it.

    const query = gql`
      query GetPostDetails() {
        posts(
          orderBy: createdAt_ASC
          last: 3
        ) {
          title
          featuredImage {
          url
          }
          createdAt
          slug
        }
      }
    `
Create a variable named `result` and make it async that equals to `request(graphqlAPI, query)`;

Return the result
    
    return result.posts;

Import useState and useEffect

Set a variable that is named "relatedPosts" and set the state to an empty array.

You need to figure out which posts to show in this widget and we're going to do this by checking out the **slug**

Pass in "categories" and "slug" into the component.

Now, useEffect and check if there's a slug inside of it. 

If there is a slug => call getSimilarPosts(categories, slug).then((result) => setRelatedPosts(result));

If there's no slug => call getRecentPosts().then(result => setRelatedPosts(result));

Where are the above functions coming from?

We already created one of those functions in the `services/index.js`

Import { getRecentPosts } from 'services/index.js';

Create the second one that we don't have. "getSimilarPosts()"

        export const getSimilarPosts = async () => {
            const query = gql`
                query getPostDetails($slug: String!, $categories: [String!]) {
                    posts(
                        where: {
                            slug_not: $slug
                            AND: {categories_some: {slug_in: $categories}}
                        }
                        last: 3
                    ) {
                        title
                        featuredImage {
                            url
                        }
                        createdAt
                        slug
                    }
                }
            `
        }

Create a variable named `result` and make it async that equals to `request(graphqlAPI, query)`;

Return the result
    
    return result.posts;
    
Inside of our posts widget we can import `getRecentPosts` and `getSimilarPosts`

The useEffect should only change when the slug changes.

Now let's work on the jsx for the component.

parent div with classes:
    - bg-white
    - shadow-lg
    - rounded-lg
    - p-8
    - mb-8

Inside of this div we're going to add an `h3` with the following inside:
        
        { slug ? 'Related Posts' : 'Recent Posts' }

Class names for the `h3`:
    - text-xl
    - mb-8
    - font-semibold
    - border-b
    - pb-4

Now let's map through all of our posts.

Next to the h3:
        
        {relatedPosts.map(post => (
            <div key={post.title} class="flex items-center w-full mb-4">
                <div className="w-16 flex-none">
                    <img
                        alt={post.title}
                        height="50px"
                        width="50px"
                        className="align-middle rounded-full"
                        src={post.featuredImage.url}
                    >
                </div>
                <div className="flex-grow ml-4">
                    <p className="text-gray-500 font-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
                    <Link href={`/post/${post.slug}`} className="text-md" key={post.title}>
                        {post.title}
                    </Link>
                </div>
            </div>
        ))}
