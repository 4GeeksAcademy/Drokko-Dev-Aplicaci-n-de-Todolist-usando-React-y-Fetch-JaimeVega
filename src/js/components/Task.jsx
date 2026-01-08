const Task = (props) => {
	const complete = props.check? 'completeTask complete': 'completeTask';
	return (
		<div className="task">
			<h2>{props.title}</h2>
			<button onClick={()=>props.onClickDelete(props.id)} className="deleteTask">
				  <svg
					xmlns="http://www.w3.org/2000/svg"
					width={24}
					height={24}
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					className="icon icon-tabler icons-tabler-outline icon-tabler-x"
				>
					<path stroke="none" d="M0 0h24v24H0z" />
					<path d="M18 6 6 18M6 6l12 12" />
				</svg>
			</button>
			<button className={complete}  onClick={()=>props.onClickComplete(props.id)}>
				  <svg
					xmlns="http://www.w3.org/2000/svg"
					width={24}
					height={24}
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					className="icon icon-tabler icons-tabler-outline icon-tabler-checkbox"
				>
					<path stroke="none" d="M0 0h24v24H0z" />
					<path d="m9 11 3 3 8-8" />
					<path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={24}
					height={24}
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					className="icon icon-tabler icons-tabler-outline icon-tabler-square"
				>
					<path stroke="none" d="M0 0h24v24H0z" />
					<path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5" />
				</svg>
			</button>
		</div>
	);
};

export default Task;