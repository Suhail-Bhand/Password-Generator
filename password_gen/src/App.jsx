import { useState, useCallback, useEffect, useRef } from 'react';

function App() {

  let [length, setLength] = useState(8);
  let [numbr, setNumbr] = useState(false);
  let [charAllow, setCharAllow] = useState(false);
  let [password, setPassword] = useState("");

  const passwordRef = useRef(null); 

  let passwordGen = useCallback(() => {

    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbr) {
      string += "0123456789";
    }
    if (charAllow) {
      string += "!@#$%^&*-_+=[]{}~`";
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * string.length);
      pass += string.charAt(char);
    }

    setPassword(pass);
  }, [length, numbr, charAllow,setPassword]);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password]) 

  useEffect(() =>{
      passwordGen();
  }, [length,numbr,charAllow,passwordGen])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-lg rounded-lg px-6 py-8 my-12 text-white bg-gradient-to-r from-gray-700 via-gray-800 to-black'>
        <h1 className='text-2xl font-semibold text-center mb-6'>Random Password Generator</h1>
        <div className='flex shadow-md rounded-lg overflow-hidden mb-4 bg-gray-900'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-3 px-4 bg-transparent text-lg text-white placeholder-gray-400'
            placeholder='Your generated password'
            readOnly
            ref={passwordRef}
          />
        </div>
        <button
          className='outline-none w-full py-3 bg-blue-500 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-md transition duration-600 ease-in-out'
         onClick={copyPasswordToClipboard}>
          Copy Password
        </button>
        <div className='mt-6'>
          <div className='flex items-center gap-x-2 mb-4'>
            <label className='text-orange-500'>Length:&nbsp;{length}</label>
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className='range-input cursor-pointer w-full'
            />
          </div>
          <div className='flex justify-between gap-x-2'>
            <div className='flex  gap-x-2 w-full text-orange-500 justify-center'>
              <input
                type="checkbox"
                defaultChecked={numbr}
                id='numberInput'
                onChange={() => setNumbr((prev) => !prev)}
                className='checkbox-input cursor-pointer'
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className='flex items-center gap-x-2 w-full text-orange-500'>
              <input
                type="checkbox"
                defaultChecked={charAllow}
                id='charInput'
                onChange={() => setCharAllow((prev) => !prev)}
                className='checkbox-input cursor-pointer'
              />
              <label htmlFor="charInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
