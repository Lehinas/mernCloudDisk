import React, { useRef } from "react"
import styles from "./UploadPopupItem.module.css"
import Input from "../UI/Input/Input"
import { useUploadFiles } from "../../hooks/useUploadFiles"

const UploadPopupItem = ({ items }) => {
    
    const fileInputRef = useRef()
    
    const { uploadHandler } = useUploadFiles()
    
    const uploadClickHandler = () => {
        fileInputRef.current.click()
    }
    
    return (
        <div className={styles.UploadPopupItem}>
            {items.map((item, index) => (
                <button key={index} className={styles.UploadPopupItem_tab} onClick={uploadClickHandler}>
                    <img src={item.logo} className={styles.UploadPopupItem_tab_img} />
                    <div className={styles.UploadPopupItem_tab_text}>{item.text}</div>
                    <Input
                        style={{ display: "none" }}
                        type={"file"}
                        multiple={true}
                        onChange={(e) => uploadHandler(e.target.files)}
                        ref={fileInputRef}
                    />
                </button>
            ))}
        </div>
    )
}

export default UploadPopupItem