//import axios from "axios"
//import {SongsList} from '../Context/AppContext'
import { useContext, useState } from 'react'
import {Modal, Button } from 'react-bootstrap';
import { SongsList } from '../Context/AppContext';

function PopupConfirm(props){
        const [isDisplayWin, setIsDisplayWin] = useState(true)
        const confirmTxt = useContext(SongsList)[9]
        const confirmAction = useContext(SongsList)[10]        //setIsDisplayConfirmAdd(false)
        const confirmActionParams = useContext(SongsList)[11]        //setIsDisplayConfirmAdd(false)

    return(<>

      <Modal show={isDisplayWin}>
        <Modal.Header closeButton onClick={()=>setIsDisplayWin(false)}>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {confirmTxt}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=>setIsDisplayWin(false)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={()=>confirmAction(confirmActionParams)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>



        {/* {isDisplayWin && 
        <div className="modal d-block " tabindex="-1" role="dialog" id="modalSheet">
            <div class="modal-dialog" role="document">
                <div class="modal-content rounded-4 shadow">
                <div class="modal-header border-bottom-0">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setIsDisplayWin(false)}></button>
                </div>
                <div class="modal-body py-0">
                    <p>{props.confirmTxt}</p>
                </div>
                <div class="modal-footer flex-column border-top-0">
                    <button type="button" class="btn btn-lg btn-primary w-100 mx-0 mb-2" onClick={props.confirmAction}>Confirm</button>
                    <button type="button" class="btn btn-lg btn-light w-100 mx-0" data-bs-dismiss="modal" onClick={()=>setIsDisplayWin(false)}>Cancel</button>
                </div>
                </div>
            </div>
        </div> */}


// { 
//         <div className="popup-bg">
//                 <div className="popup-content">
//                     <div className='closePopupWin'>
//                         <i className="zmdi zmdi-close-circle-o zmdi-hc-2x" onClick={()=>setIsDisplayConfirmAdd(false)}></i>
//                     </div>
//                     <div>
//                         <p>{props.confirmTxt}</p>
//                     </div>
//                     <div className='popupButtons'>
//                         <button onClick={props.confirmAction}>Confirm</button>
//                         <button onClick={()=>setIsDisplayConfirmAdd(false)}>cancel</button>
//                     </div>
//                 </div>
//             </div> }

        }
        </>
    )
 }

 export default PopupConfirm