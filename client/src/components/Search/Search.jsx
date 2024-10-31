import React, { useState } from "react"
import styles from "./Search.module.css"
import Input from "../UI/Input/Input"
import { useDispatch, useSelector } from "react-redux"
import { changeSearchName, setFiles } from "../../store/fileSlice"
import FileService from "../../services/FileService"

import cross from "../../assets/images/cross.svg"

const Search = () => {
    
    const dispatch = useDispatch()
    const searchName = useSelector(state => state.files.searchName)
    const currentDir = useSelector(state => state.files.currentDir)
    const sortName = useSelector(state => state.files.sortName)
    const sortType = useSelector(state => state.files.sortType)
    const user = useSelector(state => state.user.currentUser)
    
    const [searchTimeOut, setSearchTimeOut] = useState(false)
    
    const searchNameHandler = async (e) => {
        const search = e.target.value
        dispatch(changeSearchName(search))
        try {
            if (searchTimeOut != false) {
                clearTimeout(searchTimeOut)
            }
            if (search !== "") {
                setSearchTimeOut(setTimeout(async (value) => {
                    const { data } = await FileService.searchFiles(value, user.id)
                    dispatch(setFiles(data))
                }, 500, search))
            } else {
                const { data } = await FileService.getFiles(currentDir, sortName, sortType)
                dispatch(setFiles(data))
            }
        } catch (e) {
            console.log(e)
        }
    }
    const clearInput = async () => {
        dispatch(changeSearchName(""))
        const { data } = await FileService.getFiles(currentDir, sortName, sortType)
        dispatch(setFiles(data))
    }
    return (
        <div className={styles.search}>
            <Input
                value={searchName}
                onChange={searchNameHandler}
                className={styles.search_input}
                placeholder={"Поиск файла"}
            />
            {searchName && <button onClick={clearInput} className={styles.search_btn}><img src={cross} /></button>}
        </div>
    )
}

export default Search