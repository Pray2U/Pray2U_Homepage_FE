import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css'
import '../../styles/Main/Carousel.scss';
import { useState } from 'react';

const Carousels = () => {
    const [ profile, setProfile ] = useState([...Array(3)].map((v,i) => i))
    
    return(
        <div className='CarouselBox'>
            <Carousel>
                {profile.map(i=>
                    <Carousel.Item key={i} interval={4000}>
                        <img
                            className="d-block w-100"
                            style={{ height: "400px", zIndex: 2 }}
                            src={`/carousel_img/${i+1}.png`}
                            alt='img'
                        />
                    </Carousel.Item>)}
            </Carousel>
        </div>
    );
}

export default Carousels;