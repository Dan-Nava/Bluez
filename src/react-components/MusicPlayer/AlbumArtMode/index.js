import React, {useState} from 'react'

import "./styles.css";

import {
    CoverFlowerBoy,
    CoverPureComedy,
    CoverStayAndDecay
} from '../../HardCodedData'

export default function AlbumArtMode({song}) {

    let albumArt = CoverFlowerBoy

    switch (song) {
        case "See You Again":
            albumArt = CoverFlowerBoy
            break;
        case "Pure Comedy":
            albumArt = CoverPureComedy
            break;
        case "Stay And Decay":
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
