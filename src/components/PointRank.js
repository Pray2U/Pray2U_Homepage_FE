
import Point from './Point';

import '../styles/PointRank.scss';

const PointRank = () => {

    const rankDummyData = [
        {
            rank:1,
            name:"최재훈",
            point: 1000,
        },
        {
            rank:2,
            name:"이동복",
            point: 900,
        },
        {
            rank:3,
            name:"김민성",
            point: 800,
        },
        {
            rank:4,
            name:"최형순",
            point: 700,
        },
    ]

    return(
        <div className="ContainerBox">
            <div className='Icon'>
                <img src='/rank/Leader Board Icon.png' alt='Img'/>
                <p className='IconText'>LEADER BOARD</p>
            </div>
            <div className='RankListBox'>
                    <Point user={rankDummyData[0]}/>
                    <Point user={rankDummyData[1]}/>
                    <Point user={rankDummyData[2]}/>
                    <div className='MyPointBox'>
                        My Point : {10000}
                    </div>
                    <div className='WeeklyScoreBox'>
                        Weekly Score : {20000}
                    </div>
                    <Point user={rankDummyData[3]}/>
            </div>
        </div>
    );
}

export default PointRank;