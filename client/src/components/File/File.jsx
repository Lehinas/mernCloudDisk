import React from "react"
import styles from "./File.module.css"
import shareLogo from "../../assets/images/share.svg"
import downloadLogo from "../../assets/images/download.svg"
import deleteLogo from "../../assets/images/delete.svg"

import { useDispatch, useSelector } from "react-redux"
import { pushToFolderStack, setCurrentDir, setCurrentFolder, setFiles } from "../../store/fileSlice"
import FileService from "../../services/FileService"
import Button from "../UI/Button/Button"
import sizeFormat from "../../utils/sizeFormat"
import { getLogo } from "../../utils/getLogo"

const File = ({ file }) => {
    const { name, date, size, type, path } = file
    const logo = getLogo(type)
    const dispatch = useDispatch()
    
    const currentDir = useSelector(state => state.files.currentDir)
    const currentFolder = useSelector(state => state.files.currentFolder)
    const user = useSelector(state => state.user.currentUser)
    const fileView = useSelector(state => state.files.fileView)
    
    const openDirHandler = async () => {
        if (type === "dir") {
            dispatch(setCurrentDir(file._id))
            dispatch(setCurrentFolder(file.name))
            dispatch(pushToFolderStack({ name: file.name, id: file._id }))
        }
    }
    
    const downloadHandler = async (e) => {
        e.stopPropagation()
        try {
            const { data } = await FileService.downloadFile(user.id, file._id)
            const downloadUrl = window.URL.createObjectURL(data)
            const link = document.createElement("a")
            link.href = downloadUrl
            link.download = file.name
            document.body.appendChild(link)
            link.click()
            link.remove()
        } catch (e) {
            console.log(e)
        }
    }
    const deleteHandler = async (e) => {
        e.stopPropagation()
        if (confirm("Вы уверены?")) {
            try {
                const { data } = await FileService.deleteFiles(user.id, file._id)
                const res = await FileService.getFiles(currentDir)
                dispatch(setFiles(res.data))
            } catch (e) {
                console.log(e)
            }
        }
    }
    return (
        fileView === "list" ?
            <div className={`${styles.File} ${type !== "dir" && styles.File_list_file}`} onClick={openDirHandler}>
                <img className={styles.File_list_img} src={logo} />
                <div className={styles.File_list_name}>{name}</div>
                <div className={styles.File_list_date}>{date.slice(0, 10)}</div>
                <div className={styles.File_list_size}>{sizeFormat(size)}</div>
                {type !== "dir" && (
                    <>
                        <Button
                            className={styles.File_list_btn}
                            onClick={downloadHandler}
                        ><img src={downloadLogo} /></Button>
                    </>)}
                <Button className={styles.File_list_btn}><img src={shareLogo} /></Button>
                <Button className={styles.File_list_btn} onClick={deleteHandler}><img src={deleteLogo} /></Button>
            </div>
            :
            <div
                className={styles.File_plate}
                onClick={openDirHandler}
            >
                <img className={styles.File_plate_img} src={logo} />
                <div className={styles.File_plate_name}>{name}</div>
                
                <div className={styles.File_plate_info_card}>
                    <div className={styles.File_plate_info_name}>Название: {name}</div>
                    <div className={styles.File_plate_info_time}>Дата: {date.slice(0, 10)}</div>
                    <div className={styles.File_plate_info_size}>Размер: {sizeFormat(size)}</div>
                    <div className={styles.File_plate_info_buttons}>
                        {type !== "dir" && (
                            <>
                                <Button
                                    className={styles.File_plate_info_btn}
                                    onClick={downloadHandler}
                                ><img src={downloadLogo} /></Button>
                            </>)}
                        <Button className={styles.File_plate_info_btn}><img src={shareLogo} /></Button>
                        <Button className={styles.File_plate_info_btn} onClick={deleteHandler}><img src={deleteLogo} /></Button>
                    </div>
                </div>
            </div>
    )
}

export default File