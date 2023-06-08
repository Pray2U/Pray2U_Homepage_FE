import '../styles/CategoryImage.scss'

const CategoryImage = ({category, info}) => {
    
    return(
        <div className='CategoryDetailBox'>
            {info.map(i =>
                <div className={(category+ "Image")}>
                    <p className='TitleBox'>{i.title}</p>
                    <div className='ContentBox'>
                        <p className='DayBox'>{i.day}</p>
                        <p className='AuthorBox'>{i.author}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CategoryImage;
