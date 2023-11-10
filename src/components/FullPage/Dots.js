
const Dot = ({ index, currentIndex, onClick }) => {
	return (
		<div
			style={{
				width: 15,
				height: 15,
				// border: "1px solid" + (index === currentIndex ? " white" : " rgba(0, 0, 0, 0)"),
				borderRadius: 9999,
				margin: "10px 0",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
			onClick={() => onClick(index)}
		>
			<div
				style={{
					position: "fixed",
					width: 11,
					height: 11,
					borderRadius: 9999,
					// backgroundColor: (index === currentIndex ? "black" : "red" ),
					backgroundColor: 'black',
					border: (index !== currentIndex ? "2px solid white" : null),
					cursor: "pointer",
				}}
			></div>
		</div>
	);
};

const Dots = ({ limit, currentIndex, onDotClick }) => {
	return (
		<div style={{ position: "fixed", top: 0, right: 100, height: "100%",  zIndex:2}}>
			<div
				style={{
					position: "fixed",
					top: 65,
					right: 100 + 8,
					height: "100%",
					backgroundColor: "white",
				}}
			></div>
			<div
				style={{
					position: "fixed",
					display: "flex",
					flexDirection: "column",
					height: "100%",
					alignItems: "center",
					justifyContent: "center",
				}}>
				{Array(limit)
					.fill("")
					.map((_, index) => (
						<Dot
							key={index}
							index={index}
							currentIndex={currentIndex}
							onClick={onDotClick}
						></Dot>
					))}
			</div>
		</div>
	);
};

export default Dots;