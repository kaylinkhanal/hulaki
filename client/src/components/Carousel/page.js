import React from 'react';
import { Carousel } from 'antd';
import Image from 'next/image'
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const App = () => (
  <Carousel autoplay autoplaySpeed={5000}>
    <div>
    <Image
      src="https://img.freepik.com/free-psd/special-sales-banner-template_23-2148975924.jpg"
      width={1000}
      height={60}
      alt="Logo"
    />
    </div>
    <div>
    <Image
      src="https://img.freepik.com/free-psd/special-sales-banner-template_23-2148975924.jpg"
      width={1000}
      height={60}
      alt="Logo"
    />
    </div>
    <div>
    <Image
      src="/hulakilogo.png"
      width={1000}
      height={60}
      alt="Logo"
    />
    </div>
    <div>
    <Image
      src="/hulakilogo.png"
      width={1000}
      height={60}
      alt="Logo"
    />
    </div>
  </Carousel>
);
export default App;