import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type EditAbleSpanPropsType = {
    title: string
    changeTitle: (newTitle:string) => void
}

const EditAbleSpan = (props: EditAbleSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onEditMode = () => setIsEditMode(true)
    const offEditMode = () => {
        setIsEditMode(false)
        props.changeTitle(title)
    }
    const setLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && offEditMode()

    }
    return (
        isEditMode
        ? <input
                onChange={setLocalTitle}
                value={title}
                onBlur={offEditMode}
                autoFocus
                onKeyDown={onKeyDownOffEditMode}
                />
        : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

export default EditAbleSpan;