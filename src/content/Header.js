import { useContext, useRef, useState } from "react";
import Api from "../Api";
import { SongsList } from "../Context/AppContext";
import SrchResult from "./srchResult";
import LOGO from "../IMG/musifyLogo.png"

 function Header(props){
   // const [isOpenSearch,setIsOpenSearch] = useState(false);
    
   const currUser = localStorage.user

   const srcStr = useRef()
    const [result, setResult] = useState("")
    //const [SearchDiv, setSearchDiv] = useState("")
    
    //search button action. call to API with the srchString
      const srchSong = async (e) => {
        e.preventDefault();
        setResult (await Api(srcStr.current.value))
      };

      //show the search textBox when press on icon
      const showSearchTxt = ()=>{
        srcStr.current.parentElement.style.visibility="visible"
      }
      
      // srcStr.addEventListener("keypress", (event)=> {
      //     if (event.key === 13) { // key code of the keybord key
      //       srchSong(event);
      //     }
      // });

      return(
        <form className="plHeader" onSubmit={srchSong}>
            <div className="plHeaderContent">
                <span><img src={LOGO} height="60"></img></span>
                <span className="searchContent">
                    <i className="zmdi zmdi-search zmdi-hc-2x searcBtn" onClick={srchSong}></i  >
                    <div className="searchBorder">
                        <input type="text" name="songName" ref={srcStr} placeholder="search song" />
                    </div>
                </span>
                {result && <SrchResult data={result} />}
                <span className="loginSec"><i className="zmdi zmdi-account-circle zmdi-hc-2x"></i>Hi, {currUser}</span>
            </div>
        </form>
      )


 }

 export default Header