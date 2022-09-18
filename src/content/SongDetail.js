

import Plyr from "plyr-react";
import "plyr-react/plyr.css"
import { useContext, useEffect, useRef } from "react";
import {SongsList} from '../Context/AppContext'

function SongDetail (props){
    const songList = useContext(SongsList)[0]
    const currSongId =useContext(SongsList)[3]
    const currSong = (!currSongId) ? songList[0] : songList[currSongId]
    const playerRef = useRef(null);

    // useEffect(()=>{
    //     playerRef.current.plyr
    // },[])
    return(
        <div className="songDetails">
            
             {currSong && <h1>Now playing:</h1>}
             {currSong && currSong.name}
           {currSong&& <Plyr ref={playerRef} source={currSong.videoSrc} />}
        </div>
        
    )
}

export default SongDetail