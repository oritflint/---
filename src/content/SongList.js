import Song from './Song'
import {SongsList} from '../Context/AppContext'
import { useContext } from 'react'

function SongList (props){
    const songs =useContext(SongsList)[0]

    return(
        <div className='songList'>       
        {songs.map((element,i) => {
            return  <Song obj={element} key={i} index={i} />
            })
        }
        </div>
    )
}

export default SongList