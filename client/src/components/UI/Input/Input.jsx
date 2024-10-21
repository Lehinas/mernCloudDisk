import React, { forwardRef } from "react"
import styles from "../AuthInput/Input.module.css"

const Input = forwardRef(({ placeholder, value, onChange, type, style, multiple, className }, ref) => {
    return (
        <input
            className={`${styles.input} ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            type={type}
            ref={ref}
            style={style}
            multiple={multiple}
        />
    )
})

export default Input
