export default (option, dom) => {
    const  { color, activeColor, name } = option;
    const styleId = `hightlight-style-${name}`;
    let $style = document.getElementById(styleId);
    if (!$style) {
        const STYLESHEET_TEXT = `
            .highlight-style-${name} {
                background-color: ${color};
                cursor: pointer;
            }
            .highlight-style-${name}.active {
                background-color: ${activeColor};
            }
        `
        const $cssNode = document.createTextNode(STYLESHEET_TEXT);
        $style = document.createElement('style');
        $style.id = styleId;
        $style.appendChild($cssNode);
        dom ? dom.appendChild($style) : document.head.appendChild($style);
    }

    return $style;
}