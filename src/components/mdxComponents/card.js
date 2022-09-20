import React from "react"
import Link from "../link"
import { Image } from "styled-icons/material"

export default function Card(props) {
    const {title, text, imagePath, children} = props
    return (
        <Link to="" className={'nextBtn'}>
            <div className={'nextRightWrapper'}>
              <div className={'smallContent'}>
                <span>{title}</span>
              </div>
              <div className={'nextPreviousTitle'}>
                <span>{text}</span>
              </div>
            </div>
            <div className={'rightArrow'}>
                <image src={imagePath} />
            </div>
    </Link>
    )
}