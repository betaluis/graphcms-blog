# Creating Article details

Create the following: `pages/post/[slug].js`

This is called file base routing. You don't have to use React routing. The brackets make it dynamic.

In the `[slug].js` file create a component name `PostDetails`.

Import `getPosts` and `getPostDetails`. We'll have to create these in a bit.

Also import the following from components:
- PostDetail
- Categories
- PostWidget
- Author
- Comments
- CommentsForm

Let's create the structure:

``` 
<div className="container mx-auto px-10 mb-8">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
    <div className="col-span-1 lg:col-span-8">
      <PostDetail />
      <Author />
      <CommentsForm />
      <Comments />
    </div>
    <div className="col-span-1 lg:col-span-4">
      <div className="relative lg:sticky top-8">
        <PostWidget />
        <Categories />
      </div>
    </div>
  </div>
</div>
```

Time to create boilerplates for each component that we haven't created yet.

- PostDetail
- Author
- Comments
- CommentsForm

Remember to export the components.

## How do we get the post details?

We're going to use `getStaticProps` just like we did in our `index.js`.

Copy the function inside of `index.js` and paste it in `[slug].js`.

To get the `PostDetail` we'll have to create our endpoint within our `services`.

If you notice, `getPosts` gets us almost everything that we need, so we can copy and paste this one within our `services`.

Rename it and pass in a `slug`.

```
const query = gql`
  query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
          ...
          content { 
            raw
          }
        }
    }
`
const result = await require(graphqlAPI, query, { slug });
return.post
```

So our `getStaticProps` within our `[slug].js` file will look like this:

```
export async function getStaticProps({ params }) {
    const data = await getPostDetails(params.slug);
    return {
        props: { post: data }
      }
  }
```

Question:
Where is `params` coming from?

Now we can pass into our component the `post` that we just fetched.

We can also pass in the post data to each component as props.

PostDetail -> post
Author -> post.author
CommentsForm -> post.slug
Comments -> post.slug

```
<PostWidget slug={post.slug} categories={post.categories.map(cat => cat.slug)}
```
Create `getStaticPaths`

```
export async function getStaticPaths() {
    const posts = await getPosts();
    return {
        paths: posts.map({ node: { slug } } => ({ params : slug }))
      }
  } 
```

You'll have to make some fixes because there's going to be a bug at this point. I'll let you find it. Clue: It has to do with passing a few parameters in that are missing.

## Time to work on each component

`PostDetal`:

```
<div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
  <div className="relative overflow-hidden shadow-md mb-6">
    <img 
      src={post.featuredImage.url}
      alt={post.title}
      className="object-top h-full w-full rounded-t-lg"
    />
  </div>
  <div className="px-4 lg:px-0">
    <div className="flex items-center mb-8 w-full">
      ...copy paste what's in the postCard...
      ... You'll have to import moment ...
      ... Remove justify center ....
    </div>
  </div>
  <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
  {post.content.raw.children.map((typeObj, index) => {
      const children = typeObj.children.map((irem, itemIndex) => getContentFragment(itemIndex, item.text, item))
      return getContentFragment(index, children, typeObj, typeObj.type)
    })}
</div>
```

We have to create the function that we just called above `getContentFragment`:

```
const getContentFragment(index, text, obj, type) =>  {
  let modifiedText = text;

  if (obj) {
      if (obj.bold) {
          modifiedText = (<b key={index}>{text}</b>)
        }
      if (obj.italic) {
          modifiedText = (<em key={index}>{text}</em>)
        }
      if (obj.underline) {
          modifiedText = (<u key={index}>{text}</u>)
        }
    }

  switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>
      case 'paragraph':
        return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>
      case 'heading-four':
        return <h4 key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>
      case 'image':
        return (
          <img 
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
}
```


## Author Information

Go to the `Author.jsx` component

Get the `author` from props. 

Structure:

Import `Image` from 'next/image'. 

```
<div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
  <div className="absolute left-0 right-0 -top-14">
    <Image
      unoptimized
      alt={author.name}
      height="100px"
      width="100px"
      className="align-middle rounded-full" 
      src={author.photo.url}
    />
  </div>
  <h3 className="text-white my-4 text-xl font-bold">{author.name}</h3>
  <p className="text-white text-lg">{author.bio}</p>
</div>
```

## Comments component

Import `useState` and `useEffect` and `useRef`

Pass in the `slug` as a prop.

Create an `error` variable with a state of `false`

Create a `localStorage` variable with a state of `null`

Create a `showSuccessMessage` variable with a state of `false`

Create a variable named `CommentEl` equal to `useRef()`

Create a variable named `nameEl` equal to `useRef()`

Create a variable named `emailEl` equal to `useRef()`

Create a variable named `storeDataEl` equal to `useRef()`

Structure:

```
<div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
  <h3 className="text-xl mb-8 font-semibold border-b pb-4">Reply</h3>
  <div className="grid grid-cols-1 gap-4 mb-4">
    <textarea 
      ref={commentEl} 
      className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
      placeholder="Comment"
      name="comment"
    />
  </div>
  <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
    <input
      type="text"
      ref={nameEl}
      className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
      placeholder="Name"
      name="name"
    />
    <input
      type="email"
      ref={emailEl}
      className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
      placeholder="Email"
      name="email"
    />
  </div>
  <div className="grid grid-cols-1 gap-4 mb-4">
    <div>
      <input
        ref={storeDataEl}
        type="checkbox"
        id="storeData"
        name="storeData"
        value="true"
      />
      <label className="text-gray-500 cursor-pointer ml-2" htmlFor="storeData">Save my email and name for the next time I comment.</label>
    </div>
  </div>
  {error && <p className="text-xs text-red-500">All fields are required.</p>}
  <div className="mt-8">
    <button 
      type="button" 
      onClick={handleCommentSubmission}
      className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
    > Post Comment
    </button>
    {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for review</span>}
  </div>
</div>
```

Create the function `handleCommentSubmission`

```
  const handleCommentSubmission = () => {
    ...errors = flase
    ...Check if the comment.current.value doesn't exist OR the nameEl.current.value does not exists OR emailEl.current.value
    ... The above is a lot of repetition, so figure out another way of writing the same code. (destructure)
    ... If the above is true, stop the function and set error to true.
    ... Set the comment Object with name, email, comment, slug.
    ... Check if the user wants to save the data.
    ... Destructure 'storeData' and remember it's a checkbox.
    ... If the user wants to store data... window.localStorage.setItem('name', name) && email.
    ... If NOT storing data instead of 'setItem', 'removeItem'. 
    }
```

We have to add a new query to sumbit comment to our services.

```
export const submitComment = async (obj) => {
    ...We're going to write a request that's going to fetch our own local api.
    const result = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
          }
        body: JSON.stringify(obj),
      })
    return result.json();
  }
```

### Create a backend.

Go to /api/ and rename `hello.js` to `comment.js`

```
import { GraphQLClient, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function comments(req,res) {

    const { name, email, slug, comment } = req.body;

    const graphQLClient = new GraphQLClient(graphqlAPI, { 
      headers: {
          authorization: `Brearer ${process.env.GRAPHCMS_TOKEN}` // You'll need to find the token in graphcms. Create perm. auth token. Paste the token in the .env file called 'GRAPHCMS_TOKEN.
        }
      })

    const query = gql`
      mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
          createComment(data: { name: $name, email; $email, comment: $comment, post: { connect: { slug: $slug }} }) { id }
        }
    `
    const result = await graphQLClient.request(query, req.body)
    return res.status(200).send(result);
  }
```

Now we should be able to import our endpoint into our comments component from our services.

Below the `storeData` if check:
```
submitComment(commentObj).then((res) => {
    ... success message to true
    ... success message to false after 3 seconds.
  })
```

If we're visiting the post a second time, the local data is already going to be there. So lets make use of it.

`useEffect`... and it's only going to run at the start.

Inside:
```
nameEl.current.value = window.localStorage.getItem('name');
emailEl.current.value = window.localStorage.getItem('email');
```

You have a few errors in the code and you'll have to debug yourself.

Clue: Create connection from comment to posts. Update permissions.
