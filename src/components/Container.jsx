import { Link } from "react-router-dom"

export const Container = ({ id, name, episode, date, to, dimension, type }) => {
    const Tag = to ? Link : "div"

    return (
        <div className="rounded-xl bg-zinc-800 overflow-hidden h-full" key={id}>
            <Tag to={to} className={to ? "block p-4 active:bg-zinc-700 transition-colors" : "block p-4"}>
                <p className="text-xs font-semibold text-teal-400 mb-0.5 uppercase tracking-wider">{episode || dimension}</p>
                <h4 className="text-base font-semibold text-white leading-snug">{name}</h4>
                <p className="text-zinc-400 text-sm mt-0.5">{date || type}</p>
            </Tag>
        </div>
    )
}