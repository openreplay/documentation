import React from 'react'
import styled from 'styled-components'

const VERSIONS = [
    {title: "1.3.6", url: "/v1.3.6"},
    {title: "1.4.0", url: "/v1.4.0"},
    {title: "1.5.0", url: "/v1.5.0"},
    {title: "1.5.1", url: "/v1.5.1"},
    {title: "1.5.2", url: "/v1.5.2"},
    {title: "1.5.3", url: "/v1.5.3"},
    {title: "1.5.4", url: "/v1.5.4"},
    {title: "1.6.0", url: "/v1.6.0"},
    {title: "1.7.0", url: "/v1.7.0"},
    {title: "1.8.0", url: "/v1.8.0"},
    {title: "1.8.1", url: "/v1.8.1"},
    {title: "1.9.0", url: ""}
]
const Container = styled.div`
    background: #eee;
    padding: 8px 3px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    select {
        font-size: 15px;
        border-radius: 4px;
        outline: none;
        border: none;
        width: 100%;
        font-family: "Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif;
        background: transparent;
        padding-right: 0.2rem;
        color: #888;
        font-weight: 600;
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

    return (
        <Container>
            <select onChange={
                updateLocation
            }>
                {VERSIONS.map( v => {
                    return <option value={ v.url } selected={v.url.indexOf(currentVersion) != -1}>v{v.title}</option>
                })}
            </select>
        </Container>
    )
}

