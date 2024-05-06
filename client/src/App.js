import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import HashGenerator from "./pages/HashGenerator";
import SSLChecker from "./SSLChecker.jsx";


export default function App() {


  return (
    <div>
      <SSLChecker></SSLChecker>
      {/* <Routes>
        <Route path='/md5hashgenerator' element={ <HashGenerator purpose = "MD5" sample_text = "Output comes here..." regex = "Please enter the input here..." />} />
        <Route path='/sha-1hashgenerator' element={ <HashGenerator purpose = "SHA-1" sample_text = "Output comes here..." regex = "Please enter the input here..." />} />
        <Route path='/sha-3hashgenerator' element={ <HashGenerator purpose = "SHA-3" sample_text = "Output comes here..." regex = "Please enter the input here..." />} />
        <Route path='/sha-256hashgenerator' element={ <HashGenerator purpose = "SHA-256" sample_text = "Output comes here..." regex = "Please enter the input here..." />} />
        <Route path='/sha-512hashgenerator' element={ <HashGenerator purpose = "SHA-512" sample_text = "Output comes here..." regex = "Please enter the input here..." />} />
        <Route path='/ripemd-160hashgenerator' element={ <HashGenerator purpose = "RIPEMD-160" sample_text = "Output comes here..." regex = "Please enter the input here..." />} />
        <Route path='/hmac-md5hashgenerator' element={ <HashGenerator purpose = "HMAC-MD5" sample_text = "Output comes here..." regex = "Please enter the input here..." />} />
        <Route path='/hmac-sha1hashgenerator' element={ <HashGenerator purpose = "HMAC-SHA1" sample_text = "Output comes here..." regex = "Please enter the input here..." />} />
        <Route path='/hmac-sha256hashgenerator' element={ <HashGenerator purpose = "HMAC-SHA256" sample_text = "Output comes here..." regex = "Please enter the input here..." />} />
        <Route path='/hmac-sha512hashgenerator' element={ <HashGenerator purpose = "HMAC-SHA512" sample_text = "Output comes here..." regex = "Please enter the input here..." />} />
        <Route path='/aeshashgenerator' element={ <HashGenerator purpose = "AES" sample_text = "Output comes here..." regex = "Please enter the input here..." />} />
        <Route path='/rabbithashgenerator' element={ <HashGenerator purpose = "Rabbit" sample_text = "Output comes here..." regex = "Please enter the input here..." />} />
        <Route path='/rc4hashgenerator' element={ <HashGenerator purpose = "RC4" sample_text = "Output comes here..." regex = "Please enter the input here..." />} />
        <Route path='/rc4drophashgenerator' element={ <HashGenerator purpose = "RC4-Drop" sample_text = "Output comes here..." regex = "Please enter the input here..." />} />
      </Routes> */}

      {/* <div>
        <ul>
          <li>
            <Link to="/md5hashgenerator">md5HashGenerator</Link>
          </li>
          <li>
            <Link to="/sha-1hashgenerator">sha-1HashGenerator</Link>
          </li>
          <li>
            <Link to="/sha-3hashgenerator">sha-3HashGenerator</Link>
          </li>
          <li>
            <Link to="/sha-256hashgenerator">sha-256HashGenerator</Link>
          </li>
          <li>
            <Link to="/sha-512hashgenerator">sha-512HashGenerator</Link>
          </li>
          <li>
            <Link to="/ripemd-160hashgenerator">ripemd-160HashGenerator</Link>
          </li>
          <li>
            <Link to="/hmac-md5hashgenerator">hmac-md5HashGenerator</Link>
          </li>
          <li>
            <Link to="/hmac-sha1hashgenerator">hmac-sha1HashGenerator</Link>
          </li>
          <li>
            <Link to="/hmac-sha256hashgenerator">hmac-sha256HashGenerator</Link>
          </li>
          <li>
            <Link to="/hmac-sha512hashgenerator">hmac-sha512HashGenerator</Link>
          </li>
          <li>
            <Link to="/aeshashgenerator">aesHashGenerator</Link>
          </li>
          <li>
            <Link to="/rabbithashgenerator">rabbitHashGenerator</Link>
          </li>
          <li>
            <Link to="/rc4hashgenerator">rc4HashGenerator</Link>
          </li>
          <li>
            <Link to="/rc4drophashgenerator">rc4DropHashGenerator</Link>
          </li>

        </ul> */}
      {/* </div> */}

    </div>
  );
}
