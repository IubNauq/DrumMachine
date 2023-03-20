import './App.css';
import {useEffect, useState} from "react";

const firstSoundsGroup = [
    {
        keyCode: 81,
        key: 'Q',
        id: 'Heater-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
        keyCode: 87,
        key: 'W',
        id: 'Heater-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
        keyCode: 69,
        key: 'E',
        id: 'Heater-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
        keyCode: 65,
        key: 'A',
        id: 'Heater-4',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
        keyCode: 83,
        key: 'S',
        id: 'Clap',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
        keyCode: 68,
        key: 'D',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
        keyCode: 90,
        key: 'Z',
        id: "Kick-n'-Hat",
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
        keyCode: 88,
        key: 'X',
        id: 'Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
        keyCode: 67,
        key: 'C',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
]

const secondSoundsGroup = [
    {
        keyCode: 81,
        key: 'Q',
        id: 'Chord-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
        keyCode: 87,
        key: 'W',
        id: 'Chord-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
        keyCode: 69,
        key: 'E',
        id: 'Chord-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
        keyCode: 65,
        key: 'A',
        id: 'Shaker',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
        keyCode: 83,
        key: 'S',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
        keyCode: 68,
        key: 'D',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
        keyCode: 90,
        key: 'Z',
        id: 'Punchy-Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
        keyCode: 88,
        key: 'X',
        id: 'Side-Stick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
        keyCode: 67,
        key: 'C',
        id: 'Snare',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
];

function KeyboardKey(props) {
    useEffect(() => {
        document.addEventListener("keydown", handleKeydown)
    }, [])

    function handleKeydown(e) {
        if (e.keyCode === props.sound.keyCode) {
            props.play(props.sound)
        }
    }

    return (
        <div className="drum-pad"
             onClick={() => props.play(props.sound)}>
            {props.sound.key}
            <audio className="clip"
                   id={props.sound.key}
                   src={props.sound.url}></audio>
        </div>
    )
}

function Keyboard(props) {
    if (props.power === 'ON')
        return props.sounds.map(sound => <KeyboardKey play={props.play}
                                                      sound={sound}/>)

    return props.sounds.map(sound => <KeyboardKey play={props.play}
                                                  sound={{...sound, url: '#'}}/>)
}


function App() {

    const [sounds, setSounds] = useState(firstSoundsGroup)
    const [CurSound, setCurSound] = useState('')
    const [volume, setVolume] = useState(1)
    const [power, setPower] = useState('ON')

    function play(props) {
        const audio = document.getElementById(props.key)
        audio.currentTime = 0
        audio.play()
        setCurSound(props.id)
    }

    function changeSounds() {
        if (sounds === firstSoundsGroup) {
            setSounds(secondSoundsGroup)
            setCurSound('Smooth Piano Kit')
        } else {
            setSounds(firstSoundsGroup)
            setCurSound('Heater Kit')
        }
    }

    function handlePower() {
        if (power === 'ON') setPower('OFF')
        else setPower('ON')
    }


    function handleVolume(e) {
        setVolume(e.target.value)
        setCurSound("Volume: " + Math.round(volume * 100))

        const audios = sounds.map(s => document.getElementById(s.key))
        audios.forEach(function (a) {
            a.volume = volume
        })
    }

    return (
        <div className="App"
             id="drum-machine">
            <div className="pad-bank">
                <Keyboard play={play}
                          sounds={sounds}
                          power={power}/>
            </div>
            <div className="controls-container">
                <button className="power"
                        onClick={handlePower}>
                    Turn Power: {power}
                </button>
                <p id="display">{CurSound}</p>
                <div className="volume-slider">
                    <input max="1"
                           min="0"
                           step="0.01"
                           type="range"
                           value={volume}
                           onChange={handleVolume}/>
                </div>
                <button id="change-sounds"
                        onClick={changeSounds}>
                    Change Sounds Group
                </button>
            </div>
        </div>
    );
}

export default App;
