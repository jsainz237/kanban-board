import styled from 'styled-components';
import { Card as ICard } from '../../state/cards.reducer';

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: grab;

    padding: 8px 12px;
    border-radius: 8px;
    min-height: 140px;
    background-color: ${({ theme }) => theme.colors.textColor};
    margin-bottom: 12px;
    
    * {
        color: ${({ theme }) => theme.colors.secondaryColor};
    }
`;

export const CardHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;

    .title {
        font-weight: bold;
    }

    .options-icon {
        padding: 0 4px;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
            background-color: #879099;
        }
    }
`;

export const DescriptionContainer = styled.div`
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
`;

export const FooterContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: 12px;

    .date {
        font-size: small;
    }
`;

export const StatusLabel = styled.div<{ status: ICard['status'] }>`
    padding: 1px 12px;
    font-size: small;
    font-weight: bold;
    border-radius: 50px;
    border: 2px solid ${({ theme }) => theme.colors.secondaryColor};
    
    ${({ status, theme }) => ({
        color: status === 'closed' ? theme.colors.textColor : undefined,
        background: status === 'closed' 
            ? theme.colors.secondaryColor
            : undefined,

    })}
`;

export const AddCardButton = styled(Card)`
    min-height: unset;
    background-color: transparent;
    cursor: pointer;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 2px dashed ${({ theme }) => theme.colors.textColor};
    color: ${({ theme }) => theme.colors.textColor};
    
    * {
        color: ${({ theme }) => theme.colors.textColor};
    }
`;