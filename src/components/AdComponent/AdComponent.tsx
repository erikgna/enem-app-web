import React, { useEffect } from 'react'

export const AdComponent = () => {
    useEffect(() => {
        const anyWindow = window as any

        try {
            (anyWindow.adsbygoogle = anyWindow.adsbygoogle || []).push({});
        } catch (e) {
            console.log(e)
        }

    }, []);

    return (
        <ins className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-9460540080778149"
            data-ad-slot=""
            data-ad-format="auto"
            data-full-width-responsive="true">
        </ins>
    )
}
