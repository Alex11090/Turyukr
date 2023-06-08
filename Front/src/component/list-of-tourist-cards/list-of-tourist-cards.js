import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TourCard from '../../tour-card/tour-card';
const ListTouristCards = () => {
    const [list, setList] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5001/tours/get-list`)
            .then(res => {
                if (res.status === 200) {
                    res.data = sortArrByID(res.data)
                    console.log(res.data);

                    setList(sortArrByID(res.data));
                }
            });
    }, []);
    const sortArrByID = (arr) => {
        let temp
        arr = arr.map((el) => {
            el.id = parseInt(el.id)
            return el
        })
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j].id > arr[j + 1].id) {
                    temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                }
            }
        }
        return arr
    }
    let tourCard = list.map((tour, id) => { return <TourCard key={id} id={tour.id} timeTour={tour.timeTour} src={tour.img} title={tour.title} prise={tour.prise} /> })

    return (
        < >
            <h2 className='title'>Тури Україною</h2>
            <div className="tours">
                {tourCard}
            </div>

        </>
    )

    // return list?.map((tour, id) => { return <TourCard key={id} id={tour.id} timeTour={tour.timeTour} src={tour.img} title={tour.title} prise={tour.prise} /> })


}

export default ListTouristCards;