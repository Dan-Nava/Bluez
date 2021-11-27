import React, {useState} from 'react'

import Button from "@mui/material/Button";
import {
    CoverFlowerBoy,
    CoverPureComedy,
    CoverWhite,
    pureComedLyrics,
    CoverStayAndDecay,
    stayAndDecayLyrics,
    seeYouAgainLyrics
} from '../../HardCodedData'

import './styles.css'

export default function LyricMode({song}) {
    let lyrics = seeYouAgainLyrics
    const [pos, setPos] = useState(0)

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

    let albumArt = undefined

    //These album covers and lyrics would be stored on an external server and would be retrieved

    switch (song) {
        case "See You Again":
            albumArt = CoverFlowerBoy
            lyrics = seeYouAgainLyrics
            break;
        case "Pure Comedy":
            albumArt = CoverPureComedy
            lyrics = pureComedLyrics
            break;
        case "Stay And Decay":
            albumArt = CoverStayAndDecay
            lyrics = stayAndDecayLyrics
            break;
        default:
            albumArt = CoverWhite
            break;
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
            <div className='settingButton'>
                <Button variant="contained" onClick={scrollUp}>
                    Previous
                </Button>
                <Button variant="contained" onClick={scrollDown}>
                    Next
                </Button>
            </div>
            
            <img src={albumArt} className="back-cover" alt=""/>
        </div>
    )
}
