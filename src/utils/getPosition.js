export default $node => {
    let offset = {
        top: 0,
        left: 0
    };
    while ($node) {
        offset.top += $node.offsetTop;
        offset.left += $node.offsetLeft;
        $node = $node.offsetParent;
    }
    return offset;
}