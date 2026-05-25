import { BounceLoader } from "react-spinners"

export const Loading = () => {
    return (
        <div className="flex justify-center py-10">
            <BounceLoader color="#26A69A" />
        </div>
    )
}