import React from "react"
import styles from "./FileTab.module.css"
import { Link } from "react-router-dom"

const FileTab = ({ item }) => {
    const {logo, text, href} = item
    return (
        <Link to={href} className={styles.FileTab}>
            <img src={logo} className={styles.FileTab_img} />
            <div className={styles.FileTab_text}>{text}</div>
        </Link>
    )
}

export default FileTab