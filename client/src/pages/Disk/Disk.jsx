import { useSelector } from "react-redux"
import useFetchFiles from "../../hooks/useFetchFiles"
import { useDragAndDrop } from "../../hooks/useDranAndDrop"
import styles from "./Disk.module.css"
import FileControl from "../../components/FileControl/FileControl"
import FileList from "../../components/FileList/FileList"

const Disk = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    
    useFetchFiles()
    const { dragEnter, dragEnterHandler, dragOverHandler, dragLeaveHandler, dropHandler } = useDragAndDrop()
    const currentFolder = useSelector(state => state.files.currentFolder)
    
    return (
        <div className={styles.Disk}>
            <FileControl />
            <FileList />
        </div>
    )
}

export default Disk