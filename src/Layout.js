
import './Layout.css';

import Header from './content/Header'
import SongDetail from './content/SongDetail'
import SongList from './content/SongList';

import './material-design-iconic-font/css/material-design-iconic-font.min.css';
import { useEffect, useState } from 'react';
import axios from "axios"
import PopupConfirm from './content/PopupConfirm';
import {SongsList} from './Context/AppContext'
import Login from './content/Login';

function Layout(props){
    const [isLogged, setIsLogged] = useState(localStorage.token);
    const [songList,setSongList] = useState([])    //list of songs
    const [songId,setSongId] = useState(null)      //the user adding new song in the popup
    const [currSong,setCurrSong] = useState(null)  //current song

    //useStates for confirmPopup:
    const [confirmAction,setConfirmAction] = useState(null)  //Function to be execute when confirm
    const [confirmTxt,setConfirmTxt] = useState('')  //Question text
    const [isDisplayConfirmWin, setIsDisplayConfirmWin] = useState(false)

    
// // new song added to list
//  useEffect ( ()=>{
  
//     if(newSong && isConfirmed){

//         //const ReqData = JSON.stringify({"song_id":0,"name":song.title,"videoSrc":song.url,"thumbnail":song.thumbnail.url,"uploadedAt":song.uploadedAt, "duration_formatted":song.duration_formatted, "isActive":true,"__v":0})
//         //const ReqData = {song_id : 0, name : song.title, videoSrc : song.url, thumbnail : song.thumbnail.url, uploadedAt : song.uploadedAt, duration_formatted : song.duration_formatted, isActive:true}

//         const response = axios.post('http://localhost:4000/api/songs/newsong',{
//             user_id : 0, 
//             playlist_id : 0, 
//             name : newSong.title, 
//             videoSrc : newSong.url, 
//             thumbnail : newSong.thumbnail.url, 
//             uploadedAt : newSong.uploadedAt, 
//             duration_formatted : newSong.duration_formatted, 
//             isActive:true               
//         })
//         .then(({response})=>{
//           debugger
//           console.log("response: "+ response)
//           // if(response.status===200){
//           //     alert("Song seccesssfully added")
//           // }
//         })
//         .catch((err)=> console.log(err))        
//         debugger
//         console.log("newSong",newSong)
//         window.location.reload(true)
//     }

//  },[newSong, isConfirmed]
// )

//song deleted from list
// useEffect ( ()=>{

//     if(deleteSongId){ 
//         const response = axios.post('http://localhost:4000/api/songs/deletesong',{
//             _id :  deleteSongId   
//         })
//         .then(({response})=>{
//           console.log("status: "+ response.statusText)
//           if(response.status===200){
//               alert("Song seccesssfully deleted")     
//               setSongList(songList.filter((e)=>e.id !== deleteSongId))
//           }
//           setDeleteSongId('')
//           setSongList(songList.filter((e)=>e.id !== deleteSongId))
//         })
//         .catch((err)=> console.log(err))

//         //window.location.reload(true)
//     }

// //debugger
//  },[deleteSongId]
// )

useEffect(()=>{
  
    isLogged ?
    axios.get('http://localhost:4000/api/songs')
    .then(({data}) => {
        console.log(data)
        const songs = data.map(e=> {
          return{
          _id: e._id,
          song_id: e.song_id,
          name: e.name,
          videoSrc: {type: "video",sources:[{src:`${e.videoSrc}`, provider:"youtube"}]},
          thumbnail : e.thumbnail, 
          uploadedAt : e.uploadedAt, 
          duration_formatted : e.duration_formatted,       
        }
    })
        
        console.log("song1",songs[0])
        setSongList(songs)
    })
    .catch((err)=> console.log(err))
    :
    <></>
  
  },[])


return (
  <div className="App">
      <SongsList.Provider value={[songList,                 //0
                                  setSongId, 
                                  setSongList, 
                                  currSong, 
                                  setCurrSong, 
                                  setIsDisplayConfirmWin,   //5
                                  setConfirmTxt, 
                                  setConfirmAction, 
                                  isDisplayConfirmWin, 
                                  confirmTxt, 
                                  confirmAction,            //10
                                  songId]}>
      <Header />   
      {(isLogged) ? 
        <>
            <div className='plBody'>
                <SongDetail />
                <SongList />
            </div>
            {isDisplayConfirmWin && <PopupConfirm isDisplay={isDisplayConfirmWin} confirmAction={confirmAction} confirmTxt={confirmTxt}></PopupConfirm>}
        </> 
        :
        <Login setIsLogged={setIsLogged}></Login> 
      }
      </SongsList.Provider>
    </div>
  );

}

export default Layout