import React, { useCallback, useEffect, useRef, useState } from "react";

function PassWordGenerator() {
  const [password, setPassword] = useState("");
  const [passlength, setpassLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const passwordRef = useRef(null);

  const handleCopyPwd = useCallback(() => {
    window.navigator.clipboard.writeText(passwordRef.current.value)
      .then(() => {
        setCopiedPassword(true);
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
  }, [passlength, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [passlength, numberAllowed, charAllowed]);

  return (
    <>
      <div className="w-screen pt-10 h-screen bg-black">
        <div className="py-2  px-2 bg-gray-300 p-6 w-4/5 sm:w-4/5 md:4/5 lg:w-2/5 mx-auto rounded-sm shadow-lg shadow-blue-500/50">
          <h1 className="text-center text-2xl font-semibold mb-6 text-sky-600 ">Password Generator</h1>
          <div className="mb-4">
            <h6 className="text-gray-800 py-2 font-medium text-sm ">✨Generated Password</h6>
            <input
              type="text"
              value={password}
              className="form-input w-full  py-2 px-2 rounded-md"
              readOnly
              ref={passwordRef}
            />
            <button className="bg-blue-600 px-2 py-2 text-sm text-white font-medium my-2" onClick={handleCopyPwd}>
              {copiedPassword ? (
                <>
                  <i className="ri-file-copy-fill"></i>Copied Password
                </>
              ) : (
                <>
                  <i className="ri-file-copy-line"></i>Copy Password
                </>
              )}
            </button>
          </div>
          <hr />
          <div className="mb-4">
            <h6 className="text-gray-800 py-2 font-medium text-base my-2">Password Filter</h6>
            <div className="flex flex-col lg:flex-row md:flex-row sm:flex-col mb-3">
              <p className="w-4/3 sm:w-4/4 md:w-1/4 lg:w-2/4 text-gray-800 py-2 font-medium text-sm my-1">1) Password Length ({passlength})</p>
              <input
                type="range"
                min={6}
                max={100}
                value={passlength}
                onChange={(e) => setpassLength(e.target.value)}
                className="w-2/3"
              />
            </div>
            <div className="flex  items-center mb-3">
              <p className="w-4/3 sm:w-4/4 md:w-1/4 lg:w-2/5 text-gray-800 py-2 font-medium text-sm my-1">2) Number Allowed : </p>
              <input
                type="checkbox"
                className="form-checkbox w-4 h-4"
                defaultChecked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
            </div>
            <div className="flex items-center">
              <p className="w-4/3 sm:w-4/4 md:w-1/4 lg:w-2/5 text-gray-800 py-2 font-medium text-sm my-1">3) Special Character :</p>
              <input
                type="checkbox"
                className="form-checkbox w-4 h-4"
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
