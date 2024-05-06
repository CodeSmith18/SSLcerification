import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import clipboardCopy from "clipboard-copy";

import { ReactComponent as Copy } from "../icons/ClipboardIcon.svg";
import { ReactComponent as Save } from "../icons/PageDownIcon.svg";

import Button from "../Components/Button.js"
import SelectOptions from "../Components/SelectOptions.js"

function SSLChecker(props) {
    const [domain, setDomain] = useState('akto.io');
    const [inputValue, setInputValue] = useState("");
    const [response, setResponse] = useState(null);
    const [outputValue, setOutputValue] = useState("");
    const [isError, setError] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [flags, setFlags] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/check-ssl', { domain });
            setResponse(res.data);
            setOutputValue(res.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        if (inputValue === "") {
            setError(false);
            setOutputValue("");
        } else {
            try {
                setError(false);
                let encodedText = "";
                setOutputValue(encodedText);
            } catch (error) {
                setOutputValue("Invalid");
                setError(true);
            }
        }
    }, [inputValue]);

    const handleInputChange = (event) => {
        setDomain(event.target.value);
        setInputValue(event.target.value);
    };

    const handleSaveToFile = () => {
        if (!isError && outputValue !== "") {
            setIsClicked(true);
            setTimeout(() => {
                setIsClicked(false);
            }, 1000);

            const blob = new Blob([outputValue], { type: "text/plain" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "Akto" + props.purpose + ".txt";
            link.click();
        }
    }

    const handleCopyToClipboard = () => {
        if (!isError && outputValue !== "") {
            clipboardCopy(outputValue);
            setIsClicked(true);
            setTimeout(() => {
                setIsClicked(false);
            }, 1000);
        }
    }

    const styles = {
        container: {
            padding: "20px",
            borderRadius: "8px",
            border: "2px solid #E2E1E5",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "100%",
            minHeight: "90vh",
            fontSize: "16px",
        },
        editorContainer: {
            display: "flex",
            height: "80vh",
            gap: "16px",
            flex: "2",
            flexDirection: "column",
            padding: "20px",
        },
        textArea: {
            padding: "20px",
            borderRadius: "8px",
            border: isError ? "2px solid #ff9999" : isClicked ? "1px solid #a366ff" : "1px solid #b3b3b3",
            transition: "border-color 2s ease-in-out",
            position: "relative",
            zIndex: 0,
            "z-index": "0 !important",
        },
        buttonContainer: {
            width: "fit-content",
        },
        outputContainer: {
            fontFamily: 'Roboto, sans-serif',
            fontSize: '22px',
            margin: '2px',
            padding: '2px',
            borderRadius: "10rem",
            borderCollapse: 'collapse',
            width: "100%",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        outputCell: {
            border: '1px solid #888',
            padding: '8px',
            fontWeight: "bold",
            textAlign: "left",
            borderRadius: "7px", // Add border radius here
        },
        evenRow: {
            backgroundColor: "#f2f2f2",
        },
    };

    return (
        <div>
            <h1> SSL Checker </h1>
            <div className="Polaris-Card" style={styles.container}>
                <div style={styles.editorContainer}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <div className="editor">
                            <div className="Polaris-Labelled__LabelWrapper">
                                <div className="Polaris-Label">
                                    <label className="Polaris-Label__Text"> Input URL </label>
                                </div>
                            </div>
                            <div className="Polaris-Connected">
                                <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                                    <div className="Polaris-TextField Polaris-TextField--hasValue Polaris-TextField--multiline" style={{ position: "relative" }}>
                                        <textarea
                                            multiline="true"
                                            value={inputValue}
                                            onChange={handleInputChange}
                                            placeholder="Please enter URL here..."
                                            className="Polaris-TextField__Input"
                                            spellCheck="false"
                                            type="text"
                                            rows="1"
                                            style={styles.textArea}
                                        ></textarea>
                                        <div aria-hidden="true" className="Polaris-TextField__Resizer"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={styles.buttonContainer}>
                            <Button onClick={handleSubmit} isPrimary={true} buttonText="Generate" />
                        </div>
                        <div className="editor">
                            <div className="Polaris-Connected">
                                <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                                    <div className="Polaris-TextField Polaris-TextField--hasValue Polaris-TextField--multiline" style={{ position: "relative" }}>
                                        {!response &&
                                            <textarea
                                                multiline="true"
                                                value={outputValue}
                                                placeholder="A common SSL certificate covers sites and the IP address. If unsure, any option should work. Default port is 443. We'll flag SSL errors. The certificate is issued by [authority] and expires on [expiration date]. Advanced section offers technical details."
                                                readOnly={true}
                                                className="Polaris-TextField__Input"
                                                spellCheck="false"
                                                type="text"
                                                rows="2"
                                                style={styles.textArea}
                                            ></textarea>
                                        }
                                        {response &&
                                            <table >
                                                <tbody>
                                                    <tr >
                                                        <td style={styles.outputCell }>Validity</td>
                                                        <td style={styles.outputCell}>{response.valid ? 'Valid' : 'Invalid'}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={styles.outputCell}>Days Remaining</td>
                                                        <td style={styles.outputCell}>{response.daysRemaining}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={styles.outputCell}>Valid From</td>
                                                        <td style={styles.outputCell}>{response.validFrom}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={styles.outputCell}>Valid To</td>
                                                        <td style={styles.outputCell}>{response.validTo}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={styles.outputCell}>Valid For</td>
                                                        <td style={styles.outputCell}>{response.validFor.join(', ')}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        }
                                        <div aria-hidden="true" className="Polaris-TextField__Resizer"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ background: "#fafafb", padding: "20px", width: "100%" }}>
                <img src="https://akto-setup.s3.amazonaws.com/templates/128x128.png" alt="Akto.io" style={{ height: "24px" }} />
            </div>
        </div>
    );
}

export default SSLChecker;
