import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { exitSignin, signin } from '../../redux/actions/userActions';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';


export const SignIn = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userSignin = useSelector(state => state.userSignin);
	const { loading, error, success } = userSignin;
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [disabled, setDisabled] = useState(false);

	useEffect(() => {
		setDisabled(username.length > 0 && password.length > 0 ? false : true);
	}, [username, password])

	useEffect(() => {
		success && navigate.replace("/");
	}, [success, history])

	useEffect(() => {
		error?.includes("403") && alert(t('signInFail'));
	}, [error]);

	const moveToSignUp = () => {
		dispatch(exitSignin());
		navigate.replace("/signup")
	}

	const goBack = () => {
		dispatch(exitSignin());
		navigate.goBack();
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		// validate input
		if (username.length === 0) {
			alert("Please enter name");
			return false;
		}
		if (password.length === 0) {
			alert("please enter passowrd");
			return false;
		}

		dispatch(signin({ username, password }));
	}

	return (
		<div className="signin-container">
			<div onClick={() => goBack()}>
				<ArrowBackIcon className="back-btn" />
			</div>
			<p className="big-title">Pomodoros</p>
			<p className="title">{'signIn'}</p>
			<form onSubmit={(e) => handleSubmit(e)}>
				<input type="input" className="credential" placeholder={"username"} autoFocus="on"
					onChange={(e) => setUsername(e.target.value.trim())}></input>
				<input type="password" className="credential" placeholder={"password"}
					onChange={(e) => setPassword(e.target.value.trim())}></input>
				{!loading ? <input type="submit" disabled={disabled} className="credential signin-btn" value={"signIn"}></input>
					: <CircularProgress style={{ margin: "auto", color: "white" }} size={30} />}
				<div className="row">
					<p>{t("noAccount")}</p>
					<p onClick={() => moveToSignUp()} className="signup-link">{"signUpNow"}</p>
				</div>
			</form>
		</div>
	)
}