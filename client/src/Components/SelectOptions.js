import React, { useEffect, useRef, useState } from "react"

function SelectOptions({ getFlags, title }) {
    const [optedFlags, setOptedFlags] = useState({})
    const orderedFlags = ["u", "n", "s"]

    const FLAG_LABELS = {
        u: (
            <span style={{ fontSize: "14px" }}>
                <b style={{ color: "#6200EA" }}>Uppercase</b>
            </span>
        ),
        n: (
            <span style={{ fontSize: "14px" }}>
                <b style={{ color: "#6200EA" }}>Numbers</b>
            </span>
        ),
        s: (
            <span style={{ fontSize: "14px" }}>
                <b style={{ color: "#6200EA" }}>Special characters</b>
            </span>
        ),
    }

    const formFlagString = (copyOptedFlags) => {
        let flagString = ""
        orderedFlags.forEach((flag) => {
            if (copyOptedFlags.hasOwnProperty(flag)) {
                flagString += flag
            }
        })
        return flagString
    }

    const openModal = (e) => {
        e.stopPropagation()
        setIsModalOpen(true)
    }

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleOption = (option) => {
        const copyOptedFlags = JSON.parse(JSON.stringify(optedFlags))
        if (copyOptedFlags.hasOwnProperty(option)) {
            delete copyOptedFlags[option]
        } else {
            copyOptedFlags[option] = true
        }
        closeModal()
        getFlags(formFlagString(copyOptedFlags))
        setOptedFlags(copyOptedFlags)
    }

    const showedString = formFlagString(optedFlags)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const modalRef = useRef(null)

    const calcOptionsString = () => {
        let ret = "Lowercase"

        if (showedString.indexOf("u") >= 0) {
            ret += ", Uppercase"
        }

        if (showedString.indexOf("n") >= 0) {
            ret += ", Numbers"
        }

        if (showedString.indexOf("s") >= 0) {
            ret += ", Special charaters"
        }

        return ret
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                closeModal()
            } else {
                openModal()
            }
        }

        if (isModalOpen) {
            document.addEventListener("click", handleOutsideClick)
        }
        return () => {
            document.removeEventListener("click", handleOutsideClick)
        }
    }, [isModalOpen, optedFlags])

    return (
        <div style={{ alignItems: "center" }}>
            <div
                style={{
                    fontWeight: 600,
                    color: "#B7BCC0",
                    marginRight: "16px",
                }}
            >
                {title}
            </div>
            <span
                style={{
                    fontWeight: 600,
                    color: "#2C6ECB",
                    fontSize: "14px",
                    cursor: "pointer",
                }}
                onClick={openModal}
            >
                {calcOptionsString()}
            </span>
            {isModalOpen ? (
                <div className="Polaris-PositionedOverlay" ref={modalRef}>
                    <ul
                        className="Polaris-Card"
                        style={{
                            listStyleType: "none",
                            padding: "4px 0",
                            margin: "inherit",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "12px",
                                fontWeight: "600",
                                padding: "8px",
                                marginBottom: "4px",
                                marginTop: "4px",
                            }}
                        >
                            Regex flags
                        </span>
                        {orderedFlags.map((option, index) => {
                            return (
                                <li
                                    style={{
                                        padding: "4px 8px",
                                        cursor: "pointer",
                                        marginBottom: "4px",
                                    }}
                                    onClick={() => handleOption(option)}
                                    key={index}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "8px",
                                            alignItems: "center",
                                        }}
                                    >
                                        {optedFlags[option] !== undefined ? (
                                            <i
                                                class="fa fa-check-square"
                                                style={{
                                                    color: "#2C6ECB",
                                                    marginTop: "2px",
                                                }}
                                            ></i>
                                        ) : (
                                            <i
                                                class="fa fa-square-o"
                                                aria-hidden="true"
                                                style={{ marginTop: "2px" }}
                                            ></i>
                                        )}
                                        {FLAG_LABELS[option]}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            ) : null}
        </div>
    )
}

export default SelectOptions
