import React, { useEffect, useRef, useState } from "react"
import styles from "./FilterItem.module.css"
import arrow_drop_down from "../../assets/images/arrow_drop_down.svg"
import pdfLogo from "../../assets/images/pdfLogo.svg"
import imageLogo from "../../assets/images/imageLogo.svg"
import videoLogo from "../../assets/images/videoLogo.svg"
import usePopupSettings from "../../hooks/usePopupSettings"

const FilterItem = ({ item }) => {
    const { name, type } = item
    
    const {isOpen, togglePopup, popupRef} = usePopupSettings()
    
    
    return (
        <button className={styles.FilterItem} onClick={togglePopup}>
            <div className={styles.FilterItem_btn}>
                {name}
            </div>
            <img src={arrow_drop_down} className={styles.FilterItem_img} />
            
            {isOpen && (
                <div className={styles.FilterItem_popup} ref={popupRef}>
                    {
                        [
                            { type: "pdf", name: "Файлы PDF", logo: pdfLogo },
                            { type: "image", name: "Изображения", logo: imageLogo },
                            { type: "video", name: "Видео", logo: videoLogo },
                        ].map((item, i) => (
                            <button key={i} className={styles.FilterItem_popup_item}>
                                <img src={item.logo} className={styles.FilterItem_popup_img} />
                                <div className={styles.FilterItem_popup_text}>{item.name}</div>
                            </button>
                        ))
                    }
                </div>
            )}
        </button>
    )
}

export default FilterItem