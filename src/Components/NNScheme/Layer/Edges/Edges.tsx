interface EdgesProps{
    weights: number[][];
};

function Edges({ weights }: EdgesProps) {

    const inp = weights.length;
    const out = weights[0].length;
    const width = 60;
    const inp_height = 54 * inp + 24;
    const out_height = 54 * out + 24;
    const height = Math.max(inp_height, out_height);
    const inp_offset = (height - inp_height) / 2 + 39;
    const out_offset = (height - out_height) / 2 + 39;

    const paths: JSX.Element[] = [];
    for (let i = 0; i < inp; i++) {
        for (let j = 0; j < out; j++) {
            const wheight = weights[i][j];
            paths.push(
                <path
                    key={`${i}_${j}`}
                    d={`M 0 ${54 * i + inp_offset} L ${width} ${54 * j + out_offset}`}
                    stroke={getColor(wheight)}
                    strokeWidth={3 * Math.atan(Math.abs(wheight / 3))}
                />
            );
        }
    }
    return (
        <svg width={width} height={height}>
            {paths}
        </svg>
    );
}

function getColor(wheight: number): string {
    const red = Math.floor(256 * Math.max(0, -wheight));
    const green = Math.floor(256 * Math.max(0, wheight));
    return `rgb(${red}, ${green}, 0)`;
}

export default Edges;
