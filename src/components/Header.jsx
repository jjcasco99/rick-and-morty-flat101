import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { Search } from "./Search"
import { Button } from "./Button"

export const Header = ({ title, backTo, onSearch }) => {
  const [showSearch, setShowSearch] = useState(false)
  
  return (
    <>
      <header className={`flex items-center gap-3 bg-zinc-900 border-b border-zinc-800 w-full px-4 md:px-6 py-3 sticky top-0 z-10 ${onSearch ? "justify-between" : null}`}>
        {backTo && (
          <Link to={`/${backTo}`} className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
            ← Volver
          </Link>
        )}
        <h1 className="text-white font-bold text-base tracking-wide">{title}</h1>
        {onSearch && !showSearch && (
          <Button
            onClick={() => setShowSearch(true)}
            className="text-zinc-400 hover:text-white transition-colors p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </Button>
        )}
      </header>

      {onSearch && showSearch && (
        <div className="bg-zinc-900 border-b border-zinc-800 px-4 md:px-6 py-2">
          <Search
            onSearch={onSearch}
            onShowSearch={setShowSearch}
          />
        </div>
      )}
    </>
  )
}