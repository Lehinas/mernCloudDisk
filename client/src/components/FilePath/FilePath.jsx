import React from "react"
import styles from "./FilePath.module.css"
import arrow_drop_down from "../../assets/images/arrow_drop_down.svg"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentDir, setCurrentFolder, setFolderStack } from "../../store/fileSlice"

const FilePath = ({ item, last, currentId, currentFolder }) => {
    const dispatch = useDispatch()
    const folderStack = useSelector(state => state.files.folderStack)
    
    const backClickHandler = () => {
        const folderIndex = folderStack.findIndex(
            folder => folder.name === currentFolder && folder.id === currentId,
        )
        if (folderIndex !== -1) {
            const folderNewStack = folderStack.slice(0, folderIndex + 1)
            dispatch(setFolderStack(folderNewStack))
            dispatch(setCurrentDir(currentId))
        } else {
            console.log("не найден")
        }
    }
    
    return (
        <button className={styles.FilePath} onClick={backClickHandler}>
            <div
                className={!last
                    ? `${styles.FilePath_btn} ${styles.FilePath_btn_chevron}`
                    : styles.FilePath_btn}
            >{item.name}</div>
            {last && <img src={arrow_drop_down} className={styles.FilePath_arrow} />}
        </button>
    )
}

export default FilePath