import Header from "./Header/Header";

import '../styles/Template.scss';

const Template = ({children}) =>{
    return(
        <div className="TemplateContainer">
            <Header isLoggedIn={true}/>
            <div className="Content">{children}</div>
        </div>
    );
}

export default Template;