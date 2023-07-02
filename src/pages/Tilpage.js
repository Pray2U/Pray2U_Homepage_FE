import { useState } from "react";
import Header from "../components/Header/Header";
import TilItem from "../components/Til/TilItem";

import '../styles/Til/Til.scss';
import { AiFillPlusSquare, AiOutlineSearch } from "react-icons/ai";



const TilPage = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(true);

    const onCreateTIL = () => {
        alert("til 생성");
    }

    return(
        <div className="TilContainer">
            <Header isLoggedIn={isLoggedIn}/>
            <div className="TilTitleBox">
                <div className="Title">TIL</div>
                <div className="SubTitle">Today I Learned</div>
                <AiFillPlusSquare className="TilCreateButton" onClick={()=>onCreateTIL()} />
            </div>
            <div className="SearchBox">
                <div className="SearchBar">
                    <div className="FrontCircle"/>
                    <AiOutlineSearch className="SearchIcon"/>
                    <input className="SearchInput"/>
                    <div className="BackCircle"/>
                </div>
            </div>
            <div className="TilListBox">
                <TilItem/>
            </div>
        </div>
    );
}

export default TilPage;