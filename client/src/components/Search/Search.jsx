import React from "react"
import styles from "./Search.module.css"
import Input from "../UI/Input/Input"
import { useDispatch, useSelector } from "react-redux"
import { changeSearchName, setFiles } from "../../store/fileSlice"
import FileService from "../../services/FileService"

const Search = () => {
    
    const dispatch = useDispatch()
    const searchName = useSelector(state => state.files.searchName)
    const currentDir = useSelector(state => state.files.currentDir)
    const sortName = useSelector(state => state.files.sortName)
    const sortType = useSelector(state => state.files.sortType)
    const user = useSelector(state => state.user.currentUser)
    
    const searchNameHandler = async (e) => {
        const search = e.target.value
        dispatch(changeSearchName(search))
        try {
            if (search !== "") {
                const { data } = await FileService.searchFiles(searchName, user.id)
                dispatch(setFiles(data))
            } else {
                const { data } = await FileService.getFiles(currentDir, sortName, sortType)
                dispatch(setFiles(data))
            }
        } catch (e) {
            console.log(e)
        }
    }
    
    return (
        <div className={styles.search}>
            <Input
                value={searchName}
                onChange={searchNameHandler}
                className={styles.search_input}
                placeholder={"Поиск файла"}
            />
        </div>
    )
}

export default Search