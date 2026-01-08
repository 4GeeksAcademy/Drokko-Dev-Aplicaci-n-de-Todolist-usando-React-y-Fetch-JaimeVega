import { useEffect, useState } from 'react';
import Task from './Task';

const Home = () => {
	const [list, setList] = useState([{id: 1, task: 'Wash my hands'},{id: 2, task: 'Wash my card'}]);
	const [ inputValue, setInputValue ] = useState('');
	function deleteAll() {
		let newList = [...list]; 
		newList.forEach((task)=> 
		fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
				method: "DELETE"})
				.then(resp => {
					console.log(resp.ok); // Será true si la respuesta es exitosa
					console.log(resp.status); // El código de estado 201, 300, 400, etc.
					return resp; // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
				})
				.then(data => {
					console.log(data); 
					
				})
				.catch(error => {
					// Manejo de errores
					console.log(error);
				})
		); 
		setList([]);
		
	}
	function onClick (e){
		e.preventDefault();
		let newList = list? [...list] : [];
		let position = newList.length;
		let inputValueClean = inputValue.trim().replace(/\s+/g, " ");
		if (inputValueClean != '') {
			let newTask = {
				"label": inputValueClean,
				"is_done": false
				};
			
			
			setInputValue('');
			fetch('https://playground.4geeks.com/todo/todos/Drokko', {
				method: "POST",
				body: JSON.stringify(newTask),
				headers: {
					"Content-Type": "application/json"
				}
				})
				.then(resp => {
					console.log(resp.ok); // Será true si la respuesta es exitosa
					console.log(resp.status);
					console.log(resp);
					 // El código de estado 201, 300, 400, etc.
					return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
				})
				.then(data => {
					console.log(data); 
					newList[position] = {label: data.label, is_done:data.is_done, id:data.id}
					setList(newList);
					console.log(newList);
					
				})
				.catch(error => {
					// Manejo de errores
					console.log(error);
				});
	}}
	function deleteItem (id) {
		let newList = [...list]; 
		newList = newList.filter((task)=> task.id !== id); 
		setList(newList);
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE"})
				.then(resp => {
					console.log(resp.ok); // Será true si la respuesta es exitosa
					console.log(resp.status); // El código de estado 201, 300, 400, etc.
					return resp; // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
				})
				.then(data => {
					console.log(data); 
					
				})
				.catch(error => {
					// Manejo de errores
					console.log(error);
				});
	}
	function UpdateItem (id) {
		let newList = [...list]; 
		newList = newList.map((task)=> {
			if (task.id === id) {
				task.is_done = !task.is_done;
			}
			return task
		});
		const updateTask = newList.filter((task)=> task.id === id);
		console.log(updateTask);
		
		const putTask = {
				"label": updateTask[0].label,
				"is_done": updateTask[0].is_done
				};

		console.log(putTask);
		
		setList(newList);
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "PUT",
				body: JSON.stringify(putTask),
				headers: {
					"Content-Type": "application/json"}
				})
				.then(resp => {
					console.log(resp.ok); // Será true si la respuesta es exitosa
					console.log(resp.status); // El código de estado 201, 300, 400, etc.
					return resp; // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
				})
				.then(data => {
					console.log(data); 
					
				})
				.catch(error => {
					// Manejo de errores
					console.log(error);
				});
	}
	useEffect(()=> {
		fetch('https://playground.4geeks.com/todo/users/Drokko')
			.then(resp => {
				console.log(resp.ok); // Será true si la respuesta es exitosa
				console.log(resp.status); // El código de estado 201, 300, 400, etc.
				return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
			})
			.then(data => {
				console.log(data); 
				setList(data.todos);
				
			})
			.catch(error => {
				console.log(error);
				console.log('Esto dio error');
				
			})

	},[]);

	const ToDoList = list.map((item)=> 
	<Task title={item.label} 
		onClickDelete={deleteItem} 
		onClickComplete={UpdateItem}
		key={item.id} 
		id={item.id} 
		check={item.is_done}

		/>
	)
	

	

	return (
		<div className="container-list">
			<h1>TO DO LIST</h1>
			<button onClick={deleteAll} className='deleteAll'>Delete All</button>
			<div className="list">
				<form onSubmit={onClick}>
					<input type="text" placeholder='What needs to be done?' 
					onChange={(e)=> {
						setInputValue(e.target.value);						
						}}
					value={inputValue}
					/>
				</form>
				{ToDoList}
				<span className='text-footer-list'>{`${list.length} item left`}</span>
			</div>
		</div>
	);
};

export default Home;