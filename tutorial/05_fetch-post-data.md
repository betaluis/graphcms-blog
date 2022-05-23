# Fetching Data for Our Posts

First, create a new folder called `services/`. Inside of this file we can create a file called `index.js`.

Inside of the `index` file we're going to import the following:

1. request
2. gql

Both of the above come from `graphql-request`

## Creating our first request

Create a new function and export it.

This function is going to be called `getPosts` and it's an `async` function.

Create a variable inside of the function named `query` as follows:

    const query = gql`
        // query...
    `

To create the query you're going to write it like so...

    query MyQuery {
        ...
    }

This replaces the comment that says "query" in our `query` variable.

### Generating the query

We won't have to create the actual query ourselves manually because they can get pretty long sometimes. Instead, we're going to go back to "graphcms" and on the side panel, we're going to go to **"api playground"**.

Inside of here we can choose what we want to query.

For our first query you're going to follow this path:

**postsConnection > edges > edges > node > author** 

From the **"author"** get the following:
- bio
- id
- name
- photo > url

You're also going to want to get the **"createdAt"** property that is at the same level as **"author"** (so go back up one level). 

In the same level get a few more things:
- the slug
- the title
- the excerpt

For **"the excerpt"** open the dropdown and get the following:
- featuredImg > url

Next, find the **"categories"**, but make sure it's the categories inside the specific posts. (Same level as the author, inside the "postConnections").

When you find it, get these:
- name
- slug

Copy the query that was generated in the middle panel and paste it inside of `MyQuery`.

### Making the request

Now we have to make a request at the bottom of our `getPosts` function.

Create a variable named `results` like this...

    const result = await request(graphqlAPI, query);

Notice the two arguments passed into the request.

Where do we get `graphqlAPI` from?

And where is the `query` coming from?

Well, the query is the easy part because we just created it, but the `graphqlAPI` we still have to create.

Go to the top of the file and before our `getPosts` function create a variable name `graphqlAPI` and it will be equal to `process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT`

Okay... so where do we get that `env` endpoint?
- We have to create it, and we do this so that we keep that information safe so nobody else can use our queries.

### Creating ENV file

At the root level of our project we create a file named `.env` and inside of the file we type in the name used above, `NEXT_PUBLIC_GRAPHCMS_ENDPOINT`.

We'll need to find this endpoint within [graphcms](https://www.graphcms.com).

- Go the settings on the side panel
- Find "Environments"
- Copy the endpoint
- Go back to your code
- Make the variable name equal to this endpoint you just copied
- Restart your server

### Return our posts

Go back to the `getPosts` function and at the end return `result.postsConnection.edges`. 

## Using Fetched Data

Now that we've fetched the posts, we can use it inside of our app.

Open up your main `index.js` file. 

Import the following:
- { getPosts } from '../<services>'

You can delete the demo posts that we created earlier. 

### The Next.js way to fetch data

In Next.js, if you want to fetch static data you'll have to use the following function **outside** of the `Home` component.

    export async function getStaticPosts() {
        ...
    }

Inside of this `getStaticPosts()` function we'll need a variable called `posts` and make it equal to `await getPosts()`

You can also make it equal to the following: `(await getPosts() || [])` so that if we **don't** get the data, it will return an empty array.

Finally, we'll have to return it in this manner:

    return {
        props: { posts }
    }

This is how you fetch data in Next.js, but now that we've fetched the data, **how can we use the data inside of our `Home` component?**

Very easily. We just pass them in as props. 

    export default function Home({ posts }) {
        ...
    }

**Whenever we reload the page there will be an error!**

To fix this error, simply go back to graphcms, settings, API Access, scroll down and find the button that says "Yes, initialize defaults." 

Now, the error should be gone.