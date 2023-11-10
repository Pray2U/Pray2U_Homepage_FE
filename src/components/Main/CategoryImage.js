import '../../styles/Main/CategoryImage.scss';

const CategoryImage = ({isLoggedIn, category, info}) => {
    
    return(
        <div className={ isLoggedIn ? 'CategoryDetailBoxGrid' :'CategoryDetailBox'}>
            {info.map(i =>
                <div key={i.id} className={(category+ "Image")}>
                    <p className='CategoryTitleBox'>{i.title}</p>
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
