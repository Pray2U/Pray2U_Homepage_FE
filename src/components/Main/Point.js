
import '../../styles/Main/Point.scss';

const Point = ({user}) =>{

    const orderColor = [
        {
            id: 1,
            color: "#00FF47",
            secondColor: "#038D2A",
        },
        {
            id: 2,
            color: "#FFB0B0",
            secondColor: "#EA3A3A",
        },
        {
            id: 3,
            color: "#7F6AFD",
            secondColor: "#004392",
        },
        {
            id: 4,
            color: "#000000",
            secondColor: "#BDBCBD",
        }
    ]

    return(
        orderColor.map(order=>
            order.id === user.rank && 
                <div key={user.rank} className="RankBox" style={{backgroundColor:order.color}}>
                    {
                        user.rank !== 4 ? 
                        <div className="RankOrder" style={{color:order.color}}>
                            {user.rank}
                        </div>
                        :
                        <img src="./img/skeleton icon.png" alt='img'/>
                    }
                    <div className="UserName">
                        {user.username}
                    </div>
                    <div className="Point" style={{background:order.secondColor}}>
                        {user.weekPoint}
                    </div>
                </div>
        )
    );
}

export default Point;