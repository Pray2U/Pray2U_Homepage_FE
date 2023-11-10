import { useEffect, useState } from 'react';
import '../../styles/Main/Categories.scss';

import CategoryImage from './CategoryImage';

const cate = [ 
    {
        id: 1,
        name:'TIL',
        checked: true
    }, 
    {
        id: 2,
        name:'Project',
        checked: false,
    },
    {
        id: 3,
        name:'Seminar',
        checked: false
    },
    {
        id: 4,
        name:'Study',
        checked: false
    }
]

const TIL = [
    {
        id:1,
        category: "TIL",
        title: "04/23 TIL",
        day: "04/24 05:43",
        author: "최형순1"
    },
    {
        id:2,
        category: "TIL",
        title: "04/24 TIL",
        day: "04/24 05:43",
        author: "최형순2"
    },
    {
        id:3,
        category: "TIL",
        title: "04/25 TIL",
        day: "04/24 05:43",
        author: "최형순3"
    },
    {
        id:4,
        category: "TIL",
        title: "04/26 TIL",
        day: "04/24 05:43",
        author: "최형순4"
    },
    
]

const LoggedInTIL = [
    {
        id:1,
        category: "TIL",
        title: "04/23 TIL",
        day: "04/24 05:43",
        author: "최형순1"
    },
    {
        id:2,
        category: "TIL",
        title: "04/24 TIL",
        day: "04/24 05:43",
        author: "최형순2"
    },
    {
        id:3,
        category: "TIL",
        title: "04/25 TIL",
        day: "04/24 05:43",
        author: "최형순3"
    },
    {
        id:4,
        category: "TIL",
        title: "04/26 TIL",
        day: "04/24 05:43",
        author: "최형순4"
    }, 
    {
        id:5,
        category: "TIL",
        title: "04/23 TIL",
        day: "04/24 05:43",
        author: "최형순1"
    },
    {
        id:6,
        category: "TIL",
        title: "04/24 TIL",
        day: "04/24 05:43",
        author: "최형순2"
    },
    {
        id:7,
        category: "TIL",
        title: "04/25 TIL",
        day: "04/24 05:43",
        author: "최형순3"
    },
    {
        id:8,
        category: "TIL",
        title: "04/26 TIL",
        day: "04/24 05:43",
        author: "최형순4"
    },
]

const PROJECT = [
    {
        id:1,
        category: "TIL",
        title: "04/23 Project",
        day: "04/24 05:43",
        author: "최형순1"
    },
    {
        id:2,
        category: "TIL",
        title: "04/24 Project",
        day: "04/24 05:43",
        author: "최형순2"
    },
    {
        id:3,
        category: "TIL",
        title: "04/25 Project",
        day: "04/24 05:43",
        author: "최형순3"
    },
    {
        id:4,
        category: "TIL",
        title: "04/26 Project",
        day: "04/24 05:43",
        author: "최형순4"
    }
]

const LoggedInPROJECT = [
    {
        id:1,
        category: "TIL",
        title: "04/23 Project",
        day: "04/24 05:43",
        author: "최형순1"
    },
    {
        id:2,
        category: "TIL",
        title: "04/24 Project",
        day: "04/24 05:43",
        author: "최형순2"
    },
    {
        id:3,
        category: "TIL",
        title: "04/25 Project",
        day: "04/24 05:43",
        author: "최형순3"
    },
    {
        id:4,
        category: "TIL",
        title: "04/26 Project",
        day: "04/24 05:43",
        author: "최형순4"
    },
    {
        id:5,
        category: "TIL",
        title: "04/23 Project",
        day: "04/24 05:43",
        author: "최형순1"
    },
    {
        id:6,
        category: "TIL",
        title: "04/24 Project",
        day: "04/24 05:43",
        author: "최형순2"
    },
    {
        id:7,
        category: "TIL",
        title: "04/25 Project",
        day: "04/24 05:43",
        author: "최형순3"
    },
    {
        id:8,
        category: "TIL",
        title: "04/26 Project",
        day: "04/24 05:43",
        author: "최형순4"
    }
]

const SEMINAR = [
    {
        id:1,
        category: "TIL",
        title: "04/23 Seminar",
        day: "04/24 05:43",
        author: "최형순1"
    },
    {
        id:2,
        category: "TIL",
        title: "04/24 Seminar",
        day: "04/24 05:43",
        author: "최형순2"
    },
    {
        id:3,
        category: "TIL",
        title: "04/25 Seminar",
        day: "04/24 05:43",
        author: "최형순3"
    },
    {
        id:4,
        category: "TIL",
        title: "04/26 Seminar",
        day: "04/24 05:43",
        author: "최형순4"
    }
]

const LoggedInSEMINAR = [
    {
        id:1,
        category: "TIL",
        title: "04/23 Seminar",
        day: "04/24 05:43",
        author: "최형순1"
    },
    {
        id:2,
        category: "TIL",
        title: "04/24 Seminar",
        day: "04/24 05:43",
        author: "최형순2"
    },
    {
        id:3,
        category: "TIL",
        title: "04/25 Seminar",
        day: "04/24 05:43",
        author: "최형순3"
    },
    {
        id:4,
        category: "TIL",
        title: "04/26 Seminar",
        day: "04/24 05:43",
        author: "최형순4"
    },  
    {
        id:5,
        category: "TIL",
        title: "04/23 Seminar",
        day: "04/24 05:43",
        author: "최형순1"
    },
    {
        id:6,
        category: "TIL",
        title: "04/24 Seminar",
        day: "04/24 05:43",
        author: "최형순2"
    },
    {
        id:7,
        category: "TIL",
        title: "04/25 Seminar",
        day: "04/24 05:43",
        author: "최형순3"
    },
    {
        id:8,
        category: "TIL",
        title: "04/26 Seminar",
        day: "04/24 05:43",
        author: "최형순4"
    }
]

const STUDY= [
    {
        id:1,
        category: "TIL",
        title: "04/23 study",
        day: "04/24 05:43",
        author: "최형순1"
    },
    {
        id:2,
        category: "TIL",
        title: "04/24 study",
        day: "04/24 05:43",
        author: "최형순2"
    },
    {
        id:3,
        category: "TIL",
        title: "04/25 study",
        day: "04/24 05:43",
        author: "최형순3"
    },
    {
        id:4,
        category: "TIL",
        title: "04/26 study",
        day: "04/24 05:43",
        author: "최형순4"
    }
]

const LoggedInSTUDY = [
    {
        id:1,
        category: "TIL",
        title: "04/23 study",
        day: "04/24 05:43",
        author: "최형순1"
    },
    {
        id:2,
        category: "TIL",
        title: "04/24 study",
        day: "04/24 05:43",
        author: "최형순2"
    },
    {
        id:3,
        category: "TIL",
        title: "04/25 study",
        day: "04/24 05:43",
        author: "최형순3"
    },
    {
        id:4,
        category: "TIL",
        title: "04/26 study",
        day: "04/24 05:43",
        author: "최형순4"
    },
    {
        id:5,
        category: "TIL",
        title: "04/23 study",
        day: "04/24 05:43",
        author: "최형순1"
    },
    {
        id:6,
        category: "TIL",
        title: "04/24 study",
        day: "04/24 05:43",
        author: "최형순2"
    },
    {
        id:7,
        category: "TIL",
        title: "04/25 study",
        day: "04/24 05:43",
        author: "최형순3"
    },
    {
        id:8,
        category: "TIL",
        title: "04/26 study",
        day: "04/24 05:43",
        author: "최형순4"
    }
]

const Caterogies = ({isLoggedIn}) => {

    const [ categories, setCategories ] = useState([...cate]);
    const [ selectedCategory , setSelectedCategory ] = useState(null);

    const [ til, setTil ] = useState(null);
    const [ project, setProject ] = useState(null);
    const [ seminar, setSeminar ] = useState(null);
    const [ study, setStudy ] = useState(null);

    const setDatas = () => {
        if(isLoggedIn) {
            setTil([...LoggedInTIL]);
            setProject([...LoggedInPROJECT]);
            setSeminar([...LoggedInSEMINAR]);
            setStudy([...LoggedInSTUDY]);
            setSelectedCategory([...LoggedInTIL]);
        }
        else{
            setTil([...TIL]);
            setProject([...PROJECT]);
            setSeminar([...SEMINAR]);
            setStudy([...STUDY]);
            setSelectedCategory([...TIL]);
        }
    };

    useEffect(()=>{
        setDatas();
    },[isLoggedIn]);
    
    const changeCategory = (id) =>{
        setCategories(
            categories.map(c =>
                c.id === id ? {...c, checked: true} : {...c, checked:false},
            ),
        );
        switch (id) {
            case 1:
                setSelectedCategory([...til]);
                break;
            case 2:
                setSelectedCategory([...project]);
                break;
            case 3:
                setSelectedCategory([...seminar]);
                break;
            case 4:
                setSelectedCategory([...study]);
                break;
            default:
                break;
        };
    }

    return(
        <>
            <div className="CategoryContainer">
                <div className='CategoryBox'>
                    {categories.map(c =>(
                        <div 
                            className={(c.checked ? "SelectedCategory" : "Category" )}
                            key={c.id}
                            onClick={()=>changeCategory(c.id)}
                        >{c.name}</div>
                    ))}
                </div>
            </div>
            {selectedCategory && categories.map(c => 
                (c.checked &&
                    <CategoryImage 
                        key={c.id}
                        isLoggedIn={isLoggedIn}
                        category={c.name}
                        info={selectedCategory}
                    />
                )
            )}
        </>
    );
}

export default Caterogies;