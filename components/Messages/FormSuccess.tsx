import React from 'react'

interface props{
    message?:string
}
export default function FormSuccess({message}:props) {
  if(!message) return null
  return (
    <div>
           <h2 className=' border border-purple-500 px-3 py-2 text-green-500 font-semibold'>
             {message}
          </h2>  
    </div>
  )
}
