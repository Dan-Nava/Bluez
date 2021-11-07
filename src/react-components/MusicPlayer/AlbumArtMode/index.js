import React, {useState} from 'react'

import "./styles.css";

import CoverFlowerBoy from "../static/flower_boy_album_cover.jpeg"
import CoverPureComedy from "../static/pure_comedy_album_cover.jpeg"
import CoverStayAndDecay from "../static/stay_and_decay_album_cover.jpg"
import CoverWhite from "../static/white.png"

export default function AlbumArtMode({song}) {
    
    let albumArt = CoverFlowerBoy

    switch (song) {
        case "See You Again":
            albumArt = CoverFlowerBoy
            break;
        case "Pure Comedy":
            albumArt = CoverPureComedy
            break;
        case "Stay and Decay":
            albumArt = CoverStayAndDecay
            break;
        default:
            albumArt = CoverPureComedy
            break;
    }

    return (
        <div>
            <img src={albumArt} className="front-cover"/>
            <img src={albumArt} className="back-cover"/>
        </div>
    )
}
