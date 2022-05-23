# Render Posts

We can start working on our `PostCard` component. 

First, import:
- `moment from 'moment'
- Link

Next, render:
- `<div>`
    - bg-white
    - shadow-lg
    - rounded-lg
    - p-0
    - lg:p-8
    - pb-12
    - mb-8

- Another `<div>` inside of the other one.
    - relative
    - overflow-hidden
    - shadow-md
    - pb-80
    - mb-6

- Inside of this second `<diV>` create an `<img>`
    - `post.featuredImage.url` as 'src'
    - `post.title` as 'alt'
    - classes:
        - object-top
        - absolute
        - h-80
        - w-full
        - object-cover
        - shadow-lg
        - rounded-t-lg
        - lg:rounded-lg

If you save at this point you'll see an error. This error is because we need to pass through `posts.node` as a prop from our main `index.js` file instead of `posts`. Alternatively, you can use `post.node.featuredImage.url` and `post.node.title` to get the same results but the former seems simpler.

Below the `<div>` parent to the `<img>` we want to add the heading for the post.

Create an `h1` with classes:
- transition
- duration-700
- text-center
- mb-8
- cursor-pointer
- hover:text-pink-600
- text-3xl
- font-semibold

Inside of the `h1`:
- `Link`
    - The post slug as the `href`.
    - The post title as the content inside the `Link`.

Below the `h1`
- `div`
    - block
    - lg:flex
    - text-center
    - items-center
    - justify-center
    - mb-8
    - w-full

- Another `div` inside of the previous `div`
    - flex
    - items-center
    - justify-center
    - mb-4
    - lg:mb-0
    - w-full
    - lg:w-auto
    - mr-8
    - Now add an `img` inside of this `div`
        - Author name as 'alt'
        - 30px for 'height'
        - 30px for 'width'
        - classes:
            - align-middle
            - rounded-full
        - Author photo url as 'src'
    - Next to the `img` create a `p` tag.
        - Author's name as the content inside.
        - classes:
            - inline
            - align-middle
            - text-gray-700
            - ml-2
            - text-lg

- Next to the author's picture and name we want another `div`
    - classes:
        - font-medium
        - text-gray-700
        - Copy the `svg` below and place it inside of this `div`


                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
        
        - Inside of the `svg` we're going to add a `span` in which we'll use the `moment` library. Example below:

                <svg>
                    <path>
                    // Moment library goes below...
                    { moment(post.createdAt).format('MMM DD, YYYY') }
                </svg>

- Now let's render a `p` tag in our main `div` (the `p` tag should be the last element in our main `div`).
    - Render the post excerpt in the `p`
    - Classes:
        - text-center
        - text-lg
        - text-gray-700
        - font-normal
        - px-4
        - lg:px-20
        - mb-8

- Below the `p` tag just created we're going to create another `div`.
    - Class:
        - text-center
    
    - Inside the `div` we're going to need a `Link`
        - href is the post slug.
        - Create a `span` that says "Continue Reading" inside.
            - Classes:
                - transition
                - duration-500
                - transform
                - hover:-translate-y-1
                - inline-block
                - bg-pink-600
                - text-lg
                - font-medium
                - rounded-full 
                - text-white
                - px-8
                - py-3
                - cursor-pointer

Our post is done. We only see one at the moment because we've only created one in our CMS. Let's duplicate the post that we have in our CMS and see if we can see both of them in our website.


            

