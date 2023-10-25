export default function callLoading(text, callback, callBackParam1, callBackParam2) {
    const spinner = document.querySelector('.loading-overlay')
    const content = document.querySelector('.loading-overlay-content')
    spinner.classList.add('show')
    content.innerHTML = text
    setTimeout(() => {
        spinner.classList.remove('show');
        if (callback) {
            callback(callBackParam1, callBackParam2)
        } 
    }, 2000)
}