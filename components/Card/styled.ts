import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import { Card as ICard } from '../../state/projects.reducer';

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
`;

export const CardHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;

    .title {
        color: ${({ theme }) => theme.colors.secondaryColor};
        font-weight: bold;
        margin-right: 24px;
    }

    .options-icon {
        color: ${({ theme }) => theme.colors.secondaryColor};
        padding: 0 4px;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
            background-color: #879099;
        }
    }
`;

export const DescriptionContainer = styled.div`
    color: ${({ theme }) => theme.colors.secondaryColor};
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
        color: ${({ theme }) => theme.colors.secondaryColor};
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
        color: status === 'closed' ? theme.colors.textColor : theme.colors.secondaryBackgroundColor,
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

export const DropdownMenu = styled(Dropdown.Menu)`
    margin-top: -5px;
    min-width: 150px;
`;

export const DropdownItem = styled(Dropdown.Item)`
    &:active {
        background-color: ${({ theme }) => theme.colors.textColor} !important;
    }

    &.edit-btn {
        color: ${({ theme }) => theme.colors.textColor};
    }

    &.archive-btn {
        color: #cf3342;

        &:hover, &:active {
            background-color: #cf3342 !important;
            color: ${({ theme }) => theme.colors.textColor};
        }
    }
`;

export const MenuButtonContainer = styled.div`
    padding: 0 0.5rem;
    width: 100%;
`;