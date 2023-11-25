
const Dot = ({ index, currentIndex, onClick }) => {
	return (
		<div
			style={{
				width: 15,
				height: 15,
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
					width: (index !== currentIndex ? 10 : 15),
					height: (index !== currentIndex ? 10 : 15),
					borderRadius: 9999,
					backgroundColor: 'black',
					cursor: "pointer",
				}}
			></div>
		</div>
	);
};

const Dots = ({ limit, currentIndex, onDotClick }) => {
	return (
		<div style={{ position: "fixed", top: 0, right: 100, height: "100%",  zIndex:99}}>
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