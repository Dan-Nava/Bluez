import React, {useState} from 'react'

import Button from "@mui/material/Button";

import CoverFlowerBoy from "../LyricMode/static/flower_boy_album_cover.jpeg"
import CoverPureComedy from "../LyricMode/static/pure_comedy_album_cover.jpeg"
import CoverStayAndDecay from "../LyricMode/static/stay_and_decay_album_cover.jpg"
import CoverWhite from "../LyricMode/static/white.png"

import './styles.css'
export default function MusicianMode() {
	const [currentSong, setcurrentSong] = useState("")

	const [key, setkey] = useState(0)


				   //0    1     2    3     4    5    6    7     8     9   10    11
	const major = [	"C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", 
					"C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
	const minor = [	"Cm", "Dbm", "Dm", "Ebm", "Em", "Fm", "Gbm", "Gm", "Abm", "Am", "Bbm", "Bm", 
					"Cm", "Dbm", "Dm", "Ebm", "Em", "Fm", "Gbm", "Gm", "Abm", "Am", "Bbm", "Bm"]

	const seeYouAgainChords = [	major[key + 5], minor[key + 2], minor[key + 7], major[key + 6],
								major[key + 5], minor[key + 2], minor[key + 7], major[key + 10],
								major[key + 5], minor[key + 2], minor[key + 7], major[key + 6]
							]
	const pureComedyChords = [	major[key + 11], major[key + 8], major[key + 4], major[key + 9],
								major[key + 5], minor[key + 2], minor[key + 7], major[key + 10],
								major[key + 4], minor[key + 9], minor[key + 9], major[key + 8]
							]
	const stayAndDecayChords = [minor[key + 7], major[key + 3], major[key + 5], minor[key + 7],
								minor[key + 7], minor[key + 0], minor[key + 7], major[key + 10],
								major[key + 3], minor[key + 0], minor[key + 7], major[key + 10]
							]

	const chords = stayAndDecayChords

	function transposeUp() {
		if (key < 11) {
			setkey(key + 1)
		} else {
			setkey(0)
		}
		
	}

	function transposeDown() {
		if (key > 0) {
			setkey(key - 1)
		} else {
			setkey(11)
		}
	}
	
	return (
		<div>
			<div className="chords">
				<p>Current Key: {chords[0]}</p>
				<p>Verse:		{chords[0]}, {chords[1]}, {chords[2]}, {chords[3]}</p>
				<p>Pre-chorus: 	{chords[4]}, {chords[5]}, {chords[6]}, {chords[7]}</p>
				<p>Chorus: 		{chords[8]}, {chords[9]}, {chords[10]}, {chords[11]} </p>
			</div>
			<Button variant="contained" className='settingButton' onClick={transposeUp}>
				Tranpose Up
				</Button>	
			<Button variant="contained" className='settingButton' onClick={transposeDown}>
				Transpose Down
			</Button>		
			<img src={CoverFlowerBoy} className="back-cover"/>
		</div>
	)
}
