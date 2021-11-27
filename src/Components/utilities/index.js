export const onChange = (e, changeState, formName) => {
    const input = e.target;
    const form = formName ? { name: formName } : input.form
    const { value } = input
    changeState((prev)=>({
        ...prev,
        [form.name]: {
            ...prev[form.name],
            [input.name]: value,
        }
    }));
}

export const randomise = (list) => list[Math.floor(Math.random() * list.length)]