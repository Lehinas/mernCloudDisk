import React from "react"
import styles from "./UploadPopup.module.css"
import Button from "../UI/Button/Button"

import plus from "../../assets/images/plus.svg"
import folder_upload from "../../assets/images/folder_upload.svg"
import upload_file from "../../assets/images/upload_file.svg"
import create_new from "../../assets/images/create_new.svg"
import UploadPopupItem from "../UploadPopupItem/UploadPopupItem"
import usePopupSettings from "../../hooks/usePopupSettings"

const UploadPopup = () => {
    
    const tabs = [
        [
            {
                logo: create_new,
                text: "Новая папка",
            },
        ],
        [
            {
                logo: upload_file,
                text: "Загрузить файл",
            },
            {
                logo: folder_upload,
                text: "Загрузить папку",
            },
        ],
    ]
    
    const { isOpen, togglePopup, popupRef } = usePopupSettings()
    
    return (
        <div className={styles.UploadPopup}>
            <Button onClick={togglePopup} className={styles.UploadPopup_add}>
                <img src={plus} />
                <div>Добавить</div>
            </Button>
            {isOpen && (
                <div ref={popupRef} className={styles.UploadPopup_popup}>
                    {tabs.map((tab, index) => (
                        <UploadPopupItem key={index} items={tab} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default UploadPopup