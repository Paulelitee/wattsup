"use client"

import Image from 'next/image'
import receiptTop from '../public/assets/images/receipt-printer-top.png'
import receiptBottom from '../public/assets/images/receipt-bottom.jpg'


function App() {
  
  const  items = ['']

  return (
    <main>
        <div className="pt-16 px-4 bg-white">
           <h1 className="">Estimate bill</h1>
           <div className="flex flex-row justify--between w-full text-sm font-medium pt-4">
            <div className="py-2 w-full text-sky-500 border-sky-500 border-b-1 flex flex-row justify-center">
                Nepa
            </div>
            <div className="w-full flex flex-row justify-center py-2 text-gray-300">
              Gen (coming soon)
            </div>
           </div>
           <div className='receipt-printer-wrapper'>
            <button className='bg-gray-500 text-white px-4 py-2'>Add</button>
              <div className='receipt-printer'>
                <Image src = {receiptTop} alt = "receipt image"/>
              </div>
              <div className='receipt-details'>
               { items.map((item, id) => <p key = {id} className='text-gray-700'>{item}</p>
                )}
              </div>
              <div className='receipt-bottom-wrapper bg-red-500'>
                <Image src = {receiptBottom} alt = "receipt image"/>
              </div>
            </div>
       </div>
      </main>
  )
}

export default App
