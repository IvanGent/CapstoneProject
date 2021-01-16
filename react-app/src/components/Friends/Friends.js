import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from 'framer-motion'

const liInfo = {
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.5,
        }
    }),
    hidden: {
        opacity: 0,
        y: -50,
    }
}


function Friends({title, list, show, setShow  }) {

    return (
        <AnimatePresence>
            <motion.div>
                <h1>{title}</h1>
                {list.map((ele, i) => {
                    <motion.li
                      variants={liInfo}
                      initial='hidden'
                      animate='visible'
                    >
                        {ele.name}
                    </motion.li>
                })}
            </motion.div>
        </AnimatePresence>
    )
}

export default Friends