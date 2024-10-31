import React, { useRef, useState } from "react"
import { changeFileView, changeSortType } from "../../store/fileSlice"
import { useDispatch, useSelector } from "react-redux"
import { useUploadFiles } from "../../hooks/useUploadFiles"

import styles from "./FileControl.module.css"
import FilePath from "../FilePath/FilePath"
import plate from "../../assets/images/plate.svg"
import list from "../../assets/images/list.svg"
import sortDec from "../../assets/images/sort_dec.svg"
import sortInc from "../../assets/images/sort_inc.svg"
import FilterItem from "../FilterItem/FilterItem"

const FileControl = () => {
    const folderStack = useSelector(state => state.files.folderStack)
    const sortName = useSelector(state => state.files.sortName)
    const sortType = useSelector(state => state.files.sortType)
    const fileView = useSelector(state => state.files.fileView)
    const currentDir = useSelector(state => state.files.currentDir)
    const currentFolder = useSelector(state => state.files.currentFolder)
    const dispatch = useDispatch()
    
    
    const changeViewType = (value) => {
        dispatch(changeFileView(value))
    }
    
    const changeSortHandler = () => {
        if(sortType === "inc"){
            dispatch(changeSortType("dec"))
        }else{
            dispatch(changeSortType("inc"))
        }
    }
    return (
        <div className={styles.FileControl}>
            <div className={styles.FileControl_header}>
                <div className={styles.FileControl_path}>
                    {folderStack.map((item, i) => {
                        return <FilePath
                            currentId={item.id}
                            currentFolder={item.name}
                            item={item}
                            key={i}
                            last={(folderStack.length - 1) === i ? true : false}
                        />
                        
                    })
                    }
                </div>
                <div className={styles.FileControl_view}>
                    
                    <button className={styles.FileControl_view_btn} onClick={changeSortHandler}>
                        <img src={sortType === "inc" ? sortInc : sortDec} />
                    </button>
                    <button className={styles.FileControl_view_btn} onClick={() => changeViewType("list")}>
                        <img src={list} />
                    </button>
                    <button className={styles.FileControl_view_btn} onClick={() => changeViewType("plate")}>
                        <img src={plate} />
                    </button>
                </div>
            </div>
            <div className={styles.FileControl_filter}>
                {[{ name: "Тип", type: "type" }].map((item, i) => <FilterItem item={item} key={i} />)}
            </div>
        </div>
    )
}

export default FileControl