import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { randomId } from '@mantine/hooks';

const StreamClass = () =>{
    const {roomId} = useParams();

    const firstName = useSelector(state => state.userSlice.firstName);

    const myMeeting = async(element)=>{
        const appID = 1692621773;
        const serverSecret = "8daf44afcd1d3bc1b0b765d202eaa6e9";
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId,Date.now().toString(), "Kunal");

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            }
        });  
    };

    return(
        <div className = 'room-page'>
            <div ref = {myMeeting} style={{ width: '100vw', height: '100vh' }}/>
        </div>
    )
}

export default StreamClass;