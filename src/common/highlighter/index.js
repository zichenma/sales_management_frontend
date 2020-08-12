import React from 'react';
import { HighlighterWrapper } from './style';


const Highliter = ({backgroundColor, color, fontWeight, children})=> {
    return (
        <HighlighterWrapper 
        backgroundColor={backgroundColor}
        fontWeight={fontWeight}
        color={color}
        > 
        {children} 
        </HighlighterWrapper>
    )
}

export default Highliter;