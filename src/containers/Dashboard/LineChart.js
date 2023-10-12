import { ResponsiveLine } from '@nivo/line';
import React from "react";
export default function MyResponsiveLine(props) {
    const {
        data, color, type
    } = props;
    return <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        curve="monotoneX"
        yScale={{ type: 'linear', min: '0', max: 'auto', stacked: false, reverse: false }}
        colors={color}
        pointSize={5}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        enableArea={true}
        enableGridX={false}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -40,
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        tooltip={(points) => {
            return (
                <div
                    style={{
                        background: 'white',
                        padding: '9px 12px',
                        border: '1px solid #ccc',
                    }}
                >
                    <div>
                        <p>{points.point?.data?.x}</p>
                    </div>
                    <div
                        key={points.point?.id}
                        style={{
                            color: points.point?.serieColor,
                            padding: '3px 0',
                        }}
                    >
                        <strong>{type}:</strong> [{points.point?.data?.yFormatted}]
                        </div>
                </div>
            )
        }}
    />
}