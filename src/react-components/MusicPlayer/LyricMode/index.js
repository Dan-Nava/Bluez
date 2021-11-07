import React, {useState} from 'react'

import Button from "@mui/material/Button";

import CoverFlowerBoy from "../static/flower_boy_album_cover.jpeg"
import CoverPureComedy from "../static/pure_comedy_album_cover.jpeg"
import CoverStayAndDecay from "../static/stay_and_decay_album_cover.jpg"
import CoverWhite from "../static/white.png"

import './styles.css'
export default function LyricMode() {
	const [currentSong, setcurrentSong] = useState("")

	const [pos, setPos] = useState(0)

	const seeYouAgainLyrics = [
		"Song: See You Again",
		"Artist: Tyler the Creator ",
		"Okay, okay, okay, okay",
		 "Okay, okay, oh",
		 "You live in my dream state",
		 "Relocate my fantasy",
		 "I stay in reality",
		 "You live in my dream state",
		 "Any time I count sheep",
		 "That's the only time we make up, make up",
		 "You exist behind my eyelids, my eyelids",
		 "Now I don't wanna wake up",
		 "20/20, 20/20 vision",
		 "Cupid hit me, cupid hit me with precision",
		 "I wonder if you look both ways",
		 "When you cross my mind (Yeah), I said, I said",
		 "I'm sick of, sick of, sick of, sick of chasing",
		 "You're the one that's always running through my daydream, I",
		 "I can only see your face when I close my eyes",
		 "Can I get a kiss?",
		 "And can you make it last forever?",
		 "I said I'm 'bout to go to war",
		 "And I don't know if I'ma see you again",
		 "Can I get a kiss? (Can I)",
		 "And can you make it last forever? (Can you)",
		 "I said I'm 'bout to go to war ('Bout to)",
		 "And I don't know if I'ma see you again",
		 "(Uh, switch it up)",
		 "I said, okay, okay, okay, okidokie, my infatuation",
		 "Is translatin' to another form of what you call it? (Love)",
		 "Oh yeah, oh yeah, oh yeah, I ain't met you",
		 "I've been looking, stuck here waiting for I",
		 "Stop the chasing, like an alcoholic",
		 "You don't understand me, what the fuck do you mean?",
		 "It's them rose tinted cheeks, yeah it's them dirt-colored eyes",
		 "Sugar honey iced tea, bumblebee on the scene",
		 "Yeah I'd give up my bakery to have a piece of your pie",
		 "Yugh!",
		 "20/20, 20/20 vision",
		 "Cupid hit me, cupid hit me with precision",
		 "I wonder if you look both ways",
		 "When you cross my mind, I said, I said",
		 "I'm sick of, sick of, sick of, sick of chasing",
		 "You're the one that's always running through my daydream, I",
		 "I can only see your face when I close my eyes",
		 "(So)",
		 "Can I get a kiss? (Can I get a kiss?)",
		 "And can you make it last forever? (Oh, forever)",
		 "I said I'm 'bout to go to war (Go to war)",
		 "I don't know if I'ma see you again (See you again)",
		 "Can I get a kiss? (Can I)",
		 "And can you make it last forever? (Can you)",
		 "I said I'm 'bout to go to war ('Bout to)",
		 "And I don't know if I'ma see you again",
		 "Okay, okay, okay, okay, okay, okay, okay, oh (La la, la la la la, la la)",
		 "Okay, okay, okay, okay, okay, okay, okay, oh (La la, la la la la, la la)",
		 "Okay, okay, okay, okay, okay, okay, okay, oh (La la, la la la la, la la)",
		 "Okay, okay, okay, okay, okay, oh (La la, la la la la, la la)",
		 "One more time?",
		 "",
		 ""
	]

	const pureComedLyrics = [
		"Song: Pure Comedy",
		"Artist: Father John Misty",
		"At six",
		"For some reason when I go...",
		"The comedy of man starts like this",
		"Our brains are way too big for our mothers' hips",
		"And so Nature, she divines this alternative",
		"We emerged half-formed and hope that whoever greets us on the other end",
		"Is kind enough to fill us in",
		"And, babies, that's pretty much how it's been ever since",
		"Now the miracle of birth leaves a few issues to address",
		"Like, say, that half of us are periodically iron deficient",
		"So somebody's got to go kill something while I look after the kids",
		"I'd do it myself, but what, are you going to get this thing its milk?",
		"He says as soon as he gets back from the hunt, we can switch",
		"It's hard not to fall in love with something so helpless",
		"Ladies, I hope we don't end up regretting this",
		"Comedy, now that's what I call pure comedy",
		"Just waiting until the part where they start to believe",
		"They're at the center of everything",
		"And some all powerful being endowed this horror show with meaning",
		"Oh, their religions are the best",
		"They worship themselves yet they're totally obsessed",
		"With risen zombies, celestial virgins, magic tricks, these unbelievable outfits",
		"And they get terribly upset",
		"When you question their sacred texts",
		"Written by woman-hating epileptics",
		"Their languages just serve to confuse them",
		"Their confusion somehow makes them more sure",
		"They build fortunes poisoning their offspring",
		"And hand out prizes when someone patents the cure",
		"Where did they find these goons they elected to rule them?",
		"What makes these clowns they idolize so remarkable?",
		"These mammals are hell-bent on fashioning new gods",
		"So they can go on being godless animals",
		"Oh comedy, their illusions they have no choice but to believe",
		"Their horizons that just forever recede",
		"And how's this for irony, their idea of being free is a prison of beliefs",
		"That they never ever have to leave",
		"Oh comedy, oh it's like something that a madman would conceive!",
		"The only thing that seems to make them feel alive is the struggle to survive",
		"But the only thing that they request is something to numb the pain with",
		"Until there's nothing human left",
		"Just random matter suspended in the dark",
		"I hate to say it, but each other's all we got",
		"",
		""
	]

	const stayAndDecayLyrics = [
		"Song: Stay and Decay",
		"Artist: Unlike Pluto",
		"You were on the right track",
		"You were on the right path",
		"Black door in the forest",
		"Is it here to taunt us?",
		"'Cause it's goin' nowhere (ah-ah)",
		"You gotta move on",
		"'Cause shadows in the dark",
		"Are always coming towards you",
		"Red eyes in the night",
		"You put 'em outta sight",
		"Don't be paralyzed, move on to",
		"Nirvana, or Shangri-La, or Valhalla",
		"Move, 'cause if you stay in limbo you'll decay",
		"Roots, trees, branches, leaves",
		"They're covering the skyline",
		"Blocking off the sunlight",
		"Making noon like midnight (ah-ah)",
		"White horse on the right",
		"It calls you to the light",
		"Put it out of sight, you",
		"Need to try and see",
		"The forest from the trees",
		"Don't be paralyzed, move on to",
		"Nirvana, or Shangri-La, or Valhalla",
		"Move, 'cause if you stay in limbo you'll decay",
		"Maybe no one really knows the way",
		"No one really knows, no one really knows the way",
		"Broken clocks are right twice a day",
		"No phone booths, lifelines, not today",
		"No one really offers help anyway",
		"No one's there to save you from this place",
		"Nirvana, or Shangri-La, or Valhalla",
		"Move, 'cause if you stay in limbo you'll decay",
		"",
		""
	]


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
