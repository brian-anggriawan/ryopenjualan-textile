import React from 'react';
import { ClipLoader
} from 'react-spinners';

let Loading = ({ active }) =>{
    return(
        <div className='sweet-loading d-flex justify-content-center'>
            <ClipLoader
            sizeUnit={"px"}
            size={200}
            color={'#2ca8ff'}
            loading={active}
            />
        </div> 
    )
}


export default Loading;