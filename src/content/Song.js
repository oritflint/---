import {SongsList} from '../Context/AppContext'
import { useContext, useState } from 'react'
import axios from "axios"

function Song(props){
    const songTrack = props.obj
    const songList =useContext(SongsList)[0]
    const setSongList =useContext(SongsList)[2]
    const setCurrSong =useContext(SongsList)[4]
    const setIsDisplayConfirmWin = useContext(SongsList)[5]
    const setConfirmTxt = useContext(SongsList)[6]
    const setConfirmAction = useContext(SongsList)[7]
    
    const [showTrackActions,setShowTrackActions] = useState(false)
    
    function playSong(e){
        setCurrSong(e.target.parentElement.id)
    }

    const hoverTrack=(e)=>{
        const trackElem = e.target.parentElement.parentElement
        if(trackElem.className=="track"){
            trackElem.style.backgroundColor = "rgb(39, 39, 39)"
            trackElem.style.color = "dimgray"
            trackElem.style.transition = "0.3s"
            
            setShowTrackActions(true)
        }
    }

    const leaveTrack=(e)=>{
        const trackElem = e.target.parentElement.parentElement
        if(trackElem.className=="track"){
            trackElem.style.backgroundColor = "black"
            setShowTrackActions(false)
        }
    }

    const deleteSong = async ()=>{
        setConfirmTxt('Are you sure you want to delete '+ songTrack.name.substring(0,50) +'?')
        setConfirmAction(()=>deleteFromList)
        setIsDisplayConfirmWin(true)
    }

    
    function deleteFromList(){
        const songTrackId = songTrack._id 
        const response = axios.post('http://localhost:4000/api/songs/deletesong',{
            _id :  songTrackId  
        })
        .then(({response})=>{
  
        })
        .catch((err)=> console.log(err))
        setSongList(songList.filter((e)=>e._id !== songTrackId))
        setIsDisplayConfirmWin(false)

    }

    return( 
    <div className="track" onMouseOver={hoverTrack} onMouseLeave={leaveTrack}>
        <div className="trackDetails" id={props.index} onClick={playSong}>
            <img className="trackImg" alt="" width={50} height={50} src={songTrack.thumbnail}/>&nbsp;
            <div className="trackText">{props.index+1}- {songTrack.name.length>50? songTrack.name.substring(0,50)+"..." : songTrack.name}</div> 
        </div>
        {showTrackActions && <div visible="false" className="songDelete zmdi zmdi-delete zmdi-hc-2x" onClick={deleteSong}></div>}
    </div>
            
)}

 export default Song