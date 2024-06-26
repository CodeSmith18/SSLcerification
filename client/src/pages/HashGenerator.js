import React, { useState, useRef, useEffect } from "react"
// import { addClass, useExternalScripts } from "./UseExternalScripts.js"
import clipboardCopy from "clipboard-copy";

import { ReactComponent as Copy } from "../icons/ClipboardIcon.svg";
import { ReactComponent as Save } from "../icons/PageDownIcon.svg";
// import { addPropertyControls, ControlType } from "framer"
import Button from "../Components/Button.js"
import SelectOptions from "../Components/SelectOptions.js"


export default function HashGenerator(props) {
    // useExternalScripts(
    //     "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    // )

    // useExternalScripts(
    //     "https://d1hvi6xs55woen.cloudfront.net/website-assets/polaris.css"
    // )

    const [inputValue, setinputValue] = useState("")
    const [outputValue, setoutputValue] = useState("")
    const [isError, setError] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [flags, setFlags] = useState("")

    ///my code
    useEffect(() => {
        // Update output whenever inputvalue changes
        if (inputValue === "") {
            setError(false)
            setoutputValue("")
        } else {
            try {
                setError(false)
                // const decodedUrl = decodeURIComponent(inputValue)
                let encodedText = ""

                setoutputValue(encodedText)
            } catch (error) {
                // Handle invalid URL encoding
                setoutputValue("Invalid")
                setError(true)
            }
        }
    }, [inputValue])

    const copyBtnRef = useRef(null)
    const [copiedText, setCopiedText] = useState(false)
    const [onHoverActive, setOnHoverActive] = useState(false)

    const handleMouseOver = () => {
        setOnHoverActive(true)
    }
    const handleMouseLeave = () => {
        setOnHoverActive(false)
    }

    const copyToClipboard = () => {
        if (!navigator.clipboard) {
            // Fallback for older browsers (e.g., Internet Explorer)
            const textarea = document.createElement("textarea")
            textarea.value = outputValue
            textarea.style.position = "fixed"
            textarea.style.opacity = 0
            copyBtnRef.current.appendChild(textarea)
            textarea.select()
            document.execCommand("copy")
            copyBtnRef.current.removeChild(textarea)
            return
        }
        navigator.clipboard.writeText(outputValue)
        setCopiedText(true)
        setTimeout(() => {
            setCopiedText(false)
        }, 2000)
    }

    const handlecopy = () => {
        // Your function logic here

        if (!isError && outputValue !== "") {
            clipboardCopy(outputValue)
            // console.log("Button clicked!")

            setIsClicked(true)
            setTimeout(() => {
                setIsClicked(false)
            }, 1000)
        }
    }
    const handleInputChange = (event) => {
        // Update input when textarea-input changes
        setinputValue(event.target.value);
    };


    const handleSaveToFile = () => {
        if (!isError && outputValue !== "") {
            setIsClicked(true)
            setTimeout(() => {
                setIsClicked(false)
            }, 1000)

            const blob = new Blob([outputValue], { type: "text/plain" })
            const link = document.createElement("a")
            link.href = URL.createObjectURL(blob)
            link.download = "Akto" + props.purpose + ".txt"
            link.click()
        }
    }

    const handleButtonClick = () => {
        setoutputValue(
            generateRandomStuff()
        )
    }
    const generateRandomStuff = () => {
        var inputString = inputValue.toString();
        if (inputString.length === 0) {
            return "Enter a Non-Empty string...";
        }
       
        switch (props.purpose.toLowerCase()) {

            
        }
    }

    const styles = {
        textboxborder: {
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #b3b3b3",
            transition: "border-color 0.5s ease-in-out",
        },
        text: {
            color: isError ? "red" : "green",
        },
        textboxborder2: {
            padding: "20px",
            borderRadius: "8px",
            // border: isClicked ? '2px solid #a366ff':'2px solid #b3b3b3',
            border: isError
                ? "2px solid #ff9999"
                : isClicked
                    ? "1px solid #a366ff"
                    : "1px solid #b3b3b3",
            transition: "border-color 2s ease-in-out",
            position: "relative",
            zIndex: 0,
            "z-index": "0 !important",
        },
    }

    const iconStyles = {
        position: "absolute",
        top: "15%",
        right: "10px",
        transform: "translateY(-50%)",
        display: !isError && outputValue !== "" ? "flex" : "none",
        gap: "10px",
    }

    return (
        <div>
            <h1> {props.purpose} Hash Generator </h1>
            <div
                className="Polaris-Card"
                style={{
                    padding: "0px",
                    width: "100%",
                    maxWidth: "100%",
                    minHeight: "90vh",
                    fontSize: "16px",
                    borderRadius: "8px",
                    border: "2px solid #E2E1E5",
                }}
            >
                <div
                    style={{ display: "flex", height: "80vh" }}
                    className="main-div"
                >
                    <div
                        style={{
                            flex: "2",
                            flexDirection: "column",
                            gap: "16px",
                            display: "flex",
                            padding: "20px",

                        }}
                        className="editor-div"
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                            }}
                        >
                            <div className="editor">
                                <div className="Polaris-Labelled__LabelWrapper">
                                    <div className="Polaris-Label">
                                        <label className="Polaris-Label__Text">
                                            {" "}
                                            Input{" "}
                                        </label>
                                    </div>
                                </div>

                                <div className="Polaris-Connected">
                                    <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                                        <div
                                            className="Polaris-TextField Polaris-TextField--hasValue Polaris-TextField--multiline"
                                            style={{ position: "relative" }}
                                        >
                                            <textarea
                                                multiline="true"

                                                error="Store name is required"

                                                value={inputValue}
                                                onChange={handleInputChange}
                                                placeholder="Please enter string here..."
                                                className="Polaris-TextField__Input  "
                                                spellCheck="false"
                                                type="text"
                                                rows="4"
                                                style={styles.textboxborder2}
                                            >
                                                {" "}
                                            </textarea>
                                            
                                            <div
                                                aria-hidden="true"
                                                className="Polaris-TextField__Resizer"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{ width: "fit-content" }}>
                                <Button
                                    onClick={handleButtonClick}
                                    isPrimary={true}
                                    buttonText="Generate"
                                />
                            </div>


                            <div className="editor">
                                <div className="Polaris-Labelled__LabelWrapper">
                                    <div className="Polaris-Label">
                                        <label className="Polaris-Label__Text">
                                            {" "}
                                            Output{" "}
                                        </label>
                                    </div>
                                </div>

                                <div className="Polaris-Connected">
                                    <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                                        <div
                                            className="Polaris-TextField Polaris-TextField--hasValue Polaris-TextField--multiline"
                                            style={{ position: "relative" }}
                                        >
                                            <textarea
                                                multiline="true"
                                                value={outputValue}
                                                placeholder={props.sample_text}
                                                readOnly={true}
                                                className="Polaris-TextField__Input"
                                                spellCheck="false"
                                                type="text"
                                                rows="4"
                                                style={styles.textboxborder2}
                                            ></textarea>
                                            <div style={iconStyles}>
                                                <div
                                                    ref={copyBtnRef}
                                                    onClick={copyToClipboard}
                                                    style={{
                                                        cursor: "pointer",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        padding: "8px 12px",
                                                    }}
                                                    onMouseEnter={
                                                        handleMouseOver
                                                    }
                                                    onMouseLeave={
                                                        handleMouseLeave
                                                    }
                                                >
                                                    <i
                                                        class="fa fa-file fa-2x"
                                                        style={{
                                                            cursor: "pointer",
                                                            fontSize: "20px",
                                                        }}
                                                    ></i>
                                                    {onHoverActive ? (
                                                        <div
                                                            className="Polaris-PositionedOverlay Polaris-Card"
                                                            style={{
                                                                transform: `translate(-30px, -35px)`,
                                                                padding: "8px",
                                                                position:
                                                                    "absolute",
                                                            }}
                                                        >
                                                            {!copiedText
                                                                ? "Copy to clipboard"
                                                                : "Copied!!"}{" "}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div
                                                aria-hidden="true"
                                                className="Polaris-TextField__Resizer"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div
                    style={{
                        background: "#fafafb",
                        padding: "20px",
                        width: "100%",
                    }}
                >
                    <img
                        src="https://akto-setup.s3.amazonaws.com/templates/128x128.png"
                        alt="Akto.io"
                        style={{ height: "24px" }}
                    />
                </div>
            </div>
        </div>
    )
}

HashGenerator.defaultProps = {
    purpose: "base64encoder",
    regex: "Please enter the input here...",
    sample_text: "Output comes here...",
}


