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


export const convertTime = (time)=>{
    let minutes = parseInt(time / 60, 10);
    let seconds = parseInt(time % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return  minutes + ":" + seconds;
    // if(time> 60){
    //     let minutes = Math.floor(time / 60) 
    //     return minutes
    // }else{
    //     return time
    // }
}