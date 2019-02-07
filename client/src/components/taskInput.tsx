import React, { KeyboardEvent, createRef, useEffect, useState } from 'react'
import Important from './important'

export interface Props {
    action(arg: { subject: string; ownerId: string; important: boolean }): void
    userId: string
}

const inputKeyArray = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
]

export default function TaskInput({ action, userId }: Props) {
    const ref = createRef<HTMLInputElement>()

    const [important, setImportant] = useState(false)

    useEffect(() => {
        document.addEventListener('keydown', event => {
            if (ref.current && inputKeyArray.includes(event.key.toLowerCase())) {
                if (ref.current !== document.activeElement) {
                    ref.current.focus()
                }
            }
        })
    }, [])

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        const { key, target } = event
        if (key === 'Enter') {
            action({ subject: (target as any).value, ownerId: userId, important })
            setImportant(false)
            if (ref.current) {
                ref.current.value = ''
            }
        }

        if (key === 'i' && event.getModifierState('Control')) {
            setImportant(!important)
        }
    }

    return (
        <>
            <div className="task-input-wrapper">
                <Important important={important} id={'input-important'} />
                <input ref={ref} onKeyDown={handleKeyDown} />
            </div>
            <small className="task-input-caption">
                <code>Ctrl + i</code> for important
            </small>
        </>
    )
}
