import styled from 'styled-components';

export const HighlighterWrapper = styled.mark`
    background-color: ${props => props.backgroundColor ? props.backgroundColor : '#FFFF00'};
    color: ${props => props.color ? props.color: 'black'};
    font-weight: ${props => props.fontWeight ? props.fontWeight : 'bold'};
`;