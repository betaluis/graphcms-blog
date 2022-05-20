# The Home Component

First, we're going to give some tailwind classes to our outer `<div>`.

Classes:
- container
- mx-auto
- px-10
- mb-8

Next, change the title of the page to something like "CMS blog".

## Create grid

Create a `div` under the `Head` component and give it the following classes:
- grid
- grid-cols-1
- lg:grid-cols-12
- gap-12

We're going to need to create some placeholder posts for testing purposes. Create the following at the top of the page, below the imports, but outside the main component.

        const posts = [
            { title: "React Testing", excerpt: "Learn react testing..." },
            { title: "React with Tailwind", excerpt: "Learn react with tailwind" }
        ]

Now we can map over the posts we just created.

Inside the `div` that we set up as a grid, create another `div` and inside of it map through the posts. Pass in a `post` and an `index`. Render our a `div` with `post.title` and `post.excerpt` inside of it. To the parent `div`, the one right after the `div.grid`, you'll want to add these classes:
- lg:col-span-8
- col-span-1

This `div` is going to be the main area where the blogs are displayed. They will be on the left side of the grid, spanning 8 columns on large devices, while the right side will be 4 columns and will be taken up by our "categories" section.

DO IT YOURSELF FIRST.

This is what the code would look like (without the classes added):

    <div> // Grid
        <div>
            {
                posts.map((post, index) => (
                    <div>
                        {post.title}
                        {post.excerpt}
                    </div>
                ))
            }
        </div>
    </div>

Inside our grid, below the posts we just mapped through, we're going to add another `div` with the following classes:
- lg:col-span-4
- col-span-1

This is `div` this going to be the categories that will appear on the right side of the page. We're going to call the div **right side panel** for the sake of the tutorial, but we won't give it that class name since we're using tailwind.

Within the **right side panel** you'll want to create another `div`. This `div` will have these classes:

- lg:sticky
- relative
- top-8

At this point we're going to create some components that we'll be importing to use in the `Home` page. Go to the next tutorial to see how we create these.

## Creating the components that we'll be using within the `Home` component.

1. PostCard
2. Categories
3. PostWidget

For all three, create the arrow function, and return a blank `div`.

You'll also want to create an `index.js` file within the `components/` folder so that we can easily import and export components.

## Index.js

Export all the components:

    export { default as <component name> } from './<component path>

Now you can go inside the `Home` component and import the components that were just created like this:

    import { <component name>, <another component>, <and another one> } from '../components/'

## Post Card

Okay, let's work on the Post card.

Accept a prop as a `{ post }`.

Inside the `div` return `post.title` and `post.excerpt`.

Go back to the `Home` component and where we're mapping though each post, place this component instead of the title and excerpt. Pass in the title and excerpt as props. Also, remember to give a key to each item. In this case, we can give it a key equal to the title since the title will be unique. 

## Render Widget and Categories

The PostWidget will be rendered within the **right panel** `div`, and below that, the `<Categories />`

That's mostly it for the `Home` component. The rest of the functionalities will happen within the other components.

## Global Styles

One last thing we'll do here is add our global styles.

Create a folder called `styles/` and a file inside of that folder called `global.scss`

Go to this [link](https://github.com/adrianhajdin/project_graphql_blog/blob/main/styles/globals.scss) and paste the styles in the file. It's just some basic styles we'll be using later on aside from Tailwind.

### Background Image

There's also an image called `bg.jpg` in the `public/` folder in the repository. Download that image and place it in your local `public/` folder.

### Import Styles

Go to the `_app.js` file and at the top import the global styles like so:

    import '../styles/globals.scss'

Now we can go back to creating our components.