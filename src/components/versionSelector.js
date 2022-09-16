import React from 'react'
import styled from 'styled-components'

const VERSIONS = [
    {title: "1.6.3", url: "/v1.6.3"},
    {title: "1.7.0", url: "/v1.7.0"},
    {title: "1.8.0", url: ""}
]
const Container = styled.div`
        padding: 30px 10px;
        background: #cce2ff;
        border-radius: 5px;
        border-left: 4px solid #6fa1e4;


        h3 {
            padding: 5px;
        }
        p {
            font-size: 13px;
            padding: 10px;
        }
`;


export default function VersionSelector() {
    let currentVersion = window.location.pathname.split("/")[1]
    if(currentVersion.indexOf("v") != 0) currentVersion = "";

    function updateLocation(evt) {
        let selectedVersion = evt.target.value

        let pathname = window.location.pathname
        if(pathname.indexOf("/v") != -1) {
            pathname = pathname.replace(/v[0-9].[0-9].[0-9]\//, "")
        }
        let pathParts = pathname.split("/")

        //when we're visiting the root of the default version, we ignore the "index" part
        //but if we're inside a specific version coming from the default version, we need to add it
        if(pathParts[pathParts.length - 1] == 'index') {
            pathParts[pathParts.length - 1] = ""
        } else {
            if(pathParts[pathParts.length - 1] == '') {
                pathParts[pathParts.length - 1] = "index"
            }   
        }
        pathname = pathParts.join("/")

        window.location.href = window.location.protocol + "//" + window.location.host+ 
                                selectedVersion + pathname;
    }

    function getCurrentVersionName() {
        return VERSIONS.find( v => v.url.replace("/", "") == currentVersion).title
    }

    return (
        <Container>
            <h3>ℹ️ You're reading the {getCurrentVersionName()} documentation</h3>
            <p>Use the following dropdown to select a different one: 
            <select onChange={
                updateLocation
            }>
                {VERSIONS.map( v => {
                    return <option value={ v.url } selected={v.url.indexOf(currentVersion) != -1}>V {v.title}</option>
                })}
            </select></p>
        </Container>
    )
}

