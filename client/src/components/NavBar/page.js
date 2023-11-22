import React from 'react'

function page(props) {
  return (
    <div>
        {props.name}
    <button onClick={()=> props.setColor('pink')}>Change parent color</button>
    </div>
  )
}

export default page