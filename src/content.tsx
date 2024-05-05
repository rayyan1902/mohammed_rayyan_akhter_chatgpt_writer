import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useState } from "react"
import ReactDOMServer from "react-dom/server"
import { FaArrowDown, FaChevronRight, FaMagic } from "react-icons/fa"
import { FaArrowsRotate } from "react-icons/fa6"

import { AiButton } from "~features/AiButton"

export const config: PlasmoCSConfig = {
  matches: [
    "https://www.linkedin.com/messaging/thread/2-MDEyNTJmNmYtZjE2Yy00N2I3LTgwMzUtYzE4ODAyZThiZTE3XzAxMA==/"
  ]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

let button: HTMLButtonElement | null = null

const PlasmoOverlay = () => {
  const [modal, setModal] = useState(false)
  const [generatePrompt, setGeneratePrompt] = useState(true)
  const [generatedPrompt, setGeneratedPrompt] = useState(false)

  // Function to handle the selection of the message input
  const handleInputSelection = () => {
    console.log("Message input selected")

    // Find the LinkedIn message input field
    const messageInput = document.querySelector(
      ".msg-form__contenteditable--redesign"
    ) as HTMLDivElement

    // Create a button element if it doesn't exist
    if (messageInput && !button) {
      button = document.createElement("button")

      // Create a div to hold the CountButton component
      const iconContainer = document.createElement("div")
      iconContainer.innerHTML = ReactDOMServer.renderToString(<AiButton />)

      // Append the icon container to the button
      button.appendChild(iconContainer)

      // Style the button
      button.style.position = "absolute"
      button.style.top = "80%"
      button.style.right = "8px"
      button.style.transform = "translateY(-50%)"
      button.style.backgroundColor = "#ffffff"
      button.style.padding = "8px"
      button.style.borderRadius = "50%"
      button.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)"
      button.style.border = "none"
      button.style.cursor = "pointer"

      // Append the button to the message input field
      messageInput.appendChild(button)

      // Add click event listener to the button
      button.addEventListener("click", handleButtonClick)
    }
  }

  // Function to handle click event on the button
  const handleButtonClick = (event: MouseEvent) => {
    console.log("Button clicked")
    setModal(!modal)

    event.stopPropagation() // Prevent the click event from bubbling up to document
  }

  const handleModal = () => {
    setGeneratePrompt(false)
    setGeneratedPrompt(true)
  }

  const handleInsert = () => {
    setGeneratedPrompt(false)
    setModal(false)

    // Find the LinkedIn message input field
    const messageInput = document.querySelector(
      ".msg-form__contenteditable--redesign"
    ) as HTMLDivElement

    // Remove the placeholder
    const placeholder = document.querySelector(
      ".msg-form__placeholder"
    ) as HTMLDivElement
    if (placeholder && placeholder.parentNode) {
      placeholder.parentNode.removeChild(placeholder)
    }

    // Set the value of the message input field
    if (messageInput) {
      messageInput.innerText =
        "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
    }
  }

  // Function to handle deselection of the message input
  const handleInputDeselection = () => {
    console.log("Message input deselected")

    // Remove the button if it exists
    if (button && button.parentNode) {
      button.parentNode.removeChild(button)
      button = null
    }
  }

  // Add event listener to detect selection of the message input
  console.log("Attaching event listener...")
  document.addEventListener("click", (event) => {
    console.log("Click event triggered")
    const target = event.target as HTMLElement
    if (target.classList.contains("msg-form__contenteditable--redesign")) {
      handleInputSelection()
    } else {
      handleInputDeselection()
    }
  })

  // Return null if the message input is not selected
  return (
    <>
      {modal && (
        <div className="fixed w-full h-full z-50 left-0 top-0  bg-black/50">
          <div className="flex w-full justify-center">
            <div
              onClick={() => setModal(false)}
              className="absolute md:top-[200px]  top-[60px] md:right-[260px] right-[20px] bg-white rounded-full cursor-pointer"></div>
            <div className="bg-white md:mt-[80px] mt-[120px] m-5 md:m-0 md:min-w-[400px] md:max-w-[600px] p-2 text-center  max-h-[550px] overflow-x-auto py-5 rounded-xl shadow-2xl">
              {generatePrompt === true && (
                <div className="flex flex-col gap-5">
                  <div>
                    <input
                      className="p-2 border rounded-lg w-full"
                      placeholder="Your prompt"
                    />
                  </div>
                  <div className="w-full flex justify-end font-bold text-white">
                    <button
                      onClick={() => handleModal()}
                      className="bg-blue-500 w-fit p-2 rounded-lg hover:bg-blue-600 flex gap-3 items-center text-center">
                      {" "}
                      <FaChevronRight height={30} width={30} /> Generate
                    </button>
                  </div>
                </div>
              )}

              {generatedPrompt === true && (
                <div className="flex flex-col gap-5">
                  <div className="w-full">
                    <div className=" w-full flex justify-end mb-5">
                      <p className="bg-gray-300 rounded-lg p-2 w-fit">
                        Reply thanking for the opportunity
                      </p>
                    </div>
                    <div className=" w-full flex justify-start">
                      <p className="bg-gray-300 rounded-lg p-2 w-fit">
                        Thank you for the opportunity! If you have any more
                        questions or if there's anything else I can help you
                        with, feel free to ask.
                      </p>
                    </div>
                  </div>
                  <div>
                    <input
                      className="p-2 border rounded-lg w-full"
                      placeholder="Your prompt"
                    />
                  </div>
                  <div className="w-full flex justify-end font-bold text-white">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleInsert()}
                        className="bg-white border text-black w-fit p-2 rounded-lg  flex gap-3 items-center text-center">
                        {" "}
                        <FaArrowDown height={30} width={30} /> Insert
                      </button>
                      <button className="bg-[#3B82F6] w-fit p-2 rounded-lg  flex gap-3 items-center text-center">
                        {" "}
                        <FaArrowsRotate height={30} width={30} /> Regenerate
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PlasmoOverlay
