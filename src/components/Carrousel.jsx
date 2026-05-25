
export const Carrousel = ({ options }) => {
  return (
    <div className="flex items-start gap-3 overflow-x-auto py-3 px-4 scrollbar-thumb-teal-400">
      {options?.map(opt => (
        <div key={opt?.id} className="flex flex-col shrink-0 items-center gap-1.5 w-20">
          <img className="rounded-full w-16 h-16 object-cover ring-2 ring-zinc-700" alt={opt?.name} src={opt?.image} />
          <p className="text-xs text-center text-zinc-400 w-full truncate leading-tight">{opt?.name}</p>
        </div>
      ))}
    </div>
  )
}