"use client"
import { easeInOut, motion } from "framer-motion"

import Image from "next/image"
import receiptTop from '../../public/assets/images/receipt-printer-top.png'
import receiptBottom from '../../public/assets/images/receipt-bottom.png'
import { useState } from "react"

export default function Receipt() {

  const [items, setItems] = useState([1, "name"])

    return <motion.div transition = {{
      ease: easeInOut, 
      duration: 2,
    }}
    className='receipt-printer-wrapper w-full'>
    <button
        onClick={() => setItems(items.concat('product'))}
        className='bg-gray-500 text-white px-4 py-2'>Add</button>
      <div className='receipt-printer'>
        <Image src = {receiptTop} alt = "receipt image"/>
      </div>
      <motion.div className='receipt-details'>
       { items.map((item, id) => <motion.p key = {id}
            initial = {{y: 10, opacity: 0}} animate = {{y: 0, opacity: 1}}
            className='text-gray-700'>{item}</motion.p>
        )}
      </motion.div>
      <div className='receipt-bottom-wrapper'>
        <Image src = {receiptBottom} alt = "receipt image"/>
      </div>
    </motion.div>
}