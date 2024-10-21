import React from "react"
import styles from "./Disk.module.css"
import { useSelector } from "react-redux"
import FileList from "../../components/FileList/FileList"
import useFetchFiles from "../../hooks/useFetchFiles"
import { useDragAndDrop } from "../../hooks/useDranAndDrop"
import Uploader from "../../components/Uploader/Uploader"
import FileControl from "../../components/FileControl/FileControl"

const Disk = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    
    useFetchFiles()
    const { dragEnter, dragEnterHandler, dragOverHandler, dragLeaveHandler, dropHandler } = useDragAndDrop()
    
    return (
        !dragEnter ?
            <div
                className={styles.disk}
                onDragEnter={dragEnterHandler}
                onDragLeave={dragLeaveHandler}
                onDragOver={dragOverHandler}
            >
                <FileControl handleShow />
                <FileList />
                
                
                <Uploader />
            </div>
            :
            <div
                className={styles.disk_drop_area}
                onDragEnter={dragEnterHandler}
                onDragLeave={dragLeaveHandler}
                onDragOver={dragOverHandler}
                onDrop={dropHandler}
            >
                Перетащите файлы сюда
            </div>
    
    )
}

export default Disk