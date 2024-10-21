import React, { useEffect } from "react"
import styles from "./FileList.module.css"
import { useSelector } from "react-redux"
import File from "../File/File"

const FileList = () => {
    
    const files = useSelector(state => state.files.files)
    const fileView = useSelector(state => state.files.fileView)
    useEffect(() => {
    
    }, [fileView])
    return (
        fileView === "list" ?
            <div className={styles.filelist}>
                <div className={styles.filelist_header}>
                    <div className={styles.filelist_name}>Название</div>
                    <div className={styles.filelist_date}>Дата</div>
                    <div className={styles.filelist_size}>Размер</div>
                </div>
                {files.length >= 1 && files.map(file => <File key={file._id} file={file} />)}
            </div>
            :
            <div className={styles.fileplate}>
                {files.length >= 1 && files.map(file => <File key={file._id} file={file} />)}
            </div>
    )
}

export default FileList