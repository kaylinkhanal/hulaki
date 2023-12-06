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
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title={props.item.productName} description={props.item.price} />
    {props?.item?.createdAt ? diffTime : null}
  </Card>
    </Link>
     <p><button>Add</button></p>
     </>

  )
}

export default page