//import axios from "axios"
import {SongsList} from '../Context/AppContext'
import { useContext, useState } from 'react'
import axios from "axios"

function SrchResult(props){
    const arrRslt = props.data
  
    const [isShow,setIsShow]=useState(true)
    // const [songToAdd,setSongToAdd]=useState({})

    const setIsDisplayConfirmWin = useContext(SongsList)[5]
    const setConfirmTxt = useContext(SongsList)[6]
    const setConfirmAction = useContext(SongsList)[7]
    const setSongId = useContext(SongsList)[1]   
    const songId = useContext(SongsList)[11]   
    
    const addSong = async (e)=>{
        const trackId = e.target.id
        const iSong = arrRslt.results[trackId]
        // setSongToAdd(arrRslt.results[trackId])
         setSongId(trackId)
        
        setConfirmTxt('Are you sure you want to add'+ iSong.title +'?')
        setConfirmAction(()=>addToList)
        setIsDisplayConfirmWin(true)
    }   

    function addToList(songId){
        debugger
        const iSong = arrRslt.results[songId]
        const response = axios.post('http://localhost:4000/api/songs/newsong',{
            user_id : 0, 
            playlist_id : 0, 
            name : iSong.title, 
            videoSrc : iSong.url, 
            thumbnail : iSong.thumbnail.url, 
            uploadedAt : iSong.uploadedAt, 
            duration_formatted : iSong.duration_formatted, 
            isActive:true               
        })
        .then(({response})=>{

          console.log("response: "+ response)
          window.location.reload(true)
          // if(response.status===200){
          //     alert("Song seccesssfully added")
          // }
        })
        .catch((err)=> console.log(err))       
        console.log("newSong",iSong)
        setIsDisplayConfirmWin(false)
    }

    return(<>
        {isShow && <div className="SrchResult">
            {arrRslt.results.map((song, i) => {
                return (
                    <div className="songSrchItem" id={"item"+i}>
                    <div><img width={20} height={20} alt="" src={song.thumbnail.url}/>&nbsp;{song.title.substring(0,50)+'...'}</div>
                    <div id={i} className="zmdi zmdi-plus plus-icon" onClick={addSong}></div>
                    </div>
                    );
                })}
            <div onClick={()=>setIsShow(false)}> X Close </div>
        </div>}
    </>
    )
 }

 export default SrchResult