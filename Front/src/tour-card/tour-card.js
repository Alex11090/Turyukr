import { Link, useParams } from "react-router-dom";

const TourCard = (props) => {




    return (
        <Link to={`/tours/${props.id}`}>
            <div >
                <div>
                    <div className="tour" >

                        <div className="image" style={{ backgroundImage: `url(${props.src})` }}>
                            <div className="duration">Тривалість: {props.timeTour}</div>
                            <div className="price">Ціна: {props.prise} грн</div>
                        </div>
                        <p className="name">{props.title}</p>
                    </div>
                </div>
            </div >
        </Link>
    )
}
export default TourCard;