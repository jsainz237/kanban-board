import styled from 'styled-components';
import RBModal from 'react-bootstrap/Modal';

export const Modal = styled(RBModal)`
    .modal-content {
        background-color: ${({ theme }) => theme.colors.secondaryColor};
        box-shadow: 0px 0px 7px 0px #a9b4bf7d;

        * {
            color: ${({ theme }) => theme.colors.textColor};
        }
    }
`;

export const ModalHeader = styled(RBModal.Header)`
    border: none;
`;

export const ModalFooter = styled(RBModal.Footer)`
    border: none;
`;


