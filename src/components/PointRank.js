
import Point from './Point';

import '../styles/PointRank.scss';

const PointRank = ({myPoint, weeklyScore}) => {

    const rankDummyData = [
        {
            rank:1,
            username:"최재훈",
            weekPoint:7555,
        },
        {
            rank:2,
            username:"이동복",
            weekPoint:7555,
        },
        {
            rank:3,
            username:"김민성",
            weekPoint:7555,
        },
        {
            rank:4,
            username:"최형순",
            weekPoint:7555,
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
                        My Point : {myPoint}
                    </div>
                    <div className='WeeklyScoreBox'>
                        Weekly Score : {weeklyScore}
                    </div>
                    <Point user={rankDummyData[3]}/>
            </div>
        </div>
    );
}

export default PointRank;