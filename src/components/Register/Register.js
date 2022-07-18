import React from 'react';


class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			userEmail: '',
			userPassword: '',
		}
	}

	onNameChange = (e) => {
		this.setState({ userName: e.target.value });
	}

	onEmailChange = (e) => {
		this.setState({ userEmail: e.target.value });
	}

	onPasswordChange = (e) => {
		this.setState({ userPassword: e.target.value });
	}

	onFormSubmit = () => {
		fetch('http://localhost:8000/register', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.userName,
				email: this.state.userEmail,
				password: this.state.userPassword,
			})
		})
		.then(response => response.json())
		.then(user => {
			if(user.id) {
				console.log('register route', user);
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
		})
		.catch(err => {
			console.log(err);
		})
	}

	render() {
		const { onRouteChange } = this.props;
		return (
			<article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Sign Up</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
				        <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--black" type="text" name="name"  id="name"/>
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--black" type="email" name="email-address"  id="email-address"/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--black" type="password" name="password"  id="password"/>
				      </div>
				    </fieldset>
				    <div className="">
				      <input onClick={this.onFormSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
				    </div>
				    <div className="lh-copy mt3">
				      <p>Have an account already?<span onClick={() => onRouteChange('SignIn')} className="f6 link dim black db underline pointer">Sign In</span></p>
				    </div>
				  </div>
				</main>
			</article>
		)
	}
	
}

export default Register;