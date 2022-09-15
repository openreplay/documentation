import React from 'react'

export default function VersionSelector() {

    return (
        <p>
            You're reading the v1 documentation, if you're looking for a different version: 
            <select >
                <option value="1">V 1.0</option>
                <option value="2">V 2.0</option>
                <option value="3">V 3.0</option>
            </select>
        </p>
    )
}