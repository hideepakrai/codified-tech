'use client'

import Link from 'next/link'
import '../css/not-found.css'

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-message">Oops! The page you’re looking for doesn’t exist.</p>
      <Link href="/" className="notfound-button">
        Go Home
      </Link>
      <p className="notfound-footer">Crafted with ❤️ by Codified</p>
    </div>
  )
}
