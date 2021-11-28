import React from 'react'
import { Modal } from 'reactstrap'

export default function CustomModal({isOpen, toggle, children}) {
    return (
        <Modal
            isOpen={isOpen}
            toggle={toggle}
            backdrop={false}
            keyboard={false}
            className="modal-md"
        >
            {children}
        </Modal>
    )
}
