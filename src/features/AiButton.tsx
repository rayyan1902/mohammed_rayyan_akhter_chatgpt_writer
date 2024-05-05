import { useReducer } from "react"
import { FaMagic } from "react-icons/fa"

export const AiButton = () => {
  return (
    <button
      type="button"
      className="flex items-center bg-white  rounded-full p-1 border  border-gray-100 shadow-2xl">
      <FaMagic className="text-[10px] h-10 w-10" color="blue" />
    </button>
  )
}
