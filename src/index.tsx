import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'

function App() {
  return (
    <div>
      {/* beautiful button idk */}
      <div className='flex justify-center items-center h-screen w-screen fixed'>
        <button className='text-white border-2 bg-red-500 pl-5 pr-5 p-2 rounded-full flex justify-center items-center hover:bg-white hover:text-red-500 transition duration-100'>KILL KART....!</button>
      </div>
      {/* beautiful top bar thing idk what to call it man */}
      <div className="flex items-center fixed">
        <div className="bg-gray-500 flex flex-row h-2/12 w-fit gap-5 items-center rounded-xl m-2">
          <img src='/kartBrand.png' alt='Drawing of an orange and white square cat face' className='flex h-15 w-15 hover:blur-xs transition duration-300' />
          {/* <button className='rounded-xl h- bg-amber-950 text-white flex items-center justify-center text-sm'>diddy</button> */}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)