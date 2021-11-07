import React, {useState} from 'react'

import Button from "@mui/material/Button";
import {CoverFlowerBoy, stayAndDecayLyrics} from '../../HardCodedData'

import './styles.css'

export default function LyricMode() {
    const [currentSong, setcurrentSong] = useState("")

    const [pos, setPos] = useState(0)

    const lyrics = stayAndDecayLyrics

    function scrollUp() {
        if (pos > 0) {
            setPos(pos - 1)
        }

    }

    function scrollDown() {
        if (pos < lyrics.length - 5) {
            setPos(pos + 1)
        }
    }


    return (
        <div>
            <div className="lyrics">
                <p className="lyric">{lyrics[pos]}</p>
                <p className="lyric">{lyrics[pos + 1]}</p>
                <p className="lyric">{lyrics[pos + 2]}</p>
                <p className="lyric">{lyrics[pos + 3]}</p>
                <p className="lyric">{lyrics[pos + 4]}</p>
            </div>
            <Button variant="contained" className='settingButton' onClick={scrollUp}>
                Previous
            </Button>
            <Button variant="contained" className='settingButton' onClick={scrollDown}>
                Next
            </Button>
            <img src={CoverFlowerBoy} className="back-cover"/>
        </div>
    )
}
