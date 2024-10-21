import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    files: [],
    currentDir: null,
    dirStack: [],
    sortName: "date",
    sortType: "inc",
    fileView: "list",
    searchName: ""
}

export const fileSlice = createSlice({
    name: "files",
    initialState,
    reducers: {
        setFiles: (state, action) => {
            console.log(action.payload)
            state.files = action.payload
        },
        addFile: (state, action) => {
            state.files.push(action.payload)
        },
        setCurrentDir: (state, action) => {
            state.currentDir = action.payload
        },
        pushToStack: (state, action) => {
            state.dirStack.push(action.payload)
        },
        popFromStack: (state, action) => {
            state.dirStack.pop()
        },
        changeSortName: (state, action) => {
            state.sortName = action.payload
        },
        changeSortType: (state, action) => {
            state.sortType = action.payload
        },
        changeFileView: (state, action) => {
            state.fileView = action.payload
        },
        changeSearchName: (state, action) => {
            state.searchName = action.payload
        },
    },
})

export const {
    setFiles,
    addFile,
    setCurrentDir,
    pushToStack,
    popFromStack,
    changeSortName,
    changeSortType,
    changeFileView,
    changeSearchName,
} = fileSlice.actions

export const fileReducer = fileSlice.reducer