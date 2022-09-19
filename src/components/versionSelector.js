import React from 'react'
import styled from 'styled-components'

const VERSIONS = [
    {title: "1.6.3", url: "/v1.6.3"},
    {title: "1.7.0", url: "/v1.7.0"},
    {title: "1.8.0", url: ""}
]
const Container = styled.div`
        h3 {
            padding: 5px;
        }
        p {
            font-size: 13px;
            padding: 10px;
        }
`;


export default function VersionSelector() {
    let currentVersion = ""
    if(typeof window != "undefined") {
        currentVersion = window.location.pathname.split("/")[1]
    }

    if(currentVersion.indexOf("v") != 0) currentVersion = "";

    function updateLocation(evt) {
        let selectedVersion = evt.target.value

        let pathname = window.location.pathname.replace(/\/$/, "") //remove the trailing "/" if there is any
        if(pathname.indexOf("/v") != -1) {
            pathname = pathname.replace(/v[0-9].[0-9].[0-9]\//, "")
        }
        let pathParts = pathname.split("/")

        //when we're visiting the root of the default version, we ignore the "index" part
        //but if we're inside a specific version coming from the default version, we need to add it
        if(pathParts[pathParts.length - 1] == 'index' && selectedVersion == "") {
            pathParts[pathParts.length - 1] = ""
        } else {
            if(pathParts[pathParts.length - 1] == '' && pathname === "") {
                pathParts[pathParts.length - 1] = "/index"
            }   
        }
        pathname = pathParts.join("/")

        window.location.href = window.location.protocol + "//" + window.location.host+ 
                                selectedVersion + pathname;
    }

    function getCurrentVersionName() {
        const latest = VERSIONS.find( v => v.url.replace("/", "") == currentVersion)
        if(latest) return latest.title
        return ""
    }

    return (
        <Container>
            <p>Version: 
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

