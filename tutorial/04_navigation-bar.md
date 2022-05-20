# Creating The Navigation Bar

We're going to start by creating a `Header.js` component in the `components/` folder. Also, export it inside of the `components/index.js` file as "Header".

Inside of the `Header` component import:
- `{ useContext } from 'react'`
- `Link from 'next/link'`

Start creating the `Header` by giving the main `div` these classes:
- container
- mx-auto
- px-10
- mb-8

Create another `div` inside with these classes:
- border-b
- w-full
- inline-block
- border-blue-400
- py-8

Create yet another `div` and add these classes:
- md:float-left
- block

Inside of the last `div` that we just created, place a `Link` component.

The `Link` is going to have an `href="/"`.

Create a `span` inside of the `Link` and add these classes:
- cursor-pointer
- font-bold
- text-4xl
- text-white

The content within the `span` should be "GraphCMS"

Now, next to the parent `div` of the `Link`, create another `div`. This `div` is going to show the "Categories" and it will have the following classes:
- hidden
- md:float-left
- md:contents - - - - > What does this do?
    - "Use `contents` to create a "phantom" container whose children act like a direct children of a parent."
    - Example:

            <div class="flex">
                <div class="flex-1>1</div>
                <div class="contents">
                    <div class="flex-1">2</div>
                    <div class="flex-1">3</div>
                </div>
                <div class="flex-1>4<div>
            </div>

We haven't created the real categories that we're going to fetch, but we can create placeholder categories.

Create the following:

    const categories = [
        { name: "React", slug: "react" },
        { name: "Web Development", slug: "web-development" }
    ]

Now within the `div` that we were just working on (with the class "contents"), we're going to map through the categories we just created.

Render the following for each category:

- A `Link` component.
    - key equal to the `slug`
    - An href pointing to `/category/<slug>

- A span within the `Link` with the following classes
    - md:float-right
    - mt-2
    - align-middle
    - text-white
    - ml-4
    - font-semibold
    - cursor-pointer
- Inside the span display the category name.

## Creating a Layout component

The reason why we need to create a `layout` component is so that we can display this `header` that we just created in each page.

Create a new file called `Layout` inside of the `components/` folder.

Import `Header` into the file.

Use a fragment to wrap the component and place the `Header` inside of it. Next, below it, place the `children`, and if you don't know what `children` are, then you might be in the wrong tutorial. Remember to accept the `children` in the component.

Export the `Layout` component within the `index` file.

## Wrap the app

Now we can use this `Layout` inside of our `_app.js` app. Import the `Layout` and wrap the `Component` within the `Layout`.