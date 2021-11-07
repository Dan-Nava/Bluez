import React from 'react'

import "./styles.css";

import CoverFlowerBoy from "../LyricMode/static/flower_boy_album_cover.jpeg"
import CoverPureComedy from "../LyricMode/static/pure_comedy_album_cover.jpeg"
import CoverStayAndDecay from "../LyricMode/static/stay_and_decay_album_cover.jpg"
import CoverWhite from "../LyricMode/static/white.png"

export default function AlbumArtMode({currentSong}) {
    // let albumArt = CoverFlowerBoy
    // switch (currentSong) {
    //     case "see_you_again":
    //         albumArt = CoverFlowerBoy
    //         break;
    //     case "pure_comedy":
    //         albumArt = CoverPureComedy
    //         break;
    //     case "stay_and_decay":
    //         albumArt = CoverStayAndDecay
    //         break;
    //     default:
    //         albumArt = CoverWhite
    //         break;
    // }

    return (
        <div>
            <img src={CoverFlowerBoy} className="front-cover"/>
            <img src={CoverFlowerBoy} className="back-cover"/>
        </div>
    )
}
