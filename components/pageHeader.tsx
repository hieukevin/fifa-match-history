import React from 'react'

export default function PageHeader({title} : {title: string}) {
  return (
    <h1 className='lg:text-4xl sm:text-4xl text-xl sm:pb-4 py-2 text-center'>{title}</h1>
  )
}
