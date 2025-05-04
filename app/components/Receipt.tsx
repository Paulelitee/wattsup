"use client"

import Image from "next/image"
import receiptTop from '../../public/assets/images/receipt-printer-top.png'
import receiptBottom from '../../public/assets/images/receipt-bottom.png'

const items = ['']

export default function Receipt() {

    return <div className='receipt-printer-wrapper'>
    <button className='bg-gray-500 text-white px-4 py-2'>Add</button>
      <div className='receipt-printer'>
        <Image src = {receiptTop} alt = "receipt image"/>
      </div>
      <div className='receipt-details'>
       { items.map((item, id) => <p key = {id} className='text-gray-700'>{item}</p>
        )}
      </div>
      <div className='receipt-bottom-wrapper'>
        <Image src = {receiptBottom} alt = "receipt image"/>
      </div>////
    </div>
}