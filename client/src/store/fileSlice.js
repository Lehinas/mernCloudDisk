import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    files: [],
    currentDir: null,
    currentFolder: "Мой диск",
    folderStack: [{
        name: "Мой диск",
        id: null
    }],
    sortName: "date",
    sortType: "inc",
    fileView: "list",
    searchName: "",
}

export const fileSlice = createSlice({
    name: "files",
    initialState,
    reducers: {
        setFiles: (state, action) => {
            state.files = action.payload
        },
        addFile: (state, action) => {
            state.files.push(action.payload)
        },
        setCurrentDir: (state, action) => {
            state.currentDir = action.payload
        },
        setCurrentFolder: (state, action) => {
            state.currentFolder = action.payload
        },
        pushToFolderStack: (state, action) => {
            state.folderStack.push(action.payload)
        },
        setFolderStack: (state, action) => {
            state.folderStack = action.payload
        },
        popFromFolderStack: (state, action) => {
            state.folderStack.pop()
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
    pushToFolderStack,
    popFromFolderStack,
    changeSortName,
    changeSortType,
    changeFileView,
    changeSearchName,
    setCurrentFolder,
    setFolderStack,
} = fileSlice.actions

export const fileReducer = fileSlice.reducer