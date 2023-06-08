import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DiscrCard from '../discr-card/discr-card';


const DiscriptionTour = () => {
    const [discript, setDiscript] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axios.post(`http://localhost:5001/tours/get-item/${id}`)
            .then(res => {
                if (res.status === 200) {

                    console.log(res.data);

                    setDiscript(res.data);
                }
            });
    }, []);



    useEffect(() => {
        if (discript?.id) {
            const accordionInner = document.querySelectorAll(".accordion-inner");
            const accordionItem = document.querySelectorAll(".accordion-item");
            const accordionTitle = document.querySelectorAll(".accordion-title");
            console.log(accordionItem)
            accordionTitle.forEach((el, id) => {
                el.addEventListener('click', () => {
                    if (accordionItem[id].classList.contains('active')) accordionItem[id].classList.remove('active')
                    else accordionItem[id].classList.add('active')
                    if (accordionInner[id].style.display === "block") accordionInner[id].style.display = "none";
                    else accordionInner[id].style.display = "block";
                })
            })

        }
    }, [discript])






    return (
        <div>

            <h2 className='title'>Опис туру</h2>
            <h4>{discript.titleTour}</h4>
            <div dangerouslySetInnerHTML={{ __html: discript.discrTuor }}></div>
        </div>
    )


}

export default DiscriptionTour;