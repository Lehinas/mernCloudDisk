import React, { useEffect } from "react"
import styles from "./FileList.module.css"
import { useDispatch, useSelector } from "react-redux"
import File from "../File/File"
import { changeSortName, changeSortType } from "../../store/fileSlice"

const FileList = () => {
    
    const dispatch = useDispatch()
    
    const files = useSelector(state => state.files.files)
    const fileView = useSelector(state => state.files.fileView)
    useEffect(() => {
    
    }, [fileView])
    
    const changeSort = (value) => {
        dispatch(changeSortName(value))
    }
    return (
        fileView === "list" ?
            <div className={styles.FileList}>
                <div className={styles.FileList_header}>
                    <div className={styles.FileList_name} onClick={() => changeSort("name")}>Название</div>
                    <div className={styles.FileList_date} onClick={() => changeSort("date")}>Дата</div>
                    <div className={styles.FileList_size} onClick={() => changeSort("size")}>Размер</div>
                </div>
                {files.length >= 1 && files.map(file => <File key={file._id} file={file} />)}
            </div>
            :
            <div className={styles.FilePlate}>
                {files.length >= 1 && files.map(file => <File key={file._id} file={file} />)}
            </div>
    )
}

export default FileList