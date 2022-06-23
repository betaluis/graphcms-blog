import Link from 'next/link'
import React from 'react'

const categories = [
  { name: 'React', slug: 'react' },
  { name: 'Web Developer', slug: 'web-developer' },
]
const Header = () => {
  return (
    <div className='container mx-auto mb-8 px-10'>
      <div className='flex w-full flex-col items-center border-b border-blue-400 py-8 md:flex-row'>
        <div className='mx-auto md:mr-auto md:ml-0'>
          <Link href='/'>
            <span className='cursor-pointer text-4xl font-bold text-white'>False Teachers</span>
          </Link>
        </div>
        <div className='mt-3 md:mt-2'>
          {categories.map((cat, index) => (
            <Link key={cat.slug + index} href={`/category/${cat.slug}`}>
              <span className='ml-4 cursor-pointer align-middle font-semibold text-white'>
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
