import Head from 'next/head'

// Custom Components
import { PostCard, PostWidget, Categories } from '../components/'

// Helper Functions
import getPosts from '../services/index'

const Home = ({ posts }) => {
		
  console.log(posts);
  
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>CMS Blog - False Teachers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'> 
          {
            posts.map((post, index) => <PostCard post={post.node} key={post.node.title} />)
          }
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {

  const posts = (await getPosts() || [])

  return {
    props: { posts },
  }
}

export default Home