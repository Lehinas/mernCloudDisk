import React, { useRef, useState } from "react"
import Button from "../UI/Button/Button"
import { changeFileView, changeSortName, changeSortType, popFromStack, setCurrentDir } from "../../store/fileSlice"
import { useDispatch, useSelector } from "react-redux"
import Input from "../UI/Input/Input"
import { useUploadFiles } from "../../hooks/useUploadFiles"

import back from "../../assets/images/back.svg"
import sort_dec from "../../assets/images/sort_dec.svg"
import sort_inc from "../../assets/images/sory_inc.svg"
import plate2x2 from "../../assets/images/plate2x2.svg"
import plate3x3 from "../../assets/images/plate3x3.svg"
import list from "../../assets/images/list.svg"

import styles from "./FileControl.module.css"
import Popup from "../Popup/Popup"
import Search from "../Search/Search"

const FileControl = () => {
    const dirStack = useSelector(state => state.files.dirStack)
    const sortName = useSelector(state => state.files.sortName)
    const sortType = useSelector(state => state.files.sortType)
    const dispatch = useDispatch()
    
    const { uploadHandler } = useUploadFiles()
    
    const fileInputRef = useRef(null)
    const [show, setShow] = useState(false)
    
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    
    const backClickHandler = () => {
        const backDirId = Array.from(dirStack).pop()
        dispatch(setCurrentDir(backDirId))
        dispatch(popFromStack())
    }
    const inputClickHandler = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }
    const sortTypeChange = () => {
        if (sortType === "inc") {
            dispatch(changeSortType("dec"))
        } else {
            dispatch(changeSortType("inc"))
        }
    }
    
    return (
        <div className={styles.fileControl}>
            <div className={styles.fileControl_btns}>
                <Button className={styles.fileControl_btn_img} onClick={backClickHandler}>
                    <img src={back} />
                </Button>
                <div className={styles.fileControl_upload}>
                    <Button className={styles.fileControl_btn} onClick={handleShow}>Создать папку</Button>
                    <Button className={styles.fileControl_btn} onClick={inputClickHandler}>Загрузить файл</Button>
                </div>
                <Input
                    style={{ display: "none" }}
                    type={"file"}
                    multiple={true}
                    onChange={(e) => uploadHandler(e.target.files)}
                    ref={fileInputRef}
                />
            </div>
            
            <Search />
            
            <div className={styles.fileControl_view}>
                <div className={styles.fileControl_sort}>
                    <button className={styles.fileControl_view_sort_btn} onClick={sortTypeChange}>
                        <img
                            src={sortType === "inc" ? sort_inc : sort_dec}
                        />
                    </button>
                    <select
                        name={sortName}
                        onChange={(e) => dispatch(changeSortName(e.target.value))}
                        className={styles.fileControl_sort_select}
                    >
                        <option className={styles.fileControl_sort_option} value={"date"}>По дате</option>
                        <option className={styles.fileControl_sort_option} value={"name"}>По названию</option>
                        <option className={styles.fileControl_sort_option} value={"size"}>По размеру</option>
                    </select>
                </div>
                <div className={styles.fileControl_view_type}>
                    <button
                        onClick={() => dispatch(changeFileView("plate2x2"))}
                        className={styles.fileControl_view_type_btn}
                    >
                        <img src={plate2x2} />
                    </button>
                    <button
                        onClick={() => dispatch(changeFileView("plate3x3"))}
                        className={styles.fileControl_view_type_btn}
                    >
                        <img src={plate3x3} />
                    </button>
                    <button
                        onClick={() => dispatch(changeFileView("list"))}
                        className={styles.fileControl_view_type_btn}
                    >
                        <img src={list} />
                    </button>
                </div>
            
            </div>
            <Popup handleClose={handleClose} show={show} />
        </div>
    )
}

export default FileControl