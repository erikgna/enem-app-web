import React from 'react'

interface IButtonProps {
    text: string;
    func: () => void;
}

export const Button = (props: IButtonProps) => {
    return (
        <button onClick={props.func}>
            <p
                className="relative inline-block text-sm font-medium text-blue-500 group active:text-blue-500 focus:outline-none focus:ring"
            >
                <span
                    className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-blue-500 group-hover:translate-y-0 group-hover:translate-x-0"
                ></span>

                <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                    {props.text}
                </span>
            </p>
        </button>
    )
}
