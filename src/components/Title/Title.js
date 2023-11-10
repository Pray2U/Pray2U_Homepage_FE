import '../../styles/Title/Title.scss';

const Title = ({title, subTitle}) => {
    return(
        <div className="TitleBox">
            <div className="Title">{title}</div>
            {
                subTitle ? <div className="SubTitle">{subTitle}</div> : <></>
            }
        </div>
    )
}

export default Title;