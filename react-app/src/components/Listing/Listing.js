import React from "react";
import {useSelector} from 'react-redux';
import FavsList from '../FavsList/FavsList';
import Visited from '../Visited/Visited';
import './Listing.css'


const liInfo = {
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * .15,
        }
    }),
    hidden: {
        opacity: 0,
        y: -50,
    },
    exit: {
        y: -50,
        opacity: 0,
    }
}

const RemoveBut = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    },  
    hover: {
        scale: 1.1
    },
    tap: {
        scale: .9
    }
}

const svgVar = {
    visible: {
        opacity: 1
    },
    hidden: {
        opacity: 0
    },
    hover: {
        scale: 1.2
    },
    tap: {
        scale: .8,
    },
}

function Listing() {
    const showVisited = useSelector(state => state.sections.showVisited);
    const showFavs = useSelector(state => state.sections.showFavs)

    return (
        <div className='listing'>
            {showVisited &&
                <Visited liInfo={liInfo} RemoveBut={RemoveBut} svgVar={svgVar} />
            }
            {showFavs &&
                <FavsList liInfo={liInfo} svgVar={svgVar} />
            }
        </div>
    )
}

export default Listing