import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';

// import { addClass, useExternalScripts } from "./UseExternalScripts.js"
import clipboardCopy from "clipboard-copy";

import { ReactComponent as Copy } from "../icons/ClipboardIcon.svg";
import { ReactComponent as Save } from "../icons/PageDownIcon.svg";

// import { addPropertyControls, ControlType } from "framer"
import Button from "../Components/Button.js"
import SelectOptions from "../Components/SelectOptions.js"


function SSLChecker(props) {
    const [domain, setDomain] = useState('akto.io');
    const [inputValue, setinputValue] = useState("")
    const [response, setResponse] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/check-ssl', { domain });
            setResponse(res.data);
            setoutputValue(
                res.data
            )
        } catch (error) {
            console.error('Error:', error);
        }
    }



    // useExternalScripts(
    //     "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    // )

    // useExternalScripts(
    //     "https://d1hvi6xs55woen.cloudfront.net/website-assets/polaris.css"
    // )


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
        setDomain(event.target.value)
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
    console.log(inputValue)
    console.log(outputValue)
    console.log(response)
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
            <h1> SSL Checker </h1>
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
                                            Input URL{" "}
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
                                                placeholder="Please enter URL here..."
                                                className="Polaris-TextField__Input  "
                                                spellCheck="false"
                                                type="text"
                                                rows="1"
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
                                    onClick={handleSubmit}
                                    isPrimary={true}
                                    buttonText="Generate"
                                />
                            </div>


                            <div className="editor">
                                {/* <div className="Polaris-Labelled__LabelWrapper">
                                    <div className="Polaris-Label">
                                        <label className="Polaris-Label__Text">
                                            {" "}
                                            Output{" "}
                                        </label>
                                    </div>
                                </div> */}

                                <div className="Polaris-Connected">
                                    <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                                        <div
                                            className="Polaris-TextField Polaris-TextField--hasValue Polaris-TextField--multiline"
                                            style={{ position: "relative" }}
                                        >
                                            {!response &&
                                                <textarea
                                                    multiline="true"
                                                    value={outputValue}
                                                    placeholder= "A common SSL certificate covers sites and the IP address. If unsure, any option should work. Default port is 443. We'll flag SSL errors. The certificate is issued by [authority] and expires on [expiration date]. Advanced section offers technical details."
                                            readOnly={true}
                                            className="Polaris-TextField__Input"
                                            spellCheck="false"
                                            type="text"
                                            rows="2"
                                            style={styles.textboxborder2}
                                                ></textarea>

                                            }

                                        {response &&
                                            <table style={{ borderCollapse: 'collapse', fontFamily: 'Roboto, sans-serif', fontSize: '22px', margin: '2px', padding: '2px' }}>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ border: '1px solid #888', padding: '8px', fontWeight: "bold" }}>Validity</td>
                                                        <td style={{ border: '1px solid #888', padding: '8px' }}>{response.valid ? 'Valid' : 'Invalid'}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ border: '1px solid #888', padding: '8px', fontWeight: "bold" }}>Days Remaining</td>
                                                        <td style={{ border: '1px solid #888', padding: '8px' }}>{response.daysRemaining}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ border: '1px solid #888', padding: '8px', fontWeight: "bold" }}>Valid From</td>
                                                        <td style={{ border: '1px solid #888', padding: '8px' }}>{response.validFrom}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ border: '1px solid #888', padding: '8px', fontWeight: "bold" }}>Valid To</td>
                                                        <td style={{ border: '1px solid #888', padding: '8px' }}>{response.validTo}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ border: '1px solid #888', padding: '8px', fontWeight: "bold" }}>Valid For</td>
                                                        <td style={{ border: '1px solid #888', padding: '8px' }}>{response.validFor.join(', ')}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        }

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
        </div >
    )
}


export default SSLChecker;
