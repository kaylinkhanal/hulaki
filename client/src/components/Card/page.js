import React from 'react'
import { Card } from 'antd';
import Link from 'next/link';
import moment from 'moment'
const { Meta } = Card;
function page(props) {

   const diffTime = moment(props?.item?.createdAt).fromNow()


  return (
  
     <>
     <Link href={`/products/${props.item._id}`}>
    <Card
    hoverable
    style={{
      width: 240,
      margin:'30px'
    }}
    cover={<img alt="example" src={`http://localhost:4000/user-avatar?userId=${props.item._id}`} />}
  >
    <Meta title={props.item.address} description={props.item.role} />
    {/* {props?.item?.createdAt ? diffTime : null} */}
  </Card>
    </Link>
     <p><button>Add</button></p>
     </>

  )
}

export default page