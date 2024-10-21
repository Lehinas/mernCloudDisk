import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import "bootstrap/dist/css/bootstrap.min.css"
import { useCreateDir } from "../../hooks/useCreateDir"
import { useSelector } from "react-redux"
import Input from "../UI/Input/Input"
import { useState } from "react"

function Popup ({ handleClose, show }) {
    const currentDir = useSelector(state => state.files.currentDir)
    const { createFolder } = useCreateDir()
    const [nameDir, setNameDir] = useState("")
    const handleCreateDir = () => {
        createFolder(currentDir, nameDir)
        handleClose()
    }
    
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Создать новую папку</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        placeholder={"Введите название папки"}
                        value={nameDir}
                        onChange={(e) => setNameDir(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCreateDir}>
                        Создать
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Popup
