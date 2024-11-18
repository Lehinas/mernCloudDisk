import React from "react"
import styles from "./FileViewContent.module.css"
import { pdfjs } from "react-pdf"
import RenderPdf from "../../plugins/RenderPdf/RenderPdf"
import RenderText from "../../plugins/RenderText/RenderText"

const FileViewContent = ({ data, extension }) => {
    
    const renderFileContent = () => {
        switch (extension) {
            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
            case "svg+xml":
                return <img src={data} className={styles.FileViewContent_img} />
            
            case "pdf":
                return (
                    <RenderPdf data={data} />
                )
            
            case "plain":
            case "md":
                return (
                    <RenderText data={data} />
                )
            
            default:
                return <p>Unsupported file format</p>
        }
    }
    
    return renderFileContent()
}

export default FileViewContent
