# Categories Widget

Go to the `Categories` component.

Import the following:
- useState
- useEffect
- Link

## Fetching categories

Go to the `services/index.js` so we can query the categories.

Same procedure as before.

The name of the function = `getCategories()` and it's `async`.

The query:

        GetCategories {
            categories {
                name
                slug
            }
        }

Finally, get the results, and return the categories.

## Receiving data in our component

Go back to the `Categories.js` component and import the function that queries our categories.

Create a `useState` variable named `categories` equal to an empty array.

Now the `useEffect`. Dependency array will be empty.

Call our `getCategories()`

Attach a `.then()` which sets the categories to the new categories.

## Rendering the categories

Our categories widget is going to be similar to the "recent posts." You can copy the outer `div` and the `h3` from the `PostsWidget.js` component.

The outer div is also going to have `pb-12` as a class.

The `h3` is not going to have a condition inside of it. It's going to just say "Categories".

## Mapping over categories

Below the `h3` map through the `categories` and for each one render out a `Link` component with a `key` and an `href` both equal to `/category/slug` (you have to remember how to get the slug.)

Inside of the `Link` you're going to have a `span` with classes:
- cursor-point
- block
- pb-3
- mb-3

The category name is going to be rendered inside of the span.

Go back to "graphcms" and create more categories so that you can see them in the blog.

## Fixing the categories in our navbar

Remember that our categories displayed on in our `navigation` were created manually, and they're not being fetched from the CMS.

Go back to the `Header` component to fetch the categories.

Good thing is that we can copy and paste most of the logic from the `Categories.js` component and place it in the `Header.js`

Copy the...
- useState logic
- useEffect logic
- The `getCategories()` import
