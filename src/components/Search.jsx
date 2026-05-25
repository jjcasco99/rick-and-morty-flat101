import { useRef } from "react"
import { DEBOUNCE_MS } from "../constants"
import { Button } from "./Button"
import { Input } from "./Input"

export const Search = ({ onSearch, onShowSearch }) => {
    const timerRef = useRef(null)
    const onChange = (e) => {
        const value = e.target.value
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
        onSearch(value)
        }, DEBOUNCE_MS)
    }

    const onClose = () => {
        clearTimeout(timerRef.current)
        onSearch("")
        if (onShowSearch) onShowSearch(false)
    }

    return (
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-1.5">
            <span className="text-gray-400 text-sm">🔍</span>
            <Input
              type="text"
              name="search"
              onChange={onChange}
              placeholder="Buscar..."
              className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 text-sm outline-none"
            />
            <Button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors text-lg leading-none"
            >
              ✕
            </Button>
          </div>
    )
}