import { useState } from 'react'
import '../styles/Categories.scss'

import CategoryImage from './CategoryImage'

const Caterogies = ({isLoggedIn}) => {

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
            category: "TIL",
            title: "04/23 TIL",
            day: "04/24 05:43",
            author: "최형순1"
        },
        {
            category: "TIL",
            title: "04/24 TIL",
            day: "04/24 05:43",
            author: "최형순2"
        },
        {
            category: "TIL",
            title: "04/25 TIL",
            day: "04/24 05:43",
            author: "최형순3"
        },
        {
            category: "TIL",
            title: "04/26 TIL",
            day: "04/24 05:43",
            author: "최형순4"
        }
    ]

    const PROJECT = [
        {
            category: "TIL",
            title: "04/23 Project",
            day: "04/24 05:43",
            author: "최형순1"
        },
        {
            category: "TIL",
            title: "04/24 Project",
            day: "04/24 05:43",
            author: "최형순2"
        },
        {
            category: "TIL",
            title: "04/25 Project",
            day: "04/24 05:43",
            author: "최형순3"
        },
        {
            category: "TIL",
            title: "04/26 Project",
            day: "04/24 05:43",
            author: "최형순4"
        }
    ]

    const SEMINAR= [
        {
            category: "TIL",
            title: "04/23 Seminar",
            day: "04/24 05:43",
            author: "최형순1"
        },
        {
            category: "TIL",
            title: "04/24 Seminar",
            day: "04/24 05:43",
            author: "최형순2"
        },
        {
            category: "TIL",
            title: "04/25 Seminar",
            day: "04/24 05:43",
            author: "최형순3"
        },
        {
            category: "TIL",
            title: "04/26 Seminar",
            day: "04/24 05:43",
            author: "최형순4"
        }
    ]

    const STUDY= [
        {
            category: "TIL",
            title: "04/23 study",
            day: "04/24 05:43",
            author: "최형순1"
        },
        {
            category: "TIL",
            title: "04/24 study",
            day: "04/24 05:43",
            author: "최형순2"
        },
        {
            category: "TIL",
            title: "04/25 study",
            day: "04/24 05:43",
            author: "최형순3"
        },
        {
            category: "TIL",
            title: "04/26 study",
            day: "04/24 05:43",
            author: "최형순4"
        }
    ]

    

    const [ til, setTil ] = useState([...TIL]);
    const [ project, setProject ] = useState([...PROJECT]);
    const [ seminar, setSeminar ] = useState([...SEMINAR]);
    const [ study, setStudy ] = useState([...STUDY]);
    const [ selectedCategory , setSelectedCategory ] = useState([...TIL]);
    const [categories, setCategories] = useState(cate);

    if(isLoggedIn){

    }

    else{

    }

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
        console.log(selectedCategory);
    }

    return(
        <>
            <div className="Container">
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
                {categories.map(c => 
                    (c.checked &&
                        <CategoryImage 
                            category={c.name}
                            info={selectedCategory}
                        />
                    )
                )}
                {categories.map(c => 
                    (c.checked &&
                        <CategoryImage 
                            category={c.name}
                            info={selectedCategory}
                        />
                    )
                )}
        </>
    );
}

export default Caterogies;