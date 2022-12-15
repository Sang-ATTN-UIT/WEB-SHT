import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';


import { signup } from '../../redux/actions/userActions';


export const SignUp = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading ,success } = useSelector(state => state.userSignup);

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");
	const [disabled, setDisabled] = useState(false);

	useEffect(() => {
		if (email.length < 1 || username.length < 1 || password.length < 1 || rePassword.length < 1) {
			setDisabled(true);
		} else setDisabled(false);
	}, [username, password, email, rePassword]);

	useEffect(() => {
		if (success) {
			navigate.replace("/signin");
		} 
	}, [success, navigate]);

	const moveToSignIn = () => {
		navigate.replace("/signin");
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		// validate input
		if (email.length < 4 || username.length < 4 || password.length < 4 || rePassword.length < 4) {
			alert('lengthGreater4');
			return false;
		} 
		if (password !== rePassword) {
			alert("samePasswords");
			return false;
		}  

		dispatch(signup({email, username, password}));
	}

	return (
		<div className="signin-container">
			<div onClick={() => navigate.goBack()}>
				<ArrowBackIcon className="back-btn"/>
			</div>
			<p className="big-title">Pomodoros</p>
			<p className="title">{'signUp'}</p>
			<form onSubmit={(e) => handleSubmit(e)}>
				<input type="email" className="credential" placeholder={"email"} autoFocus="on"
					onChange={(e) => setEmail(e.target.value.trim())}></input>
				<input type="input" className="credential" placeholder={"username"}
					onChange={(e) => setUsername(e.target.value.trim())}></input>
				<input type="password" className="credential" placeholder={"password"}
					onChange={(e) => setPassword(e.target.value.trim())}></input>
				<input type="password" className="credential" placeholder={"rePassword"}
					onChange={(e) => setRePassword(e.target.value.trim())}></input>
				{!loading ? <input type="submit" disabled={disabled} className="credential signin-btn" value={"signUp"}></input>
				:<CircularProgress style={{margin: "auto", color: "white"}} size={30}/>}
				<div className="row">
					<p>{"hadAccount"}</p>
					<p onClick={() => moveToSignIn()} className="signup-link">{"signIn"}</p>
				</div>
			</form>
		</div>
	)
}