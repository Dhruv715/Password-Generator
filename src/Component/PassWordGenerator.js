import React, { useCallback, useEffect, useRef, useState } from "react";

function PassWordGenerator() {
  const [password, setPassword] = useState("");
  const [passlength, setpassLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);
  // reference - UseRef Hook
  const passwordRef = useRef(null);

//   const handleCopyPwd = useCallback (()=>{
//     // Method1
//     // Copy password Using passwordRef
//     // console.log(passwordRef.current.value);
//     window.navigator.clipboard.writeText = passwordRef.current.value;
//     // Select all password on Click to copy for Better User Experience
//     passwordRef.current?.select();
//     // Select first 5 Characters from Password
//     // passwordRef.current?.setSelectionRange(0,5);


//     // Mehtod2
//     // That is Copy Password into Clipboard Successfully
//     // window.navigator.clipboard.writeText(password);
//     // Change password so The Function Copies the Password

//      // Set state to indicate that text has been copied
//     setCopiedPassword(true);

//       // Reset state after a short delay (e.g., 2 seconds)
//     setTimeout(()=>{
//         setCopiedPassword(false)
//     },2000)

//   },[password])

const handleCopyPwd = useCallback(() => {
    // Copy password to clipboard
    window.navigator.clipboard.writeText(passwordRef.current.value)
      .then(() => {
        // Set state to indicate that text has been copied
        setCopiedPassword(true);
  
        // Reset state after a short delay (e.g., 2 seconds)
        setTimeout(() => {
          setCopiedPassword(false);
        }, 2000);
      })
      .catch((error) => {
        console.error('Failed to copy password: ', error);
      });
  }, [passwordRef, setCopiedPassword]);
  

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()[]+-./_~";
    }

    for (let i = 0; i < passlength; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [passlength, numberAllowed, charAllowed,setPassword]);

  // The function Can Automatically Call After Render Compnents
  useEffect(() => {
    passwordGenerator();
  }, [passlength, numberAllowed, charAllowed]);
  return (
    <>
      <div className="box">
        <div className="pwdbox">
          <h1>Password Generator</h1>
          <div className="m-2">
            <h6 className="text-light my-2 ">✨Generated Password</h6>

            <input
              type="text"
              value={password}
              className="form-control"
              id="exampleFormControlInput1"
              readOnly
            //   This ref thorows the access control of value without Windows.navigator.clipboard.writeText
              ref={passwordRef} 
            />
            <button className="btn btn-primary my-2" onClick={handleCopyPwd}>
            {copiedPassword ? <><i className="ri-file-copy-fill"></i>Copied Password</> : <><i className="ri-file-copy-line"></i>Copy Password</>}
            </button>
          </div>
          <hr />
          <div className="m-2">
            <h6 className="text-light ms-2 my-3">Password Filter</h6>

            <div className="d-flex my-2">
              <p className="col-4 text-light fs-6 ms-2">
                1) Password Length({passlength})
              </p>
              <input
                type="range"
                min={6}
                max={100}
                value={passlength}
                onChange={(e) => setpassLength(e.target.value)}
                className="col-8"
              />
            </div>

            <div className="d-flex my-3">
              <p className="col-4 text-light fs-6 ms-2">2) Number Allowed</p>
              {/* Toggle Like Features */}
              <input
                type="checkbox"
                className="form-check-input col-2"
                defaultChecked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
                
              />
            </div>

            <div className="d-flex mt-3">
              <p className="col-4 text-light fs-6 ms-2">
                3) Special Character Allowed
              </p>
              <input
                type="checkbox"
                className="form-check-input col-2"
                defaultChecked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PassWordGenerator;
