# Recent / Related Posts Widget

In the `PostWidget` components import the following:
- moment
- Link

We're going to create a query that's going to get all the recent posts for us.

### Querying Recent Posts

Go to the `services/index.js` file and export a new function called `getRecentPosts`. Remember, it's `async`.

It's going to look similar to the one we previously made.

The query name is going to be `GetPostDetails()`

The query goes as follows:

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

Once we have the query set, we have to get the data, and return `result.posts`

### Calling the query inside of component

In the `PostWidget` component import the following:
- useState
- useEffect

Create a useState variable named `relatedPosts` and make it equal an empty array.

Now we need to determine if we're on the Home page or a post because the posts that are displayed on the right are different for each page. The home page displays the "recent posts" while an individual post page will display "related posts."

To check the difference we can check the `slug` of the page. We're going to get the `slug` by receiving it as a prop in this component, and also the `categories`.

Create a `useEffect` hook, and it should only run when the `slug` changes.

Inside the `useEffect` hook we're going to write and `if statement`:

        if ( slug ) {
            getSimilarPosts(category, slug)
                .then(result => setRelatedPosts(result))
        }

What's going on in the code above? Well, if there is a slug, that means we're on an individual post, so we're going to want to display "related posts." To do this we're going to pass a function, which we have not created yet, and this function will take in the `category` so that we know which other posts are in the same `category`, and it will also take in the `slug`.

We can add a `.then()` afterwards to set the related posts to `result`.

If there isn't a slug, then we'll want to display "recent posts" and we'll accomplish this by saying `else` and then pass in another function called `getRecentPosts()`. You won't have to pass in any parameters in this function.

So, where do we get these functions?

Well, if you remember, we already created `getRecentPosts()` in our `services/index.js` file. That gets us all the recent posts.

All we have to do now in the same file that contains our queries is create the second function that we need; `getSimilarPosts()`. 

### Query for similar posts

This query is going to be a little different:

First, export the function and call it `getSimilarPosts()`. Remember to make it `async`.

        // Determine variables inside of graphql like this.
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                // Complicated query that doesn't the get current post we're in, but gets the other ones in the same category.
                where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories }}}
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

This was a more complicated query. With more practice you'll get more comfortable with the queries.

Now, like always, get the results and return the `posts`.

### Getting similar posts data within our widget component

Add to the import from `services`:
- getSimilarPosts

At the moment, we're not accepting the `categories` and `slug` in our component, but we don't need to pass them in just yet. It's okay if they are `undefined` for now.

### Rendering Related Posts

Main `div`
- Classes:
    - bg-white
    - shadow-lg
    - rounded-lg
    - p-8
    - mb-8

Inside of the `div` an `h3`
- Inside of the `h3` check if there's a slug. If there is we want to see "Related Posts" but if not, "Recent Posts."
- Classes:
    - text-xl
    - mb-8
    - font-semibold
    - border-b
    - pb-4

Below the `h3`
- Map through the `relatedPosts`
    - Render a `div` for each. Give it a key.
        - Classed of this `div`
            - flex
            - items-center
            - w-full
            - mb-4
    - Render another `div` inside of the previous `div` with an `img` inside of it.
        - Classes for the `div`
            - w-16
            - flex-none
        - Classes for the `img`
            - h-[60px]
            - w-[60px]
            - align-middle
            - rounded-full
        - Alt for `img` is the title.
        - Src for `img` is the featured image url.
    - Another `div` sibling to the `div` with the class name `flex-none`
        - Classes:
            - flex-grow
            - ml-4
        - Inside of this `div` you want a `p` displaying the moment it was created. Remember how to do this?
            - Classes:
                - text-gray-500
                - font-xs
        - Add a `Link` sibling to the `p`
            - href will be `/post/slug`
            - Class: 
                - text-md
            - Render title of the posts inside the `Link`


