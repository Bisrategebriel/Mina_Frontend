import React from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/dashboard/VideoPlayer';

function Watch(props) {
    const {id} = useParams();
    return (
        <div className='w-screen h-screen bg-gray-200 grid grid-cols-12 overflow-y-auto gap-2 justify-start content-start p-3'>
            <VideoPlayer video_id={id} className="md:col-span-8 bg-white col-span-12 p-3 rounded-2xl overflow-hidden relative h-fit flex flex-col space-y-2"/>
        </div>
    );
}

export default Watch;