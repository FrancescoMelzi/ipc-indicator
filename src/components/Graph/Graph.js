import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	BarSeries,
	AreaSeries,
} from "react-stockcharts/lib/series";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { SingleValueTooltip } from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

/**
 * Graph component.
 */
const Graph = React.forwardRef((props, ref) => {
		const { type, data: initialData, width, ratio } = props;

		const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => d.date);
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(initialData);

		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 150)]);
		const xExtents = [start, end];

		return (
			<ChartCanvas height={400}
				ref={ref}
				ratio={ratio}
				width={width}
				margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
				type={type}
				seriesName="MSFT"
				data={data}
				xScale={xScale}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor}
				xExtents={xExtents}
			>
				<Chart id={1}
					yExtents={d => [d.price]}
				>
					<XAxis axisAt="bottom" orient="bottom"/>
					<YAxis axisAt="right" orient="right" ticks={5} />
					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} />
					<AreaSeries yAccessor={d => d.price}/>
					<SingleValueTooltip
						xLabel="Date" yLabel="Price"
						yAccessor={d => d.price}
						xAccessor={(d) => d.date}
						xDisplayFormat={timeFormat("%Y-%m-%d")} yDisplayFormat={format(".2f")}
						origin={[-40, 0]}/>
					<SingleValueTooltip
						yLabel="Volume" yAccessor={(d) => d.volume}
						origin={[-40, 20]}/>
				</Chart>
				<Chart id={2}
					yExtents={d => d.volume}
					height={150} origin={(w, h) => [0, h - 150]}
				>
					<YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/>
					<MouseCoordinateY
						at="left"
						orient="left"
						displayFormat={format(".4s")} />

					<BarSeries yAccessor={d => d.volume}
						stroke fill="#6BA583"
						opacity={0.4}
						widthRatio={1} />
				</Chart>
				<CrossHairCursor />
			</ChartCanvas>
		);
});

Graph.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

Graph.defaultProps = {
	type: "svg",
};

export default fitWidth(Graph);
