window.addEventListener('DOMContentLoaded', (doc => () => {

    doc.querySelectorAll(`.playerSlot`)
        .forEach($insertTemplate($playerTemplate()));

    return;


    function $insertTemplate(template) {
        return slot => {
            const clone = doc.importNode(template.content, true);
            clone.querySelector(`button`)
                .addEventListener(`click`, pipeContext($getPlayerUrl, $insertPlayer));

            slot.appendChild(clone);
        }
    }

    function $playerTemplate() {
        return doc.querySelector(`#initialPlayerSlot`);
    }

    function $getPlayerUrl(_, { target: { parentElement } }) {
        return parentElement.querySelector(`input`).value;
    }

    function $insertPlayer(url, { target: { parentElement } }) {
        parentElement.innerHTML = playerHTML(url);
    }

    function playerHTML(url) {
        return `<iframe src="https://www.youtube.com/embed/${vidIdFromYTUrl(url)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen">`;
    }

    function vidIdFromYTUrl(url) {
        return url.match(/=(.+)$/)[1];
    }

    function pipeContext(...fns) {
        return ctx => fns.reduce(([y, ctx$], fn) => [fn(y, ctx$), ctx$], [undefined, ctx]);
    }
})(document));

