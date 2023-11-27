import { Link } from '@inertiajs/react'
import React from 'react'

const InertiaTest = () => {
  return (
    <div>
      <Link href={route('welcome')}>ホーム</Link>
    </div>
  )
}

export default InertiaTest