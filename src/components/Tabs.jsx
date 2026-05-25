import { Button } from "./Button"

export const Tabs = ({ options, activeTab, onClick }) => {
  return (
    <div className="flex items-center bg-zinc-900 border-b border-zinc-800">
        {options?.map(opt => (
          <Button
            key={opt?.value}
            onClick={() => onClick(opt?.value)}
            className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === opt?.value
                ? "border-teal-400 text-teal-400"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {opt?.title}
          </Button>
        ))}
    </div>
  )
}