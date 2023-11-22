import React from 'react'
import { Card } from 'antd';
const { Meta } = Card;
function page(props) {
  return (
    <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title={props.item.productName} description={props.item.price} />
  </Card>
  )
}

export default page