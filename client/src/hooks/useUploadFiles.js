import { useDispatch, useSelector } from "react-redux"
import FileService from "../services/FileService"
import { addFile } from "../store/fileSlice"
import { addUploadFile, showUploader } from "../store/uploadSlice"

export const useUploadFiles = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    
    const uploadHandler = async (files) => {
        for (const file of files) {
            try {
                const formData = new FormData()
                formData.append("file", file)
                if (currentDir) {
                    formData.append("parentId", currentDir)
                }
                let uploadFile = {
                    id: Date.now(),
                    name: file.name,
                    progress: 0,
                }
                dispatch(showUploader())
                dispatch(addUploadFile(uploadFile))
                const response = await FileService.uploadFile(formData, uploadFile, dispatch)
                dispatch(addFile(response.data))
                
            } catch (e) {
                console.log("Ошибка при загрузке файлов: " + e)
            }
        }
        
    }
    return { uploadHandler }
    
}