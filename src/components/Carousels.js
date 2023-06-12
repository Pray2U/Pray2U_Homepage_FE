import Carousel from 'react-bootstrap/Carousel';
import '../styles/Carousel.scss'
import { useState } from 'react';

const Carousels = () => {
    const [ profile, setProfile ] = useState([...Array(3)].map((v,i) => i))
    
    return(
        <div className='CarouselBox'>
            <Carousel>
                {profile.map(i=>
                    <Carousel.Item key={i} className='slide' interval={4000}>
                        <img
                            className="d-block w-100"
                            style={{ height: "400px" }}
                            src={`/carousel_img/${i+1}.png`}
                            alt='img'
                        />
                    </Carousel.Item>)}
            </Carousel>
        </div>
    );
}

export default Carousels;